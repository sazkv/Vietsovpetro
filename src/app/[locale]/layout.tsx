import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import SourceNavigation from "@/components/source-navigation";
import {displayTitle} from "@/lib/site-titles";
import SourceFooter from "@/components/source-footer";
import LocaleAttributes from "@/components/locale-attributes";
import {isLocale, locales, sectionOrder, sectionPages} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({locale})); }

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const preview=Object.fromEntries(sectionOrder[locale].filter(section=>section!=="news").map(section=>[section,sectionPages(locale,section).filter(page=>page.route!==`/${locale}/${section}/`).slice(0,10).map(page=>({title:displayTitle(page),route:page.route}))]));
  return <NextIntlClientProvider locale={locale} messages={messageSet(locale)}><LocaleAttributes locale={locale}/><SourceNavigation locale={locale} preview={preview}/>{children}<SourceFooter locale={locale}/></NextIntlClientProvider>;
}
