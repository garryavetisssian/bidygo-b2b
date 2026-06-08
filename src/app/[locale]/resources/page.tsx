import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock, Compass, DoorOpen, TrendingDown, RotateCcw, Tag } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { getArticles } from "@/data/articles";
import { LocaleStub } from "@/components/site/locale-stub";
import { buildMetadata, buildPageGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "resources" });
}

// "Learn by problem" → routes each retailer question to the article that answers it.
// Index aligns with resourcesPage.problems[] in the message files.
const PROBLEM_MAP = [
  { slug: "in-store-online-retail-explained", Icon: DoorOpen },
  { slug: "why-discounts-hurt-margin", Icon: TrendingDown },
  { slug: "customer-led-pricing", Icon: RotateCcw },
  { slug: "shopper-led-pricing", Icon: Tag },
] as const;

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articles = getArticles(locale);
  if (articles.length === 0) return <LocaleStub />;

  const t = await getTranslations({ locale, namespace: "resourcesPage" });

  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const featured = bySlug.get("shopper-led-pricing") ?? articles[0];
  const problems = t.raw("problems") as { question: string; answer: string }[];

  // Playbooks index, grouped by category (a real index, not another card grid).
  const categories: string[] = [];
  for (const a of articles) if (!categories.includes(a.category)) categories.push(a.category);

  const graph = await buildPageGraph({ locale: locale as Locale, page: "resources" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      {/* ===================== HERO — Retail Growth Center ===================== */}
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-12">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.12),transparent)] blur-3xl" />
        </div>
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow"><Compass className="size-3.5" /> {t("eyebrow")}</span>
            <h1 className="display-1 mt-5 text-pretty">{t("headline")}</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty">
              {t("subhead")}
            </p>
          </div>
        </Container>
      </section>

      {/* ===================== FEATURED — the cornerstone playbook ===================== */}
      <Section tone="cream" className="pt-8 sm:pt-12">
        <Link href={`/resources/${featured.slug}`} className="block group">
          <Card interactive className="overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className={`lg:col-span-5 min-h-[280px] lg:min-h-[400px] ${featured.hero.bgClass} grid place-items-center text-9xl`}>
                {featured.hero.emoji}
              </div>
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col gap-5 justify-center">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-bold text-brand-700">
                  <span>{t("featured")}</span>
                  <span className="text-ink-300">·</span>
                  <span className="text-ink-500">{featured.category}</span>
                  <span className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-1 text-ink-500">
                    <Clock className="size-3" /> {featured.readMinutes} {t("min")}
                  </span>
                </div>
                <h2 className="display-3 text-pretty">{featured.title}</h2>
                <p className="text-lg text-ink-600 leading-relaxed text-pretty">{featured.description}</p>
                <span className="inline-flex items-center gap-2 text-brand-700 font-semibold mt-2 group-hover:gap-3 transition-all">
                  {t("readEssay")} <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </Card>
        </Link>
      </Section>

      {/* ===================== LEARN BY PROBLEM — route each retailer question to its answer ===================== */}
      <Section tone="default" id="problems">
        <SectionHeader
          eyebrow={t("problemsEyebrow")}
          title={t("problemsTitle")}
          description={t("problemsNote")}
          align="left"
        />
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {PROBLEM_MAP.map(({ slug, Icon }, i) => {
            const a = bySlug.get(slug);
            const p = problems[i];
            if (!a || !p) return null;
            return (
              <Link key={slug} href={`/resources/${slug}`} className="group h-full">
                <Card interactive className="p-7 flex gap-5 h-full">
                  <div className="size-12 shrink-0 rounded-2xl bg-brand-500/12 text-brand-700 grid place-items-center shadow-[inset_0_1px_0_0_oklch(1_0_0/0.6)]">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="text-xl font-bold tracking-tight text-pretty">{p.question}</h3>
                    <p className="text-ink-600 leading-relaxed text-pretty">{p.answer}</p>
                    <span className="inline-flex items-center gap-2 text-brand-700 font-semibold text-sm mt-1 group-hover:gap-3 transition-all">
                      {t("readEssay")}
                      <span className="text-ink-400 font-normal">· {a.readMinutes} {t("min")}</span>
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ===================== RETAIL PLAYBOOKS — complete index, grouped by category ===================== */}
      <Section tone="muted">
        <SectionHeader eyebrow={t("libraryEyebrow")} title={t("libraryTitle")} align="left" />
        <div className="mt-10 flex flex-col gap-8">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-ink-500 mb-3">{cat}</h3>
              <div className="rounded-3xl border border-ink-900/[0.08] bg-white overflow-hidden divide-y divide-ink-900/[0.06]">
                {articles
                  .filter((a) => a.category === cat)
                  .map((a) => (
                    <Link
                      key={a.slug}
                      href={`/resources/${a.slug}`}
                      className="group flex items-center gap-4 sm:gap-5 p-5 sm:p-6 hover:bg-cream-50 transition-colors"
                    >
                      <div className={`size-14 shrink-0 rounded-2xl ${a.hero.bgClass} grid place-items-center text-3xl`}>
                        {a.hero.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider font-bold text-ink-500">
                          <Clock className="size-3" /> {a.readMinutes} {t("min")}
                        </div>
                        <h4 className="text-lg font-bold tracking-tight mt-0.5 text-pretty">{a.title}</h4>
                        <p className="hidden sm:block text-sm text-ink-600 mt-1 line-clamp-1">{a.description}</p>
                      </div>
                      <ArrowRight className="size-5 shrink-0 text-brand-700 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-ink-500">{t("monthly")}</p>
      </Section>

      {/* ===================== CONVERSION CTA — connect the reading to Bidygo's value ===================== */}
      <Section tone="cream">
        <Container size="narrow" className="text-center">
          <h2 className="display-3 text-pretty">{t("questionTitle")}</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed text-pretty">{t("questionBody")}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/for-stores#demo">
              <Button size="xl" className="w-full sm:w-auto">{t("talkInstead")} <ArrowRight /></Button>
            </Link>
            <Link href="/calculator">
              <Button size="xl" variant="outline" className="w-full sm:w-auto">{t("calcCta")}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
