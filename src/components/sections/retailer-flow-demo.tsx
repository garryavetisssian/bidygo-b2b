"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import {
  ShoppingBag,
  Smartphone,
  Tag,
  Store,
  Check,
  RefreshCw,
  X,
  Receipt,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Actor = "shopper" | "store" | "both";

interface Step {
  id: number;
  actor: Actor;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  labelKey: string;
}

const STEPS: Step[] = [
  { id: 1, actor: "shopper", icon: ShoppingBag, labelKey: "step1" },
  { id: 2, actor: "shopper", icon: Smartphone, labelKey: "step2" },
  { id: 3, actor: "shopper", icon: Tag, labelKey: "step3" },
  { id: 4, actor: "store", icon: Store, labelKey: "step4" },
  { id: 5, actor: "shopper", icon: Check, labelKey: "step5" },
  { id: 6, actor: "both", icon: Receipt, labelKey: "step6" },
];

const CYCLE_MS = 2200;
const PAUSE_AFTER_INTERACTION_MS = 6000;

export function RetailerFlowDemo({ className }: { className?: string }) {
  const t = useTranslations("retailerFlow");
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const resumeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % STEPS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, reduced]);

  function jumpTo(i: number) {
    setActive(i);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), PAUSE_AFTER_INTERACTION_MS);
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ol className="grid gap-3 sm:gap-4 lg:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
        {STEPS.map((step, i) => {
          const isActive = i === active;
          const Icon = step.icon;
          const actorChipColor =
            step.actor === "store"
              ? "bg-brand-500/15 text-brand-700"
              : step.actor === "shopper"
              ? "bg-cream-200 text-ink-700"
              : "bg-mint-500/15 [color:oklch(0.45_0.12_165)]";

          return (
            <li key={step.id} className="relative">
              <motion.button
                type="button"
                onClick={() => jumpTo(i)}
                animate={{ scale: isActive ? 1.04 : 1 }}
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${t(step.labelKey)} — ${t(`actor.${step.actor}`)}`}
                className={cn(
                  "relative overflow-hidden w-full h-full text-left p-5 rounded-2xl border transition-colors duration-300 flex flex-col gap-3 min-h-[200px]",
                  isActive
                    ? "bg-brand-500/8 border-brand-500/30 shadow-lg"
                    : "bg-white border-ink-900/5 hover:border-ink-900/10"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "size-8 rounded-pill grid place-items-center text-sm font-bold tabular-nums transition-colors",
                      isActive ? "bg-brand-500 text-white" : "bg-cream-200 text-ink-700"
                    )}
                  >
                    {step.id}
                  </span>
                  <span
                    className={cn(
                      "text-[0.62rem] uppercase tracking-wider font-bold px-2 py-0.5 rounded-pill",
                      actorChipColor
                    )}
                  >
                    {t(`actor.${step.actor}`)}
                  </span>
                </div>

                <div
                  className={cn(
                    "size-12 rounded-2xl grid place-items-center transition-colors",
                    isActive ? "bg-brand-500/15 text-brand-700" : "bg-cream-100 text-ink-500"
                  )}
                >
                  <Icon className="size-6" strokeWidth={2} />
                </div>

                <div className="font-semibold text-ink-900 leading-snug text-sm flex-1">
                  {t(step.labelKey)}
                </div>

                {step.id === 4 && (
                  <div className="flex gap-1.5 mt-1" aria-hidden>
                    <span className="flex-1 h-7 rounded-pill bg-mint-500/15 border border-mint-500/30 [color:oklch(0.45_0.12_165)] grid place-items-center">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="flex-1 h-7 rounded-pill bg-brand-500/15 border border-brand-500/30 text-brand-700 grid place-items-center">
                      <RefreshCw className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="flex-1 h-7 rounded-pill bg-cream-200 border border-ink-900/5 text-ink-500 grid place-items-center">
                      <X className="size-3.5" strokeWidth={2.5} />
                    </span>
                  </div>
                )}

                {isActive && !paused && !reduced && (
                  <motion.div
                    key={`progress-${active}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-500/70"
                    aria-hidden
                  />
                )}
              </motion.button>

              {i < STEPS.length - 1 && (
                <ArrowRight
                  className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 size-4 text-brand-500/50 z-10 pointer-events-none"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-500">
        <Sparkles className="size-4 text-brand-600" aria-hidden />
        <span>{t("caption")}</span>
      </div>
    </div>
  );
}
