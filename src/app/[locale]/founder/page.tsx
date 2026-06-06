import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { getFounder } from "@/data/founder";
import { LocaleStub } from "@/components/site/locale-stub";
import { buildMetadata, buildPageGraph, buildFounderPersonJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

import { WHATSAPP_NUMBER } from "@/lib/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale: locale as Locale, page: "founder" });
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const bio = getFounder(locale);
  if (!bio) return <LocaleStub />;

  const t = await getTranslations({ locale, namespace: "founderPage" });
  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`;

  const graph = await buildPageGraph({
    locale: locale as Locale,
    page: "founder",
    extras: [buildFounderPersonJsonLd(locale as Locale, { description: bio.oneLiner })],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-20">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-7 max-w-2xl">
            <span className="eyebrow">
              <User className="size-3.5" /> {bio.role}
            </span>
            <h1 className="display-1 text-pretty">{t("greeting", { name: bio.name })}</h1>
            <p className="text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty">
              {bio.oneLiner}
            </p>
            <div className="flex flex-col gap-5 text-ink-700 leading-relaxed text-lg mt-4">
              {bio.story.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a href={waLink} target="_blank" rel="noopener">
                <Button size="xl">{bio.whatsappLabel} <ArrowRight /></Button>
              </a>
              <Link href="/why-bidygo">
                <Button size="xl" variant="outline">{t("whyLink")}</Button>
              </Link>
            </div>
            <div
              aria-hidden
              className="mt-8 text-[2.5rem] text-brand-700 leading-none"
              style={{ fontFamily: "var(--font-signature)" }}
            >
              — {bio.name}
            </div>
          </div>
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div
              role="img"
              aria-label={bio.photoAlt}
              className="relative aspect-square max-w-md mx-auto rounded-[3rem] bg-cream-200 grid place-items-center text-ink-400"
            >
              <span className="text-sm">{t("photoCaption", { name: bio.name })}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
