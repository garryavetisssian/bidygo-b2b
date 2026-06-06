import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Zap,
  LineChart,
  Plug,
  CircleDollarSign,
  Users,
} from "lucide-react";

import { type Locale } from "@/i18n/routing";
import {
  Section,
  SectionHeader,
  Container,
  Card,
  Badge,
} from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { PartnerForm } from "@/components/forms/partner-form";
import { PriceItDemo } from "@/components/sections/price-it-demo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  await getTranslations({ locale });
  return {
    title: "For retailers — Customer-led pricing that lifts in-store conversion",
    description:
      "Bidygo converts walk-out shoppers into buyers by letting them propose a price — with full retailer approval. Lift conversion without blanket discounts. 14-day pilot setup.",
    alternates: {
      canonical: "/partners",
      languages: { en: "/partners", am: "/am/partners", ru: "/ru/partners" },
    },
  };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="relative overflow-hidden bg-cream-50 pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-28">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10">
          <div className="absolute top-[-25%] right-[-10%] size-[60vmax] rounded-full bg-[radial-gradient(closest-side,oklch(0.700_0.196_42/0.18),transparent)] blur-3xl" />
        </div>

        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 max-w-2xl flex flex-col gap-7">
              <span className="eyebrow self-start">For retail partners</span>
              <h1 className="display-1 text-pretty">
                Turn the shoppers who would have walked out into the ones who walk out with a bag.
              </h1>
              <p className="text-lg sm:text-xl text-ink-600 leading-relaxed text-pretty">
                Bidygo is the customer-led pricing layer for your stores. Shoppers propose a price you control. You approve, counter, or decline — instantly. Every interaction is a converted sale or a usable signal about willingness to pay.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <a href="#demo">
                  <Button size="xl" className="w-full sm:w-auto">
                    Book a 20-min demo <ArrowRight />
                  </Button>
                </a>
                <a href="#how">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto">
                    See the retailer flow
                  </Button>
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-2 text-ink-700">
                  <ShieldCheck className="size-4 text-brand-600" /> 100% approval control
                </span>
                <span className="inline-flex items-center gap-2 text-ink-700">
                  <Zap className="size-4 text-brand-600" /> Live in 14 days
                </span>
                <span className="inline-flex items-center gap-2 text-ink-700">
                  <Plug className="size-4 text-brand-600" /> POS-agnostic
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PriceItDemo />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="cream">
        <SectionHeader
          eyebrow="The problem with how stores price today"
          title="Your shelf price is one number. Your shoppers' willingness to pay is a curve."
          description="And the gap between them is where your conversion rate dies."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          <Card className="p-8 lg:p-10">
            <Badge variant="default" className="bg-cream-200">
              <TrendingDown className="size-3.5" /> Today
            </Badge>
            <h3 className="mt-4 text-2xl font-bold tracking-tight">Blanket discount, lose your floor.</h3>
            <p className="mt-3 text-ink-600 leading-relaxed">
              You run a sale. Every shopper gets the discount — including the ones who would have paid full price. Margin walks out the door alongside the deals.
            </p>
            <ul className="mt-5 space-y-2.5 text-ink-700">
              <li className="flex gap-2.5"><span className="text-ink-400 mt-0.5">·</span>Discounts the wrong customers.</li>
              <li className="flex gap-2.5"><span className="text-ink-400 mt-0.5">·</span>Trains shoppers to wait for sales.</li>
              <li className="flex gap-2.5"><span className="text-ink-400 mt-0.5">·</span>Tells you nothing about price sensitivity.</li>
            </ul>
          </Card>

          <Card className="p-8 lg:p-10 border-brand-500/20 shadow-md">
            <Badge variant="brand">
              <TrendingUp className="size-3.5" /> With Bidygo
            </Badge>
            <h3 className="mt-4 text-2xl font-bold tracking-tight">Negotiate per shopper, per SKU, in seconds.</h3>
            <p className="mt-3 text-ink-600 leading-relaxed">
              Every offer is a 1:1 conversation. You see the shopper, the SKU, and a number they&apos;re ready to commit to right now. Approve the ones worth it. Counter the rest. Let your floor price stay.
            </p>
            <ul className="mt-5 space-y-2.5 text-ink-700">
              <li className="flex gap-2.5"><CheckCircle2 className="size-5 text-brand-600 shrink-0 mt-0.5" />Capture the shoppers who would have walked out.</li>
              <li className="flex gap-2.5"><CheckCircle2 className="size-5 text-brand-600 shrink-0 mt-0.5" />Protect the shoppers who would have paid full price.</li>
              <li className="flex gap-2.5"><CheckCircle2 className="size-5 text-brand-600 shrink-0 mt-0.5" />Learn willingness-to-pay per SKU, per week, per region.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="default" id="how">
        <SectionHeader
          eyebrow="The retailer flow"
          title="Four moving parts. Your team stays in control of all of them."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {retailerSteps.map((s, i) => (
            <Card key={s.title} className="p-6 flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <span className="size-8 rounded-pill bg-brand-500 text-white grid place-items-center text-sm font-bold tabular-nums">
                  {i + 1}
                </span>
                <s.Icon className="size-5 text-ink-700" />
              </div>
              <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="text-ink-600 leading-relaxed text-sm flex-1">{s.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <Container size="narrow">
          <div className="text-center">
            <span className="eyebrow"><CircleDollarSign className="size-3.5" /> Commercial model</span>
            <h2 className="display-2 mt-5 text-pretty">We get paid when you sell more. Not when you sign up.</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-2xl mx-auto">
              We&apos;re building Bidygo with founding partners — which means no SaaS fees, no setup costs, and no lock-in for the first cohort. We share in lifted conversion, not in upfront commitments.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { title: "Pilot is free", body: "30 days. POS integration, staff training, partner dashboard. We deploy, you measure." },
              { title: "Pay on conversion lift", body: "Modest rev-share on the orders Bidygo brings in. Not on orders you would have closed anyway." },
              { title: "Cancel any time", body: "No annual contract. If conversion doesn't move, you're not on the hook for a single euro." },
            ].map((c) => (
              <Card key={c.title} className="p-6">
                <h3 className="font-bold text-lg tracking-tight">{c.title}</h3>
                <p className="text-ink-600 leading-relaxed mt-2 text-sm">{c.body}</p>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-ink-500 mt-8">
            Commercial structure evolves after the founding cohort. Lock in pilot terms before they change.
          </p>
        </Container>
      </Section>

      <Section tone="default">
        <SectionHeader
          eyebrow="The questions we always get"
          title="If you're skeptical, you're asking the right things."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {objections.map((o) => (
            <Card key={o.q} className="p-7">
              <div className="text-sm uppercase tracking-wider font-bold text-brand-700">Concern</div>
              <h3 className="mt-1 text-xl font-bold tracking-tight">{o.q}</h3>
              <div className="mt-5 text-sm uppercase tracking-wider font-bold text-ink-400">Our answer</div>
              <p className="mt-1 text-ink-700 leading-relaxed">{o.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="cream" id="demo">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="eyebrow"><Users className="size-3.5" /> Founding partners</span>
            <h2 className="display-2 mt-5 text-pretty">Book a 20-minute demo with our team.</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-md">
              We&apos;ll walk you through the retailer dashboard live, share benchmarks from your category, and scope what a 30-day pilot looks like in your stores.
            </p>

            <ul className="mt-8 space-y-4 text-ink-700">
              <li className="flex gap-3">
                <LineChart className="size-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Live partner dashboard</div>
                  <div className="text-sm text-ink-500">Offers, approvals, conversion lift — exactly what you&apos;d see day one.</div>
                </div>
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="size-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Category benchmarks</div>
                  <div className="text-sm text-ink-500">What willingness-to-pay looks like in your vertical.</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Plug className="size-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Pilot scope tailored to your stores</div>
                  <div className="text-sm text-ink-500">1 store, 1 category, 30 days — or wider if that fits.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <Card className="p-7 sm:p-10">
              <PartnerForm />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

const retailerSteps = [
  { title: "Set your floors", body: "Per SKU or per category. Offers below the floor are never accepted — even by mistake.", Icon: ShieldCheck },
  { title: "Receive live offers", body: "Real-time alerts in the partner dashboard or on your floor team's phones. Filter by category, store, urgency.", Icon: Zap },
  { title: "Approve, counter, decline", body: "One tap. Shopper gets an answer in seconds. Counters can be auto-generated or hand-tuned.", Icon: CheckCircle2 },
  { title: "Learn from every miss", body: "Even declined offers tell you something: what shoppers would have paid for what SKU, when. Use it to reprice.", Icon: LineChart },
];

const objections = [
  { q: "We don't want customers controlling our prices.", a: "They don't. You set the floor, you approve every offer, and your shelf price never moves. Bidygo is a private negotiation channel — not a customer-facing discount." },
  { q: "We already run promotions and seasonal sales.", a: "Promotions discount everyone, including the shoppers who'd have paid full price. Bidygo only converts the ones who were about to leave — the rest still pay your shelf price." },
  { q: "Our margins can't take more pressure.", a: "That's exactly the point. You set the floor below which offers are auto-declined. Every accepted offer is one you decided was worth it — not one a CSV imposed on you." },
  { q: "How fast can we go live?", a: "Two weeks for a pilot in one store and one category. POS integration is API-light — we don't replace your stack. Staff training takes 90 minutes." },
  { q: "What if shoppers abuse this?", a: "Every shopper is identified, every offer is rate-limited, and accept rates are tracked per user. Repeated lowball patterns auto-throttle. You see all of it." },
  { q: "How much does it cost?", a: "The pilot is free for 30 days. After that, modest rev-share on lifted orders only — never on orders that would have closed anyway. No SaaS fee. No annual lock-in." },
];
