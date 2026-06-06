import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, buildPageGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { ArrowRight, Heart, Tag, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "whyBidygo" });
}

type Point = { title: string; body: string };

export default async function WhyBidygoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "whyBidygoPage" });
  const truthPoints = t.raw("truthPoints") as Point[];
  const bidygoSteps = t.raw("bidygoSteps") as Point[];
  const notDiscountPoints = t.raw("notDiscountPoints") as Point[];
  const storesGainPoints = t.raw("storesGainPoints") as Point[];

  const graph = await buildPageGraph({ locale: locale as Locale, page: "whyBidygo" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {/* ===================== HERO — category, not pricing layer ===================== */}
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-16">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10">
          <div className="absolute top-[-15%] right-0 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.16),transparent)] blur-3xl animate-glow-soft" />
          <div className="absolute inset-0 bg-grid-warm opacity-40 [mask-image:radial-gradient(60%_50%_at_30%_30%,#000,transparent)]" />
        </div>
        <Container>
          <div className="max-w-3xl flex flex-col gap-7">
            <span className="eyebrow animate-fade-blur">
              <Heart className="size-3.5" /> {t("eyebrow")}
            </span>
            <h1 className="display-1 text-pretty animate-rise-slow [animation-delay:80ms]">{t("headline")}</h1>
            <p className="text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty animate-rise-slow [animation-delay:220ms]">
              {t("subhead")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2 animate-rise-slow [animation-delay:340ms]">
              <Link href="/contact">
                <Button size="xl">
                  {t("primaryCta")} <ArrowRight />
                </Button>
              </Link>
              <Link href="/for-stores">
                <Button size="xl" variant="outline">
                  {t("secondaryCta")}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== WHY LOST DEMAND IS INVISIBLE — the walk-out moment ===================== */}
      <Section tone="cream">
        <Container size="narrow">
          <span className="eyebrow">
            <Sparkles className="size-3.5" /> {t("momentEyebrow")}
          </span>
          <h2 className="display-2 mt-5 text-pretty">{t("momentTitle")}</h2>
          <div className="mt-8 flex flex-col gap-5 text-lg text-ink-700 leading-relaxed">
            <p>{t("momentBody1")}</p>
            <p>{t("momentBody2")}</p>
            <p>{t("momentBody3")}</p>
          </div>
        </Container>
      </Section>

      {/* ===================== WHY THE TRADE-OFF EXISTS — three truths ===================== */}
      <Section tone="default">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">{t("truthEyebrow")}</span>
            <h2 className="display-2 mt-5 text-pretty">{t("truthTitle")}</h2>
          </div>
          <ScrollReveal
            className="mt-12 grid md:grid-cols-3 gap-6"
            staggerChildren={90}
          >
            {truthPoints.map((p, i) => (
              <div
                key={i}
                className="group h-full rounded-3xl bg-cream-100 p-7 flex flex-col gap-3 border border-ink-900/5 transition-all duration-300 hover:border-brand-500/20 hover:bg-white hover:-translate-y-1"
              >
                <div className="size-10 rounded-2xl bg-brand-500/12 text-brand-700 grid place-items-center font-bold transition-all duration-300 group-hover:bg-brand-500/20">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="text-ink-700 leading-relaxed flex-1">{p.body}</p>
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ===================== WHY BLANKET DISCOUNTS FAIL — not a discount tool ===================== */}
      <Section tone="cream">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">
              <Tag className="size-3.5" /> {t("notDiscountEyebrow")}
            </span>
            <h2 className="display-2 mt-5 text-pretty">{t("notDiscountTitle")}</h2>
          </div>
          <ScrollReveal
            className="mt-12 grid md:grid-cols-3 gap-6"
            staggerChildren={90}
          >
            {notDiscountPoints.map((p, i) => (
              <div
                key={i}
                className="h-full rounded-3xl bg-white p-7 flex flex-col gap-3 border border-ink-900/5 shadow-elevated transition-all duration-300 hover:border-brand-500/20 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="text-ink-700 leading-relaxed flex-1">{p.body}</p>
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ===================== THE NEW CAPABILITY — what changes for your shop ===================== */}
      <Section tone="default">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">{t("storesGainEyebrow")}</span>
            <h2 className="display-2 mt-5 text-pretty">{t("storesGainTitle")}</h2>
          </div>
          <ScrollReveal
            className="mt-12 grid md:grid-cols-3 gap-6"
            staggerChildren={90}
          >
            {storesGainPoints.map((p, i) => (
              <div
                key={i}
                className="h-full rounded-3xl bg-cream-100 p-7 flex flex-col gap-3 border border-ink-900/5 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:border-brand-500/25"
              >
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="text-ink-700 leading-relaxed flex-1">{p.body}</p>
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ===================== HOW IT WORKS — mechanism, deliberately later ===================== */}
      <Section tone="cream">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">
              <CheckCircle2 className="size-3.5" /> {t("bidygoEyebrow")}
            </span>
            <h2 className="display-2 mt-5 text-pretty">{t("bidygoTitle")}</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">
              {t("bidygoIntro")}
            </p>
          </div>
          <ScrollReveal
            as="ol"
            className="mt-14 relative"
            staggerChildren={120}
          >
            {bidygoSteps.map((step, i) => {
              const isLast = i === bidygoSteps.length - 1;
              return (
                <li
                  key={i}
                  className="relative grid md:grid-cols-12 gap-6 items-start"
                >
                  {!isLast && (
                    <div
                      aria-hidden
                      className="hidden md:block absolute left-[5.5rem] top-20 bottom-0 w-px bg-gradient-to-b from-brand-500/40 via-brand-500/20 to-brand-500/0"
                    />
                  )}
                  <div className="md:col-span-3 flex md:flex-col items-center gap-5">
                    <div className="font-display font-black text-[4rem] sm:text-[5rem] leading-none text-brand-500/90 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="md:col-span-9 pb-10 md:pb-12">
                    <div className="rounded-3xl bg-white p-7 sm:p-8 border border-ink-900/[0.06] shadow-elevated">
                      <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                      <p className="mt-3 text-ink-700 leading-relaxed text-lg">{step.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ===================== FOUNDER ===================== */}
      <Section tone="default">
        <Container size="narrow">
          <span className="eyebrow">{t("founderEyebrow")}</span>
          <h2 className="display-2 mt-5 text-pretty">{t("founderTitle")}</h2>
          <p className="mt-7 text-lg text-ink-700 leading-relaxed">{t("founderBody")}</p>
          <p className="mt-6 text-ink-500 italic">{t("signature")}</p>
        </Container>
      </Section>

      {/* ===================== CLOSE ===================== */}
      <Section tone="cocoa" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.10]" />
        <div aria-hidden className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/30 to-transparent" />
        <Container size="narrow" className="relative text-center">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.12em] font-bold text-brand-300">
              {t("closeEyebrow")}
            </span>
            <h2 className="display-3 mt-5 text-pretty text-white">{t("closeTitle")}</h2>
            <p className="mt-5 text-lg text-cream-100/85 leading-relaxed">{t("closeBody")}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="xl" variant="white">
                  {t("closePrimaryCta")} <ArrowRight />
                </Button>
              </Link>
              <Link href="/for-stores">
                <Button size="xl" variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                  {t("closeSecondaryCta")}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
