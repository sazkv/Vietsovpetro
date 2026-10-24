import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {home, sectionIndex, sectionPages, type Locale, type Section} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export default function SourceSection({locale, section}: {locale: Locale; section: Section}) {
  const m = messageSet(locale);
  const index = sectionIndex(locale, section);
  const children = sectionPages(locale, section).filter((page) => page.route !== `/${locale}/${section}/`);
  const title = m.nav[section];
  const isNews = section === "news";
  const isServices = section === "services";
  const isDirectory = section === "units" || section === "projects" || section === "pages";

  return <main className="section-page shell">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={`/${locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
    <header className="page-heading"><h1>{title}</h1></header>
    {isServices ? <><p className="section-lead">{home[locale].serviceIntro}</p><ol className="service-index service-index-full">{home[locale].services.map((item, index) => <li id={`service-${index + 1}`} key={item.title}><div><span className="service-number">{String(index + 1).padStart(2, "0")}</span><span>{item.title}</span><img src={item.image} alt="" loading="lazy"/></div></li>)}</ol></> : null}
    {isNews ? <div className="archive-columns">{home[locale].news.map((category, index) => {
      const categoryPages = children.filter((page) => page.slug.endsWith(`-${index + 1}`)).sort((a, b) => Number(b.slug.split("-")[1]) - Number(a.slug.split("-")[1]));
      const renderArticle = (page: typeof categoryPages[number]) => <li key={page.route}><Link href={page.route}>{page.date && <time>{page.date}</time>}<span>{page.title}</span><span aria-hidden="true">↗</span></Link></li>;
      return <section key={`${category.title}-${index}`}><h2>{category.title}</h2><ul>{categoryPages.slice(0, 24).map(renderArticle)}</ul>{categoryPages.length > 24 && <details className="archive-more"><summary>{m.page.more} ({categoryPages.length - 24})</summary><ul>{categoryPages.slice(24).map(renderArticle)}</ul></details>}</section>;
    })}</div> : null}
    {!isNews && !isServices && index?.html && <SourceCopy html={index.html}/>}
    {!isNews && !isServices && children.length > 0 && <div className="section-directory">{!isDirectory && <h2>{m.page.contents}</h2>}<nav className="directory-list" aria-label={title}>{children.map((page) => <Link href={page.route} key={page.route}><span>{page.title}</span><span aria-hidden="true">↗</span></Link>)}</nav></div>}
  </main>;
}
