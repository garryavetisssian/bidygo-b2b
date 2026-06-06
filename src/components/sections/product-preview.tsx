"use client";

/**
 * Product Preview layer — ALL CONTENT IS ILLUSTRATIVE / SAMPLE / DEMO.
 * Purpose: demonstrate the future state of the Bidygo product (à la Figma sample
 * projects / Shopify demo stores), not to present verified traction. Every block
 * carries a visible "sample · preview" chip. Sample data lives here as constants
 * and is meant to be swapped for real data later. Prose labels come from the
 * `preview` i18n namespace (en/ru/am).
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
  Clock,
  Tag,
  ShoppingBag,
  Store,
  Layers,
  TrendingUp,
  Users,
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

const DASH_RECENT = [
  { store: "Aram Electronics", product: "headphones", amount: "$95", action: "accepted" },
  { store: "Vega Shoes", product: "sneakers", amount: "$60", action: "countered" },
  { store: "HomeNest", product: "blender", amount: "$120", action: "submitted" },
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
                  <span className="font-semibold text-ink-900">{r.store}</span>
                  <span className="text-ink-500"> · {t(`products.${r.product}`)}</span>
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

/* ===================== #3 · ACTIVITY FEED ===================== */

const ACTION_STYLE: Record<string, { dot: string; chip: string; icon: typeof Check }> = {
  accepted: { dot: "bg-mint-500", chip: "bg-mint-500/12 text-[oklch(0.40_0.11_165)]", icon: Check },
  countered: { dot: "bg-brand-500", chip: "bg-brand-500/10 text-brand-700", icon: RefreshCw },
  declined: { dot: "bg-ink-500", chip: "bg-cream-200 text-ink-700", icon: X },
  submitted: { dot: "bg-honey-200", chip: "bg-honey-200 text-brand-800", icon: Send },
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

const FEED = [
  { ago: 2, store: "Aram Electronics", city: "Yerevan", cat: "electronics", product: "headphones", amount: "$95", action: "accepted" },
  { ago: 6, store: "Vega Shoes", city: "Tbilisi", cat: "footwear", product: "sneakers", amount: "$60", action: "countered" },
  { ago: 11, store: "Nova Fashion", city: "Batumi", cat: "fashion", product: "jacket", amount: "$40", action: "declined" },
  { ago: 17, store: "HomeNest", city: "Yerevan", cat: "home", product: "blender", amount: "$120", action: "submitted" },
  { ago: 23, store: "Lumen Beauty", city: "Gyumri", cat: "beauty", product: "perfume", amount: "$55", action: "accepted" },
  { ago: 31, store: "PixelTech", city: "Tbilisi", cat: "electronics", product: "headphones", amount: "$210", action: "accepted" },
];

export function ActivityFeed() {
  const t = useTranslations("preview");
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="inline-flex items-center gap-2">
          <span className="relative inline-flex size-2">
            <span className="absolute inset-0 rounded-full bg-mint-500/60 animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-mint-500" />
          </span>
          <span className="font-bold tracking-tight text-ink-900">{t("activity.title")}</span>
        </div>
        <SampleChip label={t("activity.badge")} />
      </div>

      <div className="flex flex-col divide-y divide-ink-900/[0.06]">
        {FEED.map((r, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <ActionDot action={r.action} />
            <div className="flex-1 min-w-0">
              <div className="text-sm leading-snug">
                <span className="font-semibold text-ink-900">{r.store}</span>
                <span className="text-ink-500"> · {t(`cats.${r.cat}`)} · {r.city}</span>
              </div>
              <div className="text-xs text-ink-500 mt-0.5">
                {t(`products.${r.product}`)} · {r.amount} · {t(`activity.${r.action}`)}
              </div>
            </div>
            <div className="inline-flex items-center gap-1 text-xs text-ink-400 shrink-0">
              <Clock className="size-3" /> {t("activity.ago", { m: r.ago })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ===================== #4 · MARKETPLACE SNAPSHOT ===================== */

export function MarketplaceSnapshot() {
  const t = useTranslations("preview.snapshot");
  const cells = [
    { label: t("stores"), value: "37", icon: Store },
    { label: t("categories"), value: "6", icon: Layers },
    { label: t("offers"), value: "2,480", icon: RefreshCw },
    { label: t("recovered"), value: "690", icon: TrendingUp },
  ];
  return (
    <div className="rounded-3xl bg-gradient-to-br from-ink-900 to-cocoa-800 text-cream-50 p-6 sm:p-8 relative overflow-hidden border border-ink-900/10">
      <div aria-hidden className="absolute inset-0 bg-mesh-cocoa opacity-60" />
      <div aria-hidden className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />
      <div className="relative">
        <div className="flex justify-end mb-4">
          <SampleChip label={t("badge")} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {cells.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="flex flex-col gap-1.5">
                <Icon className="size-5 text-brand-300" />
                <div className="font-display text-3xl sm:text-4xl font-black tracking-tight tabular-nums">{c.value}</div>
                <div className="text-xs text-cream-100/70 leading-snug">{c.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ===================== #5 · STORE PROFILES ===================== */

const PROFILES = [
  { emoji: "👟", name: "Vega Shoes", cat: "footwear", city: "Tbilisi", size: "2", offers: "34", recovered: "$1,950", bg: "bg-honey-200" },
  { emoji: "🎧", name: "Aram Electronics", cat: "electronics", city: "Yerevan", size: "1", offers: "58", recovered: "$4,200", bg: "bg-brand-500/12" },
  { emoji: "🛋️", name: "HomeNest", cat: "home", city: "Yerevan", size: "3", offers: "21", recovered: "$2,480", bg: "bg-mint-500/12" },
  { emoji: "🧥", name: "Nova Fashion", cat: "fashion", city: "Batumi", size: "1", offers: "41", recovered: "$1,610", bg: "bg-blush-200" },
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
                <p className="text-xs text-ink-500 mt-0.5">{t(`cats.${p.cat}`)} · {p.city}</p>
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

/* ===================== #6 · FOUNDING RETAIL PARTNER SIGNAL ===================== */

export function FoundingCohort() {
  const t = useTranslations("preview");
  const cats = ["electronics", "fashion", "footwear", "beauty", "home"];
  const taken = 8;
  const total = 12;
  const pct = Math.round((taken / total) * 100);
  return (
    <Card elevated className="p-6 sm:p-9 relative overflow-hidden">
      <div aria-hidden className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-500/8 blur-3xl" />
      <div className="relative grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="mb-4"><SampleChip label={t("founding.badge")} /></div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("founding.title")}</h3>
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-2xl bg-cream-100 border border-ink-900/[0.06] px-4 py-3">
            <span className="relative inline-flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-brand-500/60 animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-brand-500" />
            </span>
            <span className="text-sm text-ink-700">
              {t("founding.onboarding")}: <span className="font-semibold text-ink-900">Aram Electronics</span>
            </span>
          </div>
          <p className="mt-5 text-sm text-ink-500 leading-relaxed flex items-start gap-2">
            <Users className="size-4 text-brand-600 shrink-0 mt-0.5" /> {t("founding.note")}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-sm font-semibold text-ink-700">{t("founding.slots")}</span>
              <span className="font-display font-bold text-ink-900 tabular-nums">
                {t("founding.slotsValue", { taken, total })}
              </span>
            </div>
            <div className="h-3 rounded-pill bg-cream-200 overflow-hidden">
              <div className="h-full rounded-pill bg-gradient-to-r from-brand-400 to-brand-600" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-ink-700 mb-3">{t("founding.categories")}</div>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-pill bg-brand-500/10 text-brand-700 px-3 py-1.5 text-xs font-semibold">
                  <Tag className="size-3" /> {t(`cats.${c}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
