"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Label } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

// Compact homepage teaser. The full email-gated tool lives on /calculator.
// Math constants mirror roi-calculator.tsx so the teaser and full tool agree.
const CURRENCY: Record<string, { code: string; intlLocale: string }> = {
  en: { code: "USD", intlLocale: "en-US" },
  ru: { code: "RUB", intlLocale: "ru-RU" },
  am: { code: "AMD", intlLocale: "hy-AM" },
};

const RECOVERY_RATE = 0.08;
const DISCOUNT_FACTOR = 0.88;
const FIXED_TICKET = 95; // teaser keeps ticket fixed; full calculator exposes it.

const RANGES = {
  visitors: { min: 200, max: 20000, step: 100, default: 2400 },
  walkAway: { min: 30, max: 95, step: 1, default: 72 },
};

export function CalculatorTeaser() {
  const locale = useLocale();
  const t = useTranslations("homePage.calcTeaser");
  const tRoi = useTranslations("roiCalculator");
  const cfg = CURRENCY[locale] ?? CURRENCY.en;

  const [visitors, setVisitors] = React.useState(RANGES.visitors.default);
  const [walkAway, setWalkAway] = React.useState(RANGES.walkAway.default);

  const fmt = React.useMemo(
    () =>
      new Intl.NumberFormat(cfg.intlLocale, {
        style: "currency",
        currency: cfg.code,
        maximumFractionDigits: 0,
      }),
    [cfg]
  );

  const lost = Math.round(visitors * (walkAway / 100));
  const recovered = Math.round(lost * RECOVERY_RATE);
  const additional = Math.round(recovered * FIXED_TICKET * DISCOUNT_FACTOR);

  return (
    <div className="rounded-[2rem] bg-white shadow-xl border border-ink-900/5 p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto">
      <div className="flex flex-col gap-3 mb-7">
        <span className="inline-flex items-center gap-1.5 self-start rounded-pill bg-brand-500/10 text-brand-700 px-3 py-1 text-[0.7rem] font-bold tracking-wider uppercase">
          <Calculator className="size-3" /> {t("eyebrow")}
        </span>
        <h2 className="display-3 text-pretty">{t("title")}</h2>
        <p className="text-ink-600 leading-relaxed max-w-xl">{t("note")}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-6">
          <TeaserSlider
            label={tRoi("visitorsLabel")}
            value={visitors}
            min={RANGES.visitors.min}
            max={RANGES.visitors.max}
            step={RANGES.visitors.step}
            display={new Intl.NumberFormat(cfg.intlLocale).format(visitors)}
            onChange={setVisitors}
          />
          <TeaserSlider
            label={tRoi("walkAwayLabel")}
            value={walkAway}
            min={RANGES.walkAway.min}
            max={RANGES.walkAway.max}
            step={RANGES.walkAway.step}
            display={`${walkAway}%`}
            onChange={setWalkAway}
          />
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-cream-100 to-brand-500/8 p-6 sm:p-8 flex flex-col gap-2 text-center">
          <span className="text-[0.7rem] uppercase tracking-wider font-bold text-ink-500 leading-snug">
            {t("resultLabel")}
          </span>
          <motion.span
            key={additional}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-display text-4xl sm:text-5xl font-black tracking-tight tabular-nums text-brand-700"
          >
            +{fmt.format(additional)}
          </motion.span>
          <span className="text-xs text-ink-500">
            ≈ {new Intl.NumberFormat(cfg.intlLocale).format(recovered)}{" "}
            {tRoi("output.recoveredTitle").toLowerCase()}
          </span>
          <p className="mt-3 text-xs text-ink-500 leading-relaxed border-t border-ink-900/8 pt-3">
            {t("intelNote")}
          </p>
          <Link href="/calculator" className="mt-4">
            <Button size="lg" className="w-full">
              {t("ctaLabel")} <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TeaserSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <Label className="text-base">{label}</Label>
        <div className="font-display text-xl font-bold tracking-tight tabular-nums text-ink-900">
          {display}
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
    </div>
  );
}
