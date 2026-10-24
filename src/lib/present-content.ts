/**
 * Presentation-only normalization of migrated, already-sanitized public HTML.
 * The original capture in original-pages.json is NEVER modified.
 * No "original content" preview, duplicate footer, or source disclosure UI.
 */
export function presentContent(html: string, options: {title?: string; omitFirstImage?: boolean} = {}): string {
  let output = html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<!--([\s\S]*?)-->/g, "")
    .replace(/<font\b[^>]*>/gi, "<span>")
    .replace(/<\/font\s*>/gi, "</span>")
    .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
    .replace(/<(p|div)\b[^>]*>(?:\s|&nbsp;|&#160;|&#xA0;|&#8203;|\u200b|<br\s*\/?\s*>)*<\/\1\s*>/gi, "")
    .replace(/(?:<br\s*\/?\s*>\s*){4,}/gi, "<br><br>");

  if (options.title) {
    const heading = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1\s*>/i;
    const found = output.match(heading);
    if (found) {
      const plain = (value: string) => value.replace(/<[^>]+>/g, "").replace(/&nbsp;|&#160;|&#xA0;/gi, " ")
        .replace(/[\u200b-\u200d\ufeff]/g, "").replace(/\s+/g, " ").trim().toLocaleLowerCase();
      const title = plain(options.title);
      if (title && (plain(found[2]) === title || plain(found[2]).replace(/^[^\p{L}\p{N}]+/u,"") === title)) {
        output = output.replace(found[0], "");
      }
    }
  }

  if (options.omitFirstImage) {
    output = output.replace(/<img\b[^>]*>/i, "");
  }

  return output.replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"');
}
