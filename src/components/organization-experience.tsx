"use client";

import {useCallback,useEffect,useRef,useState} from "react";
import Link from "next/link";
import UIIcon from "@/components/ui-icon";
import {
 organizationLevels,organizationSets,organizationI18n,
 type OrganizationLevel
} from "@/lib/organization-data";

type Locale="vi"|"ru"|"en";
function OrgIcon({kind}:{kind:OrganizationLevel}){
 switch(kind){
  case "board":return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="11" y="3" width="10" height="8"/><rect x="2" y="21" width="10" height="8"/><rect x="20" y="21" width="10" height="8"/><path d="M16 11v5M7 21v-5h18v5"/></svg>;
  case "executive":return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="16" cy="8" r="4"/><path d="M7 28v-5a9 9 0 0 1 18 0v5H7ZM3 9h4m18 0h4m-26 9h4m18 0h4"/></svg>;
  case "departments":return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 29h24M7 29V5h18v24M12 11h3m3 0h3m-9 6h3m3 0h3m-9 6h3m3 0h3M13 29v-5h6v5"/></svg>;
  default:return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 16 16 3l14 13M6 13v16h20V13M11 29V19h10v10M16 3v9"/></svg>;
 }
}

export default function OrganizationExperience({locale}:{locale:Locale}){
 const [level,setLevel]=useState<OrganizationLevel>("board");
 const levelIdx=organizationLevels.indexOf(level);
 const copy=organizationI18n[locale];
 const tabs=useRef<(HTMLButtonElement|null)[]>([]);
 const stage=useRef<HTMLDivElement>(null);
 const [reduceMotion,setReduceMotion]=useState(false);
 useEffect(()=>setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches),[]);
 const select=useCallback((target:OrganizationLevel)=>{
  setLevel(target);
 },[]);
 const navigate=(offset:number)=>{
  const next=Math.max(0,Math.min(organizationLevels.length-1,levelIdx+offset));
  select(organizationLevels[next]);
  tabs.current[next]?.focus();
 };
 const items=organizationSets[level];
 const tabIndex=organizationLevels.indexOf(level);
 return <section className="og-experience" aria-label={copy.pick}>
  <header className="og-intro">
   <div className="og-intro-copy"><p>{copy.intro}</p></div>
   <div className="og-intro-count"><strong>04</strong><span>{copy.pick}</span></div>
  </header>

  <div className="og-switcher" role="tablist" aria-label={copy.pick} onKeyDown={e=>{
    if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight"&&e.key!=="Home"&&e.key!=="End")return;
    e.preventDefault();
    if(e.key==="Home"){select(organizationLevels[0]);tabs.current[0]?.focus();return;}
    if(e.key==="End"){select(organizationLevels.at(-1)!);tabs.current.at(-1)?.focus();return;}
    navigate(e.key==="ArrowRight"?1:-1);
  }}>
   {organizationLevels.map((kind,i)=><button key={kind} type="button" ref={el=>{tabs.current[i]=el}}
    role="tab" tabIndex={level===kind?0:-1} aria-selected={level===kind} aria-controls="og-active-stage"
    id={"og-tab-"+kind} className={"og-tab "+(level===kind?"og-tab-active":"")}
    onClick={()=>select(kind)}>
     <span className="og-tab-icon"><OrgIcon kind={kind}/></span>
     <span className="og-tab-copy"><span className="og-tab-sequence">{String(i+1).padStart(2,"0")}</span><strong>{copy.levels[kind]}</strong></span>
     <span className="og-tab-total">{String(organizationSets[kind].length).padStart(2,"0")}</span>
   </button>)}
  </div>

  <div className="og-stage" id="og-active-stage" role="tabpanel" aria-labelledby={"og-tab-"+level} ref={stage}>
   <div className="og-stage-header">
    <div className="og-stage-title">
     <span className="og-stage-kicker">{copy.root}</span>
     <h2>{copy.levels[level]}</h2>
    </div>
    <div className="og-stage-meta"><strong>{items.length.toString().padStart(2,"0")}</strong><span>{copy.totals[level]}</span></div>
   </div>
   <div className="og-graph" key={level}>
     <div className="og-graph-root">
       <span className="og-graph-root-icon"><OrgIcon kind={level}/></span>
       <strong>{copy.roots[level]}</strong>
     </div>
     <div className="og-connector" aria-hidden="true"><span/></div>
     <div className={"og-graph-grid og-graph-grid-"+level}>
       {items.map((item,i)=><article className="og-org-node" key={level+"-"+item}
         style={reduceMotion?undefined:{"--og-delay":(Math.min(i,18)*0.038)+"s"} as React.CSSProperties}>
         <div className="og-node-glyph"><OrgIcon kind={level}/></div>
         <h3>{item}</h3>
       </article>)}
     </div>
   </div>
   <div className="og-stage-bottom">
    <div className="og-stage-progress" aria-label={copy.pick}>
      <span style={{width:(100*(tabIndex+1)/organizationLevels.length)+"%"}}/>
    </div>
    <div className="og-stage-buttons">
      <button type="button" disabled={tabIndex===0} onClick={()=>navigate(-1)} aria-label="Previous organization level"><UIIcon name="left" size={21}/></button>
      <span>{String(tabIndex+1).padStart(2,"0")} / 04</span>
      <button type="button" disabled={tabIndex===3} onClick={()=>navigate(1)} aria-label="Next organization level"><UIIcon name="left" size={21} className="og-right-icon"/></button>
    </div>
   </div>
  </div>

  <footer className="og-footer">
   <p>{copy.footer}</p>
   <Link href={"/"+locale+"/units/"}>{copy.levels.units}<UIIcon name="up-right" size={19}/></Link>
  </footer>
 </section>;
}
