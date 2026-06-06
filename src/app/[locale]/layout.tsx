import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Caveat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "../globals.css";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Analytics } from "@vercel/analytics/next";
import { absoluteUrl } from "@/lib/utils";
import { buildGlobalGraph } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-signature",
  display: "swap",
  weight: ["500", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bidygo.com"),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    applicationName: "Bidygo",
    authors: [{ name: "Bidygo" }],
    creator: "Bidygo",
    publisher: "Bidygo",
    formatDetection: { telephone: false, address: false },
    openGraph: {
      type: "website",
      siteName: "Bidygo",
      locale,
      title: t("title"),
      description: t("description"),
      url: absoluteUrl("/"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      site: "@bidygo",
    },
    icons: { icon: "/favicon.ico" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F4" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1612" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${manrope.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-pill focus:bg-brand-500 focus:text-white focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" className="flex-1 pt-16 sm:pt-18">
            {children}
          </main>
          <Footer />
          <GlobalSchema locale={locale as Locale} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

async function GlobalSchema({ locale }: { locale: Locale }) {
  const data = await buildGlobalGraph(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
