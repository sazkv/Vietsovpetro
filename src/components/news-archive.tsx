"use client";

import UIIcon from "@/components/ui-icon";

import Link from "next/link";
import {useMemo,useState} from "react";
export type ArchiveItem={title:string;route:string;date:string;image?:string};
export type ArchiveCategory={label:string;items:ArchiveItem[]};
type Locale="vi"|"ru"|"en";
const labels={
 vi:{search:"Tìm bài viết",allYears:"Tất cả năm",empty:"Không tìm thấy bài viết.",more:"Xem thêm bài viết",article:"Đọc bài viết"},
 ru:{search:"Поиск публикаций",allYears:"Все годы",empty:"Ничего не найдено.",more:"Показать ещё",article:"Читать материал"},
 en:{search:"Search news",allYears:"All years",empty:"No articles found.",more:"Load more",article:"Read article"}
};
function dateStamp(d:string){const match=d.match(/(\d{1,2})[\/.\-](\d{1,2})[\/.\-](20\d{2}|19\d{2})/);if(match)return Number(match[3])*10000+Number(match[2])*100+Number(match[1]);const iso=d.match(/(20\d{2}|19\d{2})-(\d\d)-(\d\d)/);return iso?Number(iso[1])*10000+Number(iso[2])*100+Number(iso[3]):0;}
function getYear(d:string){const match=d.match(/(20\d{2}|19\d{2})/);return match?.[1]||"";}
export default function NewsArchive({categories,locale}:{categories:ArchiveCategory[],locale:Locale}){
 const t=labels[locale];
 const [query,setQuery]=useState("");
 const [year,setYear]=useState("");
 const [limit,setLimit]=useState(16);
 const all=useMemo(()=>categories.flatMap(category=>category.items).filter(item=>item.title&&item.route).sort((a,b)=>dateStamp(b.date)-dateStamp(a.date)),[categories]);
 const years=useMemo(()=>Array.from(new Set(all.map(item=>getYear(item.date)).filter(Boolean))).sort((a,b)=>Number(b)-Number(a)),[all]);
 const filtered=useMemo(()=>{
  const q=query.trim().toLocaleLowerCase();
  return all.filter(item=>(!year||getYear(item.date)===year)&&(!q||item.title.toLocaleLowerCase().includes(q)));
 },[all,query,year]);
 const shown=filtered.slice(0,limit);
 function resetSearch(value:string){setQuery(value);setLimit(16)}
 return <div className="r-news">
  <div className="r-news-toolbar">
   <label className="r-news-search"><span className="r-visually-hidden">{t.search}</span><input type="search" value={query} placeholder={t.search} onChange={e=>resetSearch(e.target.value)}/><span aria-hidden="true"><UIIcon name="search" size={20}/></span></label>
   <label className="r-news-year"><span className="r-visually-hidden">{t.allYears}</span><select aria-label={t.allYears} value={year} onChange={e=>{setYear(e.target.value);setLimit(16)}}><option value="">{t.allYears}</option>{years.map(y=><option key={y} value={y}>{y}</option>)}</select><span className="r-news-select-chevron" aria-hidden="true"><UIIcon name="chevron-down" size={16}/></span></label>
  </div>
  <div className="r-news-list">
   {shown.map((item,i)=><Link href={item.route} className="r-news-entry" key={item.route}>
     <span className="r-news-entry-index">{String(i+1).padStart(2,"0")}</span>
     {item.image&&<span className="r-news-entry-media"><img src={item.image} alt="" loading="lazy" decoding="async"/></span>}
     <span className="r-news-entry-copy">{item.date&&<time>{item.date}</time>}<strong>{item.title}</strong></span>
     <span className="r-news-entry-arrow" aria-hidden="true"><UIIcon name="up-right" size={20}/></span>
   </Link>)}
  </div>
  {!shown.length&&<p role="status">{t.empty}</p>}
  {filtered.length>shown.length&&<button type="button" className="r-news-load" onClick={()=>setLimit(v=>v+16)}>{t.more}<span aria-hidden="true"><UIIcon name="down" size={18}/></span></button>}
 </div>;
}
