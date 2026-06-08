"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { RangeField } from "@/components/ui/range-field";

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
  const intFmt = React.useMemo(
    () => new Intl.NumberFormat(cfg.intlLocale, { maximumFractionDigits: 0 }),
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
          <RangeField
            label={tRoi("visitorsLabel")}
            value={visitors}
            min={RANGES.visitors.min}
            max={RANGES.visitors.max}
            step={RANGES.visitors.step}
            format={(v) => intFmt.format(v)}
            onChange={setVisitors}
          />
          <RangeField
            label={tRoi("walkAwayLabel")}
            value={walkAway}
            min={RANGES.walkAway.min}
            max={RANGES.walkAway.max}
            step={RANGES.walkAway.step}
            format={(v) => `${v}%`}
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
            ≈ {intFmt.format(recovered)}{" "}
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
