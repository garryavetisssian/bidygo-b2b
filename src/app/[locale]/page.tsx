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
  TrendingUp,
  ShoppingBag,
  Tag,
  Wallet,
  Handshake,
  CheckCircle2,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Container, Badge, Card, CardTitle, CardDescription } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { OfferTicker } from "@/components/sections/offer-ticker";
import { ProofStats, type ProofMetric } from "@/components/sections/proof-stats";
import { RetailerFlowDemo } from "@/components/sections/retailer-flow-demo";
import { CalculatorTeaser } from "@/components/sections/calculator-teaser";
import { MomentCard } from "@/components/content/moment-card";
import { getMoments } from "@/data/moments";
import { getFounder } from "@/data/founder";

interface ValueItem {
  title: string;
  body: string;
}
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
  comingNote: string;
  metrics: ProofMetric[];
  isPlaceholder?: boolean;
  disclaimer?: string;
}

// Why-it-matters icons — each maps to a retailer business outcome, not a mechanic.
const valueIcons = [TrendingUp, ShoppingBag, Tag, Wallet, Handshake];
// Proof assurance icons — control, margin floor, real person.
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

  const valueItems = t.raw("value.items") as ValueItem[];
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

      {/* ===================== 1 · HERO — outcome-led, geography-neutral ===================== */}
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

      {/* ===================== 2 · PROOF — real + safe, NO invented numbers ===================== */}
      <Section tone="muted">
        <SectionHeader
          eyebrow={proof.eyebrow}
          title={proof.title}
          description={proof.note}
        />

        <ScrollReveal
          className="mt-12 grid sm:grid-cols-3 gap-5"
          staggerChildren={80}
        >
          {proof.assurances.map((a, i) => {
            const Icon = assuranceIcons[i] ?? CheckCircle2;
            return (
              <Card key={a.title} className="p-7 flex flex-col gap-3 h-full">
                <div className="size-12 rounded-2xl bg-mint-500/12 text-[oklch(0.45_0.12_165)] grid place-items-center shadow-[inset_0_1px_0_0_oklch(1_0_0/0.6)]">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-lg">{a.title}</CardTitle>
                <CardDescription className="text-sm">{a.body}</CardDescription>
              </Card>
            );
          })}
        </ScrollReveal>

        {/* Numeric band stays dormant until verified figures land in homePage.proof.metrics */}
        <ProofStats
          metrics={proof.metrics ?? []}
          isPlaceholder={proof.isPlaceholder}
          disclaimer={proof.disclaimer}
        />

        <p className="mt-10 text-center text-xs text-ink-500 max-w-2xl mx-auto leading-relaxed">
          {proof.comingNote}
        </p>
      </Section>

      {/* ===================== 3 · WHY IT MATTERS — trade-off + retailer value ===================== */}
      <Section tone="cream">
        <SectionHeader
          eyebrow={t("value.eyebrow")}
          title={t("value.title")}
          description={t("value.note")}
        />

        <ScrollReveal
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerChildren={90}
        >
          {valueItems.map((item, i) => {
            const Icon = valueIcons[i] ?? TrendingUp;
            return (
              <Card
                key={item.title}
                interactive
                className="group relative p-7 lg:p-8 flex flex-col gap-4 h-full overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span
                  aria-hidden
                  className="absolute -top-2 -right-1 font-display font-black text-[5rem] leading-none text-ink-900/[0.04] tabular-nums select-none transition-colors duration-300 group-hover:text-brand-500/[0.10]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-start justify-between">
                  <div className="relative size-14 rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-700 grid place-items-center transition-all duration-300 group-hover:scale-[1.06] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.6)]">
                    <Icon className="size-6" />
                  </div>
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="text-base">{item.body}</CardDescription>
              </Card>
            );
          })}
        </ScrollReveal>
      </Section>

      {/* ===================== 4 · WHAT CHANGES IN YOUR SHOP — minimal mechanism, value-framed ===================== */}
      <Section tone="default" id="how-it-works">
        <SectionHeader
          eyebrow={t("flowEyebrow")}
          title={t("flowTitle")}
          description={t("flowNote")}
        />

        <div className="mt-14">
          <RetailerFlowDemo />
        </div>

        {/* Supporting credibility — category language used once, low */}
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

      {/* ===================== 5 · TESTIMONIALS & STORES — local proof shows naturally ===================== */}
      <Section tone="cream" id="trust">
        <SectionHeader
          eyebrow={t("momentsEyebrow")}
          title={t("momentsTitle")}
          description={t("momentsBody")}
        />

        <ScrollReveal
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          staggerChildren={70}
        >
          {momentItems.map((m) => (
            <MomentCard key={m.id} moment={m} />
          ))}
        </ScrollReveal>

        <div className="mt-16 max-w-xl mx-auto">
          <div className="rounded-3xl bg-white border border-ink-900/8 shadow-sm p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="size-14 rounded-full bg-brand-500/15 grid place-items-center text-brand-700 font-bold text-xl shrink-0">
              {founder?.name.charAt(0) ?? "V"}
            </div>
            <div className="flex-1">
              <p className="font-[family-name:var(--font-signature)] text-2xl sm:text-[1.75rem] text-ink-900 leading-tight">
                &ldquo;{t("trust.founderQuote")}&rdquo;
              </p>
              <div className="mt-2 text-sm text-ink-600">
                <span className="font-semibold text-ink-900">{founder?.name ?? "Vahagn Khachatryan"}</span>
                <span className="text-ink-400 mx-1.5">·</span>
                <span>{t("trust.founderRole")}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ink-500 max-w-md mx-auto leading-relaxed">
          {t("trust.honesty")}
        </p>

        <div className="mt-10 flex justify-center">
          <Link href="/stories">
            <Button size="lg" variant="secondary">
              {t("trust.cta")} <ArrowRight />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ===================== 6 · INDUSTRIES — category-fit qualification ===================== */}
      <Section tone="default">
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

      {/* ===================== 7 · CALCULATOR TEASER — opportunity + secondary pricing intelligence ===================== */}
      <Section tone="muted">
        <CalculatorTeaser />
      </Section>

      {/* ===================== 8 · CONTACT CTA — with early-market invitation ===================== */}
      <Section tone="default" noContainer className="py-24 sm:py-32">
        <Container>
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
