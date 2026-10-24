import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import NewsArchive, {type ArchiveCategory} from "@/components/news-archive";
import {home, sectionIndex, sectionPages, type Locale, type Section} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

/**
 * The layout follows the content, not the other way around:
 * news uses a searchable archive; services a numbered technical index;
 * units/projects use photographic directory cards; other sections retain
 * their full original intro and a compact index.
 */
export default function SourceSection({locale,section}:{locale:Locale;section:Section}){
  const m=messageSet(locale);
  const index=sectionIndex(locale,section);
  const children=sectionPages(locale,section).filter(page=>page.route!==`/${locale}/${section}/`);
  const title=m.nav[section];
  const isNews=section==="news",isServices=section==="services";
  const isPortfolio=section==="units"||section==="projects";
  const news:ArchiveCategory[]=isNews?home[locale].news.map((category,i)=>{
    const items=children.filter(page=>page.slug.endsWith(`-${i+1}`))
      .sort((a,b)=>Number(b.slug.split("-")[1])-Number(a.slug.split("-")[1]))
      .map(page=>({title:page.title,route:page.route,date:page.date,image:page.images?.[0]}));
    return {label:category.title,items};
  }):[];

  return <main className={`vx-section vx-section-${section} shell`}>
    <nav className="vx-crumbs" aria-label="Breadcrumb">
      <Link href={`/${locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><span>{title}</span>
    </nav>

    <header className="vx-section-heading">
      <h1>{title}</h1>
    </header>

    {isNews&&<NewsArchive categories={news} locale={locale}/>}

    {isServices&&<>
      {home[locale].serviceIntro&&<p className="vx-section-lead">{home[locale].serviceIntro}</p>}
      <ol className="vx-service-grid">
        {home[locale].services.map((item,i)=><li id={`service-${i+1}`} key={`${i}-${item.title}`}>
          <span className="vx-service-count">{String(i+1).padStart(2,"0")}</span>
          <h2>{item.title}</h2>
          {item.image&&<img src={item.image} alt="" width={56} height={56} loading="lazy"/>}
        </li>)}
      </ol>
      {index?.html&&<details className="vx-original-text"><summary>{m.page.contents} <span aria-hidden="true">↓</span></summary><SourceCopy html={index.html}/></details>}
    </>}

    {!isNews&&!isServices&&<>
      {!isPortfolio&&index?.html&&<div className="vx-index-body"><SourceCopy html={index.html}/></div>}

      {children.length>0&&(isPortfolio?
        <div className="vx-portfolio-grid">
          {children.map((page,i)=><Link key={page.route} href={page.route} className="vx-portfolio-item">
            {page.images?.[0]?
              <div className="vx-portfolio-photo"><img src={page.images[0]} alt="" loading="lazy"/></div>:
              <div className="vx-portfolio-empty" aria-hidden="true"><span>{String(i+1).padStart(2,"0")}</span></div>}
            <div className="vx-portfolio-caption"><h2>{page.title}</h2><span aria-hidden="true">↗</span></div>
          </Link>)}
        </div>:
        <div className="vx-chapter-list">
          {children.map((page,i)=><Link key={page.route} href={page.route}>
            <span className="vx-chapter-number">{String(i+1).padStart(2,"0")}</span>
            <span>{page.title}</span>
            <span className="vx-chapter-arrow" aria-hidden="true">↗</span>
          </Link>)}
        </div>)}

      {isPortfolio&&index?.html&&<div className="vx-index-body vx-index-after"><SourceCopy html={index.html}/></div>}
    </>}
  </main>;
}