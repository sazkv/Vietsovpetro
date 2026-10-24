import Link from "next/link";
import {home,pages,type Locale} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

const labels={
  vi:{hero:"Vững vàng giữa biển khơi.",description:"Liên doanh Việt – Nga Vietsovpetro. Tìm kiếm, thăm dò, khai thác dầu khí và cung cấp dịch vụ kỹ thuật ngoài khơi.",about:"Về Vietsovpetro",serviceLink:"Tất cả dịch vụ",projectsLink:"Tất cả dự án",newsLink:"Tất cả tin tức",founded:"Thành lập năm 1981",history:"Được thành lập năm 1981, Vietsovpetro là liên doanh hoạt động trong lĩnh vực dầu khí ngoài khơi Việt Nam."},
  ru:{hero:"Инженерия открытого моря.",description:"Совместное предприятие Вьетнама и России. Разведка, добыча нефти и газа, морские инженерные работы.",about:"О Вьетсовпетро",serviceLink:"Все услуги",projectsLink:"Все проекты",newsLink:"Все новости",founded:"Основано в 1981 году",history:"«Вьетсовпетро» создано в 1981 году и занимается нефтегазовыми работами на морских месторождениях Вьетнама."},
  en:{hero:"Engineering the open sea.",description:"Vietnam–Russia joint venture specializing in offshore oil and gas exploration, production and engineering.",about:"About Vietsovpetro",serviceLink:"All services",projectsLink:"All projects",newsLink:"All news",founded:"Established in 1981",history:"Established in 1981, Vietsovpetro operates in Vietnam’s offshore oil and gas industry."}
};
const base=process.env.NEXT_PUBLIC_BASE_PATH||"";

export default function SourceHome({locale}:{locale:Locale}){
  const t=labels[locale],m=messageSet(locale),content=home[locale];
  const featuredNews=content.news.map(category=>{
    const article=category.articles[0];
    if(!article)return null;
    const page=pages.find(item=>item.route===article.href);
    return {title:article.title,url:article.href,image:page?.images?.[0],date:page?.date};
  }).filter((v):v is NonNullable<typeof v>=>v!==null);
  return <main className="vx-home">
    <section className="vx-hero" aria-labelledby="vx-home-title">
      <div className="vx-hero-image" style={{backgroundImage:`url("${base}/brand/hero-offshore-1.jpg")`}} aria-hidden="true"/>
      <div className="shell vx-hero-content">
        <h1 id="vx-home-title">{t.hero}</h1>
        <p>{t.description}</p>
        <div className="vx-hero-ctas">
          <Link href={`/${locale}/company/`} className="vx-primary-action">{t.about} <span aria-hidden="true">↗</span></Link>
          <Link href={`/${locale}/services/`} className="vx-secondary-action">{m.nav.services} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>

    <section className="vx-home-company shell">
      <div className="vx-company-number">1981<span>{t.founded}</span></div>
      <div className="vx-home-company-copy"><h2>Vietsovpetro</h2><p>{t.history}</p><Link className="vx-text-action" href={`/${locale}/company/`}>{m.nav.company} <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="vx-home-services">
      <div className="shell">
        <div className="vx-home-heading"><h2>{m.nav.services}</h2><Link className="vx-text-action" href={`/${locale}/services/`}>{t.serviceLink} <span aria-hidden="true">↗</span></Link></div>
        <div className="vx-home-service-list">{content.services.slice(0,8).map((item,i)=><Link href={`/${locale}/services/#service-${i+1}`} key={item.title} className="vx-home-service-item"><span>{String(i+1).padStart(2,"0")}</span><h3>{item.title}</h3><span aria-hidden="true">↗</span></Link>)}</div>
      </div>
    </section>

    <section className="vx-home-projects">
      <div className="shell">
        <div className="vx-home-heading"><h2>{m.home.projects}</h2><Link className="vx-text-action" href={`/${locale}/projects/`}>{t.projectsLink} <span aria-hidden="true">↗</span></Link></div>
        <div className="vx-home-project-grid">{content.projects.slice(0,3).map((item,i)=><Link href={item.href||`/${locale}/projects/`} key={item.title} className={i===0?"vx-home-project vx-home-project-lead":"vx-home-project"}>
          <div className="vx-home-project-media"><img src={item.image||`${base}/brand/hero-offshore-2.jpg`} alt="" loading="lazy"/></div>
          <div className="vx-home-project-caption"><h3>{item.title}</h3><span aria-hidden="true">↗</span></div>
        </Link>)}</div>
      </div>
    </section>

    <section className="vx-home-news shell">
      <div className="vx-home-heading"><h2>{m.nav.news}</h2><Link className="vx-text-action" href={`/${locale}/news/`}>{t.newsLink} <span aria-hidden="true">↗</span></Link></div>
      <div className="vx-home-news-grid">{featuredNews.map(item=><Link className="vx-home-news-item" href={item.url} key={item.url}>
        <div className="vx-home-news-photo">{item.image?<img src={item.image} alt="" loading="lazy"/>:<div aria-hidden="true"/>}</div>
        {item.date&&<time>{item.date}</time>}
        <h3>{item.title}</h3>
        <span className="vx-news-more" aria-hidden="true">↗</span>
      </Link>)}</div>
    </section>
  </main>;
}