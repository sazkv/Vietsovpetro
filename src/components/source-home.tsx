import UIIcon from "@/components/ui-icon";
import Link from "next/link";
import Reveal from "@/components/reveal";
import ServiceIcon from "@/components/service-icon";
import {home,pages,sectionPages,sectionOrder,type Locale} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";
import {displayTitle} from "@/lib/site-titles";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const copy={
 vi:{
 heroTop:"Liên doanh Việt – Nga",
 hero:"Năng lượng từ biển Việt Nam.",
 heroCopy:"Nghiên cứu, thăm dò, khai thác dầu khí và phát triển các công trình ngoài khơi từ năm 1981.",
 overview:"Liên doanh Vietsovpetro",
 about:"Thành lập năm 1981, Vietsovpetro hoạt động trong lĩnh vực tìm kiếm, thăm dò, phát triển mỏ và khai thác dầu khí tại thềm lục địa Việt Nam.",
 aboutLink:"Tìm hiểu về Vietsovpetro",serviceAll:"Xem 15 nhóm dịch vụ",projectAll:"Tất cả dự án",unitAll:"Tất cả đơn vị",newsAll:"Xem tin tức",people:"Con người và nguồn lực",peopleCopy:"Đội ngũ gần 7.000 người lao động với chuyên môn khoa học, kỹ thuật và quản lý, cùng hệ thống đào tạo và cơ sở vật chất phục vụ hoạt động ngoài khơi.",peopleLink:"Nguồn lực & đào tạo",
 statA:"Năm thành lập",statB:"Đơn vị trực thuộc",statC:"Triệu tấn dầu thô đã khai thác",statD:"Giếng thăm dò và khai thác",projectSection:"Dự án đã thực hiện",unitSection:"Đơn vị trực thuộc",
 },
 ru:{
 heroTop:"Совместное предприятие Вьетнама и России",hero:"Энергия морских месторождений.",
 heroCopy:"Геологоразведка, добыча нефти и газа, проектирование и эксплуатация морских объектов с 1981 года.",
 overview:"Совместное предприятие «Вьетсовпетро»",
 about:"С 1981 года «Вьетсовпетро» занимается поиском, разведкой, освоением и эксплуатацией нефтегазовых месторождений на континентальном шельфе Вьетнама.",
 aboutLink:"Подробнее о предприятии",serviceAll:"Все 15 направлений",projectAll:"Все проекты",unitAll:"Все подразделения",newsAll:"Все новости",people:"Люди и инфраструктура",peopleCopy:"Около 7 000 специалистов, развитая производственная база и система профессионального обучения для работы на морских объектах.",peopleLink:"Ресурсы и обучение",
 statA:"Год основания",statB:"Подразделений",statC:"Млн тонн добытой нефти",statD:"Разведочных и добывающих скважин",projectSection:"Реализованные проекты",unitSection:"Подразделения",
 },
 en:{
 heroTop:"Vietnam–Russia Joint Venture",hero:"Offshore energy. Proven expertise.",
 heroCopy:"Exploration, oil and gas production, and offshore engineering on Vietnam's continental shelf since 1981.",
 overview:"Vietsovpetro Joint Venture",
 about:"Established in 1981, Vietsovpetro conducts exploration, field development and oil and gas production on the continental shelf of Vietnam.",
 aboutLink:"Discover Vietsovpetro",serviceAll:"All 15 service groups",projectAll:"Explore all projects",unitAll:"All operating units",newsAll:"More news",people:"People and infrastructure",peopleCopy:"Nearly 7,000 skilled professionals, advanced industrial facilities and training resources supporting offshore operations.",peopleLink:"People & resources",
 statA:"Established",statB:"Operating units",statC:"Million tonnes of crude produced",statD:"Exploration and production wells",projectSection:"Completed projects",unitSection:"Operating units",
 }
} as const;
function Arrow(){return <span aria-hidden="true"><UIIcon name="up-right" size={18}/></span>}
function getNewsDate(d:string){const p=d.match(/(\d{1,2})[\/.\-](\d{1,2})[\/.\-](20\d{2}|19\d{2})/);return p?Number(p[3])*10000+Number(p[2])*100+Number(p[1]):0}
export default function SourceHome({locale}:{locale:Locale}){
 const t=copy[locale],m=messageSet(locale),data=home[locale];
 const projects=data.projects.slice(0,5);
 const units=sectionPages(locale,"units").filter(p=>p.route!==`/${locale}/units/`).slice(0,4);
 const articles=data.news.flatMap(g=>g.articles.map(a=>{
  const article=pages.find(p=>p.route===a.href);
  return {title:a.title,href:a.href,date:article?.date||"",image:article?.images?.[0]};
 })).sort((a,b)=>getNewsDate(b.date)-getNewsDate(a.date)).slice(0,4);
 const careerHref=sectionOrder[locale].includes("careers")?`/${locale}/careers/`:`/${locale}/resources/`;
 return <main className="r-home">
  <section className="r-hero">
   <div className="r-hero-image" style={{backgroundImage:`url("${base}/brand/hero-offshore-1.jpg")`}} aria-hidden="true"/>
   <div className="shell r-hero-content">
    <span className="r-hero-identity">{t.heroTop}</span>
    <h1>{t.hero}</h1>
    <p>{t.heroCopy}</p>
    <div className="r-hero-actions">
     <Link href={`/${locale}/company/`} className="r-btn r-btn-light">{t.aboutLink}<Arrow/></Link>
     <Link href={`/${locale}/services/`} className="r-arrow-link r-arrow-link-light">{m.nav.services}<Arrow/></Link>
    </div>
   </div>
   <div className="r-hero-outline" aria-hidden="true">VIETSOVPETRO</div>
  </section>

  <section className="r-proof">
   <div className="shell r-proof-grid">
    {[[ "1981",t.statA],["18",t.statB],["250+",t.statC],["650+",t.statD]].map(([v,l])=><div className="r-proof-cell" key={l}><strong>{v}</strong><span>{l}</span></div>)}
   </div>
  </section>

  <Reveal><section className="shell r-home-about">
    <div className="r-home-about-photo"><img src={`${base}/brand/hero-offshore-6.jpg`} alt="" loading="lazy"/></div>
    <div className="r-home-about-copy">
      <h2>{t.overview}</h2>
      <p>{t.about}</p>
      <Link className="r-arrow-link" href={`/${locale}/company/`}>{t.aboutLink}<Arrow/></Link>
      <div className="r-home-about-links">
        {sectionPages(locale,"company").filter(p=>p.route!==`/${locale}/company/`).slice(0,4).map(p=><Link key={p.route} href={p.route}>{displayTitle(p)}<Arrow/></Link>)}
      </div>
    </div>
  </section></Reveal>

  <Reveal><section className="r-home-services">
    <div className="shell">
     <header className="r-home-section-head"><h2>{m.nav.services}</h2><Link href={`/${locale}/services/`} className="r-arrow-link">{t.serviceAll}<Arrow/></Link></header>
     <div className="r-home-services-grid">
       {data.services.slice(0,6).map((item,i)=><Link key={item.title} href={`/${locale}/services/#service-${i+1}`} className="r-home-service-card">
         <ServiceIcon index={i} className="r-home-service-icon"/>
         <span className="r-home-service-number">{String(i+1).padStart(2,"0")}</span>
         <h3>{item.title}</h3><span className="r-home-service-arrow" aria-hidden="true"><UIIcon name="up-right" size={18}/></span>
       </Link>)}
     </div>
    </div>
  </section></Reveal>

  <Reveal><section className="r-home-projects">
    <div className="shell r-home-projects-wrap">
     <div className="r-home-projects-visual"><img src={`${base}/brand/hero-offshore-2.jpg`} alt="" loading="lazy"/></div>
     <div className="r-home-projects-list">
      <h2>{t.projectSection}</h2>
      <div>{projects.map((p,i)=><Link key={p.href||p.title} href={p.href||`/${locale}/projects/`}><span>{String(i+1).padStart(2,"0")}</span><strong>{pages.find(item=>item.route===p.href)?displayTitle(pages.find(item=>item.route===p.href)!):p.title}</strong><Arrow/></Link>)}</div>
      <Link className="r-arrow-link r-arrow-link-light" href={`/${locale}/projects/`}>{t.projectAll}<Arrow/></Link>
     </div>
    </div>
  </section></Reveal>

  <Reveal><section className="shell r-home-units">
   <div className="r-home-section-head"><h2>{t.unitSection}</h2><Link href={`/${locale}/units/`} className="r-arrow-link">{t.unitAll}<Arrow/></Link></div>
   <div className="r-home-unit-list">{units.map((unit,i)=><Link href={unit.route} key={unit.route}><span>{String(i+1).padStart(2,"0")}</span><strong>{unit.title}</strong><Arrow/></Link>)}</div>
  </section></Reveal>

  <Reveal><section className="r-home-news">
   <div className="shell">
    <header className="r-home-section-head"><h2>{m.nav.news}</h2><Link className="r-arrow-link" href={`/${locale}/news/`}>{t.newsAll}<Arrow/></Link></header>
    <div className="r-home-news-grid">
      {articles.map((item,i)=><Link href={item.href} className={i===0?"r-home-news-card r-home-news-lead":"r-home-news-card"} key={item.href}>
        {i===0&&<div className="r-home-news-photo">{item.image?<img src={item.image} alt="" loading="lazy"/>:<img src={`${base}/brand/hero-offshore-3.jpg`} alt="" loading="lazy"/>}</div>}
        <div className="r-home-news-text">{item.date&&<time>{item.date}</time>}<h3>{item.title}</h3><span aria-hidden="true"><UIIcon name="up-right" size={18}/></span></div>
      </Link>)}
    </div>
   </div>
  </section></Reveal>

  <Reveal><section className="r-home-people">
    <div className="r-home-people-image" style={{backgroundImage:`url("${base}/brand/hero-offshore-3.jpg")`}} aria-hidden="true"/>
    <div className="shell r-home-people-inner">
      <h2>{t.people}</h2>
      <p>{t.peopleCopy}</p>
      <Link href={careerHref} className="r-btn r-btn-light">{t.peopleLink}<Arrow/></Link>
    </div>
  </section></Reveal>
 </main>;
}
