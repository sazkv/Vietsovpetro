import UIIcon from "@/components/ui-icon";
import Link from "next/link";
import {type Locale} from "@/lib/original-content";

/**
 * Names are sourced from CLIENT columns in the published project registries.
 * They are not logos and do not imply current commercial relationships.
 * Verified against /Pages/CTKT.aspx and /Pages/DieuHanhKhaiThac.aspx.
 */
export const recordedClients=[
  "PV Gas","PVEP","PVEP POC","Cuu Long JOC","Hoang Long JOC",
  "Hoan Vu JOC","Thang Long JOC","Bien Dong POC","JVPC",
  "VRJ Petroleum","PTSC","Premier Oil","PC Vietnam Limited",
  "CNOOC","Lam Son JOC"
];

const labels={
 vi:{heading:"Đối tác - Khách hàng",projects:"Dự án",clients:"Khách hàng được ghi nhận trong danh mục dự án"},
 ru:{heading:"Партнёры и заказчики",projects:"Проекты",clients:"Заказчики, указанные в перечнях проектов"},
 en:{heading:"Partners & Clients",projects:"Projects",clients:"Clients listed in the published project records"}
};

export default function PartnersDirectory({locale,compact=false}:{locale:Locale;compact?:boolean}){
 const t=labels[locale];
 const link=`/${locale}/projects/partners/`;
 if(compact)return <section className="v-partner-preview" aria-labelledby="v-partner-title">
   <div className="v-partner-preview-head"><h2 id="v-partner-title">{t.heading}</h2><Link href={link}>{t.heading} <span aria-hidden="true"><UIIcon name="up-right" size={18}/></span></Link></div>
   <div className="v-partner-preview-names">
    {recordedClients.slice(0,8).map(name=><span key={name}>{name}</span>)}
   </div>
  </section>;
 return <section className="v-partners" aria-label={t.clients}>
   <div className="v-partners-grid">{recordedClients.map((name,i)=><div className="v-partner-name" key={name}><span>{String(i+1).padStart(2,"0")}</span><strong>{name}</strong></div>)}</div>
   <div className="v-partners-bottom"><Link href={`/${locale}/projects/`}><UIIcon name="left" size={18}/> {t.projects}</Link></div>
  </section>;
}
