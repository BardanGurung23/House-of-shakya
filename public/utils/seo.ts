import type { Metadata } from "next";
import { getData } from "./apiHandle";

type SeoRecord = {
  title?: string | null;
  description?: string | null;
  pageName?: string | null;
  author?: string | null;
  keywords?: Array<string | { label?: string; value?: string }> | null;
  og_title?: string | null;
  og_description?: string | null;
};

const normalizeKeywords = (keywords?: SeoRecord["keywords"]) => {
  if (!Array.isArray(keywords)) {
    return undefined;
  }

  const normalized = keywords
    .map((keyword) => {
      if (typeof keyword === "string") {
        return keyword;
      }

      return keyword.value || keyword.label || "";
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : undefined;
};

const getSeoByPageName = async (pageName: string) => {
  const response = await getData(
    `seo/list?page=1&limit=1&pageName=${encodeURIComponent(pageName)}`,
  );

  const seo = response?.data?.data?.[0] || response?.data?.[0];
  return (seo as SeoRecord | undefined) || null;
};

export const getSeoMetadata = async (
  pageName: string,
  fallback: Metadata,
): Promise<Metadata> => {
  const seo = await getSeoByPageName(pageName);

  if (!seo) {
    return fallback;
  }

  const keywords = normalizeKeywords(seo.keywords);

  return {
    ...fallback,
    title: seo.title || fallback.title,
    description: seo.description || fallback.description,
    authors: seo.author ? [{ name: seo.author }] : fallback.authors,
    keywords: keywords || fallback.keywords,
    openGraph: {
      ...fallback.openGraph,
      title: seo.og_title || seo.title || fallback.openGraph?.title,
      description:
        seo.og_description ||
        seo.description ||
        fallback.openGraph?.description,
    },
  };
};
