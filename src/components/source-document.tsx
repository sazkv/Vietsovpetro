import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {type SourcePage} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export default function SourceDocument({page}: {page: SourcePage}) {
  const m = messageSet(page.locale);
  const section = page.section === "home" ? "pages" : page.section;
  return <main className="document-page shell">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={`/${page.locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><Link href={`/${page.locale}/${section}/`}>{m.nav[section]}</Link></nav>
    <article className="document-article"><header className="document-heading"><h1>{page.title}</h1>{page.date && <time>{page.date}</time>}</header><SourceCopy html={page.html}/></article>
  </main>;
}
