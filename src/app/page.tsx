import {NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import SourceNavigation from "@/components/source-navigation";
import {displayTitle} from "@/lib/site-titles";
import SourceHome from "@/components/source-home";
import SourceFooter from "@/components/source-footer";
import {messages} from "@/lib/messages";
import {sectionOrder,sectionPages} from "@/lib/original-content";

export default function HomePage() {
  setRequestLocale("vi");
  const preview=Object.fromEntries(sectionOrder.vi.filter(section=>section!=="news").map(section=>[section,sectionPages("vi",section).filter(page=>page.route!==`/vi/${section}/`).slice(0,10).map(page=>({title:displayTitle(page),route:page.route}))]));
  return <NextIntlClientProvider locale="vi" messages={messages.vi}><SourceNavigation locale="vi" preview={preview}/><SourceHome locale="vi"/><SourceFooter locale="vi"/></NextIntlClientProvider>;
}
