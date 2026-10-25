import UIIcon from "@/components/ui-icon";
import {extractEditorialData,type EditorialChapter} from "@/lib/editorial-sections";
import type {SourcePage} from "@/lib/original-content";
import {displayTitle} from "@/lib/site-titles";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const labels={
 vi:{overview:"Giới thiệu",chapters:"Nội dung chính",since:"Thành lập",units:"Đơn vị trực thuộc",people:"Nhân sự",learn:"Tìm hiểu",principles:"Chính sách và năng lực",more:"Xem chi tiết"},
 ru:{overview:"О предприятии",chapters:"Разделы",since:"Основано",units:"Подразделений",people:"Специалистов",learn:"Подробнее",principles:"Направления работы",more:"Подробнее"},
 en:{overview:"Company profile",chapters:"Sections",since:"Founded",units:"Operating units",people:"Employees",learn:"Explore",principles:"Focus areas",more:"Read more"}
};
const heroImages:Record<string,string>={
 gioithieuct:"hero-offshore-2.jpg",
 introduction:"hero-offshore-2.jpg",
 antoanskmt:"hero-offshore-6.jpg",
 safety:"hero-offshore-6.jpg",
 tiemnang:"hero-offshore-3.jpg",
 community:"hero-offshore-3.jpg",
 linhvuc:"hero-offshore-1.jpg",
 activity:"hero-offshore-1.jpg"
};
function SectionContent({chapter,showDiagrams}:{chapter:EditorialChapter;showDiagrams:boolean}){
 const text=chapter.paragraphs.filter(Boolean);
 const bullets=chapter.bullets.filter(Boolean);
 // The original site used tiny photos as paragraph ornaments (e.g. intro/58.jpg).
 // Keep them in the archived source, not as arbitrarily scaled tiles in production.
 // Only HSE documents carry actual diagrams worth displaying.
 const diagrams=showDiagrams?[...new Set(chapter.images)]:[];
 return <div className="ep-chapter-content">
   {text.length>0&&<div className="ep-text">{text.map((paragraph,i)=>
     <p key={i}>{paragraph}</p>)}</div>}
   {bullets.length>0&&<div className={"ep-points "+(bullets.length>5?"ep-points-long":"")}>
     {bullets.map((item,i)=><div className="ep-point" key={i}>
       <span className="ep-point-mark"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7"/></svg></span>
       <span>{item}</span>
     </div>)}
   </div>}
   {diagrams.length>0&&<div className="ep-technical-diagrams">
     {diagrams.map((src,i)=><figure key={src+i}><img src={src} alt="" loading="lazy"/></figure>)}
   </div>}
 </div>;
}
export default function CompanyEditorial({page}:{page:SourcePage}){
 const {locale,slug}=page;
 const t=labels[locale];
 const title=displayTitle(page);
 const original=extractEditorialData(page.html,"company",title);
 const about=["gioithieuct","introduction"].includes(slug);
 const hse=["antoanskmt","safety"].includes(slug);
 const hero=base+"/brand/"+(heroImages[slug]||"hero-offshore-1.jpg");
 const chapters=original.chapters.filter(ch=>
   ch.paragraphs.length>0||ch.bullets.length>0||(hse&&ch.images.length>0)
 ).map(ch=>about&&ch.heading===title?{
   ...ch,heading:locale==="vi"?"Hoạt động và phát triển":locale==="ru"?"Деятельность и развитие":"Operations and development"
 }:ch);
 const intro=original.intro.length?original.intro:chapters[0]?.paragraphs.slice(0,1)||[];
 return <div className={"ep-editorial ep-editorial-v12 "+(hse?"ep-editorial-safety":"")}>
   <div className="ep-banner">
     <div className="ep-banner-copy">
       <div className="ep-banner-eyebrow">VIETSOVPETRO / {t.overview}</div>
       <h2>{title}</h2>
       {intro[0]&&<p>{intro[0]}</p>}
     </div>
     <figure className="ep-banner-image">
       <img src={hero} alt="" loading="eager" width={1260} height={505}/>
     </figure>
   </div>
   {intro.length>1&&<div className="ep-intro-continuation">{intro.slice(1).map((p,i)=><p key={i}>{p}</p>)}</div>}
   {about&&<section className="ep-stats" aria-label="Vietsovpetro">
     <div><strong>1981</strong><span>{t.since}</span></div>
     <div><strong>18</strong><span>{t.units}</span></div>
     <div><strong>≈7 000</strong><span>{t.people}</span></div>
   </section>}
   {chapters.length>1&&<nav className="ep-anchor-nav" aria-label={t.chapters}>
     <span>{t.chapters}</span>
     {chapters.map((ch,i)=><a href={"#ep-chapter-"+(i+1)} key={i}>{ch.heading}<UIIcon name="up-right" size={15}/></a>)}
   </nav>}
   <div className="ep-chapters">
     {chapters.map((chapter,i)=><section className={"ep-chapter ep-chapter-"+chapter.kind} id={"ep-chapter-"+(i+1)} key={i}>
       <div className="ep-chapter-title">
         <span className="ep-chapter-kicker">VIETSOVPETRO</span>
         <h2>{chapter.heading}</h2>
       </div>
       <SectionContent chapter={chapter} showDiagrams={hse}/>
     </section>)}
   </div>
 </div>;
}
