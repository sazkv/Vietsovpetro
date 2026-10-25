"use client";

import {useEffect,useRef,useState} from "react";
import UIIcon from "@/components/ui-icon";
import type {Achievement} from "@/lib/structured-content";

type Locale="vi"|"ru"|"en";
const labels:Record<Locale,string[]>={
 vi:["Triệu tấn dầu thô","Tỷ mét khối khí","Tỷ USD doanh thu","Mỏ dầu khí thương mại","Giếng đã khoan","Công trình biển","Km đường ống"],
 ru:["Млн тонн добытой нефти","Млрд кубометров газа","Млрд долларов выручки","Открыто месторождений","Пробурено скважин","Морских сооружений","Километров трубопроводов"],
 en:["Million tonnes of crude oil","Billion cubic metres of gas","Billion USD in revenue","Oil and gas fields discovered","Wells drilled","Offshore structures","Kilometres of pipeline"]
};
const ui={
 vi:{eyebrow:"KẾT QUẢ HOẠT ĐỘNG",title:"Thành tựu nổi bật",hint:"CHỌN MỘT CHỈ SỐ ĐỂ KHÁM PHÁ",group:"Các thành tựu của Vietsovpetro",previous:"Kết quả trước",next:"Kết quả tiếp theo",play:"Phát",pause:"Tạm dừng"},
 ru:{eyebrow:"ПРОИЗВОДСТВЕННЫЕ РЕЗУЛЬТАТЫ",title:"Ключевые достижения",hint:"ВЫБЕРИТЕ ПОКАЗАТЕЛЬ",group:"Достижения Вьетсовпетро",previous:"Предыдущий показатель",next:"Следующий показатель",play:"Запустить",pause:"Пауза"},
 en:{eyebrow:"OPERATING RESULTS",title:"Key achievements",hint:"SELECT A METRIC TO EXPLORE",group:"Vietsovpetro milestones",previous:"Previous metric",next:"Next metric",play:"Play",pause:"Pause"}
};
const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const photos=["hero-offshore-2.jpg","hero-offshore-3.jpg","hero-offshore-6.jpg",
 "hero-offshore-1.jpg","hero-offshore-3.jpg","hero-offshore-6.jpg","hero-offshore-2.jpg"];
function Metric({value,selected}:{value:string;selected:number}){
 const [shown,setShown]=useState(value);
 const reduce=useRef(false);
 useEffect(()=>{
  reduce.current=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 },[]);
 useEffect(()=>{
  const final=Number(value.replace(/[^\d]/g,""));
  if(!final||reduce.current){setShown(value);return;}
  const started=performance.now();
  let frame=0;
  const animate=(now:number)=>{
   const k=Math.min(1,(now-started)/920);
   const eased=1-Math.pow(1-k,3);
   setShown(String(Math.round(final*eased)));
   if(k<1)frame=requestAnimationFrame(animate);else setShown(value);
  };
  frame=requestAnimationFrame(animate);
  return()=>cancelAnimationFrame(frame);
 },[value,selected]);
 return <span>{shown}</span>;
}
export default function AchievementExperience({items,locale="vi"}:{items:Achievement[];locale?:Locale}){
 const t=ui[locale];
 const data=items.slice(0,7).map((item,index)=>({
  ...item,label:labels[locale][index]||item.label,
  value:index===0?(item.description.match(/trên\s+(\d+)\s+triệu/i)?.[1]||item.number):item.number
 }));
 const [active,setActive]=useState(0);
 const current=data[active];
 if(!current)return null;
 const more=/\btrên\b|\bhơn\b|\bover\b|more than|более|свыше/i.test(current.description);
 const progress=100*(active+1)/data.length;
 return <section className="ac-experience">
   <div className="ac-experience-head">
     <span>VIETSOVPETRO / 1981—</span>
     <div className="ac-head-side"><strong>{String(active+1).padStart(2,"0")}</strong><span> / {String(data.length).padStart(2,"0")}</span></div>
   </div>
   <div className="ac-spotlight">
    <div className="ac-data" key={active}>
      <div className="ac-data-kicker">{t.eyebrow}</div>
      <div className="ac-data-main">
       <div className="ac-metric"><Metric value={current.value} selected={active}/>{more&&<small>+</small>}</div>
       <h2>{current.label}</h2>
       <p>{current.description}</p>
      </div>
      <div className="ac-data-nav">
       <div className="ac-nav-buttons">
        <button type="button" aria-label={t.previous} onClick={()=>{setActive((active-1+data.length)%data.length)}}><UIIcon name="left" size={23}/></button>
        <button type="button" aria-label={t.next} onClick={()=>{setActive((active+1)%data.length)}}><UIIcon name="left" size={23} className="ac-arrow-next"/></button>

       </div>
       <div className="ac-progress" role="progressbar" aria-label="Achievement selection" aria-valuemin={1} aria-valuemax={data.length} aria-valuenow={active+1}><span style={{width:progress+"%"}}/></div>
      </div>
    </div>
    <div className="ac-visual" key={"photo-"+active}>
     <div className="ac-visual-photo"><img src={base+"/brand/"+photos[active]} loading="eager" alt=""/></div>
     <span className="ac-visual-caption">{current.label}</span>
    </div>
   </div>
   <div className="ac-index-head"><h3>{t.title}</h3><span>{t.hint}</span></div>
   <div className="ac-index" role="group" aria-label={t.group}>
    {data.map((item,i)=><button type="button" key={i} aria-pressed={active===i}
      className={"ac-tile "+(active===i?"ac-tile-active":"")}
      onClick={()=>{setActive(i)}}>

      <strong>{item.value}{/\btrên\b|\bhơn\b|more than|over|более|свыше/i.test(item.description)?"+":""}</strong>
      <span className="ac-tile-name">{item.label}</span>
     </button>)}
   </div>
 </section>;
}
