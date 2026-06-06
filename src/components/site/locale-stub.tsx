import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, Container } from "@/components/ui/primitives";
import { ChatLauncher } from "./chat-launcher";

/**
 * Rendered on pages that haven't been translated for the active locale yet.
 * Satisfies the locked rule against mixed-language pages.
 * Disappears automatically as messages/{locale}.json and src/data/* fill in
 * and the page is added to localesWithContent in src/lib/seo.ts.
 */
export function LocaleStub() {
  const t = useTranslations("localeStub");
  const locale = useLocale();

  return (
    <Section tone="cream" className="pt-20 sm:pt-32 pb-24 min-h-[60vh] flex items-center">
      <Container size="narrow" className="text-center">
        <div className="size-16 rounded-full bg-brand-500/12 grid place-items-center mx-auto mb-6">
          <Heart className="size-7 text-brand-600" />
        </div>
        <h1 className="display-2 text-pretty">{t("title")}</h1>
        <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-xl mx-auto text-pretty">
          {t("body")}
        </p>
        <p className="mt-3 text-base text-ink-500 max-w-xl mx-auto">
          {t("subbody")}
        </p>

        <div className="mt-10 max-w-md mx-auto">
          <ChatLauncher locale={locale} variant="block" />
        </div>

        <Link
          href="/"
          locale="en"
          className="inline-flex items-center gap-2 mt-10 text-brand-700 font-semibold hover:gap-3 transition-all"
        >
          {t("readInEnglish")} <ArrowRight className="size-4" />
        </Link>

        <div
          aria-hidden
          className="mt-12 text-[1.5rem] text-brand-700 leading-none opacity-70"
          style={{ fontFamily: "var(--font-signature)" }}
        >
          — Vahagn Khachatryan
        </div>
      </Container>
    </Section>
  );
}
