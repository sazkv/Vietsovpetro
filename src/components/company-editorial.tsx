import UIIcon from "@/components/ui-icon";
import {extractEditorialData,type EditorialChapter} from "@/lib/editorial-sections";
import type {SourcePage} from "@/lib/original-content";
import {displayTitle} from "@/lib/site-titles";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const labels={
 vi:{overview:"Giới thiệu",chapters:"Nội dung chính",since:"Thành lập",units:"Đơn vị trực thuộc",people:"Nhân sự",learn:"Tìm hiểu",principles:"Chính sách và năng lực",more:"Xem chi tiết"},
 ru:{overview:"О предприятии",chapters:"Направления",since:"Основано",units:"Подразделений",people:"Специалистов",learn:"Подробнее",principles:"Направления работы",more:"Подробнее"},
 en:{overview:"Company profile",chapters:"Explore",since:"Founded",units:"Operating units",people:"Employees",learn:"Explore",principles:"Focus areas",more:"Read more"}
};

const heroImg:Record<string,string>={
 gioithieuct:"hero-offshore-2.jpg",
 introduction:"hero-offshore-2.jpg",
 antoanskmt:"hero-offshore-6.jpg",
 safety:"hero-offshore-6.jpg",
 tiemnang:"hero-offshore-3.jpg",
 community:"hero-offshore-3.jpg",
 linhvuc:"hero-offshore-1.jpg",
 activity:"hero-offshore-1.jpg"
};
function SectionContent({chapter}:{chapter:EditorialChapter}){
 const texts=chapter.paragraphs.filter(Boolean);
 const bullets=chapter.bullets.filter(Boolean);
 return <div className="ep-chapter-content">
   {texts.length>0&&<div className="ep-text">
     {texts.map((text,index)=><p key={index}>{text}</p>)}
   </div>}
   {bullets.length>0&&<div className={"ep-points "+(bullets.length>5?"ep-points-long":"")}>
     {bullets.map((item,index)=><div className="ep-point" key={index}>
       <span className="ep-point-mark"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M4 12h16m-7-7 7 7-7 7"/></svg></span>
       <span>{item}</span>
     </div>)}
   </div>}
   {chapter.images.length>0&&<div className="ep-illustrations">
     {chapter.images.map((image,i)=><figure key={image+i}><img src={image} loading="lazy" alt=""/></figure>)}
   </div>}
 </div>;
}
export default function CompanyEditorial({page}:{page:SourcePage}){
 const {locale,slug}=page;
 const copy=labels[locale];
 const title=displayTitle(page);
 const content=extractEditorialData(page.html,"company",title);
 const about=["gioithieuct","introduction"].includes(slug);
 const hse=["antoanskmt","safety"].includes(slug);
 const hero=base+"/brand/"+(heroImg[slug]||"hero-offshore-1.jpg");
 const chapters=content.chapters.filter(ch=>{
   // Old introductory thumbnails were at times the only content in a section.
   // Never upscale them or render a duplicate empty image-only chapter.
   if(ch.heading===title&&!ch.paragraphs.length&&!ch.bullets.length)return false;
   return Boolean(ch.paragraphs.length||ch.bullets.length||ch.images.length);
 }).map(ch=>about&&ch.heading===title?{
   ...ch,heading:locale==="vi"?"Hoạt động và phát triển":locale==="ru"?"Деятельность и развитие":"Operations and development"
 }:ch);
 const visibleIntro=content.intro.length>0?content.intro:
    chapters[0]?.paragraphs.slice(0,1)||[];
 return <div className={"ep-editorial "+(hse?"ep-editorial-safety":"")}>
   <div className="ep-banner">
     <div className="ep-banner-copy">
       <div className="ep-banner-eyebrow">VIETSOVPETRO / {copy.overview}</div>
       <h2>{title}</h2>
       {visibleIntro.length>0&&<p>{visibleIntro[0]}</p>}
     </div>
     <div className="ep-banner-image">
       <img src={hero} alt="" loading="eager"/>
     </div>
   </div>
   {visibleIntro.length>1&&<div className="ep-intro-continuation">
     {visibleIntro.slice(1).map((paragraph,i)=><p key={i}>{paragraph}</p>)}
   </div>}
   {about&&<section className="ep-stats" aria-label="Vietsovpetro">
     <div><strong>1981</strong><span>{copy.since}</span></div>
     <div><strong>18</strong><span>{copy.units}</span></div>
     <div><strong>≈7 000</strong><span>{copy.people}</span></div>
   </section>}
   {chapters.length>0&&<nav className="ep-anchor-nav" aria-label={copy.chapters}>
     <span>{copy.chapters}</span>
     {chapters.map((chapter,i)=><a href={"#ep-chapter-"+(i+1)} key={i}>
       {chapter.heading}<UIIcon name="up-right" size={15}/>
     </a>)}
   </nav>}
   <div className="ep-chapters">
     {chapters.map((chapter,i)=><section className={"ep-chapter ep-chapter-"+chapter.kind} key={i} id={"ep-chapter-"+(i+1)}>
       <div className="ep-chapter-title">
         <span className="ep-chapter-kicker">VIETSOVPETRO</span>
         <h2>{chapter.heading}</h2>
       </div>
       <SectionContent chapter={chapter}/>
     </section>)}
   </div>
 </div>;
}
