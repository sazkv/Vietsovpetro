import Link from "next/link";
import {externalLinks, type Locale, sectionOrder} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

const captions={
  vi:{company:"Liên doanh Việt – Nga",navigation:"Khám phá",services:"Hệ thống & dịch vụ",concept:"Bản thiết kế lại độc lập. Không phải website chính thức của Vietsovpetro.",original:"Truy cập trang gốc"},
  ru:{company:"Совместное предприятие Вьетнама и России",navigation:"Разделы",services:"Корпоративные сервисы",concept:"Независимый проект редизайна. Не является официальным сайтом Вьетсовпетро.",original:"Официальный сайт"},
  en:{company:"Vietnam–Russia Joint Venture",navigation:"Explore",services:"Company systems",concept:"Independent redesign concept. Not the official Vietsovpetro website.",original:"Official website"}
};

export default function SourceFooter({locale}: {locale:Locale}) {
  const m=messageSet(locale), t=captions[locale];
  return <footer className="cp-footer">
    <div className="shell cp-footer-main">
      <div className="cp-footer-brand">
        <span className="cp-footer-mark">V.</span><p className="cp-footer-overline">{t.company} · 1981</p>
        <strong>VIETSOVPETRO</strong>
        <address>{m.footer.address}<br/><a href="tel:+842543839871">{m.footer.phone}</a><br/>{m.footer.fax}<br/><a href="mailto:vspadmin@vietsov.com.vn">{m.footer.email}</a></address>
      </div>
      <div className="cp-footer-nav"><h2>{t.navigation}</h2><nav aria-label={t.navigation}>{sectionOrder[locale].map(section=><Link href={`/${locale}/${section}/`} key={section}>{m.nav[section]}<span aria-hidden>↗</span></Link>)}</nav></div>
    </div>
    <div className="shell cp-footer-tools"><h2>{t.services}</h2><div>{externalLinks[locale].map(item=><a href={item.href} key={item.href} target="_blank" rel="noopener noreferrer">{item.title} ↗</a>)}</div></div>
    <div className="cp-footer-bottom"><div className="shell"><span>© VIETSOVPETRO · 2026</span><span>{t.concept}</span><a href="https://www.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">{t.original} ↗</a></div></div>
  </footer>;
}