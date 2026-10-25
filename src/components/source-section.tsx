import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {home, sectionIndex, sectionPages, type Locale, type Section} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";
import {displayTitle} from "@/lib/display-title";

export default function SourceSection({locale, section}: {locale: Locale; section: Section}) {
  const m = messageSet(locale);
  const index = sectionIndex(locale, section);
  const children = sectionPages(locale, section).filter((page) => page.route !== `/${locale}/${section}/`);
  const title = m.nav[section];
  const isNews = section === "news";
  const isServices = section === "services";
  const isProjects = section === "projects";
  const isDirectory = section === "units" || isProjects || section === "pages";

  return <main id="main-content" className={`section-page section-${section} shell`}>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={`/${locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
    <header className="page-heading"><h1>{title}</h1></header>
    {isServices ? <><p className="section-lead">{home[locale].serviceIntro}</p><ol className="service-index service-index-full">{home[locale].services.map((item, index) => <li id={`service-${index + 1}`} key={item.title}><div><span className="service-number">{String(index + 1).padStart(2, "0")}</span><span>{item.title}</span><img src={item.image} alt="" loading="lazy"/></div></li>)}</ol></> : null}
    {isProjects && <div className="project-directory">{home[locale].projects.map((item) => <Link href={item.href} key={item.href}><span className="project-directory-image">{item.image && <img src={item.image} alt="" loading="lazy"/>}</span><span>{item.title}</span><span aria-hidden="true">↗</span></Link>)}</div>}
    {isProjects && locale === "vi" && index && index.images.length > 5 && <section className="project-partners"><h2>Các Đối Tác Tiêu Biểu</h2><div>{index.images.slice(5).map((src, index) => <img key={`${src}-${index}`} src={src} alt="" loading="lazy"/>)}</div></section>}
    {isNews ? <div className="archive-columns">{home[locale].news.map((category, index) => {
      const categoryPages = children.filter((page) => page.slug.endsWith(`-${index + 1}`)).sort((a, b) => Number(b.slug.split("-")[1]) - Number(a.slug.split("-")[1]));
      const renderArticle = (page: typeof categoryPages[number]) => <li key={page.route}><Link href={page.route}>{page.date && <time>{page.date}</time>}<span>{page.title}</span><span aria-hidden="true">↗</span></Link></li>;
      return <section key={`${category.title}-${index}`}><h2>{category.title}</h2><ul>{categoryPages.slice(0, 24).map(renderArticle)}</ul>{categoryPages.length > 24 && <details className="archive-more"><summary>{m.page.more} ({categoryPages.length - 24})</summary><ul>{categoryPages.slice(24).map(renderArticle)}</ul></details>}</section>;
    })}</div> : null}
    {!isNews && !isServices && !isProjects && index?.html && <div className="section-source"><SourceCopy html={index.html} headingToRemove={title}/></div>}
    {!isNews && !isServices && !isProjects && children.length > 0 && <div className="section-directory">{!isDirectory && <h2>{m.page.contents}</h2>}<nav className="directory-list" aria-label={title}>{children.map((page) => <Link href={page.route} key={page.route}><span>{displayTitle(page)}</span><span aria-hidden="true">↗</span></Link>)}</nav></div>}
  </main>;
}
