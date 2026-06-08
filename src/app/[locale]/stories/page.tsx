import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, buildPageGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { ArrowRight, FileText, Lock, Bell, Sparkles, Activity, TrendingUp } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Container, Card, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { OfferTicker } from "@/components/sections/offer-ticker";
import { MomentCard } from "@/components/content/moment-card";
import { getMoments } from "@/data/moments";

interface Lens {
  num: string;
  title: string;
  body: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "stories" });
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "storiesPage" });
  const lenses = t.raw("lenses") as Lens[];
  const momentItems = getMoments(locale);

  const graph = await buildPageGraph({ locale: locale as Locale, page: "stories" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute inset-0 bg-grid-warm opacity-30 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
          <div className="absolute top-[-10%] right-[-5%] size-[50vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.18),transparent)] blur-3xl animate-glow-soft" />
        </div>
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-5 animate-fade-blur">
              <span className="relative inline-flex size-2">
                <span className="absolute inset-0 rounded-full bg-mint-500/60 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-mint-500" />
              </span>
              <span className="eyebrow">
                <FileText className="size-3.5" /> {t("eyebrow")}
              </span>
            </div>
            <h1 className="display-1 text-pretty animate-rise-slow [animation-delay:80ms]">{t("headline")}</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty animate-rise-slow [animation-delay:200ms]">
              {t("subhead")}
            </p>
            <div className="mt-7 animate-rise-slow [animation-delay:320ms]">
              <Badge variant="brand">
                <Sparkles className="size-3.5" /> {t("badge")}
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* ============== LIVE PULSE (activity ticker as anchor) ============== */}
      <Section tone="cocoa" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-mesh-cocoa" />
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.08]" />
        <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent" />

        <Container className="relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="relative inline-flex size-2">
                <span className="absolute inset-0 rounded-full bg-brand-400/70 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-400" />
              </span>
              <span className="text-xs uppercase tracking-[0.14em] font-bold text-brand-300">
                {t("pulseEyebrow")}
              </span>
            </div>
            <h2 className="display-2 text-pretty text-white">{t("pulseTitle")}</h2>
            <p className="mt-5 text-lg text-cream-100/80 leading-relaxed">{t("pulseNote")}</p>
          </div>

          <div className="mt-12 rounded-2xl overflow-hidden border border-cream-50/10 bg-cocoa-900/60 backdrop-blur-sm">
            <div className="flex items-center justify-between px-5 h-10 border-b border-cream-50/10 text-[0.65rem] uppercase tracking-[0.14em] font-bold">
              <span className="text-cream-100/70 font-mono">live · anon · auto-anonymized</span>
              <span className="text-mint-500 inline-flex items-center gap-1.5">
                <Activity className="size-3" /> streaming
              </span>
            </div>
            <div className="p-4">
              <OfferTicker />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-cream-100/70">
            <Activity className="size-4 text-brand-300" />
            <span>{t("pulseCaption")}</span>
          </div>
        </Container>
      </Section>

      {/* ==================== LENSES ==================== */}
      <Section tone="cream">
        <SectionHeader
          eyebrow={t("lensesEyebrow")}
          title={t("lensesTitle")}
          description={t("lensesNote")}
        />

        <ScrollReveal
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          staggerChildren={70}
        >
          {lenses.map((l) => (
            <Card key={l.title} interactive elevated className="relative p-7 flex flex-col gap-3 h-full overflow-hidden">
              <div className="font-display font-black text-[3.5rem] leading-none text-brand-500/15 tabular-nums absolute top-3 right-4 select-none">
                {l.num}
              </div>
              <div className="relative size-11 rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-700 grid place-items-center font-bold shadow-[inset_0_1px_0_0_oklch(1_0_0/0.6)]">
                <TrendingUp className="size-5" />
              </div>
              <h3 className="text-lg font-bold tracking-tight relative">{l.title}</h3>
              <p className="text-ink-600 leading-relaxed text-sm flex-1 relative">{l.body}</p>
            </Card>
          ))}
        </ScrollReveal>
      </Section>

      {/* ==================== MOMENT CARDS ==================== */}
      <Section tone="default">
        <Container className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">Moments</span>
          <h2 className="display-3 mt-4 text-pretty">Pulse from real shops, this week.</h2>
        </Container>
        <ScrollReveal
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          staggerChildren={80}
        >
          {momentItems.map((m) => (
            <MomentCard key={m.id} moment={m} />
          ))}
        </ScrollReveal>
      </Section>

      {/* ==================== HONEST CARD ==================== */}
      <Section tone="cream">
        <Container size="narrow">
          <ScrollReveal>
            <Card elevated className="relative overflow-hidden p-8 sm:p-12 border-brand-500/15">
              <div
                aria-hidden
                className="absolute top-0 inset-x-0 h-2 bg-barcode-brand opacity-50 [mask-image:linear-gradient(to_right,transparent,#000_20%,#000_80%,transparent)]"
              />
              <div aria-hidden className="absolute -top-24 -right-24 size-64 rounded-full bg-brand-500/8 blur-3xl" />
              <div className="relative flex items-start gap-5">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-cream-100 to-cream-200 grid place-items-center shrink-0 border border-ink-900/[0.06]">
                  <Lock className="size-6 text-ink-700" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("honestTitle")}</h3>
                  <p className="mt-4 text-ink-700 leading-relaxed">{t("honestPara1")}</p>
                  <p className="mt-3 text-ink-700 leading-relaxed">{t("honestPara2")}</p>
                  <div className="mt-7">
                    <Link href="/for-stores#demo">
                      <Button size="lg">{t("honestCta")} <ArrowRight /></Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ==================== NOTIFY ==================== */}
      <Section tone="muted">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal className="lg:col-span-7">
              <span className="eyebrow">
                <Bell className="size-3.5" /> {t("notifyEyebrow")}
              </span>
              <h2 className="display-2 mt-5 text-pretty">{t("notifyHeadline")}</h2>
              <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-xl">
                {t.rich("notifyBody", {
                  email: (chunks) => (
                    <a
                      href="mailto:hello@bidygo.com"
                      className="text-brand-700 font-semibold underline-offset-2 hover:underline"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500/30 to-honey-300/40 blur-3xl"
                />
                <div className="relative rounded-full bg-gradient-to-br from-cream-100 to-cream-200 size-56 grid place-items-center border border-ink-900/[0.06] shadow-elevated">
                  <TrendingUp className="size-24 text-brand-600" strokeWidth={1.5} aria-hidden />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ==================== APPLY ==================== */}
      <Section tone="default">
        <Container size="narrow" className="text-center">
          <ScrollReveal>
            <h2 className="display-3 text-pretty">{t("applyTitle")}</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">{t("applyBody")}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/for-stores#demo">
                <Button size="xl">{t("applyCta")} <ArrowRight /></Button>
              </Link>
              <Link href="/for-stores">
                <Button size="xl" variant="outline">{t("infoCta")}</Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
