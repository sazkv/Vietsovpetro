import {NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import SourceNavigation from "@/components/source-navigation";
import SourceHome from "@/components/source-home";
import SourceFooter from "@/components/source-footer";
import {messages} from "@/lib/messages";

export default function HomePage() {
  setRequestLocale("vi");
  return <NextIntlClientProvider locale="vi" messages={messages.vi}><SourceNavigation locale="vi"/><SourceHome locale="vi"/><SourceFooter locale="vi"/></NextIntlClientProvider>;
}
