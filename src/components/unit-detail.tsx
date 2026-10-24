import Link from "next/link";
import UIIcon from "@/components/ui-icon";
import {extractEditorialData,type EditorialChapter} from "@/lib/editorial-sections";
import type {SourcePage} from "@/lib/original-content";
import {displayTitle} from "@/lib/site-titles";

const copy={
 vi:{heading:"Đơn vị trực thuộc",mission:"Hoạt động",equipment:"Năng lực và nguồn lực",services:"Dịch vụ chuyên môn",standards:"Chứng chỉ và tiêu chuẩn",partners:"Dự án và đối tác",overview:"Giới thiệu",other:"Thông tin",contact:"Thông tin liên hệ"},
 ru:{heading:"Подразделения",mission:"Деятельность",equipment:"Производственные ресурсы",services:"Направления услуг",standards:"Сертификаты и стандарты",partners:"Проекты и партнёры",overview:"О подразделении",other:"Дополнительная информация",contact:"Контакты"},
 en:{heading:"Operating units",mission:"Responsibilities",equipment:"Technical resources",services:"Services",standards:"Certification & standards",partners:"Projects and partners",overview:"Overview",other:"Details",contact:"Contact details"}
};
function SectionBody({block}:{block:EditorialChapter}){
 return <div className="ud-section-body">
   {block.paragraphs.length>0&&<div className="ud-section-prose">
     {block.paragraphs.map((item,i)=><p key={i}>{item}</p>)}
   </div>}
   {block.bullets.length>0&&<div className={"ud-items ud-items-"+block.kind}>
     {block.bullets.map((item,i)=><div className="ud-item" key={i}>
       <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12h16m-6-6 6 6-6 6"/></svg>
       <span>{item}</span>
     </div>)}
   </div>}
   {block.images.length>0&&<div className="ud-media">
     {block.images.map((src,i)=><figure key={src+i}><img src={src} alt="" loading="lazy"/></figure>)}
   </div>}
 </div>;
}
export default function UnitDetail({page}:{page:SourcePage}){
 const t=copy[page.locale];
 const info=extractEditorialData(page.html,"unit",displayTitle(page));
 const chapters=info.chapters;
 return <div className="ud-experience">
  <div className="ud-hero">
   <div className="ud-hero-content">
    <div className="ud-hero-eyebrow">VIETSOVPETRO / {t.heading}</div>
    <h2>{displayTitle(page)}</h2>
    {info.intro.length>0&&<p>{info.intro[0]}</p>}
   </div>
   <div className="ud-hero-visual" aria-hidden="true">
     <svg viewBox="0 0 580 420" fill="none" preserveAspectRatio="xMidYMid meet">
       <g stroke="currentColor" strokeWidth="1.5" opacity=".42">
         <path d="M25 370H555M85 370l52-165h297l52 165M139 205l297 165M433 205 136 370M160 220v150M417 220v150"/>
         <path d="M170 205V104h216v101M214 104V43h110v61M260 43V11M245 11h30M214 104l110-61M324 104 214 43"/>
         <path d="M188 159h180M185 253h206M169 312h244"/>
         <path d="M80 370l-21 24h469l-22-24M25 395c50-12 100-12 150 0s100 12 150 0 100-12 150 0 55 11 80 0"/>
       </g>
       <g fill="currentColor" opacity=".58"><circle cx="137" cy="205" r="4"/><circle cx="434" cy="205" r="4"/><circle cx="85" cy="370" r="4"/><circle cx="486" cy="370" r="4"/></g>
     </svg>
   </div>
  </div>

  {info.contacts.length>0&&<div className="ud-contacts">
    <strong>{t.contact}</strong>
    <div className="ud-contacts-inner">{info.contacts.map((line,i)=><span key={i}>{line}</span>)}</div>
  </div>}
  {chapters.length>0&&<nav className="ud-chapters" aria-label={t.overview}>
    {chapters.map((block,i)=><a href={"#ud-block-"+(i+1)} key={i}>
      <span>{block.heading||t.other}</span><UIIcon name="up-right" size={17}/>
    </a>)}
  </nav>}
  <div className="ud-content">
    {chapters.map((block,i)=><section className={"ud-section ud-section-"+block.kind} id={"ud-block-"+(i+1)} key={i}>
      <div className="ud-section-head">
        <span className="ud-kicker">{block.kind==="mission"?t.mission:block.kind==="resources"?t.equipment:block.kind==="services"?t.services:block.kind==="standards"?t.standards:block.kind==="partners"?t.partners:t.overview}</span>
        <h2>{block.heading||t.overview}</h2>
      </div>
      <SectionBody block={block}/>
    </section>)}
  </div>
  <Link className="ud-return" href={"/"+page.locale+"/units/"}><UIIcon name="left" size={19}/>{t.heading}</Link>
 </div>;
}
