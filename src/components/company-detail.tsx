import UIIcon from "@/components/ui-icon";
import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {parseHistory,parseAwards,parseAchievements} from "@/lib/structured-content";
import HistoryExperience from "@/components/history-experience";
import AchievementExperience from "@/components/achievement-experience";
import OrganizationExperience from "@/components/organization-experience";
import ArchivalGallery from "@/components/archival-gallery";
import {sectionPages,type SourcePage,type Locale} from "@/lib/original-content";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const localized={
  vi:{history:"Lịch sử hình thành",awards:"Danh hiệu",achievements:"Thành tựu",structure:"Cơ cấu tổ chức",offices:"Phòng ban trong bộ máy điều hành",units:"Đơn vị trực thuộc",unitsLink:"Đơn vị trực thuộc",sourceNote:"Số liệu theo trang giới thiệu được công bố",},
  ru:{history:"История",awards:"Награды",achievements:"Достижения",structure:"Организационная структура",offices:"Подразделений центрального аппарата",units:"Производственных подразделений",unitsLink:"Подразделения",sourceNote:"По данным опубликованной структуры предприятия"},
  en:{history:"History",awards:"Recognition",achievements:"Achievements",structure:"Organization",offices:"Head office departments",units:"Operating units",unitsLink:"Operating units",sourceNote:"Based on the published organizational overview"}
};
export default function CompanyDetail({page}:{page:SourcePage}){
  const {locale,slug,html}=page;
  const t=localized[locale];
  const photo=page.images?.[0];

  if(locale==="vi"&&slug==="lichsuhinhthanh"){
    const events=parseHistory(html);
    if(events.length)return <HistoryExperience events={events} locale={locale}/>;
  }

  if(locale==="vi"&&slug==="cacdanhhieu"){
    const awards=parseAwards(html);
    if(awards.length)return <div className="v-awards-grid">
      {awards.map((award,i)=><figure key={award.title+"-"+i} className="v-award">
        <div className="v-award-media">{award.image&&<img src={award.image} alt="" loading="lazy"/>}</div>
        <figcaption><strong>{award.title}</strong>{award.year&&<span>{award.year}</span>}</figcaption>
      </figure>)}
    </div>;
  }
  
  if(locale==="vi"&&slug==="nhungthanhtuu"){
    const achievements=parseAchievements(html);
    if(achievements.length)return <AchievementExperience items={achievements}/>;
  }

  if(["cocau","organization"].includes(slug)){
    return <OrganizationExperience locale={locale}/>;
  }

  if(["hinhanh","image"].includes(slug)){
    const fallback=Array.from({length:20},(_,index)=>
      `https://www.vietsov.com.vn/_catalogs/masterpage/vietsov/assets/images/hinhanhtulieu/${index+1}.jpg`);
    return <ArchivalGallery images={page.images?.length?page.images:fallback} locale={locale}/>;
  }

  const hasEmbeddedVisuals=/<(?:img|table|iframe)\b/i.test(html.replace(/<img\b[^>]*>/i,""));
  return <div className={`v-company-prose ${hasEmbeddedVisuals?"v-company-prose--rich":"v-company-prose--text"}`}>
    {photo&&<div className="v-company-prose-photo"><img src={photo} alt="" loading="lazy"/></div>}
    <div className="v-company-prose-content">
      <SourceCopy html={html} title={page.title} omitFirstImage={Boolean(photo)}/>
    </div>
  </div>;
}
