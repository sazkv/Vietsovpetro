import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {type SourcePage} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

const terms = {
  vi:{published:"Ngày đăng",origin:"Nguồn nội dung",primary:"Trang gốc Vietsovpetro",back:"Quay lại chuyên mục",read:"Nội dung bài viết"},
  en:{published:"Published",origin:"Content source",primary:"Original Vietsovpetro page",back:"Back to category",read:"Article"},
  ru:{published:"Опубликовано",origin:"Первоисточник",primary:"Оригинал на сайте Вьетсовпетро",back:"К разделу",read:"Материал"}
};

export default function SourceDocument({page}: {page:SourcePage}) {
  const m=messageSet(page.locale);
  const section=page.section==="home"?"pages":page.section;
  const t=terms[page.locale];

  return <main className="cp-document-page">
    <header className="cp-document-header">
      <div className="shell">
        <nav className="cp-breadcrumb" aria-label="Breadcrumb">
          <Link href={`/${page.locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span>
          <Link href={`/${page.locale}/${section}/`}>{m.nav[section]}</Link>
        </nav>
        <div className="cp-document-header-inner">
          <div><p className="cp-page-index">VIETSOVPETRO / {section.toUpperCase()}</p><h1>{page.title}</h1>
          {page.date && <div className="cp-document-date"><span>{t.published}</span><time>{page.date}</time></div>}</div>
        </div>
      </div>
    </header>
    <div className="shell cp-document-layout">
      <article className="cp-document-article" aria-label={t.read}>
        <SourceCopy html={page.html}/>
      </article>
      <aside className="cp-document-aside">
        <div className="cp-document-aside-sticky">
          <p className="cp-eyebrow">{t.origin}</p>
          <strong>Vietsovpetro</strong>
          <p>{t.primary}</p>
          <a href={page.sourceUrl} target="_blank" rel="noopener noreferrer">{m.page.source} ↗</a>
          <div className="cp-aside-rule"/>
          <Link href={`/${page.locale}/${section}/`}>← {t.back}</Link>
        </div>
      </aside>
    </div>
  </main>;
}