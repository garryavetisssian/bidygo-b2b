import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { getAllIndustrySlugs, getIndustries, getIndustry } from "@/data/industries";
import { LocaleStub } from "@/components/site/locale-stub";
import {
  buildMetadata,
  buildPageGraph,
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllIndustrySlugs().map((slug) => ({ locale, industry: slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}): Promise<Metadata> {
  const { locale, industry: slug } = await params;
  const industry = getIndustry(slug, locale);
  if (!industry) return {};
  return buildMetadata({
    locale: locale as Locale,
    page: "industry",
    slug: industry.slug,
    extra: {
      title: `${industry.name} — Bidygo`,
      description: industry.hero.subhead,
      openGraph: {
        type: "website",
        title: `${industry.name} — Bidygo`,
        description: industry.hero.subhead,
      },
    },
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry: slug } = await params;
  setRequestLocale(locale);

  const industry = getIndustry(slug, locale);
  if (!industry) {
    const enIndustry = getIndustry(slug, "en");
    if (!enIndustry) notFound();
    return <LocaleStub />;
  }

  const t = await getTranslations({ locale, namespace: "solutionsPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const others = getIndustries(locale).filter((i) => i.slug !== slug).slice(0, 4);
  const category = industry.shortName.toLowerCase();

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "industry",
    slug: industry.slug,
    trailOverride: [{ name: tNav("forStores"), href: "/for-stores" }],
    currentName: industry.name,
    extras: [
      buildServiceJsonLd(locale as Locale, {
        name: `Bidygo for ${industry.name}`,
        description: industry.hero.subhead,
        slug: industry.slug,
      }),
      buildFaqJsonLd(industry.faqs, locale as Locale),
    ].filter((e): e is object => Boolean(e)),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <section className={`relative overflow-hidden pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 ${industry.bgClass}`}>
        <div aria-hidden className="absolute inset-x-0 top-0 -z-0">
          <div className="absolute inset-0 bg-grid-warm opacity-30" />
        </div>

        <Container className="relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 max-w-2xl flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 rounded-pill bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-ink-700 w-fit shadow-sm">
                <span className="text-xl">{industry.emoji}</span>
                {industry.hero.eyebrow}
              </span>
              <h1 className="display-1 text-pretty">{industry.hero.headline}</h1>
              <p className="text-lg sm:text-xl text-ink-700 leading-relaxed text-pretty">{industry.hero.subhead}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link href="/for-stores#demo">
                  <Button size="xl" className="w-full sm:w-auto">
                    {t("bookDemoFor", { category })} <ArrowRight />
                  </Button>
                </Link>
                <Link href="/for-stores">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto bg-white/60 backdrop-blur">
                    {t("allRetailerInfo")}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-square max-w-md mx-auto rounded-[3rem] bg-white/90 backdrop-blur shadow-xl grid place-items-center text-[14rem] leading-none">
                {industry.emoji}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="cream">
        <SectionHeader
          eyebrow={t("frictionEyebrow")}
          title={t("frictionTitle", { category })}
        />
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {industry.pains.map((p) => (
            <Card key={p.title} className="p-7 flex flex-col gap-3">
              <AlertTriangle className="size-6 text-[oklch(0.65_0.20_30)]" />
              <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
              <p className="text-ink-600 leading-relaxed">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="default">
        <SectionHeader eyebrow={t("whyFailsEyebrow")} title={t("whyFailsTitle")} />
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {industry.whyFails.map((p) => (
            <Card key={p.title} className="p-7 flex flex-col gap-3">
              <span className="size-9 rounded-pill bg-ink-200 grid place-items-center font-bold text-ink-700">×</span>
              <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
              <p className="text-ink-600 leading-relaxed">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader eyebrow={t("howFitsEyebrow")} title={t("howFitsTitle")} />
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {industry.howHelps.map((p) => (
            <Card key={p.title} className="p-7 flex flex-col gap-3 border-brand-500/15">
              <CheckCircle2 className="size-6 text-brand-600" />
              <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
              <p className="text-ink-600 leading-relaxed">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="cocoa">
        <SectionHeader
          eyebrow={t("outcomesEyebrow")}
          title={t("outcomesTitle", { category })}
          description={t("outcomesNote")}
        />
        <div className="mt-16 grid sm:grid-cols-3 gap-5">
          {industry.outcomes.map((o) => (
            <div key={o.label} className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center">
              <div className="font-display text-6xl font-bold tracking-tighter text-white">{o.metric}</div>
              <p className="mt-3 text-sm text-cream-100/75 uppercase tracking-wider font-semibold">{o.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="default">
        <SectionHeader eyebrow={t("faqEyebrow")} title={t("faqTitle", { category: industry.shortName })} />
        <div className="mt-16 grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {industry.faqs.map((f) => (
            <Card key={f.q} className="p-7">
              <h3 className="font-bold text-lg tracking-tight">{f.q}</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <Container size="narrow" className="text-center">
          <span className="eyebrow"><Sparkles className="size-3.5" /> {t("readyEyebrow")}</span>
          <h2 className="display-2 mt-5 text-pretty">
            {t("readyTitle", { category })}
          </h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            {t("readyBody")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/for-stores#demo">
              <Button size="xl">{t("bookDemo")} <ArrowRight /></Button>
            </Link>
            <Link href="/resources">
              <Button size="xl" variant="outline">{t("readPlaybook")}</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section tone="default">
        <SectionHeader eyebrow={t("otherEyebrow")} title={t("otherTitle")} />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((o) => (
            <Link key={o.slug} href={`/solutions/${o.slug}`} className="group">
              <Card interactive className={`overflow-hidden h-full ${o.bgClass}`}>
                <div className="p-6 flex flex-col gap-3 min-h-[180px] bg-white/85 backdrop-blur h-full">
                  <span className="text-3xl">{o.emoji}</span>
                  <h3 className="font-bold text-lg tracking-tight">{o.name}</h3>
                  <p className="text-ink-600 text-sm leading-relaxed flex-1">{o.tagline}</p>
                  <span className="text-brand-700 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("seeMore")} <ArrowRight className="size-4" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

    </>
  );
}
