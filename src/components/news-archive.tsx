"use client";

import Link from "next/link";
import {useMemo,useState} from "react";

export type ArchiveItem={title:string;route:string;date:string;image?:string};
export type ArchiveCategory={label:string;items:ArchiveItem[]};
type Locale="vi"|"ru"|"en";
const copy={
  vi:{all:"Tất cả",search:"Tìm bài viết",empty:"Không tìm thấy bài viết.",more:"Xem thêm"},
  ru:{all:"Все",search:"Поиск по новостям",empty:"Ничего не найдено.",more:"Показать ещё"},
  en:{all:"All",search:"Search articles",empty:"No articles found.",more:"Load more"}
};

export default function NewsArchive({categories,locale}:{categories:ArchiveCategory[];locale:Locale}){
  const [active,setActive]=useState(-1);
  const [query,setQuery]=useState("");
  const [limit,setLimit]=useState(12);
  const t=copy[locale];
  const content=useMemo(()=>{
    const selected=active===-1?categories:categories.slice(active,active+1);
    const normalized=query.trim().toLocaleLowerCase();
    return selected.flatMap(c=>c.items.map(item=>({...item,category:c.label})))
      .filter(item=>!normalized||(item.title+" "+item.category+" "+item.date).toLocaleLowerCase().includes(normalized));
  },[active,categories,query]);
  const shown=content.slice(0,limit);
  function choose(i:number){setActive(i);setLimit(12);}
  return <div className="vx-news">
    <div className="vx-news-tools">
      <div className="vx-news-tabs" role="group" aria-label="News categories">
        <button type="button" className={active===-1?"is-selected":""} onClick={()=>choose(-1)}>{t.all}</button>
        {categories.map((cat,i)=><button type="button" key={cat.label} className={active===i?"is-selected":""} onClick={()=>choose(i)}>{cat.label}</button>)}
      </div>
      <label className="vx-search"><span className="vx-sr-only">{t.search}</span><input type="search" value={query} placeholder={t.search} onChange={e=>{setQuery(e.target.value);setLimit(12);}}/><span aria-hidden="true">⌕</span></label>
    </div>
    <div className="vx-archive-grid">
      {shown.map((item,i)=><Link href={item.route} className="vx-archive-card" key={item.route}>
        <div className="vx-archive-visual">
          {item.image?<img src={item.image} loading="lazy" alt=""/>:<span className="vx-archive-placeholder" aria-hidden="true">{String(i+1).padStart(2,"0")}</span>}
        </div>
        <div className="vx-archive-meta"><span>{item.category}</span>{item.date&&<time>{item.date}</time>}</div>
        <h2>{item.title}</h2>
        <span className="vx-archive-icon" aria-hidden="true">↗</span>
      </Link>)}
    </div>
    {shown.length===0&&<p className="vx-no-results" role="status">{t.empty}</p>}
    {shown.length<content.length&&<button type="button" className="vx-load-more" onClick={()=>setLimit(v=>v+12)}>{t.more} <span aria-hidden>↓</span></button>}
  </div>;
}
