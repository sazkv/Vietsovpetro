"use client";

import {useEffect,useRef,useState} from "react";
import UIIcon from "@/components/ui-icon";
import type {HistoryItem} from "@/lib/structured-content";

const labels={
 vi:{previous:"Sự kiện trước",next:"Sự kiện tiếp theo",navigate:"Chọn mốc lịch sử",image:"Hình ảnh tư liệu",events:"dấu mốc",read:"Khám phá những dấu mốc hình thành và phát triển"},
 ru:{previous:"Предыдущее событие",next:"Следующее событие",navigate:"Исторические события",image:"Архивная фотография",events:"событий",read:"Ключевые события в истории предприятия"},
 en:{previous:"Previous milestone",next:"Next milestone",navigate:"Select a historical milestone",image:"Historical photograph",events:"milestones",read:"Explore Vietsovpetro's story"}
};

type Locale="vi"|"ru"|"en";
export default function HistoryExperience({events,locale="vi"}:{events:HistoryItem[];locale?:Locale}){
 const [active,setActive]=useState(0);
 const [broken,setBroken]=useState<string[]>([]);
 const rail=useRef<HTMLDivElement>(null);
 const buttons=useRef<(HTMLButtonElement|null)[]>([]);
 const touchStart=useRef<number|null>(null);
 const title=labels[locale];
 const selected=events[Math.min(active,events.length-1)];
 const year=selected?.year||"";
 const photo=selected?.image&&!broken.includes(selected.image)?selected.image:undefined;
 const count=events.length;
 const go=(step:number)=>setActive(i=>Math.max(0,Math.min(count-1,i+step)));
 const choose=(index:number)=>setActive(index);
 useEffect(()=>{
  const container=rail.current;
  const button=buttons.current[active];
  if(!container||!button)return;
  const target=button.offsetLeft+button.offsetWidth/2-container.clientWidth/2;
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  container.scrollTo({left:target,behavior:reduce?"instant":"smooth"});
 },[active]);
 if(!selected)return null;
 return <section className="hx-story" aria-label={title.navigate}>
   <div className="hx-head">
     <div className="hx-head-text"><strong>1981 — {events[count-1]?.year||"2021"}</strong><span>{title.read}</span></div>
     <div className="hx-event-number"><strong>{String(active+1).padStart(2,"0")}</strong><span> / {String(count).padStart(2,"0")}</span></div>
   </div>
   <div className="hx-stage">
    <div className="hx-stage-copy" key={selected.date+"-copy"}>
      <div className="hx-stage-top"><span className="hx-eyebrow">VIETSOVPETRO</span><span className="hx-stage-period">{selected.date}</span></div>
      <div className="hx-stage-main">
        <span className="hx-stage-year">{year}</span>
        <p className="hx-stage-description">{selected.description}</p>
      </div>
      <div className="hx-stage-actions">
       <button type="button" className="hx-arrow-button" onClick={()=>go(-1)} disabled={active===0} aria-label={title.previous}><UIIcon name="left" size={24}/></button>
       <button type="button" className="hx-arrow-button" onClick={()=>go(1)} disabled={active===count-1} aria-label={title.next}><UIIcon name="left" size={24} className="hx-next-icon"/></button>
       <div className="hx-progress" role="progressbar" aria-label={title.events} aria-valuemin={1} aria-valuemax={count} aria-valuenow={active+1}>
         <span style={{width:String((active+1)/count*100)+"%"}}/>
       </div>
      </div>
    </div>
    <div className="hx-stage-media" onTouchStart={e=>{touchStart.current=e.changedTouches[0]?.clientX??null}} onTouchEnd={e=>{
      const start=touchStart.current;touchStart.current=null;
      if(start===null)return;
      const moved=e.changedTouches[0]?.clientX-start;
      if(Math.abs(moved)>55)go(moved<0?1:-1);
    }}>
       {photo?<img key={photo} className="hx-stage-photo" src={photo} alt={selected.description} loading={active===0?"eager":"lazy"} decoding="async" onError={()=>setBroken(prev=>prev.includes(photo)?prev:[...prev,photo])}/>:<div className="hx-media-placeholder" aria-hidden="true"><span>{year}</span></div>}
       <span className="hx-media-date">{selected.date}</span>
    </div>
   </div>
   <div className="hx-rail-wrap">
    <div ref={rail} className="hx-rail" role="group" aria-label={title.navigate} onKeyDown={e=>{
      if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;
      e.preventDefault();
      const next=Math.max(0,Math.min(count-1,active+(e.key==="ArrowRight"?1:-1)));
      choose(next);buttons.current[next]?.focus();
    }}>
     {events.map((event,index)=><button
        key={event.date+"-"+index}
        ref={el=>{buttons.current[index]=el}}
        type="button"
        className={index===active?"hx-rail-item hx-rail-item-active":"hx-rail-item"}
        aria-pressed={index===active}
        aria-label={event.date+": "+event.description}
        title={event.date}
        onClick={()=>choose(index)}>
        <span className="hx-rail-dot"/>
        <span className="hx-rail-year">{event.year}</span>
      </button>)}
    </div>
    <div className="hx-rail-line" aria-hidden="true"><span style={{width:String((active+1)/count*100)+"%"}}/></div>
   </div>
 </section>;
}
