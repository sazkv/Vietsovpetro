"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import AwardUIIcon from "@/components/award-ui-icon";
import type {AwardItem} from "@/lib/structured-content";

type Locale="vi"|"ru"|"en";
const t={
 vi:{heading:"Các danh hiệu",intro:"Những phần thưởng và danh hiệu đã được trao tặng cho Vietsovpetro.",all:"Tất cả",items:"danh hiệu",decade:"Giai đoạn",closer:"Xem chi tiết",prev:"Danh hiệu trước",next:"Danh hiệu tiếp theo",close:"Đóng",alt:"Ảnh huân chương",year:"Năm"},
 ru:{heading:"Награды и звания",intro:"Государственные награды и почётные звания, присвоенные совместному предприятию «Вьетсовпетро».",all:"Все годы",items:"наград",decade:"Период",closer:"Посмотреть награду",prev:"Предыдущая награда",next:"Следующая награда",close:"Закрыть",alt:"Оригинальная фотография награды",year:"Год"},
 en:{heading:"Awards and honours",intro:"Official distinctions and state decorations received by the Vietsovpetro Joint Venture.",all:"All years",items:"honours",decade:"Period",closer:"View medal",prev:"Previous honour",next:"Next honour",close:"Close",alt:"Original photograph of a medal",year:"Year"}
};
const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const medals=new Set(["sv","hcm","ld1","ld2","ld3","dl","dl2","dl3","qc","bv","cc1","cc3","ahld"]);
function getLocalMedal(item:AwardItem):string|undefined{
 const src=item.image||"";
 const name=src.split("?")[0].split("/").at(-1)?.replace(/\.[^.]+$/,"").toLowerCase()||"";
 if(medals.has(name))return base+"/awards/"+name+".png";
 if(/Золот(ая|ой)\s+звезд|Gold Star Order|Sao vàng/i.test(item.title))return base+"/awards/sv.png";
 return undefined;
}
function displayAwardTitle(item:AwardItem){
 // Original source often embeds the year at the end of the award title.
 // Show it only once, in the caption, without altering archived source data.
 return item.title.replace(/\s*[-–—]\s*(?:19|20)\d{2}\s*(?:г\.?|р\.?)?\s*$/i,"").trim();
}
type Entry=AwardItem&{id:number;asset?:string};
export default function AwardsExperience({items,locale="vi"}:{items:AwardItem[];locale?:Locale}){
 const copy=t[locale];
 const data=useMemo<Entry[]>(()=>items.map((item,id)=>({...item,id,asset:getLocalMedal(item)}))
  .sort((a,b)=>Number(b.year||0)-Number(a.year||0)),[items]);
 const decades=useMemo(()=>[...new Set(data.map(item=>item.year?Math.floor(Number(item.year)/10)*10:null)
  .filter((n):n is number=>n!==null&&Number.isFinite(n)))].sort((a,b)=>a-b),[data]);
 const [decade,setDecade]=useState<number|null>(null);
 const [modal,setModal]=useState<number|null>(null);
 const [failed,setFailed]=useState<string[]>([]);
 const closeRef=useRef<HTMLButtonElement>(null);
 const lastFocus=useRef<HTMLElement|null>(null);
 const filtered=useMemo(()=>decade===null?data:data.filter(item=>item.year&&Math.floor(Number(item.year)/10)*10===decade),[data,decade]);
 const chosen=modal===null?undefined:filtered[modal];
 const close=()=>{
  setModal(null);
  lastFocus.current?.focus();
 };
 const open=(n:number)=>{
  lastFocus.current=document.activeElement as HTMLElement;
  setModal(n);
 };
 const move=(delta:number)=>setModal(i=>i===null?null:(i+delta+filtered.length)%filtered.length);
 useEffect(()=>{
  if(modal===null)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  closeRef.current?.focus();
  const keyboard=(e:KeyboardEvent)=>{
   if(e.key==="Escape"){e.preventDefault();close();}
   if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}
   if(e.key==="ArrowRight"){e.preventDefault();move(1);}
  };
  document.addEventListener("keydown",keyboard);
  return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",keyboard)};
  // Only bind while the lightbox is displayed; move() uses functional updates.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[modal!==null,filtered.length]);
 return <div className="aw-experience museum">
   <header className="museum-intro">
      <div className="museum-heading">
       <span className="museum-eyebrow">VIETSOVPETRO · 1981—</span>
       <h2>{copy.heading}</h2>
       <p>{copy.intro}</p>
      </div>
      <div className="museum-count"><strong>{String(data.length).padStart(2,"0")}</strong><span>{copy.items}</span></div>
   </header>
   {decades.length>0&&<nav className="museum-filters" aria-label={copy.decade}>
      <span className="museum-filter-label">{copy.decade}</span>
      <button type="button" onClick={()=>{setDecade(null);setModal(null)}} aria-pressed={decade===null} className={decade===null?"is-selected":""}>{copy.all}</button>
      {decades.map(year=><button type="button" key={year} className={decade===year?"is-selected":""} aria-pressed={decade===year}
        onClick={()=>{setDecade(year);setModal(null)}}>{year}–{year+9}</button>)}
   </nav>}
   <div className="museum-grid" aria-label={copy.heading}>
     {filtered.map((item,index)=>{
       const show=item.asset&&!failed.includes(item.asset);
       return <button className="museum-card" key={item.id} type="button" onClick={()=>open(index)} aria-label={copy.closer+": "+displayAwardTitle(item)}>
         <span className="museum-photo">
           {show?<img src={item.asset} loading={index<4?"eager":"lazy"} alt="" decoding="async"
              onError={()=>setFailed(prev=>[...prev,item.asset!])}/>:<span className="museum-photo-unavailable">{item.year||""}</span>}
         </span>
         <span className="museum-card-meta"><span className="museum-card-title">{displayAwardTitle(item)}</span>
           {item.year&&<span className="museum-card-year">{item.year}</span>}
         </span>
       </button>;
     })}
   </div>
   {chosen&&<div role="dialog" aria-modal="true" aria-label={chosen.title} className="museum-lightbox" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}>
     <div className="museum-lightbox-inner museum-gallery-panel">
       <button className="museum-close" ref={closeRef} type="button" aria-label={copy.close} onClick={close}><AwardUIIcon name="close"/></button>
       <div className="museum-gallery-main">
         <figure className="museum-lightbox-display">
          {chosen.asset&&!failed.includes(chosen.asset)?<img src={chosen.asset} alt={copy.alt+": "+displayAwardTitle(chosen)}
            onError={()=>setFailed(prev=>[...prev,chosen.asset!])}/>:<div className="museum-no-asset">{displayAwardTitle(chosen)}</div>}
         </figure>
         <div className="museum-gallery-info">
           <span className="museum-eyebrow">VIETSOVPETRO · {copy.heading}</span>
           <small className="museum-gallery-index">{String((modal??0)+1).padStart(2,"0")} / {String(filtered.length).padStart(2,"0")}</small>
           {chosen.year&&<div className="museum-gallery-year">{copy.year} · {chosen.year}</div>}
           <h3>{displayAwardTitle(chosen)}</h3>
           <p>{copy.intro}</p>
           <div className="museum-gallery-controls"><button type="button" onClick={()=>move(-1)} aria-label={copy.prev}><AwardUIIcon name="previous" size={24}/></button><button type="button" onClick={()=>move(1)} aria-label={copy.next}><AwardUIIcon name="next" size={24}/></button></div>
         </div>
       </div>
       <div className="museum-gallery-album" aria-label={copy.heading}>
         {filtered.map((item,index)=><button key={item.id} type="button" aria-current={modal===index?"true":undefined} onClick={()=>setModal(index)} aria-label={displayAwardTitle(item)}>
           {item.asset&&!failed.includes(item.asset)?<img src={item.asset} alt="" loading="lazy"/>:<span>{item.year}</span>}
         </button>)}
       </div>
     </div>
   </div>}
 </div>;
}
