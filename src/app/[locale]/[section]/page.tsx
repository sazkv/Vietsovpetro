import {notFound} from "next/navigation";
import SourceSection from "@/components/source-section";
import {isLocale, sectionOrder, type Section} from "@/lib/original-content";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.entries(sectionOrder).flatMap(([locale, sections]) => [...sections, "pages"].map((section) => ({locale, section})));
}

export default async function SectionPage({params}: {params: Promise<{locale: string; section: string}>}) {
  const {locale, section} = await params;
  if (!isLocale(locale) || ![...sectionOrder[locale], "pages"].includes(section as Section)) notFound();
  return <SourceSection locale={locale} section={section as Section}/>;
}
