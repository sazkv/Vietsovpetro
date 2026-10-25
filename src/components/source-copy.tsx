import SourceMedia from "@/components/source-media";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function normalize(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

export default function SourceCopy({html, headingToRemove}: {html: string; headingToRemove?: string}) {
  let content = html
    .replace(/<(strong|em|b|i|span)\b[^>]*>(?:\s|&nbsp;|&#160;|&#8203;|​|<br\s*\/?>)*<\/\1\s*>/gi, "")
    .replace(/<p\b[^>]*>(?:\s|&nbsp;|&#160;|&#8203;|​|<br\s*\/?>)*<\/p>/gi, "")
    .replace(/<(h[1-6])\b[^>]*>(?:\s|&nbsp;|&#160;|&#8203;|​|<br\s*\/?>)*<\/\1\s*>/gi, "")
    .replace(/<(div|span|ul|ol)\b[^>]*>\s*<\/\1\s*>/gi, "");
  content = content.replace(/^((?:\s*<div\b[^>]*>\s*)*)<hr\b[^>]*\/?>/i, "$1");
  content = content.replace(/<h1\b([^>]*)>/gi, "<h2$1>").replace(/<\/h1\s*>/gi, "</h2>");
  if (headingToRemove?.trim()) {
    const target = normalize(headingToRemove);
    content = content.replace(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi, (match, attrs: string, inner: string) => {
      return normalize(inner) === target ? "" : `<p${attrs}>${inner}</p>`;
    });
    content = content.replace(/<(h[2-4])\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi, (match, tag: string, attrs: string, inner: string) => {
      if (normalize(inner) === target) return "";
      return `<${tag}${attrs}>${inner}</${tag}>`;
    });
  }
  const withBasePath = basePath ? content.replace(/href="\/(vi|ru|en)\//g, `href="${basePath}/$1/`) : content;
  return <><div className="source-copy" dangerouslySetInnerHTML={{__html: withBasePath}}/><SourceMedia/></>;
}
