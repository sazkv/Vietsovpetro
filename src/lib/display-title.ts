import labels from "@/data/page-labels.json";
import type {SourcePage} from "@/lib/original-content";

const names = labels as Record<string, Record<string, Record<string, string>>>;

export function displayTitle(page: SourcePage): string {
  return names[page.locale]?.[page.section]?.[page.slug] || page.title.trim();
}
