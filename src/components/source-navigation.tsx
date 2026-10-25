"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {useState} from "react";
import menuData from "@/data/menu.json";
import {type Locale, sectionOrder, type Section} from "@/lib/original-content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const menus = menuData as Record<Locale, Record<Section, {title: string; route: string}[]>>;

export default function SourceNavigation({locale}: {locale: Locale}) {
  const [open, setOpen] = useState(false);
  const path = usePathname() || `/${locale}/`;
  const t = useTranslations("nav");
  const section = path.split("/").filter(Boolean)[1] as Section | undefined;
  const languagePath = (target: Locale) => section && sectionOrder[target].includes(section) ? `/${target}/${section}/` : `/${target}/`;
  const close = () => setOpen(false);
  return <header className="site-header">
    <a className="skip-link" href="#main-content">{t("skip")}</a>
    <div className="utility-bar"><div className="shell utility-inner"><div className="utility-links"><span>{t("systems")}</span><a href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noreferrer">eOffice ↗</a><a href="https://mail.vietsov.com.vn/" target="_blank" rel="noreferrer">Mail ↗</a><a href="https://tender.vietsov.com.vn/" target="_blank" rel="noreferrer">{t("tenders")} ↗</a></div><div className="language-links" aria-label={t("language")}>{(["vi","ru","en"] as Locale[]).map((target) => <Link key={target} href={languagePath(target)} hrefLang={target} aria-current={locale === target ? "page" : undefined}>{target.toUpperCase()}</Link>)}</div></div></div>
    <div className="shell masthead"><Link className="brand-link" href={`/${locale}/`} onClick={close} aria-label="Vietsovpetro"><img src={`${basePath}/brand/logo-original.png`} width="83" height="64" alt="Vietsovpetro"/><span><small>{locale === "vi" ? "LIÊN DOANH VIỆT – NGA" : locale === "ru" ? "СОВМЕСТНОЕ ПРЕДПРИЯТИЕ" : "RUSSIA–VIETNAM JOINT VENTURE"}</small><strong>{locale === "ru" ? "ВЬЕТСОВПЕТРО" : "VIETSOVPETRO"}</strong></span></Link><div className="masthead-actions"><Link className="search-link" href={`/${locale}/search/`} aria-label={t("search")}><span aria-hidden="true">⌕</span><span>{t("search")}</span></Link><button type="button" className="menu-toggle" aria-expanded={open} aria-controls="primary-menu" onClick={() => setOpen(!open)}>{open ? t("close") : t("menu")}<span aria-hidden="true">{open ? "×" : "☰"}</span></button></div></div>
    <nav id="primary-menu" className={`primary-nav ${open ? "is-open" : ""}`} aria-label={t("menu")}><div className="shell primary-nav-inner"><Link className="nav-home" href={`/${locale}/`} onClick={close} aria-current={!section ? "page" : undefined}>{t("home")}</Link>{sectionOrder[locale].map((item) => menus[locale][item]?.length ? <details key={item} className="nav-group"><summary aria-current={section === item ? "page" : undefined}>{t(item)}<span aria-hidden="true">⌄</span></summary><div className="nav-panel"><Link className="nav-panel-all" href={`/${locale}/${item}/`} onClick={close}>{t(item)}<span aria-hidden="true">↗</span></Link><div className="nav-panel-links">{menus[locale][item].map((entry) => <Link key={entry.route} href={entry.route} onClick={close}>{entry.title}</Link>)}</div></div></details> : <Link key={item} href={`/${locale}/${item}/`} onClick={close} aria-current={section === item ? "page" : undefined}>{t(item)}</Link>)}{locale === "vi" && <a href="https://www.vietsov.com.vn/TuyenSinh1/index.html" target="_blank" rel="noreferrer">Tuyển sinh ↗</a>}</div></nav>
  </header>;
}
