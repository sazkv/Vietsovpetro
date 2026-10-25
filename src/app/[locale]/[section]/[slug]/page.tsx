import {notFound} from "next/navigation";
import type {Metadata} from "next";
import SourceDocument from "@/components/source-document";
import {findPage, isLocale, pages, type Section} from "@/lib/original-content";
import {displayTitle} from "@/lib/display-title";

export const dynamicParams = false;
export function generateStaticParams() {
  return pages.filter((page) => page.section !== "home" && page.route !== `/${page.locale}/${page.section}/`).map((page) => ({locale: page.locale, section: page.section, slug: page.slug}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string; section: string; slug: string}>}): Promise<Metadata> {
  const {locale, section, slug} = await params;
  if (!isLocale(locale)) return {};
  const page = findPage(locale, section as Section, slug);
  return page ? {title: `${displayTitle(page)} | Vietsovpetro`, description: page.text.slice(0, 155), openGraph: {title: displayTitle(page), description: page.text.slice(0, 155), images: page.images[0] ? [page.images[0]] : []}} : {};
}

export default async function DocumentPage({params}: {params: Promise<{locale: string; section: string; slug: string}>}) {
  const {locale, section, slug} = await params;
  if (!isLocale(locale)) notFound();
  const page = findPage(locale, section as Section, slug);
  if (!page) notFound();
  return <SourceDocument page={page}/>;
}
