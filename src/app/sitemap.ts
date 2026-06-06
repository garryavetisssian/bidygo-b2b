import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllIndustrySlugs } from "@/data/industries";
import { getArticles, getAllArticleSlugs } from "@/data/articles";
import { getAllGlossaryTermSlugs } from "@/data/glossary";
import { getAllComparisonSlugs } from "@/data/comparisons";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://bidygo.com";

const staticPaths = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/for-stores", changeFrequency: "weekly" as const, priority: 0.95 },
  { path: "/why-bidygo", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/founder", changeFrequency: "monthly" as const, priority: 0.75 },
  { path: "/pricing", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/calculator", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/resources", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/stories", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.5 },
  { path: "/glossary", changeFrequency: "weekly" as const, priority: 0.7 },
];

function localized(pathname: string): string {
  if (pathname === "/") return SITE;
  return `${SITE}${pathname}`;
}

function alternates(pathname: string) {
  const entries: Record<string, string> = {};
  for (const l of routing.locales) {
    entries[l] = l === routing.defaultLocale
      ? localized(pathname)
      : `${SITE}/${l}${pathname === "/" ? "" : pathname}`;
  }
  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((s) => ({
    url: localized(s.path),
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
    alternates: { languages: alternates(s.path) },
  }));

  const industryEntries: MetadataRoute.Sitemap = getAllIndustrySlugs().map((slug) => ({
    url: localized(`/solutions/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: { languages: alternates(`/solutions/${slug}`) },
  }));

  const enArticles = getArticles("en");
  const articleEntries: MetadataRoute.Sitemap = getAllArticleSlugs().map((slug) => {
    const article = enArticles.find((a) => a.slug === slug);
    return {
      url: localized(`/resources/${slug}`),
      lastModified: article ? new Date(article.publishedISO) : now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: { languages: alternates(`/resources/${slug}`) },
    };
  });

  const glossaryEntries: MetadataRoute.Sitemap = getAllGlossaryTermSlugs().map((slug) => ({
    url: localized(`/glossary/${slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
    alternates: { languages: alternates(`/glossary/${slug}`) },
  }));

  const comparisonEntries: MetadataRoute.Sitemap = getAllComparisonSlugs().map((slug) => ({
    url: localized(`/compare/${slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: { languages: alternates(`/compare/${slug}`) },
  }));

  return [
    ...staticEntries,
    ...industryEntries,
    ...articleEntries,
    ...glossaryEntries,
    ...comparisonEntries,
  ];
}
