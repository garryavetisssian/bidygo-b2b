"use server";

import { z } from "zod";
import { Resend } from "resend";
import { headers } from "next/headers";

// Reject newline / NULL injection in user-controlled strings (defense in depth
// against email-header injection through fields interpolated into renderEmail()).
const noControlChars = (s: string) => !/[\r\n\x00]/.test(s);
const cleanString = (min: number, max: number, msg: string) =>
  z.string().min(min, msg).max(max).refine(noControlChars, "Invalid characters");

const PartnerSchema = z.object({
  name: cleanString(2, 120, "Please tell us your name."),
  company: cleanString(2, 200, "Company name is required."),
  email: z
    .string()
    .email("Please use a valid work email.")
    .max(254)
    .refine(noControlChars, "Invalid characters"),
  phone: cleanString(5, 40, "Phone number is required."),
  country: cleanString(2, 80, "Country is required."),
  // Optional progressive fields — collected after first-touch submit
  role: z.string().max(120).refine(noControlChars, "Invalid characters").optional(),
  website: z.string().max(200).refine(noControlChars, "Invalid characters").optional(),
  category: z.enum(["electronics", "fashion", "footwear", "beauty", "home-goods", "other"]).optional(),
  storeCount: z.enum(["1", "2-5", "6-20", "21-100", "100+"]).optional(),
  notes: z.string().max(2000).optional(),
  hp_field: z.string().max(0).optional(),
});

export type PartnerFormState =
  | { ok: true; message: string }
  | { ok: false; fieldErrors?: Partial<Record<keyof z.infer<typeof PartnerSchema>, string>>; message?: string }
  | null;

const TO_EMAIL = process.env.PARTNERS_INBOX_EMAIL || "partners@bidygo.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Bidygo <noreply@bidygo.com>";

/**
 * In-memory IP→{count, windowStart} map. Survives a single serverless instance
 * but not cold starts. Sufficient to slow simple abuse; for production-grade
 * abuse-resistance use Upstash KV + @upstash/ratelimit instead.
 *
 * Window: 1 hour. Max: 5 submissions per IP per window.
 */
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const rateState = new Map<string, { count: number; windowStart: number }>();

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const cur = rateState.get(ip);
  if (!cur || now - cur.windowStart > RATE_WINDOW_MS) {
    rateState.set(ip, { count: 1, windowStart: now });
    return { ok: true };
  }
  if (cur.count >= RATE_MAX) {
    const retryAfterSec = Math.ceil((RATE_WINDOW_MS - (now - cur.windowStart)) / 1000);
    return { ok: false, retryAfterSec };
  }
  cur.count += 1;
  return { ok: true };
}

/** Redact an email for logging: `garry@bidygo.com` → `g***@bidygo.com`. */
function redactEmail(e: string): string {
  const [local, domain] = e.split("@");
  if (!local || !domain) return "***";
  return `${local[0] ?? ""}***@${domain}`;
}

/**
 * Client IP for rate-limit keying.
 *
 * Vercel-only: we rely on Vercel's edge overwriting `x-forwarded-for` with the
 * real client IP before invocation, and we explicitly do NOT fall back to
 * other client-supplied headers (`x-real-ip`, `cf-connecting-ip`) because an
 * attacker could inject any value to dodge the bucket they hit a moment ago.
 *
 * If this code runs behind any other proxy (or no proxy), the header is
 * spoofable — but the in-memory rate limiter is itself best-effort. For
 * production-grade abuse resistance, replace this with @upstash/ratelimit
 * keyed on a platform-set value (Vercel's `x-vercel-forwarded-for`).
 */
async function clientIp(): Promise<string> {
  try {
    const h = await headers();
    const xff = h.get("x-forwarded-for");
    // Take the FIRST entry: Vercel inserts the client IP at index 0 and we do
    // not have a chain of intermediate trusted proxies to walk past.
    if (xff) return xff.split(",")[0].trim();
  } catch {
    /* headers() can fail outside a request context */
  }
  // No spoofable fallback. Unknown IPs share one bucket — accepted tradeoff
  // for an in-memory limiter; the proper fix is Upstash + platform header.
  return "unknown";
}

export async function submitPartnerApplication(
  _prev: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = PartnerSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors, message: "Please fix the highlighted fields and try again." };
  }

  const data = parsed.data;

  // Honeypot: silently succeed without sending email — confuses bots.
  if (data.hp_field) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  // Rate limit by IP. Same shape on success/honeypot/limit to avoid leaking state.
  const ip = await clientIp();
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return {
      ok: false,
      message: `Too many submissions from this address. Please try again in about ${Math.ceil((limit.retryAfterSec ?? 3600) / 60)} minutes — or email partners@bidygo.com directly.`,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev fallback. Redact PII: email + phone are sensitive.
    console.log("[partner-application] (no RESEND_API_KEY set) →", {
      to: TO_EMAIL,
      sample: {
        company: data.company,
        country: data.country,
        emailRedacted: redactEmail(data.email),
        phoneRedacted: data.phone ? `***${data.phone.slice(-3)}` : undefined,
        category: data.category,
        storeCount: data.storeCount,
      },
    });
    return {
      ok: true,
      message: "Thanks. Your application is in — we'll reply within one business day.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `[Partner Application] ${data.company} (${data.country})`,
      text: renderEmail(data),
    });
  } catch (err) {
    // Generic message to user; full error stays in server logs only.
    console.error("[partner-application] Resend error", err);
    return {
      ok: false,
      message: "Something went wrong sending your application. Please email partners@bidygo.com directly.",
    };
  }

  return {
    ok: true,
    message: "Thanks. Your application is in — we'll reply within one business day.",
  };
}

function renderEmail(d: z.infer<typeof PartnerSchema>): string {
  return [
    "New Bidygo partner application",
    "",
    `Name:        ${d.name}`,
    `Company:     ${d.company}`,
    `Email:       ${d.email}`,
    `Phone:       ${d.phone}`,
    `Country:     ${d.country}`,
    `Role:        ${d.role || "—"}`,
    `Website:     ${d.website || "—"}`,
    `Category:    ${d.category || "—"}`,
    `Store count: ${d.storeCount || "—"}`,
    "",
    "Notes:",
    d.notes || "(none)",
    "",
    "— Submitted via bidygo.com /for-stores",
  ].join("\n");
}
