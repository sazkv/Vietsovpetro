import Link from "next/link";
import UIIcon from "@/components/ui-icon";
import type {Locale,SourcePage} from "@/lib/original-content";
import {displayTitle} from "@/lib/site-titles";

/** Group existing original directory pages by real published scope of work;
 * missing imported records are not invented to reach the 18-unit tally. */
const divisions={
 production:["xnkt","xnk","xnkhoan","xndvl","xnxl","xncd"],
 engineering:["vien","xndvc","xnvtb","cntt"],
 people:["ttat","ttyt","dsno","bvvt","nghiduong","khachsan"]
} as const;
const captions={
 vi:{production:"Khai thác và công trình",engineering:"Kỹ thuật và dịch vụ",people:"An toàn và hỗ trợ",count:"đơn vị"},
 ru:{production:"Добыча и морские объекты",engineering:"Инженерия и обслуживание",people:"Безопасность и обеспечение",count:"подразделений"},
 en:{production:"Production & offshore assets",engineering:"Engineering & services",people:"Safety & support",count:"operating units"}
};
type Group=keyof typeof divisions;
function GroupIcon({group}:{group:Group}){
 return <svg viewBox="0 0 52 52" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
   {group==="production"?<><path d="M5 46h42M10 46l8-24h16l8 24M18 22h16M20 32h12M26 22V5M21 5h10M10 38h32"/></>:
    group==="engineering"?<><path d="M15 12a14 14 0 0 0 18 18l10 10-7 7-10-10A14 14 0 0 1 15 12Z"/><path d="M21 6l3 10-8 8-10-3M35 13h12M41 7v12"/></>:
    <><path d="M26 4 9 10v13c0 12 8 20 17 25 9-5 17-13 17-25V10L26 4Z"/><path d="M16 26l7 7 14-14"/></>}
 </svg>;
}
export default function UnitsDirectory({locale,units}:{locale:Locale;units:SourcePage[]}){
 const t=captions[locale];
 const assigned=new Set<string>();
 const groups=(Object.keys(divisions) as Group[]).map(name=>{
  const pages=divisions[name].map(slug=>units.find(page=>page.slug===slug)).filter((p):p is SourcePage=>Boolean(p));
  pages.forEach(page=>assigned.add(page.slug));
  return {name,pages};
 }).filter(entry=>entry.pages.length);
 const missing=units.filter(page=>!assigned.has(page.slug));
 if(missing.length)groups.push({name:"engineering",pages:missing});
 return <div className="ug-directory">
    {groups.map((entry,i)=><section className="ug-group" key={entry.name+"-"+i}>
      <div className="ug-heading">
        <GroupIcon group={entry.name}/>
        <h2>{t[entry.name]}</h2>
        <p>{entry.pages.length} {t.count}</p>
      </div>
      <div className="ug-cards">
        {entry.pages.map(page=><Link href={page.route} className="ug-card" key={page.route}>
          <span>{displayTitle(page)}</span>
          <UIIcon name="up-right" size={22}/>
        </Link>)}
      </div>
    </section>)}
  </div>;
}
