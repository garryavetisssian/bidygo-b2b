"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Check, RefreshCw, Sparkles, Tag, Store, X, Bell, ShoppingBag } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

type Outcome = "accepted" | "countered" | "rejected";
type View = "shopper" | "retailer";

interface DemoProduct {
  name: string;
  category: string;
  list: number;
  floor: number;
  sweet: number;
  imageInitial: string;
}

const products: DemoProduct[] = [
  { name: "AirPro Wireless Headphones", category: "Electronics", list: 299, floor: 235, sweet: 260, imageInitial: "🎧" },
  { name: "Lumière Suede Jacket", category: "Fashion", list: 420, floor: 320, sweet: 365, imageInitial: "🧥" },
  { name: "Stride Runner GT", category: "Footwear", list: 180, floor: 135, sweet: 152, imageInitial: "👟" },
];

export function PriceItDemo({ className }: { className?: string }) {
  const t = useTranslations("priceItDemo");
  const [view, setView] = React.useState<View>("shopper");

  return (
    <div
      className={cn(
        "relative w-full max-w-md mx-auto rounded-[2.5rem] bg-white shadow-xl border border-ink-900/5 p-5 sm:p-6 overflow-hidden",
        className
      )}
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -right-6 -top-6 size-24 rounded-full bg-brand-500/12 blur-2xl pointer-events-none"
      />

      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand-500/10 text-brand-700 px-3 py-1 text-[0.7rem] font-bold tracking-wider uppercase">
          <Sparkles className="size-3" /> {t("liveDemo")}
        </span>
        <div role="tablist" aria-label={t("viewToggleAria")} className="inline-flex rounded-pill bg-cream-100 p-1 text-xs font-semibold">
          {(["shopper", "retailer"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cn(
                "px-3 py-1.5 rounded-pill transition-colors inline-flex items-center gap-1.5",
                view === v ? "bg-white text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-700"
              )}
            >
              {v === "shopper" ? <ShoppingBag className="size-3" /> : <Store className="size-3" />}
              {t(`view.${v}`)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "shopper" ? (
          <motion.div
            key="shopper"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <ShopperView t={t} />
          </motion.div>
        ) : (
          <motion.div
            key="retailer"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <RetailerView t={t} />
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-center text-xs text-ink-500">{t("footer")}</p>
    </div>
  );
}

function ShopperView({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [productIdx, setProductIdx] = React.useState(0);
  const product = products[productIdx];
  const min = Math.round(product.list * 0.5);
  const max = product.list;

  const [offer, setOffer] = React.useState<number>(Math.round(product.list * 0.78));
  const [submitting, setSubmitting] = React.useState(false);
  const [outcome, setOutcome] = React.useState<{ kind: Outcome; counter?: number } | null>(null);

  React.useEffect(() => {
    setOffer(Math.round(product.list * 0.78));
    setOutcome(null);
  }, [productIdx, product.list]);

  const pct = ((offer - min) / (max - min)) * 100;
  const savings = product.list - offer;
  const savingsPct = Math.round((savings / product.list) * 100);

  function submit() {
    setSubmitting(true);
    setOutcome(null);
    setTimeout(() => {
      let result: { kind: Outcome; counter?: number };
      if (offer >= product.sweet) result = { kind: "accepted" };
      else if (offer >= product.floor) result = { kind: "countered", counter: product.sweet };
      else result = { kind: "rejected" };
      setOutcome(result);
      setSubmitting(false);
    }, 1200);
  }

  function reset() {
    setOutcome(null);
    setOffer(Math.round(product.list * 0.78));
  }

  function cycleProduct() {
    setProductIdx((i) => (i + 1) % products.length);
  }

  return (
    <>
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={cycleProduct}
          className="text-xs text-ink-500 hover:text-ink-700 inline-flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="size-3" /> {t("tryAnother")}
        </button>
      </div>

      <div className="mt-3 rounded-3xl bg-cream-100 p-5 flex items-center gap-4">
        <div className="size-16 rounded-2xl bg-white shadow-sm grid place-items-center text-3xl">
          {product.imageInitial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[0.7rem] uppercase tracking-wider font-bold text-ink-400">
            {product.category}
          </div>
          <div className="font-semibold text-ink-900 truncate">{product.name}</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm text-ink-500 line-through">{formatPrice(product.list)}</span>
            <span className="text-xs inline-flex items-center gap-1 text-ink-500">
              <Tag className="size-3" /> {t("listPrice")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between gap-3 mb-2">
          <label htmlFor="offer-slider" className="text-sm font-semibold text-ink-700">
            {t("yourOffer")}
          </label>
          <div className="font-display text-3xl font-bold tracking-tight text-ink-900">
            {formatPrice(offer)}
          </div>
        </div>

        <div className="relative">
          <input
            id="offer-slider"
            type="range"
            min={min}
            max={max}
            step={5}
            value={offer}
            onChange={(e) => {
              setOffer(Number(e.target.value));
              setOutcome(null);
            }}
            disabled={submitting}
            className="w-full appearance-none bg-transparent cursor-pointer
              [&::-webkit-slider-runnable-track]:h-2.5 [&::-webkit-slider-runnable-track]:rounded-pill
              [&::-webkit-slider-runnable-track]:bg-cream-200
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-6
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-brand-500
              [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:-mt-[7px]
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-6
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-brand-500
              [&::-moz-range-track]:h-2.5 [&::-moz-range-track]:rounded-pill [&::-moz-range-track]:bg-cream-200"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-2.5 rounded-pill bg-gradient-to-r from-brand-400 to-brand-500 transition-[width] duration-150"
            style={{ width: `calc(${pct}% - 2px)` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
          <span>{formatPrice(min)}</span>
          <span className="font-semibold [color:oklch(0.45_0.12_165)]">
            {t("savings", { amount: formatPrice(savings), pct: savingsPct })}
          </span>
          <span>{formatPrice(max)}</span>
        </div>
      </div>

      <div className="mt-6 min-h-[88px]">
        <AnimatePresence mode="wait">
          {outcome ? (
            <motion.div
              key={`outcome-${outcome.kind}`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            >
              <OutcomeCard outcome={outcome} product={product} offer={offer} onReset={reset} t={t} />
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="button"
              onClick={submit}
              disabled={submitting}
              className="w-full h-14 rounded-pill bg-brand-500 text-white font-semibold text-base shadow-md hover:bg-brand-600 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="size-2 rounded-full bg-white animate-pulse" />
                  {t("sending")}
                </>
              ) : (
                <>
                  {t("offerCta", { amount: formatPrice(offer) })} <Sparkles className="size-4" />
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function OutcomeCard({
  outcome,
  product,
  offer,
  onReset,
  t,
}: {
  outcome: { kind: Outcome; counter?: number };
  product: DemoProduct;
  offer: number;
  onReset: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  if (outcome.kind === "accepted") {
    return (
      <div className="rounded-3xl bg-[oklch(0.95_0.06_165)] border border-[oklch(0.75_0.16_165)]/30 p-4 flex items-start gap-3">
        <div className="size-10 rounded-full bg-mint-500 grid place-items-center shrink-0">
          <Check className="size-5 text-white" strokeWidth={3} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-ink-900">{t("acceptedTitle")}</div>
          <p className="text-sm text-ink-700 mt-0.5">
            {t("acceptedBody", { savings: formatPrice(product.list - offer) })}
          </p>
          <button onClick={onReset} className="text-xs text-brand-700 font-semibold mt-2 hover:text-brand-600">
            {t("tryDifferent")}
          </button>
        </div>
      </div>
    );
  }
  if (outcome.kind === "countered") {
    return (
      <div className="rounded-3xl bg-brand-500/10 border border-brand-500/25 p-4 flex items-start gap-3">
        <div className="size-10 rounded-full bg-brand-500 grid place-items-center shrink-0">
          <Store className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-ink-900">{t("counterTitle", { amount: formatPrice(outcome.counter!) })}</div>
          <p className="text-sm text-ink-700 mt-0.5">{t("counterBody")}</p>
          <button onClick={onReset} className="text-xs text-brand-700 font-semibold mt-2 hover:text-brand-600">
            {t("newOffer")}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-3xl bg-cream-200 border border-ink-900/8 p-4 flex items-start gap-3">
      <div className="size-10 rounded-full bg-ink-700 grid place-items-center shrink-0">
        <X className="size-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="font-bold text-ink-900">{t("rejectedTitle")}</div>
        <p className="text-sm text-ink-700 mt-0.5">{t("rejectedBody")}</p>
        <button onClick={onReset} className="text-xs text-brand-700 font-semibold mt-2 hover:text-brand-600">
          {t("adjustOffer")}
        </button>
      </div>
    </div>
  );
}

type RetailerAction = "accept" | "counter" | "pass";

function RetailerView({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [resolved, setResolved] = React.useState<RetailerAction | null>(null);

  const product = products[0];
  const offer = 245;
  const counter = product.sweet;

  function reset() {
    setResolved(null);
  }

  return (
    <>
      <div className="mt-1 rounded-3xl bg-cream-100 p-4 flex items-start gap-3">
        <div className="size-10 rounded-2xl bg-brand-500/15 text-brand-700 grid place-items-center shrink-0">
          <Bell className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-ink-500 font-medium">{t("retailer.incomingLabel")}</div>
          <div className="font-semibold text-ink-900 leading-snug">
            {t("retailer.incomingTitle", { product: product.name })}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl bg-white border border-ink-900/8 p-5 shadow-sm">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="text-[0.7rem] uppercase tracking-wider font-bold text-ink-400">
              {t("retailer.offerLabel")}
            </div>
            <div className="font-display text-4xl font-bold tracking-tight text-ink-900 mt-1">
              {formatPrice(offer)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-ink-500">{t("retailer.listLabel")}</div>
            <div className="text-sm font-semibold text-ink-700 line-through">{formatPrice(product.list)}</div>
            <div className="text-xs text-brand-700 font-bold mt-0.5">
              {t("retailer.marginNote", { pct: Math.round(((offer - product.floor) / product.floor) * 100) })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 min-h-[88px]">
        <AnimatePresence mode="wait">
          {resolved ? (
            <motion.div
              key={`r-${resolved}`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <RetailerResolution kind={resolved} counter={counter} onReset={reset} t={t} />
            </motion.div>
          ) : (
            <motion.div
              key="actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 gap-2"
            >
              <button
                type="button"
                onClick={() => setResolved("accept")}
                className="h-12 rounded-pill bg-mint-500 text-white font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
              >
                {t("retailer.accept")}
              </button>
              <button
                type="button"
                onClick={() => setResolved("counter")}
                className="h-12 rounded-pill bg-brand-500 text-white font-semibold text-sm shadow-md hover:bg-brand-600 transition-colors"
              >
                {t("retailer.counter")}
              </button>
              <button
                type="button"
                onClick={() => setResolved("pass")}
                className="h-12 rounded-pill bg-cream-200 text-ink-700 font-semibold text-sm hover:bg-cream-300 transition-colors"
              >
                {t("retailer.pass")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function RetailerResolution({
  kind,
  counter,
  onReset,
  t,
}: {
  kind: RetailerAction;
  counter: number;
  onReset: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  if (kind === "accept") {
    return (
      <div className="rounded-3xl bg-[oklch(0.95_0.06_165)] border border-[oklch(0.75_0.16_165)]/30 p-4 flex items-start gap-3">
        <div className="size-10 rounded-full bg-mint-500 grid place-items-center shrink-0">
          <Check className="size-5 text-white" strokeWidth={3} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-ink-900">{t("retailer.acceptedTitle")}</div>
          <p className="text-sm text-ink-700 mt-0.5">{t("retailer.acceptedBody")}</p>
          <button onClick={onReset} className="text-xs text-brand-700 font-semibold mt-2 hover:text-brand-600">
            {t("retailer.next")}
          </button>
        </div>
      </div>
    );
  }
  if (kind === "counter") {
    return (
      <div className="rounded-3xl bg-brand-500/10 border border-brand-500/25 p-4 flex items-start gap-3">
        <div className="size-10 rounded-full bg-brand-500 grid place-items-center shrink-0">
          <RefreshCw className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-ink-900">{t("retailer.counteredTitle", { amount: formatPrice(counter) })}</div>
          <p className="text-sm text-ink-700 mt-0.5">{t("retailer.counteredBody")}</p>
          <button onClick={onReset} className="text-xs text-brand-700 font-semibold mt-2 hover:text-brand-600">
            {t("retailer.next")}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-3xl bg-cream-200 border border-ink-900/8 p-4 flex items-start gap-3">
      <div className="size-10 rounded-full bg-ink-700 grid place-items-center shrink-0">
        <X className="size-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="font-bold text-ink-900">{t("retailer.passedTitle")}</div>
        <p className="text-sm text-ink-700 mt-0.5">{t("retailer.passedBody")}</p>
        <button onClick={onReset} className="text-xs text-brand-700 font-semibold mt-2 hover:text-brand-600">
          {t("retailer.next")}
        </button>
      </div>
    </div>
  );
}
