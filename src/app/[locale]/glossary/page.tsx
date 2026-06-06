import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BookOpen } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Section, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { getGlossaryTerms, type GlossaryCluster } from "@/data/glossary";
import { LocaleStub } from "@/components/site/locale-stub";
import {
  buildMetadata,
  buildPageGraph,
  buildDefinedTermSetJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

const CLUSTER_LABELS: Record<GlossaryCluster, Record<Locale, string>> = {
  pricing: { en: "Pricing", ru: "Ценообразование", am: "Գնագոյացում" },
  metrics: { en: "Metrics", ru: "Метрики", am: "Չափիչներ" },
  "shopper-behavior": { en: "Shopper behavior", ru: "Поведение покупателей", am: "Գնորդի վարքագիծ" },
  operations: { en: "Operations", ru: "Операции", am: "Գործառնություններ" },
};

const CLUSTER_ORDER: GlossaryCluster[] = ["pricing", "metrics", "shopper-behavior", "operations"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "glossary" });
}

export default async function GlossaryHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const terms = getGlossaryTerms(locale);
  if (terms.length === 0) return <LocaleStub />;

  const t = await getTranslations({ locale, namespace: "meta.glossary" });

  const grouped: Record<GlossaryCluster, typeof terms> = {
    pricing: [],
    metrics: [],
    "shopper-behavior": [],
    operations: [],
  };
  for (const term of terms) grouped[term.cluster].push(term);

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "glossary",
    extras: [
      buildDefinedTermSetJsonLd(
        locale as Locale,
        terms.map((tm) => ({ slug: tm.slug, term: tm.term }))
      ),
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-12">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.12),transparent)] blur-3xl" />
        </div>
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">
              <BookOpen className="size-3.5" /> {t("title").split(" — ")[0]}
            </span>
            <h1 className="display-1 mt-5 text-pretty">{t("title").split(" — ")[1] ?? t("title")}</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty">
              {t("description")}
            </p>
            <p className="mt-4 text-sm text-ink-500">
              {terms.length} {locale === "ru" ? "терминов" : locale === "am" ? "տերմին" : "terms"}
            </p>
          </div>
        </Container>
      </section>

      {CLUSTER_ORDER.map((cluster) => {
        const items = grouped[cluster];
        if (items.length === 0) return null;
        return (
          <Section key={cluster} tone="default" className="pt-10 pb-10">
            <Container>
              <h2 className="text-xs uppercase tracking-[0.14em] font-bold text-brand-700 mb-6">
                {CLUSTER_LABELS[cluster][locale as Locale] ?? CLUSTER_LABELS[cluster].en}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((term) => (
                  <Link key={term.slug} href={`/glossary/${term.slug}`} className="group">
                    <Card interactive className="p-6 h-full flex flex-col gap-3">
                      <h3 className="text-lg font-bold tracking-tight text-ink-900">{term.term}</h3>
                      <p className="text-ink-600 leading-relaxed text-sm flex-1">
                        {term.shortDefinition}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-brand-700 font-semibold text-sm group-hover:gap-2 transition-all">
                        {locale === "ru" ? "Открыть" : locale === "am" ? "Բացել" : "Read"}{" "}
                        <ArrowRight className="size-4" />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section tone="cream" className="pt-14 pb-20">
        <Container size="narrow" className="text-center">
          <h2 className="display-3 text-pretty">
            {locale === "ru"
              ? "Готовы попробовать у себя?"
              : locale === "am"
              ? "Պատրա՞ստ ես փորձել քեզ մոտ։"
              : "Ready to try this in your shop?"}
          </h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            {locale === "ru"
              ? "Разговор с командой Bidygo — 20 минут. Покажем, как настроить нижний предел, верхний предел и встречные цены под вашу категорию."
              : locale === "am"
              ? "Bidygo-ի թիմի հետ զրույց՝ 20 րոպե։ Ցույց կտանք՝ ինչպես կարգավորել ստորին սահման, վերին սահման ու հակառակ առաջարկներ քո կատեգորիայի համար։"
              : "20 minutes with the Bidygo team. We'll walk through how to set floors, ceilings, and counters for your category."}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/for-stores#demo">
              <Button size="xl">
                {locale === "ru"
                  ? "Поговорить с командой"
                  : locale === "am"
                  ? "Խոսել թիմի հետ"
                  : "Talk to the team"}{" "}
                <ArrowRight />
              </Button>
            </Link>
            <Link href="/calculator">
              <Button size="xl" variant="outline">
                {locale === "ru"
                  ? "Ваши цифры"
                  : locale === "am"
                  ? "Քո թվերը"
                  : "See your numbers"}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
