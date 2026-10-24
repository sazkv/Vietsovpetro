import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import LeadershipDirectory from "@/components/leadership-directory";
import PartnersDirectory from "@/components/partners-directory";
import {sectionPages,type SourcePage,type Section} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";
import {displayTitle} from "@/lib/site-titles";

function isPartners(page:SourcePage){
 return /\/doitac\.aspx(?:\?|$)/i.test(page.sourceUrl) || /^doitac$/i.test(page.slug);
}
function isLeadership(page:SourcePage){
 return /\/lanhdao\.aspx(?:\?|$)/i.test(page.sourceUrl)||/^lanhdao$/i.test(page.slug);
}
export default function SourceDocument({page}:{page:SourcePage}){
 const m=messageSet(page.locale);
 const section:Section=page.section==="home"?"pages":page.section;
 const partners=isPartners(page);
 const leadership=isLeadership(page)&&page.locale==="vi";
 const project=section==="projects"&&!partners;
 const corporate=section==="company";
 const resource=section==="resources";
 const unit=section==="units";
 const siblings=(corporate||resource)?
  sectionPages(page.locale,section).filter(item=>item.route!==page.route&&item.route!==`/${page.locale}/${section}/`).slice(0,14):[];
 const relatedName=m.nav[section];
 const title=displayTitle(page);
 return <main className={`v-document ${project?"v-document--project":""} ${corporate?"v-document--company":""} ${unit?"v-document--unit":""} ${resource?"v-document--resource":""}`}>
  <div className="shell">
   <nav className="r-breadcrumb" aria-label="Breadcrumb">
    <Link href={`/${page.locale}/`}>{m.nav.home}</Link>
    <span aria-hidden="true">/</span>
    <Link href={`/${page.locale}/${section}/`}>{relatedName}</Link>
   </nav>
   <header className="v-document-header">
    <h1>{title}</h1>
    {page.date&&<time>{page.date}</time>}
   </header>
   {partners?<PartnersDirectory locale={page.locale}/>:
    leadership?<LeadershipDirectory locale={page.locale}/>:
    <div className={`v-document-layout ${siblings.length?"v-document-layout--related":""}`}>
      <article className="v-document-body">
        <SourceCopy html={page.html} title={title}/>
      </article>
      {siblings.length>0&&<nav className="v-document-siblings" aria-label={relatedName}>
        {siblings.map(item=><Link key={item.route} href={item.route}>{displayTitle(item)}<span aria-hidden="true">↗</span></Link>)}
      </nav>}
    </div>}
  </div>
 </main>;
}
