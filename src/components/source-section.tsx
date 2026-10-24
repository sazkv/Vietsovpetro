import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {home, sectionIndex, sectionPages, type Locale, type Section} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

const labels:Record<Locale,{browse:string,entries:string,category:string,all:string,source:string}> = {
  vi:{browse:"Khám phá danh mục",entries:"Mục nội dung",category:"Chuyên mục",all:"Toàn bộ nội dung",source:"Tham khảo nguồn chính thức"},
  ru:{browse:"Разделы каталога",entries:"Материалов",category:"Раздел",all:"Все материалы",source:"Оригинальный источник"},
  en:{browse:"Explore the directory",entries:"Entries",category:"Category",all:"All content",source:"Original official source"}
};

export default function SourceSection({locale,section}: {locale:Locale;section:Section}) {
  const m=messageSet(locale);
  const index=sectionIndex(locale,section);
  const children=sectionPages(locale,section).filter(page=>page.route!==`/${locale}/${section}/`);
  const title=m.nav[section];
  const label=labels[locale];
  const isNews=section==="news",isServices=section==="services";
  return <main className="cp-section-page">
    <section className="cp-page-banner" aria-labelledby="cp-section-heading">
      <div className="shell cp-page-banner-inner">
        <nav className="cp-breadcrumb" aria-label="Breadcrumb"><Link href={`/${locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
        <div className="cp-page-banner-content"><div><p className="cp-page-index">VIETSOVPETRO / {section.toUpperCase()}</p><h1 id="cp-section-heading">{title}</h1></div><div className="cp-banner-counter"><strong>{isServices?home[locale].services.length:children.length.toLocaleString("en-US")}</strong><span>{label.entries}</span></div></div>
      </div>
    </section>

    <div className="shell cp-section-layout">
      <aside className="cp-section-aside">
        <span className="cp-aside-label">{label.category}</span>
        <strong>{title}</strong>
        <div className="cp-aside-rule"/>
        <Link href={`/${locale}/`}>← {m.nav.home}</Link>
        {index?.sourceUrl && <a href={index.sourceUrl} target="_blank" rel="noopener noreferrer">{label.source} ↗</a>}
      </aside>
      <div className="cp-section-primary">
        {isServices && <>
          <div className="cp-content-intro"><p className="cp-eyebrow">{m.nav.services}</p><h2>{home[locale].serviceTitle}</h2><p>{home[locale].serviceIntro}</p></div>
          <ol className="cp-service-directory">
            {home[locale].services.map((service,i)=><li key={service.title} id={`service-${i+1}`}>
              <span className="cp-service-num">{String(i+1).padStart(2,"0")}</span>
              <h3>{service.title}</h3>
              {service.image && <img src={service.image} width={70} height={70} alt="" loading="lazy"/>}
            </li>)}
          </ol>
        </>}

        {isNews && <div className="cp-news-archive">
          <div className="cp-content-intro"><p className="cp-eyebrow">{m.nav.news}</p><h2>{label.all}</h2></div>
          {home[locale].news.map((category,index)=>{
            const categoryPages=children.filter(page=>page.slug.endsWith(`-${index+1}`)).sort((a,b)=>Number(b.slug.split("-")[1])-Number(a.slug.split("-")[1]));
            const render=(page:typeof categoryPages[number])=><li key={page.route}><Link href={page.route}><span className="cp-archive-title">{page.title}</span><span className="cp-archive-meta">{page.date||"—"}</span><span className="cp-archive-arrow" aria-hidden>↗</span></Link></li>;
            return <section key={category.title} className="cp-news-archive-group"><header><h3>{category.title}</h3><span>{categoryPages.length}</span></header><ul>{categoryPages.slice(0,24).map(render)}</ul>{categoryPages.length>24&&<details><summary>{m.page.more} ({categoryPages.length-24})</summary><ul>{categoryPages.slice(24).map(render)}</ul></details>}</section>;
          })}
        </div>}

        {!isNews && !isServices && index?.html && <div className="cp-section-copy"><SourceCopy html={index.html}/></div>}
        {children.length>0&&!isNews&& <section className="cp-section-list" aria-label={label.browse}>
          <div className="cp-section-list-head"><p className="cp-eyebrow">{label.browse}</p><h2>{m.page.contents}</h2></div>
          <nav className="cp-chapter-list" aria-label={title}>
            {children.map((page,i)=><Link key={page.route} href={page.route}><span className="cp-chapter-num">{String(i+1).padStart(2,"0")}</span><span>{page.title}</span><span className="cp-chapter-arrow" aria-hidden>↗</span></Link>)}
          </nav>
        </section>}
        {isServices && index?.html && <div className="cp-section-copy cp-services-original"><div className="cp-section-list-head"><p className="cp-eyebrow">{label.source}</p><h2>{m.page.contents}</h2></div><SourceCopy html={index.html}/></div>}
      </div>
    </div>
  </main>;
}