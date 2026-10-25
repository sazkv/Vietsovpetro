import Link from "next/link";
import OriginalHero from "@/components/original-hero";
import {home, pages, type Locale} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SourceHome({locale}: {locale: Locale}) {
  const content = home[locale];
  const m = messageSet(locale);
  const articleImage = (href: string) => pages.find((page) => page.route === href)?.images[0];
  const featured = content.news.flatMap((group) => group.articles).slice(0, 5);
  const overview = pages.find((page) => page.route === `/${locale}/company/`);
  return <main id="main-content" className="home-page">
    <OriginalHero locale={locale}/>
    <section className="home-overview shell" aria-labelledby="overview-title">
      <div className="home-overview-heading"><h2 id="overview-title">{m.home.overview}</h2><p>{m.home.heroDescription}</p><Link className="text-link" href={`/${locale}/company/`}>{m.nav.company}<span aria-hidden="true">↗</span></Link></div>
      <div className="home-overview-media"><img src={`${basePath}/brand/hero-offshore-2.jpg`} alt="" loading="lazy"/><div className="milestone"><strong>1981</strong><span>{m.home.founded}</span></div></div>
      {overview?.sourceUrl && <a className="source-reference" href={overview.sourceUrl} target="_blank" rel="noreferrer">{m.page.source}<span aria-hidden="true">↗</span></a>}
    </section>

    <section className="home-expertise" aria-labelledby="services-title"><div className="shell">
      <div className="home-section-head"><div><h2 id="services-title">{content.serviceTitle}</h2><p>{content.serviceIntro}</p></div><Link className="text-link" href={`/${locale}/services/`}>{m.home.allServices}<span aria-hidden="true">↗</span></Link></div>
      <div className="expertise-layout"><div className="expertise-photo"><img src={`${basePath}/brand/hero-offshore-3.jpg`} alt="" loading="lazy"/></div><ol className="expertise-index">{content.services.map((service, index) => <li key={index}><Link href={`/${locale}/services/#service-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{service.title}</strong><span aria-hidden="true">↗</span></Link></li>)}</ol></div>
    </div></section>

    <section className="home-projects shell" aria-labelledby="projects-title"><div className="home-section-head"><h2 id="projects-title">{m.home.projects}</h2><Link className="text-link" href={`/${locale}/projects/`}>{m.home.allProjects}<span aria-hidden="true">↗</span></Link></div>
      <div className="project-editorial">{content.projects.map((project, index) => <Link key={index} href={project.href || `/${locale}/projects/`} className={index === 0 ? "project-feature" : "project-line"}>{project.image && <span className="project-photo"><img src={project.image} alt="" loading="lazy"/></span>}<span className="project-name">{project.title}</span><span className="project-open" aria-hidden="true">↗</span></Link>)}</div>
    </section>

    <section className="home-capability" aria-labelledby="capability-title"><div className="shell capability-inner"><div><h2 id="capability-title">{m.home.capability}</h2><Link className="text-link" href={`/${locale}/resources/`}>{m.nav.resources}<span aria-hidden="true">↗</span></Link></div><img src={`${basePath}/brand/hero-offshore-6.jpg`} alt="" loading="lazy"/></div></section>

    <section className="home-news shell" aria-labelledby="news-title"><div className="home-section-head"><h2 id="news-title">{m.nav.news}</h2><Link className="text-link" href={`/${locale}/news/`}>{m.home.allNews}<span aria-hidden="true">↗</span></Link></div>
      <div className="news-editorial">{featured.map((article, index) => {const page = pages.find((item) => item.route === article.href); const image = articleImage(article.href); return <Link className={index === 0 ? "news-lead" : "news-row"} href={article.href} key={article.href}>{index === 0 && image && <span className="news-lead-image"><img src={image} alt="" loading="lazy"/></span>}<span className="news-meta">{page?.date || ""}</span><strong>{article.title}</strong><span className="news-open" aria-hidden="true">↗</span></Link>;})}</div>
    </section>

    <section className="home-people shell" aria-labelledby="people-title"><div><h2 id="people-title">{m.home.people}</h2><p>{m.home.peopleDescription}</p></div><div className="people-links"><Link href={`/${locale}/resources/`}>{m.nav.resources}<span aria-hidden="true">↗</span></Link>{locale === "vi" && <Link href={`/${locale}/careers/`}>{m.nav.careers}<span aria-hidden="true">↗</span></Link>}</div></section>
  </main>;
}
