import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getAllComparisonSlugs,
  getComparison,
  getComparisons,
} from "@/data/comparisons";
import { LocaleStub } from "@/components/site/locale-stub";
import { absoluteUrl } from "@/lib/utils";
import {
  localizedHref,
  buildPageGraph,
  buildFaqJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllComparisonSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const comp = getComparison(slug, locale);
  if (!comp) return {};
  const path = `/compare/${comp.slug}`;
  const canonical = absoluteUrl(localizedHref(locale as Locale, path));
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = absoluteUrl(localizedHref(l, path));
  }
  languages["x-default"] = absoluteUrl(localizedHref(routing.defaultLocale, path));
  return {
    title: comp.title,
    description: comp.description,
    alternates: { canonical, languages },
    openGraph: {
      type: "article",
      title: comp.title,
      description: comp.description,
      url: canonical,
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const comp = getComparison(slug, locale);
  if (!comp) {
    const enComp = getComparison(slug, "en");
    if (!enComp) notFound();
    return <LocaleStub />;
  }

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const allComps = getComparisons(locale);
  const related = comp.related
    .map((s) => allComps.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "comparison",
    slug: comp.slug,
    trailOverride: [{ name: tNav("resources"), href: "/resources" }],
    currentName: comp.title,
    extras: [buildFaqJsonLd(comp.faqs, locale as Locale)].filter(
      (e): e is object => Boolean(e)
    ),
  });

  const labels = {
    back: locale === "ru" ? "Все разборы" : locale === "am" ? "Բոլոր համեմատությունները" : "All comparisons",
    bidygoLabel: comp.ourName,
    otherLabel: comp.otherName,
    sideBySide: locale === "ru" ? "Бок о бок" : locale === "am" ? "Կողք կողքի" : "Side by side",
    dimension: locale === "ru" ? "Параметр" : locale === "am" ? "Չափանիշ" : "Dimension",
    verdict: locale === "ru" ? "Вывод" : locale === "am" ? "Եզրակացություն" : "Verdict",
    faq: locale === "ru" ? "Частые вопросы" : locale === "am" ? "Հաճախակի հարցեր" : "Common questions",
    relatedHeading: locale === "ru" ? "Связанные разборы" : locale === "am" ? "Հարակից համեմատություններ" : "Related comparisons",
    ctaTitle:
      locale === "ru"
        ? "Хотите попробовать у себя?"
        : locale === "am"
        ? "Ուզում ե՞ս փորձել քեզ մոտ"
        : "Want to try this in your shop?",
    ctaBody:
      locale === "ru"
        ? "Двадцать минут с командой Bidygo. Покажем, как настроить нижний и верхний пределы под вашу категорию и сколько вы потенциально вернёте."
        : locale === "am"
        ? "Քսան րոպե Bidygo-ի թիմի հետ։ Ցույց կտանք, թե ինչպես կարգավորել ստորին և վերին սահմաններ քո կատեգորիայի համար ու որքան կարող ես վերադարձնել։"
        : "Twenty minutes with the Bidygo team. We'll walk through how to set floors and ceilings for your category, and what you'd recover.",
    ctaButton: locale === "ru" ? "Поговорить с командой" : locale === "am" ? "Խոսել թիմի հետ" : "Talk to the team",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 pb-10">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.12),transparent)] blur-3xl" />
        </div>
        <Container>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-ink-900 mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" /> {labels.back}
          </Link>
          <div className="max-w-3xl">
            <span className="eyebrow">{comp.hero.eyebrow}</span>
            <h1 className="display-1 mt-5 text-pretty">{comp.hero.headline}</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-700 leading-relaxed text-pretty">
              {comp.hero.subhead}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="default" className="pt-6 sm:pt-10">
        <Container size="narrow">
          <article className="flex flex-col gap-6">
            {comp.intro.map((p, i) => (
              <p key={i} className="text-lg text-ink-700 leading-[1.75] text-pretty">
                {p}
              </p>
            ))}
          </article>
        </Container>
      </Section>

      <Section tone="cream" className="pt-10">
        <Container>
          <h2 className="text-xs uppercase tracking-[0.14em] font-bold text-brand-700 mb-6 text-center">
            {labels.sideBySide}
          </h2>
          <div className="grid lg:grid-cols-2 gap-5">
            <Card elevated className="p-7 sm:p-8 border-brand-500/25 bg-gradient-to-br from-white via-brand-50 to-brand-100/40">
              <div className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-brand-700">
                {comp.ourName}
              </div>
              <p className="mt-2 text-xl font-bold text-ink-900 tracking-tight">{comp.ourSide.tagline}</p>
              <ul className="mt-6 space-y-5">
                {comp.ourSide.points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <Check className="size-5 text-brand-600 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-ink-900">{p.title}</div>
                      <p className="mt-1 text-ink-700 leading-relaxed text-sm">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-7 sm:p-8 bg-cream-100">
              <div className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-ink-500">
                {comp.otherName}
              </div>
              <p className="mt-2 text-xl font-bold text-ink-900 tracking-tight">{comp.otherSide.tagline}</p>
              <ul className="mt-6 space-y-5">
                {comp.otherSide.points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <X className="size-5 text-ink-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-ink-900">{p.title}</div>
                      <p className="mt-1 text-ink-700 leading-relaxed text-sm">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="default" className="pt-12">
        <Container>
          <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
            <table className="w-full text-left">
              <thead className="bg-cream-100">
                <tr>
                  <th className="p-4 text-xs uppercase tracking-wider font-bold text-ink-700">{labels.dimension}</th>
                  <th className="p-4 text-xs uppercase tracking-wider font-bold text-brand-700">{labels.bidygoLabel}</th>
                  <th className="p-4 text-xs uppercase tracking-wider font-bold text-ink-600">{labels.otherLabel}</th>
                </tr>
              </thead>
              <tbody>
                {comp.rows.map((row, i) => (
                  <tr key={i} className={cn("border-t border-ink-900/8", i % 2 === 0 ? "bg-white" : "bg-cream-50")}>
                    <td className="p-4 text-ink-800 font-medium">{row.dimension}</td>
                    <td className={cn("p-4", row.bidygoWins ? "text-brand-700 font-semibold" : "text-ink-700")}>{row.bidygo}</td>
                    <td className={cn("p-4", !row.bidygoWins ? "text-ink-900 font-semibold" : "text-ink-600")}>{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section tone="cocoa" className="pt-12">
        <Container size="narrow">
          <span className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-brand-300">
            {labels.verdict}
          </span>
          <h2 className="display-2 mt-4 text-pretty text-white">{comp.verdict.headline}</h2>
          <div className="mt-6 flex flex-col gap-5 text-lg text-cream-100/85 leading-relaxed">
            {comp.verdict.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="default" className="pt-12">
        <Container size="narrow">
          <h2 className="text-xs uppercase tracking-[0.14em] font-bold text-brand-700 mb-6">{labels.faq}</h2>
          <div className="flex flex-col gap-3">
            {comp.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-cream-100 p-5 sm:p-6 border border-ink-900/5">
                <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="size-7 rounded-full bg-white grid place-items-center text-ink-700 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-ink-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream" className="pt-14 pb-20">
        <Container size="narrow" className="text-center">
          <h2 className="display-3 text-pretty">{labels.ctaTitle}</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">{labels.ctaBody}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/for-stores#demo">
              <Button size="xl">
                {labels.ctaButton} <ArrowRight />
              </Button>
            </Link>
            <Link href="/calculator">
              <Button size="xl" variant="outline">
                {locale === "ru" ? "Ваши цифры" : locale === "am" ? "Քո թվերը" : "See your numbers"}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="default" className="pb-20">
          <Container>
            <h2 className="text-xs uppercase tracking-[0.14em] font-bold text-brand-700 mb-5">
              {labels.relatedHeading}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/compare/${rel.slug}`} className="group">
                  <Card interactive className="p-6 h-full">
                    <h3 className="font-bold text-lg tracking-tight">{rel.title}</h3>
                    <p className="mt-2 text-ink-600 leading-relaxed text-sm">{rel.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
