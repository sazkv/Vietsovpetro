"use client";

import {useMemo} from "react";
import Masonry from "@/components/react-bits-masonry";
import UIIcon from "@/components/ui-icon";

type Locale="vi"|"ru"|"en";
const copy={
 vi:{title:"Kho lưu trữ hình ảnh",intro:"Những khoảnh khắc về con người, công trình và hoạt động ngoài khơi Vietsovpetro.",archive:"Tư liệu Vietsovpetro",explore:"Khám phá ảnh tư liệu",open:"Chọn ảnh để xem toàn màn hình",images:"bức ảnh"},
 ru:{title:"Фотоархив предприятия",intro:"История людей, морских объектов и производственной работы Вьетсовпетро в подлинных архивных кадрах.",archive:"Архив Вьетсовпетро",explore:"Исследовать архив",open:"Нажмите на фотографию для полноэкранного просмотра",images:"фотографий"},
 en:{title:"Photographic archive",intro:"An archival record of Vietsovpetro people, offshore infrastructure and work at sea.",archive:"Vietsovpetro archive",explore:"Explore the archive",open:"Select a photograph to view fullscreen",images:"photographs"}
};
export default function ArchivalGallery({images,locale}:{images:string[],locale:Locale}){
 const t=copy[locale];
 const records=useMemo(()=>Array.from(new Set(images.filter(Boolean))),[images]);
 const featured=records.slice(0,3);
 const items=useMemo(()=>records.map((image,i)=>({
  id:String(i+1),img:image,
  width:800,height:600,
  title:locale==="vi"?"Hình ảnh tư liệu":locale==="ru"?"Архивный снимок":"Archive photograph",
  alt:`${t.archive} — ${i+1}`,
  span:i===0||i===8?2:1
 })),[records,locale,t.archive]);
 if(!records.length)return null;
 return <div className="ar-archive">
  <section className="ar-archive-cover" aria-labelledby="ar-archive-title">
    <div className="ar-cover-photos" aria-hidden="true">
      {featured.map((src,i)=><div className={`ar-cover-panel ar-cover-panel-${i+1}`} key={src}>
       <img src={src} alt="" loading={i===0?"eager":"lazy"}/>
      </div>)}
    </div>
    <div className="ar-cover-overlay"/>
    <div className="ar-cover-body">
      <div className="ar-cover-eyebrow">VIETSOVPETRO / ARCHIVES</div>
      <h2 id="ar-archive-title">{t.title}</h2>
      <p>{t.intro}</p>
      <div className="ar-cover-bottom">
        <span>{records.length} {t.images}</span>
        <a href="#archive-grid">{t.explore}<UIIcon name="down" size={18}/></a>
      </div>
    </div>
  </section>
  <section id="archive-grid" className="ar-grid-section" aria-label={t.archive}>
    <div className="ar-grid-header">
      <h2>{t.archive}</h2>
      <p>{t.open}</p>
    </div>
    <Masonry items={items}
      columns="auto" columnWidth={270} gap={17} radius={1}
      animateFrom="bottom" stagger={0.045} duration={0.8} bounce={0.16}
      revealOnScroll hoverEffect="lift" focusOnHover={false}
      blurToFocus={false} captions="hover" parallax={0.08} lightbox draggable={false}/>
  </section>
 </div>;
}
