"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { User, Sparkles, Check, Mail } from "lucide-react";
import { Label, Input } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CurrencyConfig {
  code: string;
  intlLocale: string;
}

const CURRENCY: Record<string, CurrencyConfig> = {
  en: { code: "USD", intlLocale: "en-US" },
  ru: { code: "RUB", intlLocale: "ru-RU" },
  am: { code: "AMD", intlLocale: "hy-AM" },
};

const RECOVERY_RATE = 0.08;
const DISCOUNT_FACTOR = 0.88;
const TOTAL_ICONS = 50;
const OPEN_HOURS_PER_MONTH = 300;

const RANGES = {
  visitors: { min: 200, max: 20000, step: 100, default: 2400 },
  walkAway: { min: 30, max: 95, step: 1, default: 72 },
  ticket: { min: 10, max: 1500, step: 5, default: 95 },
};

export function RoiCalculator({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("roiCalculator");
  const cfg = CURRENCY[locale] ?? CURRENCY.en;

  const [visitors, setVisitors] = React.useState(RANGES.visitors.default);
  const [walkAway, setWalkAway] = React.useState(RANGES.walkAway.default);
  const [ticket, setTicket] = React.useState(RANGES.ticket.default);

  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const fmt = React.useMemo(
    () =>
      new Intl.NumberFormat(cfg.intlLocale, {
        style: "currency",
        currency: cfg.code,
        maximumFractionDigits: 0,
      }),
    [cfg]
  );
  const intFmt = React.useMemo(
    () => new Intl.NumberFormat(cfg.intlLocale, { maximumFractionDigits: 0 }),
    [cfg]
  );

  const lost = Math.round(visitors * (walkAway / 100));
  const recovered = Math.round(lost * RECOVERY_RATE);
  const additional = Math.round(recovered * ticket * DISCOUNT_FACTOR);
  const hoursBetween = recovered > 0 ? Math.max(1, Math.round(OPEN_HOURS_PER_MONTH / recovered)) : 0;

  const buyerIcons = Math.max(0, Math.round(TOTAL_ICONS * (1 - walkAway / 100)));
  const recoveredIcons = Math.max(
    walkAway > 0 ? 1 : 0,
    Math.round(TOTAL_ICONS * (walkAway / 100) * RECOVERY_RATE)
  );
  const lostIconsCount = Math.max(0, TOTAL_ICONS - buyerIcons - recoveredIcons);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;
    setSending(true);
    setTimeout(() => {
      // PII redacted: full email never logged — only the domain is kept for traffic-source signal.
      const emailDomain = email.includes("@") ? email.split("@")[1] : "unknown";
      console.log("[roi-calculator] pdf request", {
        emailDomain,
        locale,
        visitors,
        walkAway,
        ticket,
        recovered,
        additional,
      });
      setSending(false);
      setSent(true);
    }, 900);
  }

  return (
    <div
      className={cn(
        "rounded-[2rem] bg-white shadow-xl border border-ink-900/5 p-6 sm:p-10",
        className
      )}
    >
      <div className="flex flex-col gap-3 mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-1.5 self-start rounded-pill bg-brand-500/10 text-brand-700 px-3 py-1 text-[0.7rem] font-bold tracking-wider uppercase">
          <Sparkles className="size-3" /> {t("badge")}
        </span>
        <h2 className="display-3 text-pretty">{t("title")}</h2>
        <p className="text-ink-600 leading-relaxed max-w-xl">{t("sub")}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <SliderRow
            label={t("visitorsLabel")}
            hint={t("visitorsHint")}
            value={visitors}
            min={RANGES.visitors.min}
            max={RANGES.visitors.max}
            step={RANGES.visitors.step}
            format={(v) => intFmt.format(v)}
            onChange={setVisitors}
          />
          <SliderRow
            label={t("walkAwayLabel")}
            hint={t("walkAwayHint")}
            value={walkAway}
            min={RANGES.walkAway.min}
            max={RANGES.walkAway.max}
            step={RANGES.walkAway.step}
            format={(v) => `${v}%`}
            onChange={setWalkAway}
          />
          <SliderRow
            label={t("ticketLabel")}
            hint={t("ticketHint")}
            value={ticket}
            min={RANGES.ticket.min}
            max={RANGES.ticket.max}
            step={RANGES.ticket.step}
            format={(v) => fmt.format(v)}
            onChange={setTicket}
          />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="rounded-3xl bg-gradient-to-br from-cream-100 to-brand-500/8 p-6 sm:p-8">
            <div
              className="grid grid-cols-10 gap-1 sm:gap-1.5 max-w-md mx-auto"
              role="img"
              aria-label={t("output.lostTitle") + ": " + intFmt.format(lost)}
            >
              {Array.from({ length: TOTAL_ICONS }).map((_, i) => {
                const isBuyer = i < buyerIcons;
                const isRecovered = !isBuyer && i < buyerIcons + recoveredIcons;
                const color = isBuyer
                  ? "text-mint-500"
                  : isRecovered
                  ? "text-brand-500"
                  : "text-ink-200";
                return (
                  <User
                    key={i}
                    aria-hidden
                    className={cn(
                      "size-5 sm:size-6 transition-colors duration-300",
                      color,
                      isRecovered && "drop-shadow-[0_0_6px_oklch(0.700_0.196_42/0.45)]"
                    )}
                    strokeWidth={2}
                  />
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
              <LegendChip dot="bg-mint-500" label={t("legend.buyers")} />
              <LegendChip dot="bg-brand-500" label={t("legend.recovered")} highlight />
              <LegendChip dot="bg-ink-200" label={t("legend.lost")} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <OutputCard
              label={t("output.lostTitle")}
              value={intFmt.format(lost)}
            />
            <OutputCard
              label={t("output.recoveredTitle")}
              value={intFmt.format(recovered)}
              highlight
            />
            <OutputCard
              label={t("output.salesTitle")}
              value={`+${fmt.format(additional)}`}
              highlight
            />
          </div>

          {recovered > 0 && (
            <p className="text-ink-700 text-sm sm:text-base leading-relaxed">
              {t("context", { count: recovered, hours: hoursBetween })}
            </p>
          )}

          <p className="text-xs text-ink-500 leading-relaxed">{t("disclaimer")}</p>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 border-t border-ink-900/8 pt-8">
        {sent ? (
          <div className="flex items-center gap-3 text-sm">
            <div className="size-9 rounded-full bg-mint-500/15 grid place-items-center">
              <Check className="size-4 text-mint-500" strokeWidth={3} />
            </div>
            <p className="text-ink-900 font-semibold">{t("email.sent")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <div className="flex-1">
              <Label htmlFor="roi-email">{t("email.label")}</Label>
              <Input
                id="roi-email"
                type="email"
                placeholder={t("email.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" size="lg" disabled={sending} className="sm:w-auto w-full">
              {sending ? t("email.sending") : t("email.button")} <Mail className="size-4" />
            </Button>
          </form>
        )}
        <p className="mt-3 text-xs text-ink-500">{t("email.finePrint")}</p>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  hint,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <Label className="text-base">{label}</Label>
        <div className="font-display text-xl font-bold tracking-tight tabular-nums text-ink-900">
          {format(value)}
        </div>
      </div>
      <div className="relative mt-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="w-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-pill
            [&::-webkit-slider-runnable-track]:bg-cream-200
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-brand-500
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:-mt-1.5
            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-brand-500
            [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-pill [&::-moz-range-track]:bg-cream-200"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-pill bg-gradient-to-r from-brand-400 to-brand-500 transition-[width] duration-150"
          style={{ width: `calc(${pct}% - 2px)` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-ink-500">{hint}</p>
    </div>
  );
}

function OutputCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 sm:p-5 border",
        highlight ? "bg-brand-500/8 border-brand-500/25" : "bg-cream-100 border-ink-900/5"
      )}
    >
      <div className="text-[0.7rem] uppercase tracking-wider font-bold text-ink-500 mb-1 leading-snug">
        {label}
      </div>
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "font-display text-2xl sm:text-3xl font-bold tracking-tight tabular-nums",
          highlight ? "text-brand-700" : "text-ink-900"
        )}
      >
        {value}
      </motion.div>
    </div>
  );
}

function LegendChip({
  dot,
  label,
  highlight,
}: {
  dot: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        highlight ? "font-semibold text-brand-700" : "text-ink-600"
      )}
    >
      <span className={cn("size-2.5 rounded-full", dot)} aria-hidden />
      {label}
    </span>
  );
}
