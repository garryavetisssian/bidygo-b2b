import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, FileText, Lock, Bell, Sparkles } from "lucide-react";

import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Container, Card, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  return {
    title: "Case studies — Launching with founding partners",
    description: "Published case studies launch alongside our founding partner cohort. In the meantime: what we&apos;re measuring, who&apos;s in the cohort, and how to be in the next one.",
    alternates: { canonical: "/case-studies" },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-12">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow"><FileText className="size-3.5" /> Case studies</span>
            <h1 className="display-1 mt-5 text-pretty">Published case studies launch with our founding partner cohort.</h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty">
              We&apos;re running pilots right now. As soon as the first cohort publishes their numbers — and signs off on doing so publicly — they&apos;ll be here.
            </p>
            <Badge variant="brand" className="mt-6">
              <Sparkles className="size-3.5" /> First case studies expected Q3 2026
            </Badge>
          </div>
        </Container>
      </section>

      <Section tone="cream">
        <SectionHeader
          eyebrow="What you&apos;ll see when they launch"
          title="The four lenses every Bidygo case study uses."
          description="No hand-wavy 'increased engagement.' Real numbers, real methodology, real partner names."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lenses.map((l) => (
            <Card key={l.title} className="p-7 flex flex-col gap-3">
              <div className="size-10 rounded-2xl bg-brand-500/10 text-brand-700 grid place-items-center font-bold">{l.num}</div>
              <h3 className="text-lg font-bold tracking-tight">{l.title}</h3>
              <p className="text-ink-600 leading-relaxed text-sm flex-1">{l.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="default">
        <Container size="narrow">
          <Card className="p-8 sm:p-12 border-brand-500/15">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-2xl bg-cream-100 grid place-items-center shrink-0">
                <Lock className="size-6 text-ink-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Why aren&apos;t there case studies here yet?</h3>
                <p className="mt-3 text-ink-700 leading-relaxed">
                  Honest answer: we&apos;re too early. Our founding cohort is mid-pilot, and we don&apos;t publish anything without partner sign-off. Putting unverified numbers on a marketing page is the easiest way to lose retailer trust.
                </p>
                <p className="mt-3 text-ink-700 leading-relaxed">
                  What we can share now: under NDA, on a partner call, the raw pilot data. Book a demo and we&apos;ll walk through what other electronics, fashion, or footwear retailers in our cohort are seeing — including the things that surprised us.
                </p>
                <div className="mt-6">
                  <Link href="/partners#demo">
                    <Button size="lg">See pilot data under NDA <ArrowRight /></Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section tone="muted">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow"><Bell className="size-3.5" /> Get notified</span>
            <h2 className="display-2 mt-5 text-pretty">We&apos;ll email you when the first case studies go live.</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-xl">
              No spam. One email when the data is published. Sign up in the footer or write to{" "}
              <a href="mailto:hello@bidygo.com" className="text-brand-700 font-semibold underline-offset-2 hover:underline">hello@bidygo.com</a>.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-full bg-cream-200 size-56 grid place-items-center text-7xl">📈</div>
          </div>
        </div>
      </Section>

      <Section tone="default">
        <Container size="narrow" className="text-center">
          <h2 className="display-3 text-pretty">Be in the next cohort.</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            Founding partners get free pilots, no SaaS lock-in, and a co-authored case study at the end. Limited cohort — closes when full.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/partners#demo">
              <Button size="xl">Apply to the cohort <ArrowRight /></Button>
            </Link>
            <Link href="/partners">
              <Button size="xl" variant="outline">See retailer info first</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

const lenses = [
  { num: "01", title: "Conversion lift", body: "Pre vs. post Bidygo, on previously walk-out shoppers. Measured before/after the pilot window." },
  { num: "02", title: "Margin protection", body: "Average accepted-offer margin vs. baseline shelf-price margin. Net contribution per shopper." },
  { num: "03", title: "Inventory velocity", body: "Days-to-sell for SKUs in Bidygo vs. control group. Especially for aged & end-of-season stock." },
  { num: "04", title: "Operational impact", body: "Hours of staff time per offer, alert volume, training overhead. The integration cost is part of the case study, not hidden." },
];
