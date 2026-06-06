import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Zap,
  LineChart,
  Plug,
  CircleDollarSign,
  X,
} from "lucide-react";

import { Section, SectionHeader, Container, Card, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { PartnerForm } from "@/components/forms/partner-form";
import { ChatLauncher } from "@/components/site/chat-launcher";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { DashboardMock, MetricChip } from "@/components/ui/dashboard-mock";
import { buildMetadata, buildPageGraph, buildFaqJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

interface Step { title: string; body: string }
interface Objection { q: string; a: string }
interface CommercialCard { title: string; body: string }
interface SetupWeek { label: string; title: string; body: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "forStores" });
}

export default async function ForStoresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "forStoresPage" });
  const steps = t.raw("steps") as Step[];
  const objections = t.raw("objections") as Objection[];
  const commercialCards = t.raw("commercialCards") as CommercialCard[];
  const todayBullets = t.raw("todayBullets") as string[];
  const withBidygoBullets = t.raw("withBidygoBullets") as string[];
  const setupWeeks = t.raw("setup.weeks") as SetupWeek[];

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "forStores",
    extras: [buildFaqJsonLd(objections, locale as Locale)].filter(
      (e): e is object => Boolean(e)
    ),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {/* ===================== 1 · HERO — revenue outcome ===================== */}
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-28">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute inset-0 bg-grid-warm opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
          <div className="absolute top-[-15%] right-[-10%] size-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.20),transparent)] blur-3xl animate-glow-soft" />
          <div className="absolute left-0 top-[20%] bottom-[20%] w-[5vw] max-w-[48px] bg-barcode opacity-30 [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]" />
        </div>

        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 max-w-2xl flex flex-col gap-7">
              <div className="inline-flex items-center gap-2 self-start animate-fade-blur">
                <span className="relative inline-flex size-2">
                  <span className="absolute inset-0 rounded-full bg-mint-500/60 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-mint-500" />
                </span>
                <span className="eyebrow">{t("eyebrow")}</span>
              </div>
              <h1 className="display-1 text-pretty animate-rise-slow [animation-delay:80ms]">{t("headline")}</h1>
              <p className="text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty animate-rise-slow [animation-delay:200ms]">
                {t("subhead")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2 animate-rise-slow [animation-delay:320ms]">
                <a href="#demo">
                  <Button size="xl" className="w-full sm:w-auto">
                    {t("primaryCta")} <ArrowRight />
                  </Button>
                </a>
                <a href="#how">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto">
                    {t("secondaryCta")}
                  </Button>
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm animate-rise-slow [animation-delay:440ms]">
                <span className="inline-flex items-center gap-2 text-ink-700">
                  <ShieldCheck className="size-4 text-brand-600" /> {t("badges.approval")}
                </span>
                <span className="inline-flex items-center gap-2 text-ink-700">
                  <Zap className="size-4 text-brand-600" /> {t("badges.fast")}
                </span>
                <span className="inline-flex items-center gap-2 text-ink-700">
                  <Plug className="size-4 text-brand-600" /> {t("badges.pos")}
                </span>
              </div>
            </div>

            {/* Dashboard mock + floating chips */}
            <div className="lg:col-span-5 relative animate-rise-slow [animation-delay:380ms]">
              <div className="relative">
                <DashboardMock className="relative z-[1] -rotate-1" />
                <MetricChip
                  label="Recovered"
                  value="+$4,840"
                  trend="+18%"
                  className="absolute -top-5 -right-3 z-[2] animate-wave-1"
                />
                <MetricChip
                  label="Live now"
                  value="3 offers"
                  className="absolute -bottom-5 -left-3 z-[2] animate-wave-2"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== 2/3 · WHY RETAILERS CARE + TRADE-OFF (split comparison) ===================== */}
      <Section tone="cream" className="relative overflow-hidden">
        <SectionHeader
          eyebrow={t("problemEyebrow")}
          title={t("problemTitle")}
          description={t("problemNote")}
        />

        <ScrollReveal className="mt-14 relative">
          <div className="grid lg:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden border border-ink-900/[0.08] shadow-elevated bg-white">
            {/* TODAY column */}
            <div className="relative p-8 sm:p-10 bg-gradient-to-br from-cream-100 to-cream-200 border-b lg:border-b-0 lg:border-r border-dashed border-ink-900/15">
              <div className="absolute top-4 right-4 font-display font-black text-[5rem] leading-none text-ink-900/[0.05] tabular-nums select-none">
                01
              </div>
              <div className="relative">
                <Badge variant="default" className="bg-white">
                  <TrendingDown className="size-3.5 text-ink-600" /> {t("todayBadge")}
                </Badge>
                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight">{t("todayTitle")}</h3>
                <p className="mt-4 text-ink-700 leading-relaxed">{t("todayBody")}</p>
                <ul className="mt-6 space-y-3 text-ink-700">
                  {todayBullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <X className="size-5 text-ink-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* WITH BIDYGO column */}
            <div className="relative p-8 sm:p-10 bg-gradient-to-br from-white via-brand-50 to-brand-100/40">
              <div className="absolute top-4 right-4 font-display font-black text-[5rem] leading-none text-brand-500/[0.10] tabular-nums select-none">
                02
              </div>
              <div className="relative">
                <Badge variant="brand">
                  <TrendingUp className="size-3.5" /> {t("withBidygoBadge")}
                </Badge>
                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight">{t("withBidygoTitle")}</h3>
                <p className="mt-4 text-ink-700 leading-relaxed">{t("withBidygoBody")}</p>
                <ul className="mt-6 space-y-3 text-ink-700">
                  {withBidygoBullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2 className="size-5 text-brand-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ===================== 4 · WHAT CHANGES IN YOUR SHOP (steps) ===================== */}
      <Section tone="default" id="how" className="relative">
        <SectionHeader eyebrow={t("flowEyebrow")} title={t("flowTitle")} />

        <ScrollReveal className="mt-14" staggerChildren={120}>
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`relative grid md:grid-cols-12 gap-6 items-start py-7 ${
                i !== steps.length - 1 ? "border-b border-dashed border-ink-900/10" : ""
              }`}
            >
              <div className="md:col-span-3 flex items-center gap-4">
                <div className="font-display font-black text-[3.5rem] leading-none text-brand-500/90 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 md:hidden">
                  <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                </div>
              </div>
              <div className="md:col-span-9">
                <h3 className="hidden md:block text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed text-lg max-w-3xl">{s.body}</p>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </Section>

      {/* ===================== 5 · OPERATIONAL DETAILS — setup timeline ===================== */}
      <Section tone="cream">
        <SectionHeader eyebrow={t("setup.eyebrow")} title={t("setup.title")} />

        <ScrollReveal className="mt-14 relative" staggerChildren={120}>
          {setupWeeks.map((w, i) => {
            const isLast = i === setupWeeks.length - 1;
            return (
              <div key={i} className="relative grid md:grid-cols-12 gap-6 items-start">
                {!isLast && (
                  <div
                    aria-hidden
                    className="hidden md:block absolute left-[3.6rem] top-16 bottom-0 w-px bg-gradient-to-b from-brand-500/40 to-brand-500/0"
                  />
                )}
                <div className="md:col-span-2 flex md:flex-col items-center gap-4">
                  <div className="relative shrink-0 size-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white grid place-items-center font-display font-bold text-base shadow-[0_8px_18px_-6px_oklch(0.700_0.196_42/0.50)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="md:col-span-10 pb-10 md:pb-12">
                  <Card elevated className="p-7">
                    <span className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-brand-700">
                      {w.label}
                    </span>
                    <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight">{w.title}</h3>
                    <p className="mt-3 text-ink-700 leading-relaxed">{w.body}</p>
                  </Card>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </Section>

      {/* ===================== 6 · DASHBOARD & CONTROLS ===================== */}
      <Section tone="muted" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-mesh-warm opacity-40" />
        <Container className="relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow">
                <LineChart className="size-3.5" /> {t("dashboard.eyebrow")}
              </span>
              <h2 className="display-2 mt-5 text-pretty">{t("dashboard.title")}</h2>
              <p className="mt-5 text-lg text-ink-600 leading-relaxed">{t("dashboard.body")}</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink-700">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-mint-500" /> {t("dashboard.autoAccept")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand-500" /> {t("dashboard.autoCounter")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-ink-700" /> {t("dashboard.autoDecline")}
                </span>
              </div>
            </div>
            <ScrollReveal className="lg:col-span-7">
              <DashboardMock />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ===================== 7 · COMMERCIAL MODEL ===================== */}
      <Section tone="muted">
        <Container size="narrow">
          <div className="text-center">
            <span className="eyebrow">
              <CircleDollarSign className="size-3.5" /> {t("commercialEyebrow")}
            </span>
            <h2 className="display-2 mt-5 text-pretty">{t("commercialTitle")}</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">{t("commercialBody")}</p>
          </div>

          <ScrollReveal className="mt-12 grid sm:grid-cols-3 gap-4" staggerChildren={90}>
            {commercialCards.map((c, i) => (
              <Card
                key={c.title}
                interactive
                elevated={i === 1}
                className={`relative p-7 h-full flex flex-col ${i === 1 ? "border-brand-500/25" : ""}`}
              >
                <div className="font-display font-black text-[2.5rem] leading-none text-brand-500/15 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-bold text-lg tracking-tight">{c.title}</h3>
                <p className="text-ink-600 leading-relaxed mt-2 flex-1">{c.body}</p>
              </Card>
            ))}
          </ScrollReveal>

          <p className="text-center text-sm text-ink-500 mt-8">{t("commercialNote")}</p>
        </Container>
      </Section>

      {/* ===================== OBJECTIONS (magazine Q&A) ===================== */}
      <Section tone="default">
        <SectionHeader eyebrow={t("qsEyebrow")} title={t("qsTitle")} />

        <ScrollReveal className="mt-14 grid md:grid-cols-2 gap-5" staggerChildren={80}>
          {objections.map((o, i) => (
            <Card key={o.q} interactive className="p-7 sm:p-8 h-full group">
              <div className="flex items-start gap-4 h-full">
                <span className="shrink-0 font-display font-black text-3xl leading-none text-brand-500/80 tabular-nums w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold tracking-tight">{o.q}</h3>
                  <p className="mt-4 text-ink-700 leading-relaxed">{o.a}</p>
                </div>
              </div>
            </Card>
          ))}
        </ScrollReveal>
      </Section>

      {/* ===================== 8 · CONTACT — demo / form (cocoa) ===================== */}
      <Section tone="cocoa" id="demo" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-mesh-cocoa" />
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.08]" />
        <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent" />

        <div className="relative grid lg:grid-cols-12 gap-12 items-start">
          <ScrollReveal className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="text-xs uppercase tracking-[0.14em] font-bold text-brand-300">
              {t("demoEyebrow")}
            </span>
            <h2 className="display-2 mt-5 text-pretty text-white">{t("demoTitle")}</h2>
            <p className="mt-5 text-lg text-cream-100/80 leading-relaxed max-w-md">
              {t("demoBody")}
            </p>

            <ul className="mt-8 space-y-5 text-cream-100/85">
              <li className="flex gap-4">
                <div className="size-10 rounded-2xl bg-brand-500/20 text-brand-300 grid place-items-center shrink-0 mt-0.5">
                  <LineChart className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">{t("demoFeature1Title")}</div>
                  <div className="text-sm text-cream-100/65 mt-1">{t("demoFeature1Body")}</div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="size-10 rounded-2xl bg-brand-500/20 text-brand-300 grid place-items-center shrink-0 mt-0.5">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">{t("demoFeature2Title")}</div>
                  <div className="text-sm text-cream-100/65 mt-1">{t("demoFeature2Body")}</div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="size-10 rounded-2xl bg-brand-500/20 text-brand-300 grid place-items-center shrink-0 mt-0.5">
                  <Plug className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">{t("demoFeature3Title")}</div>
                  <div className="text-sm text-cream-100/65 mt-1">{t("demoFeature3Body")}</div>
                </div>
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-7">
            <Card elevated className="relative overflow-hidden p-7 sm:p-10 bg-white border-brand-500/25">
              <div
                aria-hidden
                className="absolute top-0 inset-x-0 h-2 bg-barcode-brand opacity-60 [mask-image:linear-gradient(to_right,transparent,#000_20%,#000_80%,transparent)]"
              />
              <PartnerForm />
            </Card>
            <div className="mt-6 px-2 sm:px-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm text-cream-100/85 font-medium">{t("preferChat")}</p>
              <ChatLauncher variant="compact" locale={locale} />
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
