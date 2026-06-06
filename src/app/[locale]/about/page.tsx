import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, MapPin, Target, Users, Heart, Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { buildMetadata, buildPageGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

interface PrincipleItem {
  title: string;
  body: string;
}
interface MarketItem {
  city: string;
  phase: string;
  note: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const principles = t.raw("principles.items") as PrincipleItem[];
  const markets = t.raw("markets.items") as MarketItem[];

  const graph = await buildPageGraph({ locale: locale as Locale, page: "about" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-20">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10">
          <div className="absolute top-[-15%] right-0 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.16),transparent)] blur-3xl" />
        </div>

        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow"><Heart className="size-3.5" /> {t("eyebrow")}</span>
            <h1 className="display-1 mt-5 text-pretty">{t("headline")}</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty">
              {t("subhead")}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="cream">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="eyebrow"><Target className="size-3.5" /> {t("thesis.eyebrow")}</span>
            <h2 className="display-2 mt-5 text-pretty">{t("thesis.headline")}</h2>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-5 text-lg text-ink-700 leading-relaxed">
            <p>{t("thesis.para1")}</p>
            <p>{t("thesis.para2")}</p>
            <p>{t("thesis.para3")}</p>
          </div>
        </div>
      </Section>

      <Section tone="default">
        <SectionHeader eyebrow={t("principles.eyebrow")} title={t("principles.headline")} />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((p) => (
            <Card key={p.title} className="p-7">
              <div className="size-10 rounded-2xl bg-brand-500/10 text-brand-700 grid place-items-center mb-4">
                <Sparkles className="size-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow"><MapPin className="size-3.5" /> {t("markets.eyebrow")}</span>
            <h2 className="display-2 mt-5 text-pretty">{t("markets.headline")}</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">{t("markets.subhead")}</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {markets.map((m) => (
              <Card key={m.city} className="p-6">
                <div className="text-xs uppercase tracking-wider font-bold text-brand-700">{m.phase}</div>
                <h3 className="text-2xl font-bold tracking-tight mt-1">{m.city}</h3>
                <p className="text-sm text-ink-600 mt-1">{m.note}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="default" id="careers">
        <Container size="narrow" className="text-center">
          <span className="eyebrow"><Users className="size-3.5" /> {t("careers.eyebrow")}</span>
          <h2 className="display-2 mt-5 text-pretty">{t("careers.headline")}</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">{t("careers.subhead")}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:careers@bidygo.com">
              <Button size="xl">{t("careers.applyCta")} <ArrowRight /></Button>
            </a>
            <Link href="/contact">
              <Button size="xl" variant="outline">{t("careers.otherCta")}</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <section id="press" className="bg-cocoa-700 text-cream-50 py-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h3 className="text-3xl font-bold tracking-tight">{t("press.headline")}</h3>
              <p className="mt-3 text-cream-100/75 leading-relaxed max-w-xl">
                {t.rich("press.body", {
                  email: (chunks) => (
                    <a href="mailto:press@bidygo.com" className="text-white underline-offset-2 underline">
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <a href="mailto:press@bidygo.com">
                <Button size="lg" variant="white">{t("press.cta")}</Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
