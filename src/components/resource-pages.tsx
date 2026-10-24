import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {parseFacilities,textOf} from "@/lib/structured-content";
import {sectionPages,type SourcePage,type Locale} from "@/lib/original-content";
import {displayTitle} from "@/lib/site-titles";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const words={
 vi:{personnel:"Nguồn nhân lực",facilities:"Cơ sở vật chất & phương tiện",all:"Xem cơ sở vật chất",people:"Cán bộ công nhân viên",education:"Trình độ đại học và trên đại học",workers:"Công nhân kỹ thuật tay nghề cao",},
 ru:{personnel:"Кадровые ресурсы",facilities:"Производственная инфраструктура",all:"Оборудование и инфраструктура",people:"Специалистов и сотрудников",education:"Высшее и послевузовское образование",workers:"Квалифицированные рабочие",},
 en:{personnel:"Human resources",facilities:"Facilities & equipment",all:"Explore production facilities",people:"Employees and specialists",education:"Higher education qualifications",workers:"Skilled technical workforce",}
};
const facts=[["≈7.000","people"],["50%","education"],["44%","workers"]] as const;

export function ResourceIndex({locale,page}:{locale:Locale;page?:SourcePage}){
 const t=words[locale];
 const related=sectionPages(locale,"resources").filter(p=>p.route!==`/${locale}/resources/`);
 const facilities=related.find(p=>p.slug==="cosovatchat");
 const statements=page?[...page.html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi)]
   .map(m=>textOf(m[1])).filter(Boolean):[];
 return <div className="v-resource-index shell">
   <div className="v-resource-top">
     <div className="v-resource-top-copy">
       <h2>{t.personnel}</h2>
       <div className="v-resource-facts">{facts.map(([value,key])=><div key={key}><strong>{value}</strong><span>{t[key]}</span></div>)}</div>
     </div>
     <div className="v-resource-cover"><img src={`${base}/brand/hero-offshore-3.jpg`} alt="" loading="lazy"/></div>
   </div>
   {statements.length>0&&<div className="v-resource-points">
     {statements.map((statement,i)=><div className="v-resource-point" key={i}>
       <span>{String(i+1).padStart(2,"0")}</span><p>{statement}</p>
     </div>)}
   </div>}
   {facilities&&<Link className="v-resource-facility-entry" href={facilities.route}>
     <div className="v-resource-facility-photo">{facilities.images?.[0]?<img src={facilities.images[0]} loading="lazy" alt=""/>:<img src={`${base}/brand/hero-offshore-2.jpg`} loading="lazy" alt=""/>}</div>
     <div className="v-resource-facility-link">
       <h2>{t.facilities}</h2><span aria-hidden="true">↗</span>
     </div>
   </Link>}
   {related.filter(p=>p.route!==facilities?.route).map(p=><Link key={p.route} className="v-resource-extra" href={p.route}>{displayTitle(p)} <span aria-hidden="true">↗</span></Link>)}
 </div>;
}

export function FacilityDetail({page}:{page:SourcePage}){
 const facilities=parseFacilities(page.html);
 if(!facilities.length)return <div className="v-facility-fallback"><SourceCopy html={page.html} title={page.title}/></div>;
 return <div className="v-facilities">
    {facilities.map((facility,i)=><section className="v-facility" key={facility.title}>
      <div className="v-facility-image">
        {facility.image?<img src={facility.image} alt="" loading="lazy"/>:<span aria-hidden="true">{String(i+1).padStart(2,"0")}</span>}
      </div>
      <div className="v-facility-content">
        <span className="v-facility-index">{String(i+1).padStart(2,"0")}</span>
        <h2>{facility.title}</h2>
        {facility.items.length>0&&<ul>{facility.items.map((item,j)=><li key={j}>{item}</li>)}</ul>}
      </div>
    </section>)}
 </div>;
}
