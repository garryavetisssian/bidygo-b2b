import * as React from "react";
import { Bell, Tag, TrendingUp, Search, LayoutGrid, BarChart3, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A visual mock of the retailer dashboard. Pure presentational chrome —
 * not real data. Used decoratively across the marketing site so shop owners
 * get a concrete sense of what they'll see.
 */
export function DashboardMock({
  className,
  variant = "wide",
}: {
  className?: string;
  variant?: "wide" | "compact";
}) {
  const offers = [
    { product: "AirPro Wireless", offer: "$248", state: "auto-accept", tint: "mint" as const, time: "12s" },
    { product: "Lumière Jacket", offer: "$365", state: "counter $380", tint: "brand" as const, time: "1m" },
    { product: "Stride Runner GT", offer: "$118", state: "below floor", tint: "ink" as const, time: "3m" },
  ];

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white border border-ink-900/[0.08] overflow-hidden",
        "shadow-[0_1px_0_0_oklch(1_0_0/0.6)_inset,0_30px_60px_-20px_oklch(0.155_0.018_36/0.25),0_10px_24px_-8px_oklch(0.155_0.018_36/0.12)]",
        className
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 h-9 bg-cream-100 border-b border-ink-900/[0.06]">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[oklch(0.78_0.18_28)]" />
          <span className="size-2.5 rounded-full bg-[oklch(0.85_0.15_85)]" />
          <span className="size-2.5 rounded-full bg-[oklch(0.78_0.14_140)]" />
        </div>
        <div className="ml-2 flex-1 max-w-xs mx-auto h-5 rounded-md bg-white border border-ink-900/[0.06] flex items-center px-2 gap-1.5 text-[0.6rem] text-ink-400 font-mono">
          <Search className="size-2.5" />
          dashboard.bidygo.com
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative inline-flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-mint-500/70 animate-ping" />
            <span className="relative size-1.5 rounded-full bg-mint-500" />
          </span>
          <span className="text-[0.6rem] font-bold tracking-wider uppercase text-mint-500">Live</span>
        </div>
      </div>

      <div className="flex">
        {variant === "wide" && (
          <div className="hidden sm:flex flex-col gap-1 w-32 p-3 border-r border-ink-900/[0.06] bg-cream-50/60">
            <SidebarItem icon={LayoutGrid} label="Offers" active />
            <SidebarItem icon={BarChart3} label="Analytics" />
            <SidebarItem icon={Tag} label="Rules" />
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        )}

        <div className="flex-1 p-4 sm:p-5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[0.65rem] uppercase tracking-wider font-bold text-ink-400">Inbox</div>
              <div className="text-sm font-bold text-ink-900">Live offers</div>
            </div>
            <div className="flex items-center gap-1.5 rounded-pill bg-brand-500/10 text-brand-700 px-2.5 py-1 text-[0.6rem] font-bold tracking-wider uppercase">
              <Bell className="size-2.5" />
              3 new
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <Stat label="Accepted" value="142" tint="mint" />
            <Stat label="Countered" value="38" tint="brand" />
            <Stat label="Avg margin" value="+18%" tint="ink" />
          </div>

          <div className="flex flex-col gap-1.5">
            {offers.map((o, i) => (
              <OfferRow key={i} {...o} />
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-dashed border-ink-900/[0.08] flex items-center justify-between text-[0.6rem] text-ink-400">
            <span className="font-mono tabular-nums">5,284 offers · this month</span>
            <span className="inline-flex items-center gap-0.5 text-brand-700 font-semibold">
              View all <ChevronRight className="size-2.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.65rem] font-medium",
        active ? "bg-brand-500/12 text-brand-700 font-semibold" : "text-ink-600"
      )}
    >
      <Icon className="size-3" />
      <span>{label}</span>
    </div>
  );
}

function Stat({ label, value, tint }: { label: string; value: string; tint: "mint" | "brand" | "ink" }) {
  const bg =
    tint === "mint"
      ? "bg-mint-500/8 border-mint-500/20"
      : tint === "brand"
      ? "bg-brand-500/8 border-brand-500/25"
      : "bg-cream-100 border-ink-900/[0.06]";
  const colorVal =
    tint === "mint" ? "text-[oklch(0.45_0.12_165)]" : tint === "brand" ? "text-brand-700" : "text-ink-900";
  return (
    <div className={cn("rounded-lg p-2 border", bg)}>
      <div className="text-[0.55rem] uppercase tracking-wider font-bold text-ink-500 leading-none">
        {label}
      </div>
      <div className={cn("mt-1 font-display font-bold tabular-nums text-base leading-none", colorVal)}>
        {value}
      </div>
    </div>
  );
}

function OfferRow({
  product,
  offer,
  state,
  tint,
  time,
}: {
  product: string;
  offer: string;
  state: string;
  tint: "mint" | "brand" | "ink";
  time: string;
}) {
  const pillCls =
    tint === "mint"
      ? "bg-mint-500/15 text-[oklch(0.40_0.12_165)]"
      : tint === "brand"
      ? "bg-brand-500/15 text-brand-700"
      : "bg-ink-900/8 text-ink-700";
  const stateIcon = tint === "mint" ? "●" : tint === "brand" ? "↻" : "✕";
  return (
    <div className="rounded-lg bg-cream-50/50 border border-ink-900/[0.04] px-2.5 py-2 flex items-center gap-2.5">
      <div className="size-7 rounded-md bg-white border border-ink-900/[0.06] grid place-items-center">
        <Tag className="size-3 text-ink-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[0.7rem] font-semibold text-ink-900 truncate">{product}</div>
        <div className="text-[0.6rem] text-ink-400 font-mono tabular-nums">{time} ago</div>
      </div>
      <div className="font-display text-sm font-bold tabular-nums text-ink-900">{offer}</div>
      <span
        className={cn(
          "rounded-pill px-2 py-0.5 text-[0.6rem] font-bold tracking-wider uppercase whitespace-nowrap inline-flex items-center gap-1",
          pillCls
        )}
      >
        <span aria-hidden>{stateIcon}</span>
        {state}
      </span>
    </div>
  );
}

export function MetricChip({
  label,
  value,
  trend,
  className,
}: {
  label: string;
  value: string;
  trend?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-ink-900/[0.08] p-3 shadow-[0_18px_40px_-10px_oklch(0.155_0.018_36/0.18)]",
        className
      )}
    >
      <div className="text-[0.6rem] uppercase tracking-wider font-bold text-ink-500 leading-none">
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="font-display font-bold tracking-tight tabular-nums text-lg text-ink-900">
          {value}
        </span>
        {trend && (
          <span className="inline-flex items-center gap-0.5 text-[0.65rem] font-semibold text-[oklch(0.45_0.12_165)]">
            <TrendingUp className="size-2.5" />
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
