import {notFound} from "next/navigation";
import SourceHome from "@/components/source-home";
import {isLocale} from "@/lib/original-content";

export default async function LocaleHome({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  return <SourceHome locale={locale}/>;
}
