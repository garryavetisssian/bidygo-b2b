import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, buildPageGraph, buildContactPageJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { Mail, Send } from "lucide-react";

import { Section, Container, Card } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { PartnerForm } from "@/components/forms/partner-form";
import { ChatLauncher } from "@/components/site/chat-launcher";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ExpectationItem { title: string; body: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contactPage" });
  const expectations = t.raw("expectations.items") as ExpectationItem[];

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "contact",
    extras: [buildContactPageJsonLd(locale as Locale)],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {/* ====================== HERO ====================== */}
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-12">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-mesh-warm" />
          <div className="absolute inset-0 bg-grid-warm opacity-30 [mask-image:radial-gradient(60%_50%_at_30%_30%,#000,transparent)]" />
          <div className="absolute top-[-10%] right-[5%] size-[40vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.18),transparent)] blur-3xl animate-glow-soft" />
          <div className="absolute top-[28%] left-[6%] size-3 rounded-full bg-brand-500/40 blur-[2px] animate-float [animation-duration:7s]" />
          <div className="absolute top-[62%] right-[10%] size-2 rounded-full bg-brand-700/40 blur-[2px] animate-float [animation-duration:9s] [animation-delay:1.2s]" />
        </div>
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-5 animate-fade-blur">
              <span className="relative inline-flex size-2">
                <span className="absolute inset-0 rounded-full bg-mint-500/60 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-mint-500" />
              </span>
              <span className="eyebrow">
                <Mail className="size-3.5" /> {t("eyebrow")}
              </span>
            </div>
            <h1 className="display-1 text-pretty animate-rise-slow [animation-delay:80ms]">{t("headline")}</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed animate-rise-slow [animation-delay:200ms]">
              {t("subhead")}
            </p>
          </div>
        </Container>
      </section>

      {/* ====================== FORM + WHAT TO EXPECT ====================== */}
      <Section tone="cream" className="pt-8 sm:pt-12 relative overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-500/35 to-transparent" />
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form column — 7 cols */}
            <ScrollReveal className="lg:col-span-7 relative">
              <div
                aria-hidden
                className="absolute -top-5 -right-3 sm:-right-5 z-10 animate-wave-1"
                style={{ ["--start-rot" as never]: "10deg" }}
              >
                <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white px-3.5 py-2 shadow-sticker">
                  <div className="flex items-center gap-1.5">
                    <Send className="size-3.5" />
                    <span className="text-[0.7rem] font-bold tracking-wider uppercase">
                      3-min form
                    </span>
                  </div>
                </div>
              </div>

              <Card
                elevated
                className="relative overflow-hidden p-7 sm:p-10 bg-white border-brand-500/20"
              >
                <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-brand-500/8 blur-3xl" />
                <div
                  aria-hidden
                  className="absolute top-0 inset-x-0 h-2 bg-barcode-brand opacity-50 [mask-image:linear-gradient(to_right,transparent,#000_20%,#000_80%,transparent)]"
                />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.14em] font-bold text-brand-700 mb-3">
                    {t("formEyebrow")}
                  </div>
                  <PartnerForm />
                </div>
              </Card>
            </ScrollReveal>

            {/* Reassurance sidebar — 5 cols */}
            <ScrollReveal as="aside" delay={120} className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-3xl bg-gradient-to-br from-ink-900 to-cocoa-800 text-cream-50 p-7 sm:p-9 relative overflow-hidden border border-ink-900/10">
                <div aria-hidden className="absolute inset-0 bg-mesh-cocoa" />
                <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.08]" />
                <div aria-hidden className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

                <div className="relative">
                  <div className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-brand-300 mb-3">
                    {t("expectations.eyebrow")}
                  </div>
                  <h3 className="font-display font-bold tracking-tight text-2xl sm:text-3xl text-pretty mb-7">
                    {t("expectations.title")}
                  </h3>

                  <ol className="relative flex flex-col gap-6">
                    <div
                      aria-hidden
                      className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-400/50 via-brand-400/20 to-brand-400/0"
                    />
                    {expectations.slice(0, 3).map((step, i) => (
                      <li key={i} className="relative flex gap-4">
                        <div className="relative shrink-0 size-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white grid place-items-center font-display font-bold text-sm shadow-[0_4px_14px_-4px_oklch(0.700_0.196_42/0.55)] z-[1]">
                          {i + 1}
                        </div>
                        <div className="pt-1 min-w-0">
                          <div className="font-semibold text-cream-50">{step.title}</div>
                          <p className="mt-1 text-sm leading-relaxed text-cream-100/75">{step.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-8 pt-6 border-t border-cream-50/10">
                    <div className="text-[0.7rem] uppercase tracking-[0.14em] font-bold text-brand-300 mb-3">
                      {t("alternativesEyebrow")}
                    </div>
                    <p className="text-sm text-cream-100/75 mb-4 leading-relaxed">{t("alternativesBody")}</p>
                    <ChatLauncher locale={locale} variant="pill" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ====================== WHAT TO EXPECT (full grid) ====================== */}
      <Section tone="default">
        <Container>
          <ScrollReveal className="max-w-2xl mb-12">
            <span className="eyebrow">{t("expectations.eyebrow")}</span>
            <h2 className="display-2 mt-5 text-pretty">{t("expectations.title")}</h2>
          </ScrollReveal>

          <ScrollReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerChildren={80}>
            {expectations.map((item, i) => (
              <Card key={item.title} interactive className="p-7 flex flex-col gap-3 h-full">
                <div className="font-display font-black text-[2.25rem] leading-none text-brand-500/20 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="text-ink-600 leading-relaxed text-sm flex-1">{item.body}</p>
              </Card>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ====================== GENERAL QUESTIONS ====================== */}
      <Section tone="cream" className="pt-0">
        <Container size="narrow">
          <Card className="p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 grid place-items-center text-brand-700 shrink-0">
              <Mail className="size-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold tracking-tight">{t("general.title")}</h3>
              <p className="text-ink-600 leading-relaxed mt-1">{t("general.body")}</p>
            </div>
            <a href="mailto:hello@bidygo.com" className="shrink-0">
              <Button size="md" variant="outline">hello@bidygo.com</Button>
            </a>
          </Card>
        </Container>
      </Section>
    </>
  );
}
