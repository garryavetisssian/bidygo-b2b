import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

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

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articles = getArticles(locale);
  if (articles.length === 0) return <LocaleStub />;
  const [featured, ...rest] = articles;

  const t = await getTranslations({ locale, namespace: "resourcesPage" });

  const graph = await buildPageGraph({ locale: locale as Locale, page: "resources" });

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
            <span className="eyebrow"><BookOpen className="size-3.5" /> {t("eyebrow")}</span>
            <h1 className="display-1 mt-5 text-pretty">{t("headline")}</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty">
              {t("subhead")}
            </p>
          </div>
        </Container>
      </section>

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

      <Section tone="default">
        <SectionHeader eyebrow={t("libraryEyebrow")} title={t("libraryTitle")} align="left" />

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {rest.map((a) => (
            <Link key={a.slug} href={`/resources/${a.slug}`} className="group">
              <Card interactive className="overflow-hidden h-full flex flex-col">
                <div className={`h-44 ${a.hero.bgClass} grid place-items-center text-6xl`}>{a.hero.emoji}</div>
                <div className="p-7 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-bold text-brand-700">
                    <span>{a.category}</span>
                    <span className="text-ink-300">·</span>
                    <span className="inline-flex items-center gap-1 text-ink-500">
                      <Clock className="size-3" /> {a.readMinutes} {t("min")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-pretty">{a.title}</h3>
                  <p className="text-ink-600 leading-relaxed flex-1">{a.description}</p>
                  <span className="inline-flex items-center gap-2 text-brand-700 font-semibold mt-2 group-hover:gap-3 transition-all">
                    {t("readMore")} <ArrowRight className="size-4" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-ink-500">{t("monthly")}</p>
      </Section>

      <Section tone="cream">
        <Container size="narrow" className="text-center">
          <h2 className="display-3 text-pretty">{t("questionTitle")}</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            {t.rich("questionBody", {
              email: (chunks) => (
                <a href="mailto:hello@bidygo.com" className="text-brand-700 font-semibold">
                  {chunks}
                </a>
              ),
            })}
          </p>
          <div className="mt-8">
            <Link href="/for-stores#demo">
              <Button size="xl">{t("talkInstead")} <ArrowRight /></Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
