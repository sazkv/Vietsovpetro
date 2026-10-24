import vi from "@/messages/vi.json";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import type {Locale} from "@/lib/original-content";

export const messages = {vi, en, ru} as const;
export function messageSet(locale: Locale) { return messages[locale]; }
