import type {MetadataRoute} from "next";
import {locales, pages, sectionOrder} from "@/lib/original-content";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  const paths = new Set<string>(["/", ...locales.map((locale) => `/${locale}/`), ...Object.entries(sectionOrder).flatMap(([locale, sections]) => sections.map((section) => `/${locale}/${section}/`)), ...pages.map((page) => page.route)]);
  return [...paths].map((path) => ({url: base.replace(/\/$/, "") + path, changeFrequency: "monthly" as const}));
}
