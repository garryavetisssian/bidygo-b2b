import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "am", "ru"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, { native: string; english: string; short: string }> = {
  en: { native: "English", english: "English", short: "EN" },
  am: { native: "Հայերեն", english: "Armenian", short: "ՀԱ" },
  ru: { native: "Русский", english: "Russian", short: "РУ" },
};
