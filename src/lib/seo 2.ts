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
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
};

const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  am: "hy_AM",
};

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
      title: ogTitle,
      description: ogDescription,
      url: absoluteUrl(localizedHref(locale, path)),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      site: "@bidygo",
    },
    ...extra,
  };
}

export async function buildOrganizationJsonLd(locale: Locale): Promise<object> {
  const t = await getTranslations({ locale, namespace: "meta.org" });
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bidygo",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://bidygo.com",
    logo: absoluteUrl("/icon.png"),
    sameAs: [
      "https://twitter.com/bidygo",
      "https://www.linkedin.com/company/bidygo",
      "https://instagram.com/bidygo",
    ],
    description: t("description"),
    inLanguage: locale,
  };
}

export function buildFaqJsonLd(faqs: Array<{ q: string; a: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: step.name,
      item: absoluteUrl(localizedHref(locale, step.href)),
    })),
  };
}

export function buildArticleJsonLd(
  article: {
    title: string;
    description: string;
    publishedISO: string;
    author: string;
    slug: string;
  },
  locale: Locale
): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedISO,
    dateModified: article.publishedISO,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "Bidygo",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://bidygo.com",
    },
    mainEntityOfPage: absoluteUrl(localizedHref(locale, `/resources/${article.slug}`)),
    inLanguage: locale,
  };
}

/**
 * Which locales have full content authored for a given page.
 * Updated as translators fill in messages and data files.
 * Pages render LocaleStub when locale is not in this list.
 */
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
  privacy: ["en"],
  terms: ["en"],
  cookies: ["en"],
};

export function localeHasContent(locale: string, page: PageKey): boolean {
  return localesWithContent[page]?.includes(locale as Locale) ?? false;
}
