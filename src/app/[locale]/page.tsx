import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata, buildPageGraph, buildSoftwareApplicationJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "home" });
}
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  UserRound,
  Quote,
  MapPin,
  TrendingUp,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Container, Badge, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import { OfferTicker } from "@/components/sections/offer-ticker";
import { CalculatorTeaser } from "@/components/sections/calculator-teaser";
import { RetailerFlowDemo } from "@/components/sections/retailer-flow-demo";
import {
  RecoveredSaleAnatomy,
  PreviewDashboard,
  ExampleRetailOutcomes,
} from "@/components/sections/product-preview";
import { getMoments } from "@/data/moments";
import { getFounder } from "@/data/founder";

interface ProofAssurance {
  title: string;
  body: string;
}
interface IndustryGridItem {
  slug: string;
  name: string;
  tagline: string;
  emoji: string;
  bg: string;
}
interface ProofContent {
  eyebrow: string;
  title: string;
  note: string;
  assurances: ProofAssurance[];
}

// Decision-point reassurance icons — control, margin floor, real person.
const assuranceIcons = [CheckCircle2, ShieldCheck, UserRound];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "homePage" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  const proof = t.raw("proof") as ProofContent;
  const industriesGrid = t.raw("industriesGrid") as IndustryGridItem[];
  const momentItems = getMoments(locale);
  const founder = getFounder(locale);

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "home",
    extras: [buildSoftwareApplicationJsonLd(locale as Locale)],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      {/* ===================== 1 · HERO — understand the opportunity (Why care) ===================== */}
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 lg:pb-32">
        <div aria-hidden className="absolute inset-x-0 top-0 bottom-0 -z-10">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute inset-0 bg-grid-warm opacity-[0.45] [mask-image:radial-gradient(75%_55%_at_50%_30%,#000,transparent)]" />
          <div className="absolute top-[-15%] left-[55%] size-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.24),transparent)] blur-3xl animate-glow-soft" />
          <div className="absolute left-0 top-[18%] bottom-[12%] w-[6vw] max-w-[64px] bg-barcode opacity-[0.45] [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]" />
          <div className="absolute top-[22%] right-[8%] size-3 rounded-full bg-brand-500/40 blur-[2px] animate-float [animation-duration:7s]" />
          <div className="absolute top-[58%] right-[16%] size-2 rounded-full bg-brand-700/40 blur-[2px] animate-float [animation-duration:9s] [animation-delay:1.2s]" />
          <div className="absolute top-[44%] left-[18%] size-2.5 rounded-full bg-brand-500/35 blur-[2px] animate-float [animation-duration:8s] [animation-delay:0.6s]" />
        </div>

        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col gap-7 max-w-xl">
              <div className="inline-flex items-center gap-2 self-start animate-fade-blur">
                <span className="relative inline-flex size-2">
                  <span className="absolute inset-0 rounded-full bg-mint-500/60 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-mint-500" />
                </span>
                <span className="eyebrow">
                  <Sparkles className="size-3.5" /> {tHero("eyebrow")}
                </span>
              </div>

              <h1 className="display-1 text-pretty animate-rise-slow [animation-delay:60ms]">
                {t("headlineFirst")}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t("headlineHighlight")}</span>
                  <span aria-hidden className="absolute inset-x-0 bottom-1 h-3 sm:h-4 bg-brand-500/25 -skew-x-6 -z-0" />
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-ink-700 leading-relaxed text-pretty max-w-md font-medium animate-rise-slow [animation-delay:200ms]">
                {tHero("subhead")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-2 animate-rise-slow [animation-delay:320ms]">
                <Link href="/contact">
                  <Button size="xl" className="w-full sm:w-auto">
                    {tHero("primaryCta")} <ArrowRight />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto">
                    {tHero("secondaryCta")}
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500 animate-rise-slow [animation-delay:440ms]">
                <Badge variant="subtle">{t("trustBadges.noLockIn")}</Badge>
                <Badge variant="subtle">{t("trustBadges.approvalOnly")}</Badge>
                <Badge variant="subtle">{t("trustBadges.fast")}</Badge>
              </div>
            </div>

            {/* Hero visual = live sales pulse (proof-of-life), not a shopper mechanic */}
            <div className="lg:col-span-5 relative animate-rise-slow [animation-delay:380ms]">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute top-6 -right-3 sm:-right-5 w-full h-full rounded-[2.5rem] bg-white/70 border border-ink-900/[0.06] shadow-stack-back -rotate-[3deg] origin-bottom-left" />
                <div className="absolute top-3 -right-1.5 sm:-right-2.5 w-full h-full rounded-[2.5rem] bg-white/85 border border-ink-900/[0.05] shadow-stack-back -rotate-[1.5deg] origin-bottom-left" />
              </div>
              <div className="relative z-[1]">
                <OfferTicker />
              </div>
            </div>
          </div>

          <div className="mt-20 sm:mt-28 max-w-3xl mx-auto text-center">
            <p className="text-sm text-ink-500 mb-6 font-medium">{tHero("trustline")}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-60">
              {industriesGrid.slice(0, 5).map((ind) => (
                <span key={ind.slug} className="font-display font-bold text-lg text-ink-700 tracking-tight">
                  {ind.name}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== 2 · RECOVERED SALE ANATOMY — understand the problem (How it works) =====================
          Customer wants the product → price blocks the purchase → Bidygo recovers the sale.
          Carries the hero's "#how-it-works" anchor; geography-neutral, illustrative. */}
      <Section tone="muted" id="how-it-works">
        <ScrollReveal>
          <RecoveredSaleAnatomy />
        </ScrollReveal>
      </Section>

      {/* ===================== 3 · ILLUSTRATIVE RETAIL OUTCOMES — the value, in numbers (Why care) =====================
          Numbers demonstrate RETAILER OUTCOMES, never platform scale. All sample/illustrative. */}
      <Section tone="cream">
        <SectionHeader
          eyebrow={t("numbers.eyebrow")}
          title={t("numbers.title")}
          description={t("numbers.note")}
        />
        <ScrollReveal className="mt-12">
          <ExampleRetailOutcomes />
        </ScrollReveal>
      </Section>

      {/* ===================== 4 · TESTIMONIALS / REAL SHOPS — the trust bridge (Why trust) =====================
          The most prominent block on the page, immediately after the numbers. Bespoke quote/testimonial
          layout (NOT generic preview cards). Locations live HERE only — never in the Product Preview layer. */}
      <Section tone="default" id="trust" className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute top-[-18%] right-[-8%] size-[55vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.18),transparent)] blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] size-[45vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.62_0.13_165/0.10),transparent)] blur-3xl" />
        </div>

        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-pill bg-white/70 backdrop-blur border border-ink-900/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-700 shadow-sm">
              <span className="relative inline-flex size-2">
                <span className="absolute inset-0 rounded-full bg-brand-500/50 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
              </span>
              {t("momentsEyebrow")}
            </span>
            <h2 className="display-2 mt-5 text-pretty">{t("momentsTitle")}</h2>
            <p className="mt-5 text-lg text-ink-700 leading-relaxed text-pretty">{t("momentsBody")}</p>
          </div>

          {/* Quote-card grid — unmistakably testimonials: quote glyph, blockquote, outcome chip, attribution */}
          <ScrollReveal
            className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
            staggerChildren={80}
          >
            {momentItems.map((m) => (
              <figure
                key={m.id}
                className="relative flex flex-col h-full rounded-[1.75rem] bg-white border border-ink-900/[0.06] shadow-[0_20px_50px_-26px_oklch(0.155_0.018_36/0.28)] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <Quote aria-hidden className="size-9 text-brand-500/25 -scale-x-100" />
                <div className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] font-bold text-brand-700">
                  {m.vertical}
                </div>
                <blockquote className="mt-2 text-ink-800 leading-relaxed text-[0.95rem] flex-1">
                  {m.story}
                </blockquote>
                <div className="mt-4 flex items-start gap-2 rounded-2xl bg-mint-500/10 border border-mint-500/20 px-4 py-3">
                  <TrendingUp className="size-4 text-[oklch(0.45_0.12_165)] shrink-0 mt-0.5" aria-hidden />
                  <span className="text-sm font-semibold text-ink-900 leading-snug">{m.metric}</span>
                </div>
                <figcaption className="mt-5 pt-4 border-t border-ink-900/[0.06] flex items-center gap-3">
                  <div className={cn("size-11 rounded-full grid place-items-center text-xl shrink-0", m.bg)}>
                    {m.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-ink-900 leading-tight">{m.name}</div>
                    <div className="inline-flex items-center gap-1 text-xs text-ink-500 mt-0.5">
                      <MapPin className="size-3.5" aria-hidden />
                      {m.city}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </ScrollReveal>

          {/* Featured founder testimonial — the human behind the trust */}
          <ScrollReveal className="mt-10">
            <figure className="relative mx-auto max-w-3xl rounded-[2rem] bg-cocoa-700 text-white shadow-[0_28px_70px_-30px_oklch(0.155_0.018_36/0.5)] p-8 sm:p-12 overflow-hidden">
              <Quote aria-hidden className="absolute -top-2 left-6 size-24 text-white/10 -scale-x-100" />
              <div aria-hidden className="absolute -right-16 -bottom-16 size-60 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="relative flex flex-col items-center text-center gap-6">
                <p className="font-[family-name:var(--font-signature)] text-3xl sm:text-4xl leading-snug text-balance">
                  &ldquo;{t("trust.founderQuote")}&rdquo;
                </p>
                <figcaption className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-brand-500 grid place-items-center text-white font-bold text-lg shrink-0">
                    {founder?.name.charAt(0) ?? "V"}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{founder?.name ?? "Vahagn Khachatryan"}</div>
                    <div className="text-sm text-white/70">{t("trust.founderRole")}</div>
                  </div>
                </figcaption>
              </div>
            </figure>
          </ScrollReveal>

          <p className="mt-10 text-center text-sm text-ink-500 max-w-md mx-auto leading-relaxed">
            {t("trust.honesty")}
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="/stories">
              <Button size="lg">
                {t("trust.cta")} <ArrowRight />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ===================== 5 · DASHBOARD PREVIEW — see the product (How it works) =====================
          Product-preview = understanding, not trust. Sample data, geography-free. */}
      <Section tone="muted">
        <SectionHeader
          eyebrow={t("explore.eyebrow")}
          title={t("explore.title")}
          description={t("explore.note")}
        />
        <ScrollReveal className="mt-12">
          <PreviewDashboard />
        </ScrollReveal>
      </Section>

      {/* ===================== 6 · WHAT CHANGES IN YOUR SHOP — the mechanism (How it works) ===================== */}
      <Section tone="default">
        <SectionHeader
          eyebrow={t("flowEyebrow")}
          title={t("flowTitle")}
          description={t("flowNote")}
        />
        <div className="mt-14">
          <RetailerFlowDemo />
        </div>
        <p className="mt-10 text-center text-sm text-ink-500 max-w-xl mx-auto leading-relaxed">
          {t("flowCredibility")}
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/for-stores">
            <Button size="lg" variant="secondary">
              {t("howCta")} <ArrowRight />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ===================== 7 · INDUSTRIES — category-fit qualification (Why care) ===================== */}
      <Section tone="cream">
        <SectionHeader
          eyebrow={t("industriesEyebrow")}
          title={t("industriesTitle")}
          description={t("industriesNote")}
        />
        <ScrollReveal
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerChildren={80}
        >
          {industriesGrid.map((ind, i) => (
            <Link
              key={ind.slug}
              href={ind.slug === "all" ? "/for-stores" : `/solutions/${ind.slug}`}
              className="group h-full"
            >
              <Card interactive className="relative overflow-hidden h-full flex flex-col">
                <span
                  aria-hidden
                  className="absolute top-2 left-4 font-display font-black text-[5.5rem] leading-none text-white/30 tabular-nums select-none mix-blend-overlay pointer-events-none z-[1]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`relative h-44 ${ind.bg} grid place-items-center text-6xl transition-transform duration-500 group-hover:scale-[1.05] overflow-hidden`}
                >
                  <span className="relative z-[2] transition-transform duration-500 group-hover:scale-110">
                    {ind.emoji}
                  </span>
                  <div
                    aria-hidden
                    className="absolute bottom-0 inset-x-0 h-3 bg-barcode opacity-30 [mask-image:linear-gradient(to_right,transparent,#000_20%,#000_80%,transparent)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(60%_60%_at_50%_50%,oklch(1_0_0/0.20),transparent)]"
                  />
                </div>
                <div className="relative p-6 flex flex-col gap-2 flex-1">
                  <h3 className="text-xl font-bold tracking-tight">{ind.name}</h3>
                  <p className="text-ink-600 leading-relaxed flex-1">{ind.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-brand-700 font-semibold text-sm mt-3 group-hover:gap-2 transition-all">
                    {t("industriesCta")} <ArrowRight className="size-4" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </ScrollReveal>
      </Section>

      {/* ===================== 8 · CALCULATOR TEASER — your own numbers (Why care) ===================== */}
      <Section tone="muted">
        <CalculatorTeaser />
      </Section>

      {/* ===================== 9 · CONTACT — with decision-point reassurance (Why trust → conversion) ===================== */}
      <Section tone="default" noContainer className="py-24 sm:py-32">
        <Container>
          {/* Slim "safe to try" reassurance row — objection handling at the decision point */}
          <ScrollReveal className="mb-14 grid sm:grid-cols-3 gap-5">
            {proof.assurances.map((a, i) => {
              const Icon = assuranceIcons[i] ?? CheckCircle2;
              return (
                <div key={a.title} className="flex items-start gap-3">
                  <div className="size-10 rounded-2xl bg-mint-500/12 text-[oklch(0.45_0.12_165)] grid place-items-center shrink-0 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.6)]">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-ink-900 leading-tight">{a.title}</div>
                    <p className="mt-1 text-sm text-ink-600 leading-relaxed">{a.body}</p>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500 via-brand-500 to-brand-600 p-10 sm:p-16 lg:p-20 text-white">
              <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.18] mix-blend-overlay" />
              <div aria-hidden className="absolute -right-32 -top-32 size-96 rounded-full bg-white/10 blur-3xl" />
              <div aria-hidden className="absolute -left-20 -bottom-20 size-72 rounded-full bg-ink-900/15 blur-2xl" />
              <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="relative max-w-2xl">
                <h2 className="display-2 text-pretty">{t("closingTitle")}</h2>
                <p className="mt-5 text-lg sm:text-xl leading-relaxed text-white/90 text-pretty">
                  {t("closingBody")}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/contact">
                    <Button size="xl" variant="white" className="w-full sm:w-auto">
                      {t("closingPrimary")} <ArrowRight />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="xl" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10">
                      {t("closingSecondary")}
                    </Button>
                  </Link>
                </div>

                {/* Early-market invitation — international hook, no geography centered, no countries named */}
                <p className="mt-8 text-sm text-white/80 border-t border-white/20 pt-6 max-w-lg">
                  {t("closingInvite")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
