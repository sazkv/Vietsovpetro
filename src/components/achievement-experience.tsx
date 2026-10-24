"use client";

import {useEffect,useRef,useState} from "react";
import Reveal from "@/components/reveal";
import type {Achievement} from "@/lib/structured-content";

const officialLabels=[
 "Triệu tấn dầu thô",
 "Tỷ mét khối khí",
 "Tỷ USD doanh thu",
 "Mỏ dầu khí thương mại",
 "Giếng đã khoan",
 "Công trình biển",
 "Km đường ống"
];
const base=process.env.NEXT_PUBLIC_BASE_PATH||"";

/** The original site's number remains the source of truth.
 * Animation affects presentation only and respects reduced motion. */
function MotionMetric({value,className=""}:{value:string;className?:string}){
 const node=useRef<HTMLSpanElement>(null);
 const [shown,setShown]=useState(value);
 useEffect(()=>{
  const el=node.current;
  const target=Number(value.replace(/[^\d]/g,""));
  if(!el||!Number.isFinite(target)||target===0)return;
  if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    setShown(value);return;
  }
  let raf=0;
  const observer=new IntersectionObserver(([entry])=>{
    if(!entry?.isIntersecting)return;
    observer.disconnect();
    const start=performance.now();
    const duration=1050;
    const tick=(time:number)=>{
      const p=Math.min(1,(time-start)/duration);
      const ease=1-Math.pow(1-p,3);
      setShown(String(Math.round(target*ease)));
      if(p<1)raf=requestAnimationFrame(tick);
      else setShown(value);
    };
    raf=requestAnimationFrame(tick);
  },{threshold:0.3});
  observer.observe(el);
  return()=>{observer.disconnect();cancelAnimationFrame(raf);};
 },[value]);
 return <span className={className} ref={node} aria-label={value}>{shown}</span>;
}

export default function AchievementExperience({items}:{items:Achievement[]}){
 const data=items.slice(0,7).map((item,index)=>({
  ...item,label:officialLabels[index]||item.label
 }));
 const hero=data[0];
 if(!hero)return null;
 return <div className="ax-experience">
  <Reveal>
    <section className="ax-hero" aria-label={hero.label}>
      <div className="ax-hero-data">
        <span className="ax-eyebrow">VIETSOVPETRO · 1981—</span>
        <div className="ax-hero-metric">
          <strong><MotionMetric value={hero.number}/><span className="ax-plus">+</span></strong>
          <h2>{hero.label}</h2>
        </div>
        <p>{hero.description}</p>
        <div className="ax-measure"><span/></div>
      </div>
      <div className="ax-hero-media">
        <img src={base+"/brand/hero-offshore-2.jpg"} alt="" loading="lazy"/>
        <span className="ax-image-caption">VIETSOVPETRO · OFFSHORE OPERATIONS</span>
      </div>
    </section>
  </Reveal>

  {data.length>2&&<div className="ax-duo">
   {data.slice(1,3).map((entry,i)=><Reveal key={entry.label}><article className={"ax-duo-panel "+(i===0?"ax-duo-gas":"ax-duo-value")}>
     <div className="ax-duo-top">
       <span className="ax-eyebrow">{entry.label}</span>
       <span className="ax-duo-symbol" aria-hidden="true">{i===0?
        <svg viewBox="0 0 120 70" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 49h24v-22h25v31h24v-40h36M51 40h24M10 12c13-8 28-8 41 0"/><path d="M92 18v-13h17v13M88 57h30"/></svg>:
        <svg viewBox="0 0 120 70" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 59h104M13 50V29h22v21M43 50V14h25v36M76 50V22h26v28M43 21h25M13 37h22M76 29h26"/><path d="m11 13 23-8 19 4 35-6 20 5"/></svg>}</span>
     </div>
     <strong className="ax-duo-number"><MotionMetric value={entry.number}/><span>{i===0?"+":"+"}</span></strong>
     <p>{entry.description}</p>
   </article></Reveal>)}
  </div>}

  {data.length>3&&<Reveal><section className="ax-output" aria-label="Các thành tựu khác">
    {data.slice(3).map((entry,index)=><article key={entry.label} className="ax-output-item">
      <span className="ax-output-unit">{entry.label}</span>
      <div className="ax-output-value"><MotionMetric value={entry.number}/>{[1,2,3].includes(index)&&<span className="ax-plus">+</span>}</div>
      <p>{entry.description}</p>
      <div className="ax-output-marker" aria-hidden="true"><span/></div>
    </article>)}
  </section></Reveal>}
 </div>;
}
