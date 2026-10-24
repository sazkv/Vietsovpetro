import Link from "next/link";
import OriginalHero from "@/components/original-hero";
import {home, pages, type Locale} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export default function SourceHome({locale}: {locale: Locale}) {
  const content = home[locale];
  const m = messageSet(locale);
  return <main className="home-page">
    <OriginalHero locale={locale}/>
    <section className="home-services shell" aria-labelledby="services-title">
      <div className="section-intro"><h2 id="services-title">{content.serviceTitle}</h2><p>{content.serviceIntro}</p></div>
      <ol className="service-index">{content.services.map((item, index) => <li key={`${item.title}-${index}`}><Link href={`/${locale}/services/#service-${index + 1}`}><span className="service-number">{String(index + 1).padStart(2, "0")}</span><span>{item.title}</span><span className="service-arrow" aria-hidden="true">↗</span></Link></li>)}</ol>
    </section>
    <section className="home-news" aria-labelledby="news-title"><div className="shell"><div className="section-heading"><h2 id="news-title">{m.nav.news}</h2><Link href={`/${locale}/news/`}>{m.home.allNews}<span aria-hidden="true">↗</span></Link></div><div className="news-columns">{content.news.map((category, index) => {
      const lead = category.articles[0];
      const image = lead ? pages.find((page) => page.route === lead.href)?.images[0] : undefined;
      return <div className="news-column" key={`${category.title}-${index}`}><h3>{category.title}</h3>{image && <Link className="news-image" href={lead.href}><img src={image} alt="" loading="lazy"/></Link>}<ul>{category.articles.map((article) => <li key={article.href}><Link href={article.href}>{article.title}<span aria-hidden="true">↗</span></Link></li>)}</ul></div>;
    })}</div></div></section>
    <section className="home-projects shell" aria-labelledby="projects-title"><div className="section-heading"><h2 id="projects-title">{m.home.projects}</h2><Link href={`/${locale}/projects/`}>{m.home.allProjects}<span aria-hidden="true">↗</span></Link></div><div className="project-rail">{content.projects.map((project, index) => <Link href={project.href || `/${locale}/projects/`} className="project-item" key={`${project.title}-${index}`}><div className="project-image">{project.image && <img src={project.image} alt="" loading="lazy"/>}</div><span>{project.title}</span></Link>)}</div></section>
  </main>;
}
