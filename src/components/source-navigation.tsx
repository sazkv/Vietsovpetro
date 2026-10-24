"use client";

import UIIcon from "@/components/ui-icon";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {useTranslations} from "next-intl";
import type {Locale,Section} from "@/lib/original-content";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const ordering:Record<Locale,Section[]>={
 vi:["company","units","services","news","projects","resources","careers","contact"],
 en:["company","services","units","news","projects","resources","contact"],
 ru:["company","services","units","news","projects","resources","contact"]
};
export type MenuPreview=Record<string,{title:string,route:string}[]>;
export default function SourceNavigation({locale,preview={}}:{locale:Locale,preview?:MenuPreview}){
 const [open,setOpen]=useState(false);
 const pathname=usePathname()||`/${locale}/`;
 const t=useTranslations("nav");
 const active=pathname.split("/").filter(Boolean)[1] as Section|undefined;
 const languageHref=(target:Locale)=>active&&ordering[target].includes(active)?`/${target}/${active}/`:`/${target}/`;
 return <header className="r-header">
  <div className="vsp-utility-bar"><div className="shell vsp-utility-inner">
    <a href="https://www.vietsov.com.vn/Pages/default.aspx" target="_blank" rel="noopener noreferrer" aria-label="Vietsovpetro official employee resources"><UIIcon name="user" size={15}/><span>{locale==="vi"?"Đăng nhập":locale==="ru"?"Вход":"Sign in"}</span></a>
    <a href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">eOffice</a>
    <a href="https://www.vietsov.com.vn/Pages/default.aspx" target="_blank" rel="noopener noreferrer">{locale==="vi"?"Cẩm nang văn hóa Vietsovpetro":locale==="ru"?"Справочник корпоративной культуры":"Vietsovpetro culture handbook"}</a>
    <a href="https://www.vietsov.com.vn/Pages/default.aspx" target="_blank" rel="noopener noreferrer">{locale==="vi"?"Liên kết":locale==="ru"?"Ссылки":"Resources"} <UIIcon name="up-right" size={13}/></a>
   </div></div>
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
    <div className="r-mobile-external"><a href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">eOffice <UIIcon name="up-right" size={18}/></a></div>
   </nav>
   <div className="r-header-actions">
     <a className="r-eoffice" href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">eOffice <UIIcon name="up-right" size={18}/></a>
     <div className="r-languages" aria-label="Language">{(["vi","ru","en"] as Locale[]).map(target=><Link key={target} href={languageHref(target)} hrefLang={target} aria-current={locale===target?"page":undefined} onClick={()=>setOpen(false)}>{target.toUpperCase()}</Link>)}</div>
     <button className="r-nav-toggle" type="button" aria-controls="r-main-nav" aria-expanded={open} aria-label={t(open?"close":"menu")} onClick={()=>setOpen(v=>!v)}><span aria-hidden="true"><UIIcon name={open?"close":"menu"} size={23}/></span></button>
   </div>
  </div>
 </header>;
}