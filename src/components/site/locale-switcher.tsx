"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import { Globe, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Language picker. The dropdown is rendered through a React portal directly into
 * <body> at position:fixed + z-index 9999 so it cannot be visually covered by
 * sibling header elements (CTA buttons, mobile sticky pills, backdrop-blurred
 * stacking contexts, etc.). This is the fix for the dropdown-under-CTA bug.
 */
export function LocaleSwitcher({
  className,
  align = "right",
}: {
  className?: string;
  align?: "left" | "right";
}) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<{ top: number; left: number; right: number } | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    function update() {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
        right: window.innerWidth - rect.right,
      });
    }
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dropdown =
    open && position ? (
      <div
        ref={dropdownRef}
        role="menu"
        style={{
          position: "fixed",
          top: position.top,
          ...(align === "right" ? { right: position.right } : { left: position.left }),
          zIndex: 9999,
        }}
        className="min-w-[210px] rounded-2xl bg-white border border-ink-900/[0.08] shadow-[0_24px_60px_-12px_oklch(0.155_0.018_36/0.22),0_8px_20px_-8px_oklch(0.155_0.018_36/0.12)] p-1.5 animate-pop"
      >
        <div className="px-3 pt-2 pb-1 text-[0.65rem] font-bold tracking-[0.14em] uppercase text-ink-400">
          Language
        </div>
        {routing.locales.map((l) => {
          const isActive = l === locale;
          return (
            <button
              key={l}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                router.replace(pathname, { locale: l });
              }}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between gap-3 transition-colors",
                isActive
                  ? "bg-brand-500/10 text-brand-700 font-semibold"
                  : "text-ink-700 hover:bg-ink-900/[0.04]"
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold tabular-nums text-ink-400 w-6">
                  {localeLabels[l].short.toUpperCase()}
                </span>
                <span>{localeLabels[l].native}</span>
              </span>
              {isActive && <Check className="size-4" aria-hidden />}
            </button>
          );
        })}
      </div>
    ) : null;

  return (
    <div className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-pill px-3 h-9 text-sm font-medium transition-colors",
          open ? "bg-brand-500/10 text-brand-700" : "text-ink-700 hover:bg-ink-900/5"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
      >
        <Globe className="size-4" aria-hidden />
        <span>{localeLabels[locale].short}</span>
      </button>
      {mounted && dropdown && createPortal(dropdown, document.body)}
    </div>
  );
}
