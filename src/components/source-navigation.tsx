"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {home, sectionOrder, type Locale, type Section} from "@/lib/original-content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const titles:Record<Locale,{official:string;services:string;label:string;source:string;tag:string}> = {
  vi:{official:"Trang chính thức",services:"Hệ thống nội bộ",label:"Ngôn ngữ",source:"Từ năm 1981",tag:"Bản thiết kế độc lập"},
  ru:{official:"Официальный сайт",services:"Сервисы компании",label:"Язык",source:"С 1981 года",tag:"Независимый концепт"},
  en:{official:"Official website",services:"Employee services",label:"Language",source:"Since 1981",tag:"Independent concept"}
};

export default function SourceNavigation({locale}: {locale:Locale}) {
  const [open,setOpen]=useState(false);
  const path=usePathname() || `/${locale}/`;
  const nav=useTranslations("nav");
  const active=path.split("/").filter(Boolean)[1] as Section | undefined;
  const sectionFor=(target:Locale)=>active && sectionOrder[target].includes(active) ? `/${target}/${active}/` : `/${target}/`;
  const t=titles[locale];

  const close=()=>setOpen(false);
  return <header className="cp-header">
    <div className="cp-topbar">
      <div className="shell cp-topbar-inner">
        <div className="cp-topbar-left"><span className="cp-topbar-dot"/><span>{t.source}</span><span className="cp-topbar-separator">/</span><span>{t.tag}</span></div>
        <div className="cp-topbar-right">
          <a href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">{t.services} <span aria-hidden>↗</span></a>
          <a href="https://www.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">{t.official} <span aria-hidden>↗</span></a>
          <div className="cp-language" aria-label={t.label}>
            {(["vi","ru","en"] as Locale[]).map(target=><Link key={target} href={sectionFor(target)} hrefLang={target} aria-current={target===locale?"page":undefined}>{target.toUpperCase()}</Link>)}
          </div>
        </div>
      </div>
    </div>
    <div className="cp-nav-wrap shell">
      <Link href={`/${locale}/`} className="cp-brand" onClick={close} aria-label="Vietsovpetro — home">
        <img src={`${basePath}/brand/logo-classic.png`} alt="" width={57} height={57}/>
        <span className="cp-brand-type"><strong>VIETSOVPETRO</strong><small>{locale==="ru"?"РОССИЯ · ВЬЕТНАМ":locale==="en"?"VIETNAM · RUSSIA":"LIÊN DOANH VIỆT – NGA"}</small></span>
      </Link>
      <nav className={`cp-nav ${open?"cp-nav-open":""}`} id="cp-primary-nav" aria-label={nav("menu")}>
        <div className="cp-nav-list">
          {sectionOrder[locale].map((section,index)=>{
            const label=nav(section);
            const isActive=active===section;
            const preview=section==="services"?home[locale].services.slice(0,6).map((s,i)=>({title:s.title,href:`/${locale}/services/#service-${i+1}`})):[];
            return <div className={`cp-nav-item ${isActive?"cp-nav-current":""}`} key={section}>
              <Link href={`/${locale}/${section}/`} onClick={close} aria-current={isActive?"page":undefined}>{label}</Link>
              {preview.length>0&&<div className="cp-nav-dropdown"><div className="cp-nav-dropdown-head"><span>{String(index+1).padStart(2,"0")} — {label}</span><Link href={`/${locale}/${section}/`} onClick={close}>↗</Link></div>{preview.map(p=><Link key={p.href} href={p.href} onClick={close}>{p.title}<span>↗</span></Link>)}</div>}
            </div>;
          })}
        </div>
        <div className="cp-mobile-extra"><a href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">{t.services} ↗</a><a href="https://www.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">{t.official} ↗</a></div>
      </nav>
      <button className="cp-menu-toggle" type="button" aria-expanded={open} aria-controls="cp-primary-nav" aria-label={nav(open?"close":"menu")} onClick={()=>setOpen(!open)}>
        <span>{open?nav("close"):nav("menu")}</span><span aria-hidden>{open?"✕":"☰"}</span>
      </button>
    </div>
  </header>;
}
