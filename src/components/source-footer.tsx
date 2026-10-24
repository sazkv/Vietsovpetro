import Link from "next/link";
import {externalLinks, type Locale, sectionOrder} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export default function SourceFooter({locale}: {locale: Locale}) {
  const m = messageSet(locale);
  return <footer className="site-footer">
    <div className="shell footer-inner">
      <div className="footer-identity"><strong>{locale === "ru" ? "ВЬЕТСОВПЕТРО" : "VIETSOVPETRO"}</strong><address>{m.footer.address}<br/><a href="tel:+842543839871">{m.footer.phone}</a><br/>{m.footer.fax}<br/><a href="mailto:vspadmin@vietsov.com.vn">{m.footer.email}</a></address></div>
      <nav className="footer-links" aria-label={m.nav.menu}>{sectionOrder[locale].map((section) => <Link key={section} href={`/${locale}/${section}/`}>{m.nav[section]}</Link>)}</nav>
    </div>
    <div className="shell footer-systems">{externalLinks[locale].map((item) => <a href={item.href} key={item.href} target="_blank" rel="noreferrer">{item.title}<span aria-hidden="true">↗</span></a>)}</div>
    <div className="shell footer-end"><span>© VIETSOVPETRO</span><a href="https://www.vietsov.com.vn/Pages/default.aspx" target="_blank" rel="noreferrer">vietsov.com.vn</a></div>
  </footer>;
}
