import {getRequestConfig} from "next-intl/server";
import {messageSet} from "@/lib/messages";
import type {Locale} from "@/lib/original-content";

export default getRequestConfig(async ({requestLocale}) => {
  const candidate = await requestLocale;
  const locale: Locale = candidate === "ru" || candidate === "en" ? candidate : "vi";
  return {locale, messages: messageSet(locale)};
});
