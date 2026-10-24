import UIIcon from "@/components/ui-icon";
import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import {parseHistory,parseAwards,parseAchievements} from "@/lib/structured-content";
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
    if(events.length)return <ol className="v-history">
      {events.map((event,i)=><li className="v-history-event" key={event.date+"-"+i}>
        <span className="v-history-year">{event.year}</span>
        <div className="v-history-story"><time>{event.date}</time><p>{event.description}</p></div>
        {event.image&&<div className="v-history-photo"><img src={event.image} loading="lazy" alt=""/></div>}
      </li>)}
    </ol>;
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
    if(achievements.length)return <div className="v-achievement-grid">
      {achievements.map((item,i)=><article className="v-achievement" key={i}>
        <strong>{item.number}</strong>
        {item.label&&<span>{item.label}</span>}
        <p>{item.description}</p>
      </article>)}
    </div>;
  }

  if(["cocau","organization"].includes(slug)){
    const units=sectionPages(locale,"units").filter(p=>p.route!==`/${locale}/units/`);
    return <div className="v-organization">
      <div className="v-organization-top">
        <div><span>18</span><p>{t.offices}</p></div>
        <div><span>18</span><p>{t.units}</p></div>
      </div>
      <div className="v-organization-bottom">
        <div className="v-organization-text"><SourceCopy html={html} title={page.title}/></div>
        <Link href={`/${locale}/units/`} className="v-organization-link">
          <span>{t.unitsLink}</span><span aria-hidden="true"><UIIcon name="up-right" size={18}/></span>
          <small>{units.length}</small>
        </Link>
      </div>
      <p className="v-organization-note">{t.sourceNote}</p>
    </div>;
  }

  if(slug==="hinhanh"&&page.images?.length){
    return <div className="v-heritage-gallery">{page.images.map((src,i)=><figure key={src+i}><img src={src} alt="" loading="lazy"/></figure>)}</div>;
  }

  return <div className="v-company-prose">
    {photo&&<div className="v-company-prose-photo"><img src={photo} alt="" loading="lazy"/></div>}
    <div className="v-company-prose-content">
      <SourceCopy html={html} title={page.title} omitFirstImage={Boolean(photo)}/>
    </div>
  </div>;
}
