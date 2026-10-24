import {textOf} from "@/lib/structured-content";

/**
 * Presentation-only segmentation for the Vietsovpetro source archive.
 * Instead of stretching the original 2000-era HTML into a "modern" wrapper,
 * present every paragraph, list item and diagram as intentional content.
 * The archived raw HTML is not changed.
 */
export type EditorialChapter={
 heading:string;
 kind:"intro"|"mission"|"resources"|"services"|"standards"|"partners"|"policy"|"other";
 paragraphs:string[];
 bullets:string[];
 images:string[];
};
export type EditorialData={intro:string[];contacts:string[];chapters:EditorialChapter[]};

function plain(value:string){
 return textOf(value).replace(/[\u200b-\u200f\ufeff]/g,"").replace(/\s+/g," ").trim();
}
function searchKey(value:string){
 return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"")
  .replace(/[Đđ]/g,"d").toLocaleLowerCase().replace(/[^a-z0-9]+/g,"");
}
function kindOf(text:string):EditorialChapter["kind"]{
 const k=searchKey(text);
 if(/chucnang|nhiemvu|sudung|hoatdongchinh/.test(k))return "mission";
 if(/nguonluc|trangbithietbi|nangluc|cosovatchat|nhanluc/.test(k))return "resources";
 if(/sanphamdichvu|dichvu|nghiencuukhoahoc|thietke|vantaibien/.test(k))return "services";
 if(/chungchi|iso|quanlychatluong/.test(k))return "standards";
 if(/doitac|duan|khachhang/.test(k))return "partners";
 if(/chinhsach|antoan|moitruong|daotao|ungcuu|thanhhtu|mohinh|sodo/.test(k))return "policy";
 return "other";
}
function probableHeading(text:string,html:string,context:"unit"|"company"):boolean{
 if(!text||text.length>115)return false;
 const strong=/<(?:strong|b)\b/i.test(html);
 const roman=/^(?:[IVX]{1,5})\s*\./i.test(text);
 const term=kindOf(text)!=="other";
 const ends=/[:：]$/.test(text);
 const starts=/^(?:[1-9]|[12]\d)\.\s*[^\d]/.test(text);
 if(context==="unit")return (strong&&(ends||term||starts)) || (strong&&text.length<55&&ends);
 return roman || (strong&&(ends||starts||term));
}
function isContact(text:string){
 return /^(?:địa\s*chỉ|dia\s*chi|điện\s*thoại|dien\s*thoai|điện\s*thoại|website|fax|email|cấp\s*cứu|phone|address)\s*:/i.test(text);
}
function getImages(html:string):string[]{
 return [...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(m=>m[1]);
}
function makeChapter(heading:string):EditorialChapter{
 return {heading,kind:kindOf(heading),paragraphs:[],bullets:[],images:[]};
}
function hasContent(c:EditorialChapter){
 return Boolean(c.paragraphs.length||c.bullets.length||c.images.length);
}
export function extractEditorialData(html:string,context:"unit"|"company",fallbackHeading:string):EditorialData{
 const intro:string[]=[];
 const contacts:string[]=[];
 const chapters:EditorialChapter[]=[];
 let current=makeChapter(fallbackHeading);
 const seen=new Set<string>();
 const token=/<p\b[^>]*>[\s\S]*?<\/p\s*>|<(?:ul|ol)\b[^>]*>[\s\S]*?<\/(?:ul|ol)\s*>|<h[2-5]\b[^>]*>[\s\S]*?<\/h[2-5]\s*>/gi;
 const flush=()=>{
  if(hasContent(current))chapters.push(current);
 };
 const start=(heading:string)=>{
  flush();
  current=makeChapter(heading.replace(/[:：]\s*$/,"").trim());
 };
 const addParagraph=(value:string)=>{
  if(!value||value.length<5)return;
  const key=value.toLocaleLowerCase();
  if(seen.has(key))return;seen.add(key);
  current.paragraphs.push(value);
 };
 const addBullet=(value:string)=>{
  if(!value||value.length<4)return;
  const key=value.toLocaleLowerCase();
  if(seen.has(key))return;seen.add(key);
  current.bullets.push(value.replace(/^\s*(?:[-–•]|\d+\.)\s*/,"").trim());
 };
 for(const match of html.matchAll(token)){
  const node=match[0];
  const tag=(node.match(/^<([a-z0-9]+)/i)||[])[1]?.toLowerCase()||"";
  if(tag==="ul"||tag==="ol"){
   const list=[...node.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi)];
   for(const item of list){
    const value=plain(item[1]);
    if(!value)continue;
    if(value.length<90&&value.endsWith(":")&&kindOf(value)!=="other"){start(value);continue;}
    addBullet(value);
   }
   continue;
  }
  const inner=node.replace(/^<[^>]+>/,"").replace(/<\/[^>]+>\s*$/,"");
  const pictures=getImages(inner);
  const value=plain(inner.replace(/<img\b[^>]*>/gi,""));
  if(pictures.length){
   current.images.push(...pictures);
   if(!value)continue;
  }
  if(!value||value.length<4)continue;
  if(isContact(value)){
   contacts.push(value);continue;
  }
  // Source frequently repeats the title as a large bold paragraph.
  if(searchKey(value)===searchKey(fallbackHeading))continue;
  if(probableHeading(value,inner,context)){start(value);continue;}
  if(/^\s*(?:[-–•]|\d+\.)\s+/.test(value)&&context==="company"){addBullet(value);continue;}
  addParagraph(value);
 }
 flush();
 const main=chapters[0];
 // Intro is a lead paragraph, never a duplicate section below the hero.
 if(main&&main.paragraphs.length){
  const max=context==="company"?2:1;
  intro.push(...main.paragraphs.splice(0,max));
 }
 const clean=chapters.filter(hasContent);
 return {intro,contacts:[...new Set(contacts)],chapters:clean};
}
