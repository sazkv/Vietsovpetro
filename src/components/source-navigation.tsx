"use client";

import UIIcon from "@/components/ui-icon";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {useTranslations} from "next-intl";
import type {Locale,Section} from "@/lib/original-content";
import {employeeNavigation,employeeResources,employeeLabels} from "@/lib/employee-links";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const ordering:Record<Locale,Section[]>={
 vi:["company","units","services","news","projects","resources","careers","contact"],
 en:["company","services","units","news","projects","resources","contact"],
 ru:["company","services","units","news","projects","resources","contact"]
};
export type MenuPreview=Record<string,{title:string,route:string}[]>;
export default function SourceNavigation({locale,preview={}}:{locale:Locale,preview?:MenuPreview}){
 const [open,setOpen]=useState(false);
 const utilityRef=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{
  const closeOnOutside=(event:PointerEvent)=>{if(utilityRef.current&&!utilityRef.current.contains(event.target as Node))utilityRef.current.open=false;};
  const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==="Escape"&&utilityRef.current?.open){utilityRef.current.open=false;utilityRef.current.querySelector("summary")?.focus();}};
  document.addEventListener("pointerdown",closeOnOutside);
  document.addEventListener("keydown",closeOnEscape);
  return()=>{document.removeEventListener("pointerdown",closeOnOutside);document.removeEventListener("keydown",closeOnEscape);};
 },[]);
 const pathname=usePathname()||`/${locale}/`;
 const t=useTranslations("nav");
 const active=pathname.split("/").filter(Boolean)[1] as Section|undefined;
 const languageHref=(target:Locale)=>active&&ordering[target].includes(active)?`/${target}/${active}/`:`/${target}/`;
 return <header className="r-header">
  <nav className="vsp-utility-bar" aria-label="Vietsovpetro staff resources">
   <div className="shell vsp-utility-inner">
    <a className="vsp-utility-signin" href={employeeNavigation.signIn} target="_blank" rel="noopener noreferrer"><UIIcon name="user" size={16}/><span>{employeeLabels[locale].signIn}</span></a>
    <a href={employeeNavigation.eoffice} target="_blank" rel="noopener noreferrer">eOffice</a>
    <a href={employeeNavigation.handbook} target="_blank" rel="noopener noreferrer"><span className="vsp-handbook-long">{employeeLabels[locale].handbook}</span><span className="vsp-handbook-short">{employeeLabels[locale].shortHandbook}</span></a>
    <details className="vsp-utility-dropdown" ref={utilityRef}>
     <summary aria-label={employeeLabels[locale].resources}>{employeeLabels[locale].resources} <UIIcon name="chevron-down" size={15}/></summary>
     <div className="vsp-utility-menu">
      {employeeResources.map(item=><a href={item.href} key={item.href} target="_blank" rel="noopener noreferrer">{item.label[locale]}<UIIcon name="up-right" size={14}/></a>)}
     </div>
    </details>
   </div>
  </nav>
  <div className="shell r-header-inner">
   <Link href={`/${locale}/`} className="r-brand" aria-label="Vietsovpetro" onClick={()=>setOpen(false)}>
    <img src={`${base}/brand/logo-classic.png`} width="56" height="56" alt=""/>
    <strong>{locale==="ru"?"ВЬЕТСОВПЕТРО":"VIETSOVPETRO"}</strong>
   </Link>
   <nav className={`r-header-nav ${open?"r-header-nav--open":""}`} id="r-main-nav" aria-label={t("menu")}>
    {ordering[locale].map(section=><div className="r-nav-entry" key={section}>
      <Link href={`/${locale}/${section}/`} aria-current={active===section?"page":undefined} onClick={()=>setOpen(false)}>{t(section)}</Link>
      {(preview[section]||[]).length>0&&<div className="r-submenu">
        <div className="r-submenu-title">{t(section)}</div>
        <div className="r-submenu-items">{preview[section].slice(0,10).map(page=><Link href={page.route} key={page.route} onClick={()=>setOpen(false)}>{page.title}<span aria-hidden="true"><UIIcon name="up-right" size={18}/></span></Link>)}</div>
      </div>}
    </div>)}
   </nav>
   <div className="r-header-actions">
     <div className="r-languages" aria-label="Language">{(["vi","ru","en"] as Locale[]).map(target=><Link key={target} href={languageHref(target)} hrefLang={target} aria-current={locale===target?"page":undefined} onClick={()=>setOpen(false)}>{target.toUpperCase()}</Link>)}</div>
     <button className="r-nav-toggle" type="button" aria-controls="r-main-nav" aria-expanded={open} aria-label={t(open?"close":"menu")} onClick={()=>setOpen(v=>!v)}><span aria-hidden="true"><UIIcon name={open?"close":"menu"} size={23}/></span></button>
   </div>
  </div>
 </header>;
}