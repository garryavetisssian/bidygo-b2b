import { Info } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface ProofMetric {
  value: string;
  label: string;
  caption: string;
}

/**
 * Aggregate, geography-neutral proof band (homepage §2).
 * Universal numbers come BEFORE local testimonials by design.
 * When `isPlaceholder` is true, every tile is visibly marked as early data
 * and a disclaimer is shown — so honest early figures are never mistaken
 * for verified traction. Swap copy in homePage.proof to go live with real numbers.
 */
export function ProofStats({
  metrics,
  isPlaceholder = false,
  disclaimer,
}: {
  metrics: ProofMetric[];
  isPlaceholder?: boolean;
  disclaimer?: string;
}) {
  // Dormant until real, verified numbers exist. Drop figures into homePage.proof.metrics
  // (and flip isPlaceholder off) to reveal the band — no other change needed.
  if (!metrics?.length) return null;

  return (
    <div className="mt-12">
      <ScrollReveal
        className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5"
        staggerChildren={70}
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            className="relative rounded-3xl bg-white border border-ink-900/[0.06] p-5 sm:p-6 flex flex-col gap-1.5 shadow-[0_1px_0_0_oklch(1_0_0/0.6)_inset,0_2px_6px_-1px_oklch(0.155_0.018_36/0.06)]"
          >
            {isPlaceholder && (
              <span className="absolute right-3 top-3 inline-flex items-center rounded-pill bg-honey-200 text-brand-800 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider uppercase">
                Early
              </span>
            )}
            <span className="font-display text-3xl sm:text-4xl font-black tracking-tight tabular-nums text-brand-700">
              {m.value}
            </span>
            <span className="font-semibold text-ink-900 text-sm sm:text-base leading-snug">
              {m.label}
            </span>
            <span className="text-xs text-ink-500 leading-relaxed">{m.caption}</span>
          </div>
        ))}
      </ScrollReveal>

      {isPlaceholder && disclaimer && (
        <div className="mt-7 flex items-start justify-center gap-2 max-w-2xl mx-auto text-center">
          <Info className="size-4 text-ink-400 shrink-0 mt-0.5" aria-hidden />
          <p className="text-xs text-ink-500 leading-relaxed">{disclaimer}</p>
        </div>
      )}
    </div>
  );
}
