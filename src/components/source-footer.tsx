import Link from "next/link";
import {externalLinks, type Locale, sectionOrder} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";
import {serviceLinks} from "@/lib/site-map";

export default function SourceFooter({locale}: {locale: Locale}) {
  const m = messageSet(locale);
  const systemLinks = [...externalLinks[locale].map((item) => ({title: item.title, href: item.href})), ...serviceLinks.filter((item) => !externalLinks[locale].some((link) => link.href === item.url)).map((item) => ({title: item.label, href: item.url}))];
  return <footer className="site-footer">
    <div className="shell footer-inner">
      <div className="footer-identity"><strong>{locale === "ru" ? "ВЬЕТСОВПЕТРО" : "VIETSOVPETRO"}</strong><address>{m.footer.address}<br/><a href="tel:+842543839871">{m.footer.phone}</a><br/>{m.footer.fax}<br/><a href="mailto:vspadmin@vietsov.com.vn">{m.footer.email}</a></address></div>
      <nav className="footer-links" aria-label={m.nav.menu}>{sectionOrder[locale].map((section) => <Link key={section} href={`/${locale}/${section}/`}>{m.nav[section]}</Link>)}</nav>
    </div>
    <div className="shell footer-systems" aria-label={m.nav.systems}>{systemLinks.map((item) => <a href={item.href} key={item.href} target="_blank" rel="noreferrer">{item.title}<span aria-hidden="true">↗</span></a>)}</div>
    <div className="shell footer-end"><span>{m.footer.concept}</span><a href="https://www.vietsov.com.vn/Pages/default.aspx" target="_blank" rel="noreferrer">{m.page.source} ↗</a></div>
  </footer>;
}
