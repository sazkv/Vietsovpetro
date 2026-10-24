import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import SourceNavigation from "@/components/source-navigation";
import SourceFooter from "@/components/source-footer";
import LocaleAttributes from "@/components/locale-attributes";
import {isLocale, locales} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({locale})); }

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return <NextIntlClientProvider locale={locale} messages={messageSet(locale)}><LocaleAttributes locale={locale}/><SourceNavigation locale={locale}/>{children}<SourceFooter locale={locale}/></NextIntlClientProvider>;
}
