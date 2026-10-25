import {notFound} from "next/navigation";
import Link from "next/link";
import SiteSearch from "@/components/site-search";
import {isLocale, locales} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export const dynamicParams = false;
export function generateStaticParams() {return locales.map((locale) => ({locale}));}

export default async function SearchPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  const m = messageSet(locale);
  return <main id="main-content" className="section-page shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={`/${locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><span>{m.nav.search}</span></nav><header className="page-heading"><h1>{m.nav.search}</h1></header><SiteSearch locale={locale} labels={{search:m.nav.search,placeholder:m.nav.searchPlaceholder,results:m.nav.results,empty:m.nav.noResults}}/></main>;
}
