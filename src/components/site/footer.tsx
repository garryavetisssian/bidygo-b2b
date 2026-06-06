import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, ArrowRight, Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { ChatLauncher } from "./chat-launcher";
import { Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67h-3.55V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.22-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.22 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.74 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
  );
}

const columns = [
  {
    titleKey: "company",
    links: [
      { label: "Why Bidygo", href: "/why-bidygo" },
      { label: "Meet Vahagn", href: "/founder" },
      { label: "Stories", href: "/stories" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    titleKey: "product",
    links: [
      { label: "For Stores", href: "/for-stores" },
      { label: "Your Numbers", href: "/calculator" },
      { label: "Pricing", href: "/pricing" },
      { label: "Solutions", href: "/solutions/electronics" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-cream-200 text-ink-800 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[100%] h-64 bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.10),transparent)] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Logo />
            <p className="text-lg leading-relaxed max-w-md text-pretty text-ink-700">
              {t("tagline")}
            </p>

            {/* Newsletter endpoint is not implemented yet. Posting to a mailto:
                target lets the form work (opens the user's mail client with a
                prefilled subject) instead of hitting a 404. Swap back to a
                proper /api/newsletter route once it ships with Zod validation
                + rate limiting + Resend audience subscribe. */}
            <form
              className="mt-2 max-w-md"
              action="mailto:hello@bidygo.com"
              method="post"
              encType="text/plain"
              aria-label="Newsletter subscription"
            >
              <label htmlFor="newsletter-email" className="block text-sm font-semibold text-ink-800 mb-2">
                {t("newsletter")}
              </label>
              <p className="text-sm text-ink-600 mb-3 leading-relaxed">{t("newsletterCopy")}</p>
              <div className="flex gap-2">
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className="bg-white border-ink-900/10"
                />
                <Button type="submit" size="md" className="shrink-0">
                  {t("subscribe")} <ArrowRight />
                </Button>
              </div>
            </form>

            <div className="flex flex-col gap-2 mt-4 text-sm text-ink-700">
              <a href="mailto:partners@bidygo.com" className="inline-flex items-center gap-2 hover:text-brand-700 transition-colors">
                <Mail className="size-4" /> partners@bidygo.com
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" /> Yerevan
              </span>
            </div>

            <ChatLauncher locale={locale} variant="pill" className="mt-2" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.titleKey} className="flex flex-col gap-3">
                <h3 className="text-xs uppercase tracking-[0.12em] font-bold text-ink-500">{t(col.titleKey)}</h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-ink-700 hover:text-brand-700 transition-colors text-[0.95rem]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-[0.12em] font-bold text-ink-500">{t("legal")}</h3>
              <ul className="flex flex-col gap-2.5">
                <li><Link href="/privacy" className="text-ink-700 hover:text-brand-700 transition-colors text-[0.95rem]">{t("privacy")}</Link></li>
                <li><Link href="/terms" className="text-ink-700 hover:text-brand-700 transition-colors text-[0.95rem]">{t("terms")}</Link></li>
                <li><Link href="/cookies" className="text-ink-700 hover:text-brand-700 transition-colors text-[0.95rem]">{t("cookies")}</Link></li>
              </ul>
              <div className="flex items-center gap-2 mt-3">
                <a aria-label="Twitter" href="https://twitter.com/bidygo" className="size-9 grid place-items-center rounded-full bg-ink-900/5 text-ink-700 hover:bg-brand-500/10 hover:text-brand-700 transition-colors">
                  <TwitterIcon className="size-4" />
                </a>
                <a aria-label="LinkedIn" href="https://linkedin.com/company/bidygo" className="size-9 grid place-items-center rounded-full bg-ink-900/5 text-ink-700 hover:bg-brand-500/10 hover:text-brand-700 transition-colors">
                  <LinkedinIcon className="size-4" />
                </a>
                <a aria-label="Instagram" href="https://instagram.com/bidygo" className="size-9 grid place-items-center rounded-full bg-ink-900/5 text-ink-700 hover:bg-brand-500/10 hover:text-brand-700 transition-colors">
                  <InstagramIcon className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-ink-600 inline-flex items-center gap-2">
            <Heart className="size-3.5 text-brand-500" />
            <span>Built in Yerevan. With shopkeepers, for shopkeepers.</span>
          </p>
          <p className="text-sm text-ink-500">{t("rights", { year })}</p>
        </div>

        <div className="mt-6 text-[2rem] text-brand-700 leading-none" style={{ fontFamily: "var(--font-signature)" }}>
          — Vahagn Khachatryan
        </div>
      </div>
    </footer>
  );
}
