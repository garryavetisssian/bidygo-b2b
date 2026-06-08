import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Clock, CheckCircle2 } from "lucide-react";

import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { getAllArticleSlugs, getArticle } from "@/data/articles";
import { iconForEmoji } from "@/lib/visual-icons";
import { LocaleStub } from "@/components/site/locale-stub";
import { absoluteUrl } from "@/lib/utils";
import { localizedHref, buildPageGraph, buildArticleJsonLd, buildFaqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllArticleSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug, locale);
  if (!article) return {};
  const path = `/resources/${article.slug}`;
  const canonical = absoluteUrl(localizedHref(locale as Locale, path));
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = absoluteUrl(localizedHref(l, path));
  }
  languages["x-default"] = absoluteUrl(localizedHref(routing.defaultLocale, path));
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical, languages },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: canonical,
      publishedTime: article.publishedISO,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticle(slug, locale);
  if (!article) {
    const enArticle = getArticle(slug, "en");
    if (!enArticle) notFound();
    return <LocaleStub />;
  }

  const t = await getTranslations({ locale, namespace: "articlePage" });

  const related = article.related
    .map((s) => getArticle(s, locale))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const dateLocale = locale === "en" ? "en-US" : locale === "ru" ? "ru-RU" : "hy-AM";
  const date = new Date(article.publishedISO).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "resourceArticle",
    slug: article.slug,
    trailOverride: [{ name: tNav("resources"), href: "/resources" }],
    currentName: article.title,
    extras: [
      buildArticleJsonLd(article, locale as Locale),
      buildFaqJsonLd(article.faqs, locale as Locale),
    ].filter((e): e is object => Boolean(e)),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <section className={`relative overflow-hidden pt-12 sm:pt-20 pb-12 ${article.hero.bgClass}`}>
        <Container className="relative">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-ink-900 mb-8 transition-colors">
            <ArrowLeft className="size-4" /> {t("back")}
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-bold text-ink-700 mb-5">
              <span>{article.category}</span>
              <span className="text-ink-400">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" /> {t("minRead", { minutes: article.readMinutes })}
              </span>
              <span className="text-ink-400">·</span>
              <time dateTime={article.publishedISO}>{date}</time>
            </div>
            <h1 className="display-1 text-pretty">{article.title}</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-700 leading-relaxed text-pretty">{article.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="size-10 rounded-full bg-white shadow-sm grid place-items-center text-sm font-bold text-brand-700">B</div>
              <div className="text-sm">
                <div className="font-semibold text-ink-900">{article.author}</div>
                <div className="text-ink-600">Yerevan</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-25 text-cocoa-700">
            {(() => {
              const Icon = iconForEmoji(article.hero.emoji);
              return <Icon className="size-72" strokeWidth={1} aria-hidden />;
            })()}
          </div>
        </Container>
      </section>

      <Section tone="default" className="pt-12 sm:pt-16">
        <Container size="narrow">
          <Card className="bg-brand-500/8 border-brand-500/15 p-7 sm:p-8 mb-12">
            <div className="text-xs uppercase tracking-[0.12em] font-bold text-brand-700 mb-4">{t("tldr")}</div>
            <ul className="space-y-3">
              {article.tldr.map((line, i) => (
                <li key={i} className="flex gap-3 text-ink-800 leading-relaxed">
                  <CheckCircle2 className="size-5 text-brand-600 shrink-0 mt-1" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>

          <article className="flex flex-col gap-12">
            {article.sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-5">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-pretty font-display">{section.heading}</h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-lg text-ink-700 leading-[1.75] text-pretty">{p}</p>
                ))}
                {section.callout && (
                  <div className="my-2 rounded-3xl border-l-4 border-brand-500 bg-cream-100 p-6 sm:p-7">
                    <h4 className="font-bold text-lg tracking-tight">{section.callout.title}</h4>
                    <p className="mt-2 text-ink-700 leading-relaxed">{section.callout.body}</p>
                  </div>
                )}
              </div>
            ))}
          </article>

          <div className="mt-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">{t("questionsTitle")}</h2>
            <div className="mt-8 flex flex-col gap-3">
              {article.faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl bg-cream-100 p-5 sm:p-6 border border-ink-900/5">
                  <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{f.q}</span>
                    <span className="size-7 rounded-full bg-white grid place-items-center text-ink-700 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-ink-700 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-20 rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-600 p-10 sm:p-12 text-white text-center">
            <h3 className="display-3 text-pretty">{t("ctaTitle")}</h3>
            <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">{t("ctaBody")}</p>
            <div className="mt-7">
              <Link href="/for-stores#demo">
                <Button size="xl" variant="white">{t("ctaButton")} <ArrowRight /></Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="cream">
          <h2 className="text-3xl font-bold tracking-tight font-display mb-10">{t("relatedTitle")}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {related.map((a) => (
              <Link key={a.slug} href={`/resources/${a.slug}`} className="group">
                <Card interactive className="overflow-hidden h-full flex flex-col">
                  <div className={`h-32 ${a.hero.bgClass} grid place-items-center text-cocoa-700`}>
                    {(() => {
                      const Icon = iconForEmoji(a.hero.emoji);
                      return <Icon className="size-12" strokeWidth={1.5} aria-hidden />;
                    })()}
                  </div>
                  <div className="p-6 flex flex-col gap-2 flex-1">
                    <div className="text-xs uppercase tracking-wider font-bold text-brand-700">{a.category}</div>
                    <h3 className="text-xl font-bold tracking-tight">{a.title}</h3>
                    <p className="text-ink-600 leading-relaxed text-sm flex-1">{a.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-brand-700 font-semibold text-sm mt-2 group-hover:gap-2 transition-all">
                      {t("read")} <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

    </>
  );
}
