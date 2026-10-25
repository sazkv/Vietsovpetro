"use client";

import {useEffect,useRef,useState,type PointerEvent} from "react";
import UIIcon from "@/components/ui-icon";
import type {HistoryItem} from "@/lib/structured-content";

type Locale="vi"|"ru"|"en";
const words={
 vi:{title:"HÀNH TRÌNH",read:"Chọn năm, kéo thanh thời gian hoặc dùng phím mũi tên để khám phá",next:"Tiếp theo",prev:"Trước",play:"Tự động phát",pause:"Tạm dừng",all:"Toàn bộ",photo:"TƯ LIỆU ẢNH / VIETSOVPETRO",event:"dấu mốc",period:"Thập niên"},
 ru:{title:"ХРОНИКА",read:"Выберите период, перемещайте ползунок или используйте стрелки",next:"Следующее событие",prev:"Предыдущее событие",play:"Автовоспроизведение",pause:"Пауза",all:"Весь период",photo:"ФОТОАРХИВ / VIETSOVPETRO",event:"событий",period:"Десятилетие"},
 en:{title:"THE STORY",read:"Select an era, drag the timeline or use arrow keys to explore",next:"Next chapter",prev:"Previous chapter",play:"Auto play",pause:"Pause",all:"All years",photo:"PHOTO ARCHIVE / VIETSOVPETRO",event:"milestones",period:"Decade"}
};
const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const clamp=(x:number,min:number,max:number)=>Math.min(max,Math.max(min,x));

export default function HistoryExperience({events,locale="vi"}:{events:HistoryItem[];locale?:Locale}){
 const [active,setActive]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [broken,setBroken]=useState<string[]>([]);
 const [reduceMotion,setReduceMotion]=useState(false);
 const rail=useRef<HTMLDivElement>(null);
 const tabs=useRef<(HTMLButtonElement|null)[]>([]);
 const drag=useRef<{x:number,time:number}|null>(null);
 const stage=useRef<HTMLDivElement>(null);
 const t=words[locale];
 const count=events.length;
 const select=(n:number)=>setActive(clamp(Math.round(n),0,count-1));
 const current=events[clamp(active,0,Math.max(0,count-1))];
 const decades=Array.from(new Set(events.map(event=>Number(event.year)-Number(event.year)%10)))
   .sort((a,b)=>a-b);
 const currentDecade=current?Number(current.year)-Number(current.year)%10:0;
 const image=current?.image&&!broken.includes(current.image)?current.image:base+"/brand/hero-offshore-1.jpg";

 useEffect(()=>{setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)},[]);
 useEffect(()=>{
  if(!playing||count<=1)return;
  const timer=window.setInterval(()=>setActive(i=>i>=count-1?0:i+1),6400);
  return()=>window.clearInterval(timer);
 },[playing,count]);
 useEffect(()=>{
  const el=tabs.current[active],track=rail.current;
  if(!el||!track)return;
  const center=el.offsetLeft+el.offsetWidth/2-track.clientWidth/2;
  track.scrollTo({left:center,behavior:reduceMotion?"instant":"smooth"});
 },[active,reduceMotion]);
 useEffect(()=>{
  const node=stage.current;if(!node)return;
  const onKey=(e:KeyboardEvent)=>{
   if(!(document.activeElement===node||node.contains(document.activeElement)))return;
   if(e.key==="ArrowRight"){e.preventDefault();setPlaying(false);select(active+1)}
   if(e.key==="ArrowLeft"){e.preventDefault();setPlaying(false);select(active-1)}
   if(e.key==="Home"){e.preventDefault();select(0)}
   if(e.key==="End"){e.preventDefault();select(count-1)}
  };
  document.addEventListener("keydown",onKey);
  return()=>document.removeEventListener("keydown",onKey);
 },[active,count]);
 if(!current)return null;

 const onPointerDown=(e:PointerEvent<HTMLDivElement>)=>{
  drag.current={x:e.clientX,time:performance.now()};
 };
 const onPointerUp=(e:PointerEvent<HTMLDivElement>)=>{
  if(!drag.current)return;
  const d=e.clientX-drag.current.x;drag.current=null;
  if(Math.abs(d)>60){setPlaying(false);select(active+(d<0?1:-1))}
 };
 return <section className="hc-experience" aria-label={t.title} ref={stage} tabIndex={0}>
   <div className="hc-era-nav" role="group" aria-label={t.period}>
    <div className="hc-era-label">VIETSOVPETRO <span>1981 — {events[count-1]?.year||"2021"}</span></div>
    <div className="hc-era-buttons">
      {decades.map(decade=><button type="button" key={decade}
        aria-pressed={currentDecade===decade} onClick={()=>{setPlaying(false);select(events.findIndex(item=>Number(item.year)>=decade))}}
        className={currentDecade===decade?"hc-era-active":""}>{decade}s</button>)}
    </div>
    <span className="hc-era-total">{String(count).padStart(2,"0")} {t.event}</span>
   </div>
   <div className="hc-canvas" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={()=>{drag.current=null}}>
     <div className="hc-image" key={image}>
       <img src={image} alt={current.description} loading="eager" decoding="async" onError={()=>setBroken(prev=>image&&!prev.includes(image)?[...prev,image]:prev)}/>
     </div>
     <div className="hc-image-darken" aria-hidden="true"/>
     <div className="hc-grain" aria-hidden="true"/>
     <div className="hc-scene-top"><span>{t.title} / VIETSOVPETRO</span><span>{String(active+1).padStart(2,"0")} — {String(count).padStart(2,"0")}</span></div>
     <div className="hc-scene-data" key={current.date+"-scene"}>
       <span className="hc-event-date">{current.date}</span>
       <div className="hc-year">{current.year}</div>
       <p className="hc-caption">{current.description}</p>
     </div>
     <span className="hc-scene-photo-credit">{t.photo}</span>
     <div className="hc-controls">
       <button type="button" aria-label={t.prev} disabled={active===0} onClick={()=>{setPlaying(false);select(active-1)}}><UIIcon name="left" size={24}/></button>
       <button type="button" aria-label={playing?t.pause:t.play} aria-pressed={playing} className={"hc-play "+(playing?"hc-is-playing":"")} onClick={()=>setPlaying(v=>!v)}>
        {playing?<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden><rect x="5" y="4" width="5" height="16"/><rect x="14" y="4" width="5" height="16"/></svg>:
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden><path d="M6 3 21 12 6 21V3Z"/></svg>}
       </button>
       <button type="button" aria-label={t.next} disabled={active===count-1} onClick={()=>{setPlaying(false);select(active+1)}}><UIIcon name="left" size={24} className="hc-flip"/></button>
     </div>
   </div>
   <div className="hc-dock">
     <div className="hc-dock-head">
       <label htmlFor="hc-scrubber">{t.read}</label>
       <strong>{current.date}</strong>
     </div>
     <input id="hc-scrubber" className="hc-scrub" type="range" min={0} max={count-1} step={1} value={active}
       aria-valuetext={current.date+": "+current.description}
       onChange={e=>{setPlaying(false);select(Number(e.target.value))}}
       style={{"--hc-progress":String(100*active/Math.max(1,count-1))+"%"} as React.CSSProperties}/>
     <div className="hc-years" ref={rail} role="group" aria-label={t.period}>
       {events.map((event,index)=><button key={event.date+"-"+index} type="button"
         className={"hc-year-btn "+(index===active?"hc-year-btn-active":"")}
         ref={el=>{tabs.current[index]=el}}
         aria-pressed={index===active}
         title={event.description}
         onClick={()=>{setPlaying(false);select(index)}}><span>{event.year}</span><small>{event.date.slice(0,5)}</small></button>)}
     </div>
   </div>
 </section>;
}
