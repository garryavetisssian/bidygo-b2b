import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, buildPageGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RoiCalculator } from "@/components/sections/roi-calculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "calculator" });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "calculatorPage" });

  const graph = await buildPageGraph({ locale: locale as Locale, page: "calculator" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute inset-0 bg-grid-warm opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_30%,#000,transparent)]" />
          <div className="absolute left-0 top-[14%] bottom-[10%] w-[5vw] max-w-[56px] bg-barcode opacity-30 [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]" />
          <div className="absolute right-0 top-[18%] bottom-[14%] w-[5vw] max-w-[56px] bg-barcode opacity-25 [mask-image:linear-gradient(to_bottom,transparent,#15%,#000_85%,transparent)]" />
        </div>

        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-5 animate-fade-blur">
              <span className="relative inline-flex size-2">
                <span className="absolute inset-0 rounded-full bg-mint-500/60 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-mint-500" />
              </span>
              <span className="eyebrow">
                <Calculator className="size-3.5" /> {t("eyebrow")}
              </span>
            </div>
            <h1 className="display-1 text-pretty animate-rise-slow [animation-delay:80ms]">
              {t("headline")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty max-w-2xl mx-auto animate-rise-slow [animation-delay:200ms]">
              {t("subhead")}
            </p>
          </div>
        </Container>
      </section>

      {/* ============== CALCULATOR (centerpiece) ============== */}
      <section className="relative pb-24 sm:pb-32 -mt-4 sm:-mt-8">
        <Container>
          <ScrollReveal>
            <div className="relative">
              {/* Layered cards behind the calculator */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[2.5rem] bg-white/40 border border-ink-900/[0.05] -rotate-[1deg] translate-y-3 shadow-stack-back pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute inset-0 rounded-[2.5rem] bg-white/60 border border-ink-900/[0.05] rotate-[0.6deg] translate-y-1.5 shadow-stack-back pointer-events-none"
              />

              {/* Dashboard chrome wrapper */}
              <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-ink-900/[0.08] shadow-[0_1px_0_0_oklch(1_0_0/0.5)_inset,0_40px_80px_-20px_oklch(0.155_0.018_36/0.22),0_12px_24px_-8px_oklch(0.155_0.018_36/0.10)]">
                {/* Window chrome bar */}
                <div className="flex items-center gap-2 px-5 sm:px-7 h-12 bg-gradient-to-b from-cream-100 to-cream-50 border-b border-ink-900/[0.06]">
                  <div className="flex gap-1.5">
                    <span className="size-3 rounded-full bg-[oklch(0.78_0.18_28)]" />
                    <span className="size-3 rounded-full bg-[oklch(0.85_0.15_85)]" />
                    <span className="size-3 rounded-full bg-[oklch(0.78_0.14_140)]" />
                  </div>
                  <div className="hidden sm:flex ml-3 flex-1 max-w-md mx-auto h-7 rounded-md bg-white border border-ink-900/[0.06] items-center px-3 gap-1.5 text-[0.7rem] text-ink-500 font-mono">
                    <Calculator className="size-3" />
                    bidygo.com/calculator
                  </div>
                  <div className="flex items-center gap-1.5 rounded-pill bg-mint-500/15 text-[oklch(0.40_0.12_165)] px-2.5 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
                    <span className="relative inline-flex size-1.5">
                      <span className="absolute inset-0 rounded-full bg-mint-500/70 animate-ping" />
                      <span className="relative size-1.5 rounded-full bg-mint-500" />
                    </span>
                    Live
                  </div>
                </div>

                {/* Calculator content — uses its own internal padding */}
                <div className="p-2 sm:p-3 bg-cream-50/40">
                  <RoiCalculator className="border-0 shadow-none" />
                </div>
              </div>

              {/* Bottom annotation hint */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-500">
                <Sparkles className="size-4 text-brand-600" />
                <span>Drag the sliders. Numbers update live.</span>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ============== CLOSING CTA (replaces obsolete Wave-2 placeholder) ============== */}
      <Section tone="cocoa" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-mesh-cocoa" />
        <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.10]" />
        <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent" />
        <Container size="narrow" className="relative text-center">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.14em] font-bold text-brand-300">
              Ready to see your real numbers?
            </span>
            <h2 className="display-3 mt-5 text-pretty text-white">
              Bring us your actual category data.
            </h2>
            <p className="mt-5 text-lg text-cream-100/85 leading-relaxed">
              We&apos;ll walk you through what shops your size are seeing in their first 30 days — under NDA, on a 20-minute call.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="xl" variant="white">
                  Talk to us <ArrowRight />
                </Button>
              </Link>
              <Link href="/for-stores">
                <Button size="xl" variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                  See the store side
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
