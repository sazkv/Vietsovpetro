/**
 * Interprets the preserved Vietnamese legacy markup as typed display data.
 * All originals remain unchanged in src/data/original-pages.json.
 */
export function textOf(html:string):string{
  return html
    .replace(/<br\s*\/?>/gi," ")
    .replace(/<[^>]+>/g," ")
    .replace(/&nbsp;|&#160;|&#xA0;/gi," ")
    .replace(/&amp;/gi,"&").replace(/&quot;/gi,'"')
    .replace(/&#39;|&apos;/gi,"'")
    .replace(/&#(\d+);/g,(_,code:string)=>String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi,(_,code:string)=>String.fromCodePoint(parseInt(code,16)))
    .replace(/[\u200b-\u200f\ufeff]/g,"")
    .replace(/\s+/g," ").trim();
}
export function pageImage(html:string):string|undefined{
  const match=html.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
  return match?.[1];
}
type WithImage={image?:string};

export type HistoryItem=WithImage&{date:string;year:string;description:string};
export function parseHistory(html:string):HistoryItem[]{
  const dates=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/gi)]
   .map(m=>({date:textOf(m[1]),offset:m.index||0,end:(m.index||0)+m[0].length}))
   .filter(m=>/^(?:0?[1-9]|[12]\d|3[01])[/.-](?:0?[1-9]|1[012])[/.-](?:19|20)\d{2}$/.test(m.date));
  const imgs=[...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)]
   .map(m=>({src:m[1],offset:m.index||0}));
  return dates.map((item,i)=>{
    const end=dates[i+1]?.offset||html.length;
    const content=html.slice(item.end,end);
    const match=content.match(/<p\b[^>]*>([\s\S]*?)<\/p\s*>/i);
    const description=textOf(match?.[1]||content.split(/<\/li\s*>/i)[0]);
    const image=imgs.filter(m=>m.offset<item.offset).at(-1)?.src;
    return {date:item.date,year:item.date.slice(-4),description,image};
  }).filter(item=>item.description.length>8);
}

export type AwardItem=WithImage&{title:string;year?:string};
export function parseAwards(html:string):AwardItem[]{
  const imgs=[...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)]
    .map(m=>({src:m[1],offset:m.index||0}));
  const out:AwardItem[]=[];
  // RU/EN originals list the Gold Star Order before the first image.
  // Retain its authentic title and year, with no invented medal photograph.
  const preface=html.slice(0,imgs[0]?.offset??0);
  const prefaceTitles=[...preface.matchAll(/<h4\\b[^>]*>([\\s\\S]*?)<\\/h4\\s*>/gi)]
    .map(m=>textOf(m[1])).filter(Boolean);
  const special=prefaceTitles.find(title=>/Орден\\s+[«"]?Золот|Gold Star Order/i.test(title));
  if(special){
    const year=prefaceTitles.join(" ").match(/\\b(?:19|20)\\d{2}\\b/)?.[0];
    out.push({title:special,year});
  }
  for(let i=0;i<imgs.length;i++){
    const tail=html.slice(imgs[i].offset,imgs[i+1]?.offset||html.length);
    const h4=tail.match(/<h4\b[^>]*>([\s\S]*?)<\/h4\s*>/i);
    let title=textOf(h4?.[1]||"");
    if(!title)continue;
    if(i===0&&title==="2010")title="Huân chương Sao vàng — 2010";
    out.push({title,year:title.match(/\b(?:19|20)\d{2}\b/)?.[0],image:imgs[i].src});
  }
  return out;
}

export type Achievement={number:string;label:string;description:string};
export function parseAchievements(html:string):Achievement[]{
  const segments=[...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi)];
  return segments.map(m=>{
    const content=m[1];
    const main=content.match(/<h(?:1|3|6)\b[^>]*>([\s\S]*?)<\/h(?:1|3|6)\s*>/i);
    const detail=content.match(/<h4\b[^>]*>([\s\S]*?)<\/h4\s*>/i);
    const number=textOf(main?.[1]||"");
    const description=textOf(detail?.[1]||"");
    const after=content.slice((main?.index||0)+(main?.[0].length||0),detail?.index||content.length);
    const firstText=after.match(/^([\s\S]*?)(?:<\/div\s*>|<h[1-6]\b)/i)?.[1]||after;
    const label=textOf(firstText).replace(/^\d+\s*/,"").slice(0,92);
    return {number,label,description};
  }).filter(x=>x.number&&x.description);
}

export type Facility={title:string;image?:string;items:string[];summary:string};
export function parseFacilities(html:string):Facility[]{
  const heads=[...html.matchAll(/<h4\b[^>]*>([\s\S]*?)<\/h4\s*>/gi)]
    .map(m=>({title:textOf(m[1]),offset:m.index||0,end:(m.index||0)+m[0].length}))
    .filter(m=>m.title.length>5);
  const imgs=[...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)]
    .map(m=>({src:m[1],offset:m.index||0}));
  return heads.map((h,i)=>{
    const next=heads[i+1]?.offset||html.length;
    const slice=html.slice(h.end,next);
    const items=[...new Set([...slice.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi)]
     .map(m=>textOf(m[1])).filter(t=>t.length>7))];
    const intro=slice.slice(0,slice.indexOf("<ul")>=0?slice.indexOf("<ul"):slice.length);
    const summary=textOf(intro).replace(/Xem thêm/gi,"").trim();
    const prior=imgs.filter(img=>img.offset<h.offset).at(-1);
    return {title:h.title,image:prior?.src,items,summary};
  }).filter(f=>f.items.length>0);
}
