"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import AwardUIIcon from "@/components/award-ui-icon";
import type {AwardItem} from "@/lib/structured-content";

type Locale="vi"|"ru"|"en";
const labels={
 vi:{heading:"Các danh hiệu",intro:"Những phần thưởng và danh hiệu đã được trao tặng cho Vietsovpetro.",all:"Tất cả",items:"danh hiệu",decade:"Giai đoạn",previous:"Danh hiệu trước",next:"Danh hiệu tiếp theo",close:"Đóng",expand:"Phóng to",album:"Bộ sưu tập danh hiệu",year:"Năm trao tặng",photo:"Ảnh tư liệu Vietsovpetro"},
 ru:{heading:"Награды и звания",intro:"Государственные награды и почётные звания совместного предприятия «Вьетсовпетро».",all:"Все годы",items:"наград",decade:"Период",previous:"Предыдущая награда",next:"Следующая награда",close:"Закрыть",expand:"Увеличить",album:"Альбом наград",year:"Год награждения",photo:"Фотоархив Вьетсовпетро"},
 en:{heading:"Awards and honours",intro:"State decorations and honorary distinctions awarded to the Vietsovpetro Joint Venture.",all:"All years",items:"honours",decade:"Period",previous:"Previous award",next:"Next award",close:"Close",expand:"Enlarge",album:"Awards album",year:"Year awarded",photo:"Vietsovpetro archive"}
} as const;

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const medals=new Set(["sv","hcm","ld1","ld2","ld3","dl","dl2","dl3","qc","bv","cc1","cc3","ahld"]);
const upgraded=new Set(["sv","qc","bv","hcm","ld1","ld2","ld3","dl","dl2","dl3","cc1","cc3","ahld"]);
function localAsset(item:AwardItem):string|undefined{
 const stem=(item.image||"").split("?")[0].split("/").at(-1)?.replace(/\.[^.]+$/,"").toLowerCase()||"";
 if(medals.has(stem))return base+"/awards/"+stem+".png?v="+(upgraded.has(stem)?"upscale-1254-20261025":"legacy");
 if(/Золот(ая|ой)\s+звезд|Gold Star Order|Sao vàng/i.test(item.title))return base+"/awards/sv.png?v=upscale-1254-20261025";
 return undefined;
}
function awardName(item:AwardItem){
 return item.title.replace(/\s*[-–—]\s*(?:19|20)\d{2}\s*(?:г\.?|р\.?)?\s*$/i,"").trim();
}
type Entry=AwardItem&{id:number;asset?:string};
export default function AwardsExperience({items,locale="vi"}:{items:AwardItem[];locale?:Locale}){
 const t=labels[locale];
 const data=useMemo<Entry[]>(()=>items.map((item,id)=>({...item,id,asset:localAsset(item)}))
  .sort((a,b)=>Number(b.year||0)-Number(a.year||0)),[items]);
 const decades=useMemo(()=>[...new Set(data.map(item=>item.year?Math.floor(Number(item.year)/10)*10:null)
  .filter((year):year is number=>year!==null&&Number.isFinite(year)))].sort((a,b)=>a-b),[data]);
 const [decade,setDecade]=useState<number|null>(null);
 const [selected,setSelected]=useState<number>(data[0]?.id||0);
 const [lightbox,setLightbox]=useState(false);
 const [failed,setFailed]=useState<string[]>([]);
 const rail=useRef<HTMLDivElement>(null);
 const thumbnails=useRef<Map<number,HTMLButtonElement>>(new Map());
 const closeButton=useRef<HTMLButtonElement>(null);
 const previousFocus=useRef<HTMLElement|null>(null);
 const filtered=useMemo(()=>decade===null?data:data.filter(item=>item.year&&Math.floor(Number(item.year)/10)*10===decade),[data,decade]);
 const active=Math.max(0,filtered.findIndex(item=>item.id===selected));
 const picked=filtered[active];
 const image=picked?.asset&&!failed.includes(picked.asset)?picked.asset:undefined;
 const select=(id:number)=>setSelected(id);
 const move=(direction:number)=>{
  if(!filtered.length)return;
  setSelected(filtered[(active+direction+filtered.length)%filtered.length].id);
 };
 const changeDecade=(value:number|null)=>{
  setDecade(value);
  const target=value===null?data:data.filter(item=>item.year&&Math.floor(Number(item.year)/10)*10===value);
  if(target.length)setSelected(target[0].id);
 };
 const openModal=()=>{
  previousFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;
  setLightbox(true);
 };
 const closeModal=()=>{
  setLightbox(false);
  previousFocus.current?.focus();
 };
 useEffect(()=>{
  const node=thumbnails.current.get(picked?.id);
  const viewport=rail.current;
  if(!node||!viewport)return;
  const left=node.offsetLeft-viewport.offsetLeft+node.offsetWidth/2-viewport.clientWidth/2;
  viewport.scrollTo({left,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 },[picked?.id,decade]);
 useEffect(()=>{
  if(!lightbox)return;
  const before=document.body.style.overflow;
  document.body.style.overflow="hidden";
  closeButton.current?.focus();
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==="Escape"){event.preventDefault();setLightbox(false);previousFocus.current?.focus();}
   if(event.key==="ArrowLeft"){event.preventDefault();move(-1);}
   if(event.key==="ArrowRight"){event.preventDefault();move(1);}
  };
  document.addEventListener("keydown",onKey);
  return()=>{document.body.style.overflow=before;document.removeEventListener("keydown",onKey)};
  // Navigation uses the latest active medal on each render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[lightbox,active,filtered.length]);
 if(!picked)return null;
 return <section className="museum museum-v15" aria-label={t.heading}>
  <header className="museum-intro">
   <div className="museum-heading">
    <span className="museum-eyebrow">VIETSOVPETRO · 1981—</span>
    <h2>{t.heading}</h2>
    <p>{t.intro}</p>
   </div>
   <div className="museum-count"><strong>{String(data.length).padStart(2,"0")}</strong><span>{t.items}</span></div>
  </header>

  <div className="museum-stage">
   <div className="museum-stage-art">
     {image?<button type="button" className="museum-stage-image-button" onClick={openModal} aria-label={t.expand+": "+awardName(picked)}>
       <img key={image} src={image} alt={awardName(picked)} loading="eager" decoding="async" onError={()=>setFailed(prev=>[...prev,image])}/>
     </button>:<div className="museum-stage-no-photo">{awardName(picked)}</div>}
   </div>
   <div className="museum-stage-details">
    <div className="museum-stage-topline"><span>{t.year}</span><strong>{picked.year||"—"}</strong></div>
    <div className="museum-stage-title" key={picked.id}>
      <span className="museum-stage-kicker">VIETSOVPETRO</span>
      <h3>{awardName(picked)}</h3>
    </div>
    <div className="museum-stage-controls">
     <span className="museum-stage-count">{String(active+1).padStart(2,"0")} <span>/ {String(filtered.length).padStart(2,"0")}</span></span>
     <div className="museum-stage-buttons">
      {image&&<button className="museum-stage-enlarge" type="button" onClick={openModal} aria-label={t.expand}><AwardUIIcon name="expand" size={20}/></button>}
      <button type="button" onClick={()=>move(-1)} aria-label={t.previous} disabled={filtered.length<2}><AwardUIIcon name="previous" size={24}/></button>
      <button type="button" onClick={()=>move(1)} aria-label={t.next} disabled={filtered.length<2}><AwardUIIcon name="next" size={24}/></button>
     </div>
    </div>
   </div>
  </div>

  <div className="museum-album-header">
   <h3>{t.album}</h3>
   <div className="museum-album-count">{filtered.length} {t.items}</div>
  </div>
  {decades.length>0&&<nav className="museum-filters" aria-label={t.decade}>
   <button type="button" onClick={()=>changeDecade(null)} aria-pressed={decade===null} className={decade===null?"is-selected":""}>{t.all}</button>
   {decades.map(y=><button type="button" key={y} onClick={()=>changeDecade(y)} aria-pressed={decade===y} className={decade===y?"is-selected":""}>{y}–{y+9}</button>)}
  </nav>}
  <div className="museum-album-rail" ref={rail} role="group" aria-label={t.album}>
    {filtered.map((item,index)=>{
      const thumb=item.asset&&!failed.includes(item.asset)?item.asset:undefined;
      return <button type="button" key={item.id} ref={el=>{if(el)thumbnails.current.set(item.id,el)}}
       className={"museum-album-item "+(item.id===picked.id?"museum-album-item-active":"")}
       aria-pressed={item.id===picked.id} onClick={()=>select(item.id)} aria-label={awardName(item)}>
        <span className="museum-album-image">
         {thumb?<img src={thumb} loading="lazy" decoding="async" alt="" onError={()=>setFailed(prev=>[...prev,thumb])}/>:<span>{item.year||"—"}</span>}
        </span>
        <span className="museum-album-name">{awardName(item)}</span>
        <small>{item.year||"—"}</small>
       </button>;
    })}
  </div>
  {lightbox&&<div className="museum-v15-lightbox" role="dialog" aria-modal="true" aria-label={awardName(picked)} onMouseDown={e=>{if(e.target===e.currentTarget)closeModal()}}>
   <div className="museum-v15-modal">
    <button type="button" className="museum-v15-close" ref={closeButton} aria-label={t.close} onClick={closeModal}><AwardUIIcon name="close" size={24}/></button>
    <figure className="museum-v15-modal-image">
     {image?<img src={image} alt={awardName(picked)} onError={()=>setFailed(prev=>[...prev,image])}/>:<div>{awardName(picked)}</div>}
    </figure>
    <div className="museum-v15-modal-bottom">
     <button type="button" aria-label={t.previous} onClick={()=>move(-1)}><AwardUIIcon name="previous" size={24}/></button>
     <div><span>{picked.year||"VIETSOVPETRO"}</span><strong>{awardName(picked)}</strong></div>
     <button type="button" aria-label={t.next} onClick={()=>move(1)}><AwardUIIcon name="next" size={24}/></button>
    </div>
   </div>
  </div>}
 </section>;
}
