import type {SourcePage} from "@/lib/original-content";
import {displayTitle} from "@/lib/site-titles";
import {extractEditorialData} from "@/lib/editorial-sections";

type Locale="vi"|"ru"|"en";
const labels:{
 [K in Locale]:{intro:string;groups:string[];operations:string;sector:string}
}={
 vi:{intro:"Hoạt động dầu khí và dịch vụ kỹ thuật",groups:["Nghiên cứu và thăm dò","Công trình và vận hành","Hoạt động ngoài khơi","Dịch vụ chuyên môn"],operations:"Các lĩnh vực hoạt động",sector:"LĨNH VỰC HOẠT ĐỘNG"},
 ru:{intro:"Нефтегазовая деятельность и инженерные услуги",groups:["Геология и исследования","Строительство и эксплуатация","Морские операции","Специализированные услуги"],operations:"Основные направления",sector:"СФЕРА ДЕЯТЕЛЬНОСТИ"},
 en:{intro:"Petroleum exploration and technical services",groups:["Exploration and development","Engineering and infrastructure","Marine operations","Specialist services"],operations:"Areas of expertise",sector:"AREAS OF OPERATION"}
};
function parseActivity(page:SourcePage){
 const info=extractEditorialData(page.html,"company",displayTitle(page));
 const rawParagraphs=[...info.intro,...info.chapters.flatMap(c=>c.paragraphs)].filter(Boolean);
 const sourceBullets=info.chapters.flatMap(c=>c.bullets);
 if(page.locale==="ru"){
  const entire=rawParagraphs.join(" ");
  const marker=entire.search(/\s+[·•]\s*/);
  const introText=(marker>=0?entire.slice(0,marker):entire).trim();
  const items=marker>=0?entire.slice(marker).split(/\s*[·•]\s*/).map(x=>x.trim().replace(/[;,\s]+$/g,"")).filter(Boolean):sourceBullets;
  const into=introText.split(/(?=Имея богатый опыт)/).map(s=>s.trim()).filter(Boolean);
  return {paragraphs:into,items};
 }
 if(page.locale==="en"){
  const joined=rawParagraphs.join(" ");
  const split=joined.split(/(?=Currently, Vietsovpetro)|(?=With 8[.,]000)/).map(x=>x.trim()).filter(Boolean);
  return {paragraphs:split,items:sourceBullets};
 }
 return {paragraphs:rawParagraphs.slice(0,3),items:sourceBullets};
}
export default function ActivityExperience({page}:{page:SourcePage}){
 const locale=page.locale as Locale;
 const t=labels[locale];
 const data=parseActivity(page);
 const count=data.items.length;
 const ranges=count<7?[[0,2],[2,3],[3,count]]:[[0,3],[3,6],[6,10],[10,count]];
 const groups=ranges.map(([from,to],index)=>({title:t.groups[index],items:data.items.slice(from,to)})).filter(x=>x.items.length>0);
 return <div className="scope-experience">
  <div className="scope-lead">
   <div className="scope-eyebrow">VIETSOVPETRO <span>/ {t.sector}</span></div>
   <h2>{displayTitle(page)}</h2>
   <div className="scope-lead-copy">
     {data.paragraphs.map((line,index)=><p key={index}>{line}</p>)}
   </div>
  </div>
  {groups.length>0&&<div className="scope-content">
   <div className="scope-title"><h3>{t.operations}</h3><span>{t.intro}</span></div>
   {groups.map((group,index)=><section key={group.title} className="scope-group">
      <div className="scope-group-heading"><h3>{group.title}</h3></div>
      <div className="scope-group-items">
       {group.items.map((item,i)=><p key={i}>{item}</p>)}
      </div>
    </section>)}
  </div>}
 </div>;
}
