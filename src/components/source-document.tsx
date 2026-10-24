import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import LeadershipDirectory from "@/components/leadership-directory";
import PartnersDirectory from "@/components/partners-directory";
import CompanyDetail from "@/components/company-detail";
import UnitDetail from "@/components/unit-detail";
import {FacilityDetail} from "@/components/resource-pages";
import {type SourcePage,type Section} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";
import {displayTitle} from "@/lib/site-titles";

function isPartners(page:SourcePage){
 return /\/doitac\.aspx(?:\?|$)/i.test(page.sourceUrl)||page.slug.toLowerCase()==="doitac";
}
function isLeadership(page:SourcePage){
 return /\/(?:lanhdao|board5|board_old)\.aspx(?:\?|$)/i.test(page.sourceUrl)||["lanhdao","board5","board-old"].includes(page.slug.toLowerCase());
}
export default function SourceDocument({page}:{page:SourcePage}){
 const m=messageSet(page.locale);
 const section:Section=page.section==="home"?"pages":page.section;
 const partners=isPartners(page);
 const leadership=isLeadership(page);
 const company=section==="company";
 const isUnit=section==="units";
 const resource=section==="resources";
 const facilities=resource&&(page.slug==="cosovatchat"||/cosovatchat\.aspx/i.test(page.sourceUrl));
 const title=displayTitle(page);
 return <main className={`v-document v-document--${section}`}>
  <div className="shell">
   <nav className="r-breadcrumb" aria-label="Breadcrumb">
    <Link href={`/${page.locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span>
    <Link href={`/${page.locale}/${section}/`}>{m.nav[section]}</Link>
   </nav>
   <header className="v-document-header">
    <h1>{title}</h1>
    {page.date&&<time>{page.date}</time>}
   </header>
   {partners?<PartnersDirectory locale={page.locale}/>:
    leadership?<LeadershipDirectory locale={page.locale}/>:
    company?<CompanyDetail page={page}/>:
    isUnit?<UnitDetail page={page}/>:
    facilities?<FacilityDetail page={page}/>:
    <article className="v-document-body"><SourceCopy html={page.html} title={title}/></article>}
  </div>
 </main>;
}
