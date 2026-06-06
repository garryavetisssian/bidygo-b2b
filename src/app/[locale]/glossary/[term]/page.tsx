import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import {
  getAllGlossaryTermSlugs,
  getGlossaryTerm,
  getGlossaryTerms,
} from "@/data/glossary";
import { LocaleStub } from "@/components/site/locale-stub";
import { absoluteUrl } from "@/lib/utils";
import {
  localizedHref,
  buildPageGraph,
  buildDefinedTermJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllGlossaryTermSlugs().map((term) => ({ locale, term }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; term: string }>;
}): Promise<Metadata> {
  const { locale, term: slug } = await params;
  const term = getGlossaryTerm(slug, locale);
  if (!term) return {};
  const path = `/glossary/${term.slug}`;
  const canonical = absoluteUrl(localizedHref(locale as Locale, path));
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = absoluteUrl(localizedHref(l, path));
  }
  languages["x-default"] = absoluteUrl(localizedHref(routing.defaultLocale, path));
  return {
    title: `${term.term} — Bidygo glossary`,
    description: term.shortDefinition,
    alternates: { canonical, languages },
    openGraph: {
      type: "article",
      title: `${term.term} — Bidygo glossary`,
      description: term.shortDefinition,
      url: canonical,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ locale: string; term: string }>;
}) {
  const { locale, term: slug } = await params;
  setRequestLocale(locale);

  const term = getGlossaryTerm(slug, locale);
  if (!term) {
    const enTerm = getGlossaryTerm(slug, "en");
    if (!enTerm) notFound();
    return <LocaleStub />;
  }

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const allTerms = getGlossaryTerms(locale);
  const related = term.relatedTerms
    .map((s) => allTerms.find((tm) => tm.slug === s))
    .filter((tm): tm is NonNullable<typeof tm> => Boolean(tm));

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "glossaryTerm",
    slug: term.slug,
    trailOverride: [{ name: tNav("glossary"), href: "/glossary" }],
    currentName: term.term,
    extras: [
      buildDefinedTermJsonLd(locale as Locale, {
        slug: term.slug,
        term: term.term,
        shortDefinition: term.shortDefinition,
      }),
    ],
  });

  const labels = {
    back: locale === "ru" ? "Все термины" : locale === "am" ? "Բոլոր տերմինները" : "All terms",
    example: locale === "ru" ? "Пример" : locale === "am" ? "Օրինակ" : "Example",
    related: locale === "ru" ? "Связанные термины" : locale === "am" ? "Հարակից տերմիններ" : "Related terms",
    learnMore:
      locale === "ru"
        ? "Узнать, как Bidygo это применяет"
        : locale === "am"
        ? "Իմացիր, թե ինչպես է Bidygo-ն կիրառում"
        : "See how Bidygo applies this",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 pb-10">
        <Container>
          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-ink-900 mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" /> {labels.back}
          </Link>
          <div className="max-w-3xl">
            <h1 className="display-1 text-pretty">{term.term}</h1>
            <p className="mt-6 text-xl sm:text-2xl text-ink-700 leading-relaxed text-pretty font-medium">
              {term.shortDefinition}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="default" className="pt-4 sm:pt-8">
        <Container size="narrow">
          <article className="flex flex-col gap-6">
            {term.body.map((p, i) => (
              <p key={i} className="text-lg text-ink-700 leading-[1.75] text-pretty">
                {p}
              </p>
            ))}
          </article>

          {term.example && (
            <Card className="mt-12 bg-brand-500/8 border-brand-500/15 p-7 sm:p-8">
              <div className="text-xs uppercase tracking-[0.12em] font-bold text-brand-700 mb-3">
                {labels.example} · {term.example.context}
              </div>
              <p className="text-ink-800 leading-relaxed text-lg">{term.example.text}</p>
            </Card>
          )}

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xs uppercase tracking-[0.14em] font-bold text-brand-700 mb-5">
                {labels.related}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/glossary/${rel.slug}`} className="group">
                    <Card interactive className="p-5 h-full flex flex-col gap-2">
                      <h3 className="font-bold tracking-tight text-ink-900">{rel.term}</h3>
                      <p className="text-ink-600 text-sm leading-relaxed">{rel.shortDefinition}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-600 p-10 text-white">
            <h3 className="display-3 text-pretty">{labels.learnMore}</h3>
            <div className="mt-7">
              <Link href="/for-stores#demo">
                <Button size="xl" variant="white">
                  {locale === "ru"
                    ? "Поговорить с командой"
                    : locale === "am"
                    ? "Խոսել թիմի հետ"
                    : "Talk to the team"}{" "}
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
