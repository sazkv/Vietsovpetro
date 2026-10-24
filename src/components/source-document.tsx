import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {type SourcePage} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export default function SourceDocument({page}:{page:SourcePage}){
  const m=messageSet(page.locale);
  const section=page.section==="home"?"pages":page.section;
  return <main className="vx-document shell">
    <nav className="vx-crumbs" aria-label="Breadcrumb">
      <Link href={`/${page.locale}/`}>{m.nav.home}</Link>
      <span aria-hidden="true">/</span>
      <Link href={`/${page.locale}/${section}/`}>{m.nav[section]}</Link>
    </nav>
    <header className="vx-document-heading">
      <h1>{page.title}</h1>
      {page.date&&<time>{page.date}</time>}
    </header>
    <div className="vx-article-layout">
      <article className="vx-article"><SourceCopy html={page.html}/></article>
      <aside className="vx-article-aside">
        <Link href={`/${page.locale}/${section}/`}>← {m.page.back}</Link>
        <a href={page.sourceUrl} target="_blank" rel="noopener noreferrer">{m.page.source} ↗</a>
      </aside>
    </div>
  </main>;
}