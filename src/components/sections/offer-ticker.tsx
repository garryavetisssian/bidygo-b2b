"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Check, RefreshCw, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "accepted" | "countered" | "rejected";

interface Tick {
  minutesAgo: number;
  shopKey: string;
  amount: string;
  kind: Kind;
}

const TICKS: Tick[] = [
  { minutesAgo: 3, shopKey: "electronics", amount: "$245", kind: "accepted" },
  { minutesAgo: 9, shopKey: "fashion", amount: "$118", kind: "countered" },
  { minutesAgo: 14, shopKey: "footwear", amount: "$72", kind: "accepted" },
  { minutesAgo: 22, shopKey: "beauty", amount: "$58", kind: "countered" },
  { minutesAgo: 31, shopKey: "homeGoods", amount: "$340", kind: "rejected" },
  { minutesAgo: 46, shopKey: "electronics", amount: "$890", kind: "accepted" },
];

const KIND_STYLE: Record<Kind, { dot: string; chip: string; icon: typeof Check }> = {
  accepted: {
    dot: "bg-mint-500",
    chip: "bg-[oklch(0.95_0.06_165)] text-[oklch(0.35_0.10_165)] border-[oklch(0.75_0.16_165)]/30",
    icon: Check,
  },
  countered: {
    dot: "bg-brand-500",
    chip: "bg-brand-500/10 text-brand-700 border-brand-500/25",
    icon: RefreshCw,
  },
  rejected: {
    dot: "bg-ink-500",
    chip: "bg-cream-200 text-ink-700 border-ink-900/8",
    icon: X,
  },
};

export function OfferTicker({ className }: { className?: string }) {
  const t = useTranslations("offerTicker");
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TICKS.length), 2800);
    return () => clearInterval(id);
  }, []);

  const tick = TICKS[idx];
  const style = KIND_STYLE[tick.kind];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "relative w-full max-w-xl mx-auto rounded-[2rem] bg-white shadow-xl border border-ink-900/5 p-5 sm:p-6 overflow-hidden",
        className
      )}
      aria-live="polite"
      aria-atomic
    >
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand-500/10 text-brand-700 px-3 py-1 text-[0.7rem] font-bold tracking-wider uppercase">
          <Sparkles className="size-3" /> {t("badge")}
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-ink-500">
          <span className={cn("size-2 rounded-full animate-pulse", style.dot)} />
          {t("live")}
        </span>
      </div>

      <div className="min-h-[88px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${idx}-${tick.shopKey}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center gap-4"
          >
            <div className={cn("size-12 rounded-2xl grid place-items-center shrink-0 border", style.chip)}>
              <Icon className="size-5" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-ink-500 font-medium">
                {t("timeAgo", { minutes: tick.minutesAgo })}
              </div>
              <div className="font-semibold text-ink-900 mt-0.5 leading-snug">
                {t(`line.${tick.kind}`, {
                  shop: t(`shop.${tick.shopKey}`),
                  amount: tick.amount,
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-1.5">
        {TICKS.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-pill transition-all",
              i === idx ? "w-6 bg-brand-500" : "w-1.5 bg-ink-200"
            )}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
