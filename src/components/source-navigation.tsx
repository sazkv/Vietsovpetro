"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {type Locale, sectionOrder, type Section} from "@/lib/original-content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SourceNavigation({locale}: {locale: Locale}) {
  const [open, setOpen] = useState(false);
  const path = usePathname() || `/${locale}/`;
  const t = useTranslations("nav");
  const section = path.split("/").filter(Boolean)[1] as Section | undefined;
  const languagePath = (target: Locale) => {
    if (section && sectionOrder[target].includes(section)) return `/${target}/${section}/`;
    return `/${target}/`;
  };

  return <header className="site-header">
    <div className="utility-row shell">
      <div className="utility-links">
        <a href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noreferrer">eOffice</a>
        {locale === "vi" && <a href="https://www.vietsov.com.vn/FlipBook/mobile/home.html" target="_blank" rel="noreferrer">Cẩm nang văn hóa Vietsovpetro</a>}
        {locale === "ru" && <a href="https://www.vietsov.com.vn/FlipBook/camnangvh_ru.html" target="_blank" rel="noreferrer">Справочник по корпоративной культуре</a>}
      </div>
      <div className="language-links" aria-label="Language">
        {(["vi", "ru", "en"] as Locale[]).map((target) => <Link key={target} href={languagePath(target)} hrefLang={target} aria-current={locale === target ? "page" : undefined}>{target.toUpperCase()}</Link>)}
      </div>
    </div>
    <div className="brand-row shell">
      <Link className="brand-link" href={`/${locale}/`} aria-label="Vietsovpetro">
        <img src={`${basePath}/brand/${locale === "vi" ? "logo-original.png" : "logo-classic.png"}`} width={locale === "vi" ? 180 : 131} height={locale === "vi" ? 128 : 98} alt="Vietsovpetro" />
        <span className="brand-type"><small>{locale === "vi" ? "LIÊN DOANH" : locale === "en" ? "JOINT VENTURE" : "СОВМЕСТНОЕ ПРЕДПРИЯТИЕ"}</small><strong>{locale === "ru" ? "ВЬЕТСОВПЕТРО" : "VIETSOVPETRO"}</strong></span>
      </Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-menu" onClick={() => setOpen(!open)}>{open ? t("close") : t("menu")}<span aria-hidden="true">{open ? "×" : "+"}</span></button>
    </div>
    <nav className={`primary-nav ${open ? "is-open" : ""}`} id="primary-menu" aria-label={t("menu")}>
      <div className="shell primary-nav-inner">
        <Link className="nav-home" href={`/${locale}/`} onClick={() => setOpen(false)}>{t("home")}</Link>
        {sectionOrder[locale].map((item) => <Link key={item} href={`/${locale}/${item}/`} aria-current={section === item ? "page" : undefined} onClick={() => setOpen(false)}>{t(item)}</Link>)}
        {locale === "vi" && <a href="https://www.vietsov.com.vn/TuyenSinh1/index.html" target="_blank" rel="noreferrer">Tuyển sinh</a>}
      </div>
    </nav>
  </header>;
}
