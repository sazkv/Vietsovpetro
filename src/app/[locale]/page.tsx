import {notFound} from "next/navigation";
import type {Metadata} from "next";
import SourceHome from "@/components/source-home";
import {isLocale} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!isLocale(locale)) return {};
  return {title: `Vietsovpetro | ${messageSet(locale).home.overview}`, description: messageSet(locale).home.heroDescription};
}

export default async function LocaleHome({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  return <SourceHome locale={locale}/>;
}
