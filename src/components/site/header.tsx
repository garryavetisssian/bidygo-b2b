"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { ChatLauncher } from "./chat-launcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/for-stores", key: "forStores" },
  { href: "/why-bidygo", key: "whyBidygo" },
  { href: "/calculator", key: "yourNumbers" },
  { href: "/stories", key: "stories" },
  { href: "/resources", key: "resources" },
] as const;

const secondaryNav = [
  { href: "/founder", key: "meetVahagn" },
  { href: "/pricing", key: "pricing" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div
        className={cn(
          "hidden lg:block transition-all duration-300",
          scrolled ? "max-h-0 opacity-0 overflow-hidden" : "max-h-12 opacity-100"
        )}
      >
        <div className="bg-cream-100/90 backdrop-blur border-b border-ink-900/5">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
            <ChatLauncher locale={locale} variant="pill" />
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      <header
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-cream-50/90 border-b border-ink-900/8 shadow-sm"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-18 items-center justify-between gap-6">
            <Link href="/" aria-label="Bidygo home" className="shrink-0">
              <Logo />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "px-3.5 py-2 rounded-pill text-[0.95rem] font-medium transition-colors",
                      active
                        ? "text-brand-700 bg-brand-500/10"
                        : "text-ink-700 hover:text-ink-900 hover:bg-ink-900/5"
                    )}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <Link href="/contact">
                <Button size="md">
                  {t("talkToUs")} <ArrowRight />
                </Button>
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/contact"
                aria-label={t("talkToUs")}
                className="inline-flex items-center justify-center size-10 rounded-full bg-brand-500/12 text-brand-700 hover:bg-brand-500/20 transition-colors"
              >
                <span className="sr-only">{t("talkToUs")}</span>
                <ArrowRight className="size-4" />
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center size-11 rounded-pill text-ink-900 hover:bg-ink-900/5"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-cream-50 border-t border-ink-900/8 shadow-xl animate-rise max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav
            className="px-5 py-6 flex flex-col gap-1"
            aria-label="Mobile primary"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex items-center justify-between mb-4">
              <LocaleSwitcher align="left" />
            </div>

            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "px-3 py-3 rounded-xl text-lg font-semibold",
                    active
                      ? "text-brand-700 bg-brand-500/10"
                      : "text-ink-900 hover:bg-cream-100"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}

            <div className="h-px bg-ink-900/8 my-3" />

            {secondaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "px-3 py-2.5 rounded-xl text-base",
                    active
                      ? "text-brand-700 bg-brand-500/10"
                      : "text-ink-700 hover:bg-cream-100"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}

            <div className="mt-6 flex flex-col gap-3">
              <ChatLauncher locale={locale} variant="block" />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
