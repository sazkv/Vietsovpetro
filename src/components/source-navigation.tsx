"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {sectionOrder,type Locale,type Section} from "@/lib/original-content";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";

export default function SourceNavigation({locale}:{locale:Locale}){
  const [open,setOpen]=useState(false);
  const pathname=usePathname()||`/${locale}/`;
  const t=useTranslations("nav");
  const section=pathname.split("/").filter(Boolean)[1] as Section|undefined;
  const languageHref=(target:Locale)=>section&&sectionOrder[target].includes(section)?`/${target}/${section}/`:`/${target}/`;

  return <header className="vx-header">
    <div className="shell vx-header-inner">
      <Link href={`/${locale}/`} className="vx-brand" onClick={()=>setOpen(false)}>
        <img src={`${base}/brand/logo-classic.png`} width="52" height="52" alt=""/>
        <strong>{locale==="ru"?"ВЬЕТСОВПЕТРО":"VIETSOVPETRO"}</strong>
      </Link>
      <nav id="vx-main-menu" className={open?"vx-menu is-open":"vx-menu"} aria-label={t("menu")}>
        {sectionOrder[locale].map(item=><Link key={item} href={`/${locale}/${item}/`} onClick={()=>setOpen(false)} aria-current={section===item?"page":undefined}>{t(item)}</Link>)}
      </nav>
      <div className="vx-header-actions">
        <a className="vx-internal-link" href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">eOffice ↗</a>
        <div className="vx-lang" aria-label="Language">
          {(["vi","ru","en"] as Locale[]).map(target=><Link key={target} href={languageHref(target)} hrefLang={target} aria-current={locale===target?"page":undefined} onClick={()=>setOpen(false)}>{target.toUpperCase()}</Link>)}
        </div>
        <button type="button" className="vx-mobile-toggle" aria-label={t(open?"close":"menu")} aria-controls="vx-main-menu" aria-expanded={open} onClick={()=>setOpen(!open)}><span>{open?"✕":"☰"}</span></button>
      </div>
    </div>
  </header>;
}