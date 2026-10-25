/**
 * Display cleanup only. Captured original pages in original-pages.json
 * remain immutable and retain their sources for internal audit.
 */
export function presentContent(html:string,options:{title?:string;omitFirstImage?:boolean}={}):string{
 let output=html
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,"")
  .replace(/<!--([\s\S]*?)-->/g,"")
  .replace(/<div\b[^>]*>\s*<a\b[^>]*href=["'][^"']*(?:vietsov\.com\.vn|\/(?:vi|ru|en)\/)[^"']*["'][^>]*>\s*(?:Trang chủ|Home|Главная)[\s\S]*?<\/a>\s*<span\b[^>]*>[\s\S]*?<\/span>\s*<\/div>/i,"")
  .replace(/<font\b[^>]*>/gi,"<span>")
  .replace(/<\/font\s*>/gi,"</span>")
  .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi,"")
  .replace(/<(p|div)\b[^>]*>(?:\s|&nbsp;|&#160;|&#xA0;|&#8203;|\u200b|<br\s*\/?\s*>)*<\/\1\s*>/gi,"")
  .replace(/(?:<br\s*\/?\s*>\s*){4,}/gi,"<br><br>");
 if(options.title){
  const heading=/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1\s*>/i;
  const found=output.match(heading);
  if(found){
   const plain=(value:string)=>value.replace(/<[^>]+>/g,"").replace(/&nbsp;|&#160;|&#xA0;/gi," ")
    .replace(/[\u200b-\u200d\ufeff]/g,"").replace(/\s+/g," ").trim().toLocaleLowerCase();
   const title=plain(options.title);
   if(title&&(plain(found[2])===title||plain(found[2]).replace(/^[^\p{L}\p{N}]+/u,"")===title))
    output=output.replace(found[0],"");
  }
 }
 if(options.omitFirstImage)output=output.replace(/<img\b[^>]*>/i,"");
 return output.replace(/<img\b(?![^>]*\bloading=)/gi,'<img loading="lazy" decoding="async"');
}

/** Keep unique original introductory paragraphs, not repeated teaser cards. */
export function previewParagraphs(html:string,max=3):string{
 const matches=[...html.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gi)];
 const seen=new Set<string>();
 const selected:string[]=[];
 for(const match of matches){
  const plain=match[0].replace(/<[^>]+>/g," ").replace(/&nbsp;|&#160;/gi," ")
   .replace(/[\u200b-\u200d\ufeff]/g,"").replace(/\s+/g," ").trim();
  if(plain.length<100)continue;
  const identity=plain.toLocaleLowerCase();
  if(seen.has(identity))continue;
  seen.add(identity);
  selected.push(match[0]);
  if(selected.length>=max)break;
 }
 return selected.length?selected.join("\n"):html;
}
