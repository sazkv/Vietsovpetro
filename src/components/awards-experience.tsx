"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import UIIcon from "@/components/ui-icon";
import type {AwardItem} from "@/lib/structured-content";

const labels={
 vi:{browse:"Khám phá danh hiệu",all:"Tất cả",year:"Năm trao tặng",view:"Xem ảnh",prev:"Danh hiệu trước",next:"Danh hiệu tiếp theo",close:"Đóng ảnh",items:"danh hiệu",list:"Danh hiệu và huân chương"},
 ru:{browse:"Награды и признание",all:"Все годы",year:"Год награждения",view:"Увеличить",prev:"Предыдущая награда",next:"Следующая награда",close:"Закрыть",items:"наград",list:"Награды предприятия"},
 en:{browse:"Honours and recognition",all:"All years",year:"Awarded",view:"View image",prev:"Previous honour",next:"Next honour",close:"Close image",items:"honours",list:"Awards and distinctions"}
};
type Locale="vi"|"ru"|"en";
function MedalPlaceholder(){
 return <svg viewBox="0 0 120 140" width="120" height="140" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
  <path d="M34 5 58 53 82 5H66L58 24 50 5ZM58 53V65"/><circle cx="58" cy="94" r="29"/><circle cx="58" cy="94" r="19"/><path d="m58 77 5 11 12 2-9 9 2 12-10-6-11 6 2-12-9-9 13-2 5-11Z"/>
 </svg>;
}
export default function AwardsExperience({items,locale="vi"}:{items:AwardItem[];locale?:Locale}){
 const t=labels[locale];
 const data=useMemo(()=>items.map((item,id)=>({...item,id})).sort((a,b)=>
  Number(b.year||0)-Number(a.year||0)),[items]);
 const decades=useMemo(()=>Array.from(new Set(data.map(d=>d.year?Math.floor(Number(d.year)/10)*10:null).filter((x):x is number=>x!==null))).sort((a,b)=>a-b),[data]);
 const [decade,setDecade]=useState<number|null>(null);
 const filtered=useMemo(()=>data.filter(x=>decade===null||(x.year&&Math.floor(Number(x.year)/10)*10===decade)),[data,decade]);
 const [selectedId,setSelectedId]=useState(data[0]?.id||0);
 const [open,setOpen]=useState(false);
 const [badImages,setBadImages]=useState<string[]>([]);
 const rail=useRef<HTMLDivElement>(null);
 const buttons=useRef<Map<number,HTMLButtonElement>>(new Map());
 const picked=filtered.find(item=>item.id===selectedId)||filtered[0];
 const active=filtered.findIndex(item=>item.id===picked?.id);
 const portrait=picked?.image&&!badImages.includes(picked.image)?picked.image:undefined;
 const go=(step:number)=>{if(!filtered.length)return;setSelectedId(filtered[(active+step+filtered.length)%filtered.length].id)};
 useEffect(()=>{
  if(!picked||!rail.current)return;
  const button=buttons.current.get(picked.id);
  if(button)rail.current.scrollTo({left:button.offsetLeft+button.offsetWidth/2-rail.current.clientWidth/2,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 },[picked?.id]);
 useEffect(()=>{
  if(!open)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  const onKey=(e:KeyboardEvent)=>{
   if(e.key==="Escape")setOpen(false);
   if(e.key==="ArrowLeft")go(-1);
   if(e.key==="ArrowRight")go(1);
  };
  document.addEventListener("keydown",onKey);
  return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",onKey)};
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[open,active,filtered]);
 if(!picked)return null;
 return <div className="aw-experience">
  <div className="aw-intro">
   <span>VIETSOVPETRO / 1981—</span>
   <h2>{t.browse}</h2>
   <p>{data.length} {t.items}</p>
  </div>
  <nav className="aw-years" aria-label={t.browse}>
    <button type="button" className={decade===null?"aw-year-active":""} aria-pressed={decade===null} onClick={()=>{setDecade(null);setSelectedId(data[0].id)}}>{t.all}</button>
    {decades.map(year=><button type="button" key={year} aria-pressed={decade===year} className={decade===year?"aw-year-active":""}
      onClick={()=>{setDecade(year);const first=data.find(item=>item.year&&Math.floor(Number(item.year)/10)*10===year);if(first)setSelectedId(first.id)}}>{year}s</button>)}
  </nav>
  <section className="aw-stage" aria-label={picked.title}>
   <div className="aw-stage-copy" key={picked.id}>
    <span className="aw-eyebrow">{t.year} / {picked.year||"—"}</span>
    <h3>{picked.title}</h3>
    <div className="aw-stage-bottom">
      <div className="aw-controls">
       <button type="button" onClick={()=>go(-1)} disabled={filtered.length===1} aria-label={t.prev}><UIIcon name="left" size={23}/></button>
       <span>{String(active+1).padStart(2,"0")} / {String(filtered.length).padStart(2,"0")}</span>
       <button type="button" onClick={()=>go(1)} disabled={filtered.length===1} aria-label={t.next}><UIIcon name="left" size={23} className="aw-arrow-next"/></button>
      </div>
      {portrait&&<button className="aw-zoom" type="button" onClick={()=>setOpen(true)}>{t.view}<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.7" fill="none" aria-hidden><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"/></svg></button>}
    </div>
   </div>
   <div className="aw-stage-image" key={picked.id+"-image"}>
     {portrait?<img src={portrait} loading="eager" alt={picked.title} onError={()=>setBadImages(prev=>[...prev,portrait])}/>:<MedalPlaceholder/>}
     <span className="aw-stage-halo" aria-hidden="true"/>
   </div>
  </section>
  <div className="aw-rail-head"><h3>{t.list}</h3><span>{filtered.length} {t.items}</span></div>
  <div className="aw-rail" ref={rail} role="group" aria-label={t.list}>
    {filtered.map(item=><button className={"aw-item "+(item.id===picked.id?"aw-item-active":"")} ref={el=>{if(el)buttons.current.set(item.id,el)}}
      key={item.id} aria-pressed={item.id===picked.id} type="button" onClick={()=>setSelectedId(item.id)}>
      <span className="aw-item-image">{item.image&&!badImages.includes(item.image)?<img src={item.image} loading="lazy" alt="" onError={()=>setBadImages(prev=>[...prev,item.image!])}/>:<MedalPlaceholder/>}</span>
      <strong>{item.title}</strong>
      <small>{item.year||"—"}</small>
    </button>)}
  </div>
  {open&&<div className="aw-lightbox" role="dialog" aria-modal="true" aria-label={picked.title} onClick={()=>setOpen(false)}>
    <div className="aw-lightbox-view" onClick={e=>e.stopPropagation()}>
      <button className="aw-lightbox-close" type="button" aria-label={t.close} onClick={()=>setOpen(false)}><UIIcon name="close" size={25}/></button>
      <div className="aw-lightbox-image">{portrait?<img src={portrait} alt={picked.title}/>:<MedalPlaceholder/>}</div>
      <div className="aw-lightbox-caption"><button aria-label={t.prev} type="button" onClick={()=>go(-1)}><UIIcon name="left" size={22}/></button><p>{picked.title}</p><button aria-label={t.next} type="button" onClick={()=>go(1)}><UIIcon name="left" size={22} className="aw-arrow-next"/></button></div>
    </div>
  </div>}
 </div>;
}
