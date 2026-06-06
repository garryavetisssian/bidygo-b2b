/**
 * Bidygo direct-contact channels.
 * WhatsApp + Telegram are first-class CTAs, not footer afterthoughts.
 * Order is fixed across all locales: Telegram first, WhatsApp second.
 */

// Canonical env-var name for the WhatsApp business number. Imported wherever
// the number is needed (footer, header, founder page) so there is one source
// of truth. Public (NEXT_PUBLIC_) because the value is referenced from both
// server and client components and is a public contact channel, not a secret.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+37411223344";

export const TELEGRAM_USERNAME =
  process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "bidygo";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`;
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;

export type ChatChannel = "whatsapp" | "telegram";

export function chatChannelOrder(_locale?: string): ChatChannel[] {
  return ["telegram", "whatsapp"];
}

export function channelUrl(channel: ChatChannel): string {
  return channel === "whatsapp" ? WHATSAPP_URL : TELEGRAM_URL;
}

export function channelLabel(channel: ChatChannel): string {
  return channel === "whatsapp" ? "WhatsApp" : "Telegram";
}
