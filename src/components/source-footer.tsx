import Link from "next/link";
import {externalLinks,type Locale,sectionOrder} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

const disclaimer={
  vi:"Bản thiết kế độc lập. Không phải website chính thức của Vietsovpetro.",
  ru:"Независимый проект редизайна. Неофициальный сайт Вьетсовпетро.",
  en:"Independent redesign concept. Not an official Vietsovpetro website."
};
export default function SourceFooter({locale}:{locale:Locale}){
  const m=messageSet(locale);
  return <footer className="vx-footer">
    <div className="shell vx-footer-main">
      <div className="vx-footer-contact">
        <strong>{locale==="ru"?"ВЬЕТСОВПЕТРО":"VIETSOVPETRO"}</strong>
        <address>{m.footer.address}<br/><a href="tel:+842543839871">{m.footer.phone}</a><br/>{m.footer.fax}<br/><a href="mailto:vspadmin@vietsov.com.vn">{m.footer.email}</a></address>
      </div>
      <nav className="vx-footer-links" aria-label={m.nav.menu}>
        {sectionOrder[locale].map(section=><Link key={section} href={`/${locale}/${section}/`}>{m.nav[section]}</Link>)}
      </nav>
    </div>
    <div className="shell vx-footer-services">
      {externalLinks[locale].map(item=><a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">{item.title} ↗</a>)}
    </div>
    <div className="shell vx-footer-bottom"><span>{disclaimer[locale]}</span><a href="https://www.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">vietsov.com.vn ↗</a></div>
  </footer>;
}