import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl } from "./utils";

export type PageKey =
  | "home"
  | "forStores"
  | "whyBidygo"
  | "founder"
  | "pricing"
  | "calculator"
  | "stories"
  | "contact"
  | "about"
  | "resources"
  | "resourceArticle"
  | "industry"
  | "glossary"
  | "glossaryTerm"
  | "comparison"
  | "privacy"
  | "terms"
  | "cookies";

const pagePaths: Record<PageKey, string> = {
  home: "/",
  forStores: "/for-stores",
  whyBidygo: "/why-bidygo",
  founder: "/founder",
  pricing: "/pricing",
  calculator: "/calculator",
  stories: "/stories",
  contact: "/contact",
  about: "/about",
  resources: "/resources",
  resourceArticle: "/resources",
  industry: "/solutions",
  glossary: "/glossary",
  glossaryTerm: "/glossary",
  comparison: "/compare",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
};

const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  am: "hy_AM",
};

// BCP-47 codes for JSON-LD inLanguage (matches OG underscore form's region intent).
const bcp47Map: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
  am: "hy-AM",
};

export function bcp47(locale: Locale): string {
  return bcp47Map[locale];
}

// Localized labels for breadcrumbs and other small UI strings owned by SEO.
const homeLabel: Record<Locale, string> = {
  en: "Home",
  ru: "Главная",
  am: "Գլխավոր",
};

// PageKey → nav translation key (when names match nav.*).
const pageNavKey: Partial<Record<PageKey, string>> = {
  forStores: "forStores",
  whyBidygo: "whyBidygo",
  founder: "meetVahagn",
  pricing: "pricing",
  calculator: "yourNumbers",
  stories: "stories",
  contact: "contact",
  about: "about",
  resources: "resources",
  glossary: "glossary",
};

function baseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://bidygo-b2b.vercel.app"
  );
}

// Stable @id anchors shared across the graph.
export const ORG_ID = `${baseUrl()}/#organization`;
export const WEBSITE_ID = `${baseUrl()}/#website`;
export const FOUNDER_ID = `${baseUrl()}/#vahagn`;
export const SOFTWARE_ID = `${baseUrl()}/#software`;
export const SERVICE_ID = `${baseUrl()}/#service`;

export function localizedHref(locale: Locale, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = absoluteUrl(localizedHref(l, path));
  }
  languages["x-default"] = absoluteUrl(localizedHref(routing.defaultLocale, path));
  return languages;
}

function safeT(t: (key: string) => string, key: string, fallback: string): string {
  try {
    const value = t(key);
    if (!value || value === key) return fallback;
    return value;
  } catch {
    return fallback;
  }
}

export async function buildMetadata({
  locale,
  page,
  slug,
  extra,
}: {
  locale: Locale;
  page: PageKey;
  slug?: string;
  extra?: Partial<Metadata>;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${page}` });
  const path = slug ? `${pagePaths[page]}/${slug}` : pagePaths[page];

  const title = t("title");
  const description = t("description");
  const ogTitle = safeT(t, "ogTitle", title);
  const ogDescription = safeT(t, "ogDescription", description);

  const ogImageUrl = absoluteUrl("/brand/og-default.png");
  const alternateLocales = routing.locales
    .filter((l) => l !== locale)
    .map((l) => ogLocaleMap[l]);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(localizedHref(locale, path)),
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: "Bidygo",
      locale: ogLocaleMap[locale],
      alternateLocale: alternateLocales,
      title: ogTitle,
      description: ogDescription,
      url: absoluteUrl(localizedHref(locale, path)),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Bidygo — More sales for your shop, without dropping your shelf price",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      site: "@bidygo",
      images: [ogImageUrl],
    },
    ...extra,
  };
}

// ---------- Graph entity builders ----------

export async function buildOrganizationJsonLd(locale: Locale): Promise<object> {
  const t = await getTranslations({ locale, namespace: "meta.org" });
  const url = baseUrl();
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Bidygo",
    url,
    logo: {
      "@type": "ImageObject",
      "@id": `${url}/#logo`,
      url: absoluteUrl("/brand/bidygo-icon.png"),
      width: 240,
      height: 240,
      caption: "Bidygo",
    },
    image: { "@id": `${url}/#logo` },
    sameAs: [
      "https://twitter.com/bidygo",
      "https://www.linkedin.com/company/bidygo",
      "https://instagram.com/bidygo",
    ],
    description: t("description"),
    inLanguage: bcp47(locale),
    areaServed: { "@type": "Country", name: "Armenia" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yerevan",
      addressCountry: "AM",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "partners@bidygo.com",
      areaServed: "AM",
      availableLanguage: ["English", "Russian", "Armenian"],
    },
    founder: { "@id": FOUNDER_ID },
  };
}

export function buildWebSiteJsonLd(locale: Locale): object {
  const url = baseUrl();
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Bidygo",
    url,
    inLanguage: bcp47(locale),
    publisher: { "@id": ORG_ID },
  };
}

export function buildFounderPersonJsonLd(locale: Locale, opts?: { description?: string }): object {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: "Vahagn Khachatryan",
    url: absoluteUrl(localizedHref(locale, "/founder")),
    jobTitle: "Founder",
    worksFor: { "@id": ORG_ID },
    nationality: { "@type": "Country", name: "Armenia" },
    homeLocation: { "@type": "Place", name: "Yerevan" },
    ...(opts?.description ? { description: opts.description } : {}),
    sameAs: ["https://www.linkedin.com/company/bidygo"],
  };
}

export function buildSoftwareApplicationJsonLd(
  locale: Locale,
  opts?: { detailedOffers?: Array<{ name: string; description: string }> }
): object {
  const offersUrl = absoluteUrl(localizedHref(locale, "/pricing"));
  const baseOffers = {
    "@type": "AggregateOffer",
    url: offersUrl,
    lowPrice: "50",
    highPrice: "300",
    priceCurrency: "USD",
    offerCount: 3,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/Subscription",
      billingDuration: "P1M",
      unitText: "month",
    },
  };
  const detailedOffers = opts?.detailedOffers
    ? {
        ...baseOffers,
        offers: opts.detailedOffers.map((o) => ({
          "@type": "Offer",
          name: o.name,
          description: o.description,
          priceCurrency: "USD",
          url: offersUrl,
        })),
      }
    : baseOffers;
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: "Bidygo",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Retail intelligence",
    operatingSystem: ["Web", "iOS", "Android"],
    description:
      "Retail pricing automation for physical stores. Shoppers scan a barcode and submit an offer; Bidygo's rule engine answers automatically by the retailer's dashboard rules. Accepted offers are redeemed at checkout.",
    url: baseUrl(),
    inLanguage: bcp47(locale),
    publisher: { "@id": ORG_ID },
    audience: {
      "@type": "BusinessAudience",
      audienceType: ["Retailers", "Shop owners", "Multi-store chains"],
    },
    offers: detailedOffers,
  };
}

export function buildServiceJsonLd(
  locale: Locale,
  opts: { name: string; description: string; slug: string; serviceType?: string }
): object {
  return {
    "@type": "Service",
    "@id": `${baseUrl()}/#service-${opts.slug}`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? "Retail pricing automation",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Armenia" },
    audience: { "@type": "BusinessAudience", audienceType: "Retailers" },
    url: absoluteUrl(localizedHref(locale, `/solutions/${opts.slug}`)),
    inLanguage: bcp47(locale),
  };
}

export function buildContactPageJsonLd(locale: Locale): object {
  return {
    "@type": "ContactPage",
    "@id": `${absoluteUrl(localizedHref(locale, "/contact"))}#contactpage`,
    url: absoluteUrl(localizedHref(locale, "/contact")),
    inLanguage: bcp47(locale),
    mainEntity: { "@id": ORG_ID },
  };
}

export function buildFaqJsonLd(
  faqs: Array<{ q: string; a: string }>,
  locale?: Locale
): object | null {
  if (!faqs || faqs.length < 2) return null;
  return {
    "@type": "FAQPage",
    ...(locale ? { inLanguage: bcp47(locale) } : {}),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  trail: Array<{ name: string; href: string }>,
  locale: Locale
): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: step.name,
      item: absoluteUrl(localizedHref(locale, step.href)),
    })),
  };
}

export function buildDefinedTermJsonLd(
  locale: Locale,
  term: { slug: string; term: string; shortDefinition: string }
): object {
  const url = absoluteUrl(localizedHref(locale, `/glossary/${term.slug}`));
  const setUrl = absoluteUrl(localizedHref(locale, "/glossary"));
  return {
    "@type": "DefinedTerm",
    "@id": `${url}#term`,
    name: term.term,
    description: term.shortDefinition,
    url,
    inDefinedTermSet: { "@id": `${setUrl}#termset` },
    inLanguage: bcp47(locale),
  };
}

export function buildDefinedTermSetJsonLd(
  locale: Locale,
  terms: Array<{ slug: string; term: string }>
): object {
  const setUrl = absoluteUrl(localizedHref(locale, "/glossary"));
  return {
    "@type": "DefinedTermSet",
    "@id": `${setUrl}#termset`,
    name: "Bidygo retail pricing glossary",
    url: setUrl,
    inLanguage: bcp47(locale),
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: absoluteUrl(localizedHref(locale, `/glossary/${t.slug}`)),
    })),
  };
}

export function buildArticleJsonLd(
  article: {
    title: string;
    description: string;
    publishedISO: string;
    updatedISO?: string;
    author: string;
    slug: string;
    image?: string;
  },
  locale: Locale
): object {
  const url = absoluteUrl(localizedHref(locale, `/resources/${article.slug}`));
  const isFounderAuthor = /vahagn/i.test(article.author);
  const author = isFounderAuthor
    ? { "@id": FOUNDER_ID }
    : { "@type": "Organization", "@id": ORG_ID, name: article.author };
  const imageUrl = article.image
    ? absoluteUrl(article.image)
    : absoluteUrl("/brand/og-default.png");
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    image: [imageUrl],
    datePublished: article.publishedISO,
    dateModified: article.updatedISO ?? article.publishedISO,
    author,
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
    inLanguage: bcp47(locale),
  };
}

// ---------- Graph composition ----------

/**
 * Layout-level @graph: Organization, WebSite, Founder Person.
 * Emitted once per page via root layout.
 */
export async function buildGlobalGraph(locale: Locale): Promise<object> {
  const org = await buildOrganizationJsonLd(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [org, buildWebSiteJsonLd(locale), buildFounderPersonJsonLd(locale)],
  };
}

/**
 * Page-level @graph: WebPage + (optional) BreadcrumbList + page-specific extras.
 * Resolves breadcrumb labels from the `nav.*` translation namespace.
 */
export async function buildPageGraph({
  locale,
  page,
  slug,
  trailOverride,
  currentName,
  extras = [],
  noBreadcrumb = false,
}: {
  locale: Locale;
  page: PageKey;
  slug?: string;
  // Crumbs inserted BETWEEN home and current page (used for dynamic pages).
  trailOverride?: Array<{ name: string; href: string }>;
  // Current page's breadcrumb label. Overrides the nav-key lookup; required for dynamic pages.
  currentName?: string;
  // Page-specific entities (Article, FAQPage, Service, SoftwareApplication, ...).
  extras?: object[];
  noBreadcrumb?: boolean;
}): Promise<object> {
  const path = slug ? `${pagePaths[page]}/${slug}` : pagePaths[page];
  const pageUrl = absoluteUrl(localizedHref(locale, path));
  const pageId = `${pageUrl}#webpage`;
  const language = bcp47(locale);

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": pageId,
    url: pageUrl,
    inLanguage: language,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };

  const graph: object[] = [webPage];

  if (!noBreadcrumb && page !== "home") {
    let resolvedCurrentName = currentName;
    if (!resolvedCurrentName) {
      const navKey = pageNavKey[page];
      if (navKey) {
        try {
          const tNav = await getTranslations({ locale, namespace: "nav" });
          resolvedCurrentName = tNav(navKey);
        } catch {
          resolvedCurrentName = navKey;
        }
      }
    }
    if (resolvedCurrentName) {
      const trail: Array<{ name: string; href: string }> = [
        { name: homeLabel[locale], href: "/" },
        ...(trailOverride ?? []),
        { name: resolvedCurrentName, href: path },
      ];
      const breadcrumbId = `${pageUrl}#breadcrumb`;
      webPage.breadcrumb = { "@id": breadcrumbId };
      graph.push({
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: trail.map((step, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: step.name,
          item: absoluteUrl(localizedHref(locale, step.href)),
        })),
      });
    }
  }

  graph.push(...extras.filter((e): e is object => Boolean(e)));

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

// ---------- LocaleStub gating ----------

const localesWithContent: Record<PageKey, Locale[]> = {
  home: ["en", "ru", "am"],
  forStores: ["en", "ru", "am"],
  whyBidygo: ["en", "ru", "am"],
  founder: ["en", "ru", "am"],
  pricing: ["en", "ru", "am"],
  calculator: ["en", "ru", "am"],
  stories: ["en", "ru", "am"],
  contact: ["en", "ru", "am"],
  about: ["en", "ru", "am"],
  resources: ["en", "ru", "am"],
  resourceArticle: ["en", "ru", "am"],
  industry: ["en", "ru", "am"],
  glossary: ["en", "ru", "am"],
  glossaryTerm: ["en", "ru", "am"],
  comparison: ["en", "ru", "am"],
  privacy: ["en"],
  terms: ["en"],
  cookies: ["en"],
};

export function localeHasContent(locale: string, page: PageKey): boolean {
  return localesWithContent[page]?.includes(locale as Locale) ?? false;
}
