"use client";

/**
 * Product Preview layer — ALL CONTENT IS ILLUSTRATIVE / SAMPLE / DEMO.
 * Numbers here demonstrate RETAILER OUTCOMES and PRODUCT VALUE only — never
 * company scale, adoption, store/city/country counts, or marketplace traction.
 * Every block carries a visible "sample · preview · illustrative" chip.
 * Sample data lives here as constants; swap for real data later.
 */

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Check,
  RefreshCw,
  X,
  Send,
  Headphones,
  ArrowRight,
  Tag,
  ShoppingBag,
  Store,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Package,
} from "lucide-react";
import { Card } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/* ------------------------------ shared chip ------------------------------ */

function SampleChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill bg-honey-200 text-brand-800 px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.12em] uppercase">
      <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
      {label}
    </span>
  );
}

/* ===================== HOW IT WORKS IN 5 SECONDS (understanding) ===================== */

export function HowItWorksGlance() {
  const t = useTranslations("preview.glance");
  const cards = [
    { k: "card1", icon: ShoppingBag, tone: "neutral" as const },
    { k: "card2", icon: TrendingDown, tone: "neutral" as const },
    { k: "card3", icon: TrendingUp, tone: "brand" as const },
  ];
  return (
    <div>
      <div className="text-center mb-8">
        <span className="eyebrow">{t("eyebrow")}</span>
      </div>
      <div className="grid md:grid-cols-3 gap-5 md:gap-3 items-stretch">
        {cards.map((c, i) => {
          const Icon = c.icon;
          const isBrand = c.tone === "brand";
          return (
            <React.Fragment key={c.k}>
              <div
                className={cn(
                  "relative rounded-3xl p-6 sm:p-7 flex flex-col gap-3 h-full border",
                  isBrand
                    ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white border-brand-600/20 shadow-[0_18px_40px_-16px_oklch(0.700_0.196_42/0.45)]"
                    : "bg-white border-ink-900/[0.06] shadow-[0_1px_0_0_oklch(1_0_0/0.6)_inset,0_2px_6px_-1px_oklch(0.155_0.018_36/0.06)]"
                )}
              >
                <div
                  className={cn(
                    "size-11 rounded-2xl grid place-items-center",
                    isBrand ? "bg-white/15 text-white" : "bg-cream-100 text-ink-600"
                  )}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className={cn("text-lg font-bold tracking-tight", isBrand ? "text-white" : "text-ink-900")}>
                  {t(`${c.k}.title`)}
                </h3>
                <p className={cn("text-sm leading-relaxed", isBrand ? "text-white/90" : "text-ink-600")}>
                  {t(`${c.k}.body`)}
                </p>
                {i < cards.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 size-5 text-brand-400 z-[1]" aria-hidden />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ===================== #1 · ANATOMY OF A RECOVERED SALE ===================== */

export function RecoveredSaleAnatomy() {
  const t = useTranslations("preview.anatomy");
  const steps = [
    { k: "shelf", label: t("shelfLabel"), value: "$129", sub: t("product"), icon: Headphones, tone: "ink" },
    { k: "offer", label: t("offerLabel"), value: "$95", sub: t("offerSub"), icon: Tag, tone: "honey" },
    { k: "decision", label: t("decisionLabel"), value: t("decisionValue"), sub: t("decisionSub"), icon: Check, tone: "brand" },
    { k: "final", label: t("finalLabel"), value: "$95", sub: "", icon: ShoppingBag, tone: "ink" },
    { k: "outcome", label: t("outcomeLabel"), value: t("outcomeValue"), sub: t("outcomeSub"), icon: TrendingUp, tone: "mint" },
  ];
  const toneCls: Record<string, string> = {
    ink: "bg-cream-100 text-ink-700",
    honey: "bg-honey-200 text-brand-800",
    brand: "bg-brand-500/12 text-brand-700",
    mint: "bg-mint-500/15 text-[oklch(0.40_0.11_165)]",
  };

  return (
    <Card elevated className="p-6 sm:p-9">
      <div className="flex items-center justify-between gap-4 mb-7">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("title")}</h3>
          <p className="mt-2 text-ink-600 text-sm sm:text-base">{t("note")}</p>
        </div>
        <SampleChip label={t("badge")} />
      </div>

      <div className="grid sm:grid-cols-5 gap-3 sm:gap-2 items-stretch">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <React.Fragment key={s.k}>
              <div className="relative rounded-2xl border border-ink-900/[0.06] bg-white p-4 flex flex-col gap-2 h-full">
                <div className={cn("size-9 rounded-xl grid place-items-center", toneCls[s.tone])}>
                  <Icon className="size-4" />
                </div>
                <div className="text-[0.65rem] uppercase tracking-wider font-bold text-ink-500">{s.label}</div>
                <div className="font-display font-bold tracking-tight text-ink-900 leading-tight">{s.value}</div>
                {s.sub ? <div className="text-xs text-ink-500 leading-snug">{s.sub}</div> : null}
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 size-4 text-brand-400 z-[1]" aria-hidden />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-2xl bg-mint-500/8 border border-mint-500/20 p-4">
        <Check className="size-4 text-[oklch(0.45_0.12_165)] shrink-0 mt-0.5" />
        <p className="text-sm text-ink-700 leading-relaxed">{t("marginNote")}</p>
      </div>
    </Card>
  );
}

/* ===================== #2 · EXAMPLE RETAILER DASHBOARD ===================== */

const ACTION_STYLE: Record<string, { chip: string; icon: typeof Check }> = {
  accepted: { chip: "bg-mint-500/12 text-[oklch(0.40_0.11_165)]", icon: Check },
  countered: { chip: "bg-brand-500/10 text-brand-700", icon: RefreshCw },
  declined: { chip: "bg-cream-200 text-ink-700", icon: X },
  submitted: { chip: "bg-honey-200 text-brand-800", icon: Send },
};

function ActionDot({ action }: { action: string }) {
  const s = ACTION_STYLE[action] ?? ACTION_STYLE.submitted;
  const Icon = s.icon;
  return (
    <div className={cn("size-8 rounded-xl grid place-items-center shrink-0", s.chip)}>
      <Icon className="size-4" strokeWidth={2.5} />
    </div>
  );
}

const DASH_RECENT = [
  { product: "headphones", amount: "$95", action: "accepted" },
  { product: "sneakers", amount: "$60", action: "countered" },
  { product: "blender", amount: "$120", action: "submitted" },
];

export function PreviewDashboard() {
  const t = useTranslations("preview");
  const stats = [
    { label: t("dashboard.recoveredSales"), value: "42" },
    { label: t("dashboard.recoveredRevenue"), value: "$3,180" },
    { label: t("dashboard.activeProducts"), value: "128" },
    { label: t("dashboard.offersReceived"), value: "211" },
    { label: t("dashboard.avgResponse"), value: "1.4s" },
  ];
  return (
    <Card elevated className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 sm:px-8 pt-6 pb-5 border-b border-ink-900/[0.06] bg-gradient-to-br from-white to-cream-100/60">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-brand-500/12 text-brand-700 grid place-items-center">
            <Store className="size-4" />
          </div>
          <div>
            <div className="font-bold tracking-tight">{t("dashboard.title")}</div>
            <div className="text-xs text-ink-500">{t("dashboard.note")}</div>
          </div>
        </div>
        <SampleChip label={t("dashboard.badge")} />
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-cream-100 border border-ink-900/[0.05] p-4">
              <div className="font-display text-2xl font-black tracking-tight tabular-nums text-brand-700">{s.value}</div>
              <div className="mt-1 text-[0.7rem] leading-snug font-semibold text-ink-600">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-7">
          <div className="text-[0.7rem] uppercase tracking-wider font-bold text-ink-500 mb-3">
            {t("dashboard.recent")} · <span className="text-brand-700">{t("dashboard.period")}</span>
          </div>
          <div className="flex flex-col divide-y divide-ink-900/[0.06]">
            {DASH_RECENT.map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <ActionDot action={r.action} />
                <div className="flex-1 min-w-0 text-sm">
                  <span className="font-semibold text-ink-900">{t(`products.${r.product}`)}</span>
                  <span className="text-ink-500"> · {t(`activity.${r.action}`)}</span>
                </div>
                <div className="font-display font-bold tabular-nums text-ink-800">{r.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ===================== EXAMPLE RETAIL OUTCOMES (replaces Marketplace Snapshot) ===================== */

export function ExampleRetailOutcomes() {
  const t = useTranslations("preview.outcomes");
  // Outcome-led hierarchy: recovered REVENUE leads (the money), three supporting
  // outcome stats give context. No system/speed metrics — outcomes only.
  const supporting = [
    { label: t("recoveredSales"), value: "42", icon: TrendingUp },
    { label: t("avgAcceptedOffer"), value: "$86", icon: Tag },
    { label: t("productsWithOffers"), value: "96", icon: Package },
  ];
  return (
    <Card elevated className="p-6 sm:p-8 overflow-hidden">
      <div className="flex justify-end mb-5">
        <SampleChip label={t("badge")} />
      </div>

      <div className="grid lg:grid-cols-12 gap-5 items-stretch">
        {/* HERO — the recovered-revenue number does the 3-second work */}
        <div className="relative lg:col-span-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white p-7 sm:p-8 flex flex-col justify-center overflow-hidden shadow-[0_18px_40px_-16px_oklch(0.700_0.196_42/0.45)]">
          <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-x-2 text-sm font-semibold text-white/85">
              <CircleDollarSign className="size-4" />
              {t("heroValueLabel")}
              <span className="font-normal text-white/55">· {t("heroPeriod")}</span>
            </div>
            <div className="font-display text-[3.5rem] sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] tabular-nums leading-[0.95] mt-3">
              $3,180
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/90">{t("heroSub")}</p>
          </div>
        </div>

        {/* SUPPORTING — outcome context, visually subordinate to the hero */}
        <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
          {supporting.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="rounded-2xl bg-cream-100 border border-ink-900/[0.05] p-5 flex flex-col gap-2 justify-center"
              >
                <Icon className="size-5 text-brand-600" />
                <div className="font-display text-3xl font-black tracking-tight tabular-nums text-brand-700">
                  {c.value}
                </div>
                <div className="text-xs leading-snug font-semibold text-ink-600">{c.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Momentum — points the eye at the real-shop stories directly below */}
      <p className="mt-6 text-center text-sm text-ink-500">{t("caption")}</p>
    </Card>
  );
}

/* ===================== STORE PROFILES (no locations) ===================== */

const PROFILES = [
  { emoji: "👟", name: "Vega Shoes", cat: "footwear", size: "2", offers: "34", recovered: "$1,950", bg: "bg-honey-200" },
  { emoji: "🎧", name: "Aram Electronics", cat: "electronics", size: "1", offers: "58", recovered: "$4,200", bg: "bg-brand-500/12" },
  { emoji: "🛋️", name: "HomeNest", cat: "home", size: "3", offers: "21", recovered: "$2,480", bg: "bg-mint-500/12" },
  { emoji: "🧥", name: "Nova Fashion", cat: "fashion", size: "1", offers: "41", recovered: "$1,610", bg: "bg-blush-200" },
];

export function StoreProfiles() {
  const t = useTranslations("preview");
  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <SampleChip label={t("profiles.badge")} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PROFILES.map((p) => (
          <Card key={p.name} interactive className="overflow-hidden h-full flex flex-col">
            <div className={cn("h-24 grid place-items-center text-4xl", p.bg)}>{p.emoji}</div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div>
                <h3 className="font-bold tracking-tight leading-tight">{p.name}</h3>
                <p className="text-xs text-ink-500 mt-0.5">{t(`cats.${p.cat}`)}</p>
              </div>
              <div className="text-xs text-ink-500">
                {t("profiles.size")}: <span className="font-semibold text-ink-700">{p.size}</span>
              </div>
              <div className="mt-auto pt-3 border-t border-ink-900/[0.06] grid grid-cols-2 gap-2">
                <div>
                  <div className="font-display font-bold tabular-nums text-ink-900">{p.offers}</div>
                  <div className="text-[0.65rem] text-ink-500 leading-tight">{t("profiles.perWeek")}</div>
                </div>
                <div>
                  <div className="font-display font-bold tabular-nums text-brand-700">{p.recovered}</div>
                  <div className="text-[0.65rem] text-ink-500 leading-tight">{t("profiles.perMonth")}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
