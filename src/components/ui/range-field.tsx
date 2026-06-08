"use client";

import * as React from "react";
import { Label } from "@/components/ui/primitives";

/**
 * Shared slider + manual-entry field for the calculators.
 *
 * Alignment fix: a native <input type=range> insets its thumb so the centre
 * travels from thumbR → (width − thumbR). The visible track/fill/thumb are
 * drawn as divs positioned with that SAME inset formula, so the fill end and
 * the thumb centre are always identical and the thumb never overflows the
 * rounded track ends. The real range input sits transparent on top for
 * drag / click / keyboard a11y (focus ring via peer-focus-visible).
 *
 * Manual entry: the value is an editable numeric input — type to set. The
 * slider stays capped at [min, max], but MANUAL typing may exceed max (a
 * larger shop can enter its real numbers and still get a correct result);
 * the visible thumb simply pins to the track end. Lower bound is always min.
 * `inputMax` caps manual entry where a hard ceiling is meaningful (e.g. a
 * percentage at 100).
 */

const THUMB = "1.25rem"; // 20px — keep in sync with the thumb size class below
const HALF_THUMB = "0.625rem"; // 10px

export function RangeField({
  label,
  hint,
  value,
  min,
  max,
  step,
  format,
  onChange,
  inputMax,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
  /** Hard ceiling for MANUAL entry. Defaults to no upper limit (slider still caps at max). */
  inputMax?: number;
}) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  // Visual position is clamped to the track even if the manual value exceeds max.
  const rawPct = max > min ? (value - min) / (max - min) : 0;
  const pct = Math.min(1, Math.max(0, rawPct));
  // Position of the thumb centre, inset by half the thumb at each end.
  const pos = `calc(${pct} * (100% - ${THUMB}) + ${HALF_THUMB})`;
  // The native slider can only represent [min, max]; manual overflow lives in state only.
  const sliderValue = Math.min(max, Math.max(min, value));

  function commit(raw: string) {
    const digits = raw.replace(/[^0-9]/g, "");
    if (digits === "") return;
    const parsed = Number.parseInt(digits, 10);
    if (Number.isNaN(parsed)) return;
    const upper = inputMax ?? Number.POSITIVE_INFINITY;
    onChange(Math.min(upper, Math.max(min, parsed)));
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <Label className="text-base mb-0">{label}</Label>
        <input
          inputMode="numeric"
          aria-label={label}
          value={editing ? draft : format(value)}
          onFocus={() => {
            setEditing(true);
            setDraft(String(value));
          }}
          onChange={(e) => {
            setDraft(e.target.value);
            commit(e.target.value);
          }}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          className="w-28 sm:w-36 bg-transparent text-right font-display text-xl font-bold tracking-tight tabular-nums text-ink-900 px-1 py-0.5 -mr-1 rounded-lg border-b-2 border-transparent hover:border-ink-900/15 focus:border-brand-500 focus:outline-none transition-colors"
        />
      </div>

      <div className="relative mt-3 h-5">
        {/* Native control — transparent, on top, drives interaction + a11y */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          aria-valuetext={format(value)}
          className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5
            [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:border-0"
        />
        {/* Track */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-pill bg-cream-200"
        />
        {/* Fill — ends exactly at the thumb centre */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-pill bg-gradient-to-r from-brand-400 to-brand-500 transition-[width] duration-100"
          style={{ width: pos }}
        />
        {/* Thumb — centred on the same position as the fill end */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-5 rounded-full bg-white border-4 border-brand-500 shadow-md transition-[left] duration-100 peer-focus-visible:border-brand-600 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/30"
          style={{ left: pos }}
        />
      </div>

      {hint ? <p className="mt-1.5 text-xs text-ink-500">{hint}</p> : null}
    </div>
  );
}
