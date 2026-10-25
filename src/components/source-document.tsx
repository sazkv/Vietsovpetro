import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {home, sectionPages, type SourcePage} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";
import {displayTitle} from "@/lib/display-title";

export default function SourceDocument({page}: {page: SourcePage}) {
  const m = messageSet(page.locale);
  const section = page.section === "home" ? "pages" : page.section;
  const related = sectionPages(page.locale, section).filter((item) => item.route !== page.route && item.route !== `/${page.locale}/${section}/`).slice(0, 8);
  const project = page.section === "projects" ? home[page.locale].projects.find((item) => item.href === page.route) : undefined;
  const title = project?.title || displayTitle(page);
  const isHistory = page.section === "company" && ["lichsuhinhthanh","significant"].includes(page.slug);
  return <main id="main-content" className={`document-page ${isHistory ? "document-history" : ""} ${page.section === "projects" ? "document-project" : ""} shell`}>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={`/${page.locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><Link href={`/${page.locale}/${section}/`}>{m.nav[section]}</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
    <div className="document-layout"><article className="document-article"><header className="document-heading"><h1>{title}</h1>{page.date && <time>{page.date}</time>}</header>{project?.image && <div className="document-project-image"><img src={project.image} alt="" loading="eager"/></div>}<SourceCopy html={page.html} headingToRemove={title}/></article>
    <aside className="document-aside"><a href={page.sourceUrl} target="_blank" rel="noreferrer">{m.page.source}<span aria-hidden="true">↗</span></a><Link href={`/${page.locale}/${section}/`}>{m.page.back}<span aria-hidden="true">←</span></Link>{related.length > 0 && <><h2>{m.page.contents}</h2>{related.map((item) => <Link key={item.route} href={item.route}>{displayTitle(item)}<span aria-hidden="true">↗</span></Link>)}</>}</aside></div>
  </main>;
}
