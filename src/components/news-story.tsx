import Link from "next/link";
import SourceCopy from "@/components/source-copy";
import UIIcon from "@/components/ui-icon";
import {sectionPages,type SourcePage} from "@/lib/original-content";
import {displayTitle} from "@/lib/site-titles";

const copy={
 vi:{more:"Tin tức liên quan",all:"Tất cả tin tức",archive:"Tin tức",source:"Nguồn tin gốc"},
 ru:{more:"Другие новости",all:"Все новости",archive:"Новости",source:"Оригинальная публикация"},
 en:{more:"More stories",all:"All news",archive:"News",source:"Original publication"}
} as const;

export default function NewsStory({page}:{page:SourcePage}){
 const t=copy[page.locale];
 const matches=sectionPages(page.locale,"news")
  .filter(other=>other.route!==page.route&&other.route!==`/${page.locale}/news/`&&other.slug.match(/article-\d+-\d+/));
 const category=page.slug.match(/-(\d+)$/)?.[1];
 const related=matches.filter(p=>!category||p.slug.endsWith("-"+category))
  .sort((a,b)=>Number((b.slug.match(/article-(\d+)/)?.[1]||0))-Number((a.slug.match(/article-(\d+)/)?.[1]||0)))
  .slice(0,4);
 return <div className="v-news-story-layout">
  <article className="v-news-story-content" aria-label={displayTitle(page)}>
   <SourceCopy html={page.html} title={displayTitle(page)} className="v-news-story-copy"/>
   <footer className="v-news-story-footer">
    <span>VIETSOVPETRO</span>
    <a href={page.sourceUrl} target="_blank" rel="noopener noreferrer">{t.source}<UIIcon name="up-right" size={17}/></a>
   </footer>
  </article>
  <aside className="v-news-story-aside" aria-label={t.more}>
   <div className="v-news-story-aside-inner">
    <span className="v-news-story-aside-eyebrow">VIETSOVPETRO / {t.archive}</span>
    <h2>{t.more}</h2>
    <div className="v-news-story-related">
     {related.map((item,i)=><Link href={item.route} key={item.route}>
      <span className="v-news-story-related-index">{String(i+1).padStart(2,"0")}</span>
      <span>{item.date&&<time>{item.date}</time>}<strong>{displayTitle(item)}</strong></span>
      <UIIcon name="up-right" size={17}/>
     </Link>)}
    </div>
    <Link href={`/${page.locale}/news/`} className="v-news-story-return">{t.all}<UIIcon name="up-right" size={17}/></Link>
   </div>
  </aside>
 </div>;
}
