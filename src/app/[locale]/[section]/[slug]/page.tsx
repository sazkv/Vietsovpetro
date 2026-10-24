import {notFound} from "next/navigation";
import SourceDocument from "@/components/source-document";
import {findPage, isLocale, pages, type Section} from "@/lib/original-content";

export const dynamicParams = false;
export function generateStaticParams() {
  return pages.filter((page) => page.section !== "home" && page.route !== `/${page.locale}/${page.section}/`).map((page) => ({locale: page.locale, section: page.section, slug: page.slug}));
}

export default async function DocumentPage({params}: {params: Promise<{locale: string; section: string; slug: string}>}) {
  const {locale, section, slug} = await params;
  if (!isLocale(locale)) notFound();
  const page = findPage(locale, section as Section, slug);
  if (!page) notFound();
  return <SourceDocument page={page}/>;
}
