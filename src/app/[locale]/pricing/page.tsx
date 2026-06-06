import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CircleDollarSign, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getPricingTiers } from "@/data/pricing";
import { LocaleStub } from "@/components/site/locale-stub";
import { buildMetadata, buildPageGraph, buildSoftwareApplicationJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "pricing" });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tiers = getPricingTiers(locale);
  if (tiers.length === 0) return <LocaleStub />;

  const t = await getTranslations({ locale, namespace: "pricingPage" });

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "pricing",
    extras: [
      buildSoftwareApplicationJsonLd(locale as Locale, {
        detailedOffers: tiers.map((tier) => ({ name: tier.name, description: tier.summary })),
      }),
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
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 size-[50vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.14),transparent)] blur-3xl animate-glow-soft" />
        </div>
        <Container>
          <div className="max-w-3xl flex flex-col gap-7">
            <span className="eyebrow animate-fade-blur">
              <CircleDollarSign className="size-3.5" /> {t("eyebrow")}
            </span>
            <h1 className="display-1 text-pretty animate-rise-slow [animation-delay:80ms]">
              {t("headline")}
            </h1>
            <p className="text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty animate-rise-slow [animation-delay:200ms]">
              {t("subhead")}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="cream" className="pt-8 sm:pt-12">
        <ScrollReveal
          className="grid lg:grid-cols-3 gap-5"
          staggerChildren={100}
        >
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              interactive
              elevated={tier.accent}
              className={`relative p-7 flex flex-col gap-5 h-full min-h-full ${tier.accent ? "border-brand-500/30 shadow-warm-glow ring-1 ring-brand-500/20" : ""}`}
            >
              {tier.accent && (
                <span className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-bold tracking-tight bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[0_4px_14px_-4px_oklch(0.700_0.196_42/0.55)]">
                  ★ Recommended
                </span>
              )}
              <div>
                <h3 className="text-2xl font-bold tracking-tight">{tier.name}</h3>
                <p className="mt-1 text-brand-700 font-semibold">{tier.summary}</p>
              </div>
              <p className="text-ink-600 leading-relaxed">{tier.body}</p>
              <ul className="flex flex-col gap-2.5 text-ink-700 mt-2 flex-1">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 leading-relaxed">
                    <Check className="size-5 text-brand-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link href={tier.href}>
                <Button size="lg" variant={tier.accent ? "primary" : "outline"} className="w-full">
                  {tier.cta} <ArrowRight />
                </Button>
              </Link>
            </Card>
          ))}
        </ScrollReveal>
        <p className="text-center text-ink-500 mt-10 italic">
          {t("placeholderNote")}
        </p>
      </Section>

      <Section tone="default">
        <Container size="narrow" className="text-center">
          <h2 className="display-3 text-pretty">{t("notSureTitle")}</h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            {t("notSureBody")}
          </p>
          <div className="mt-7 flex justify-center">
            <Link href="/contact">
              <Button size="xl">{t("messageUs")} <ArrowRight /></Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
