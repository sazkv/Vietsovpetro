import {readFileSync} from "node:fs";
const pages=JSON.parse(readFileSync("src/data/original-pages.json","utf8"));
for(const p of pages.filter(p=>(p.slug==="lanhdao"||p.slug==="board5"||p.slug==="board-old")&&p.section==="company")){
 const imgs=[...p.html.matchAll(/<img\b[^>]*>/gi)].map(m=>({offset:m.index,tag:m[0].slice(0,550)}));
 const samples=["Mai Khanh","Сидоров","Việt Dũng","Yakovenko","Mai Đăng","Nguyễn Đức Chính"].map(name=>{
  const i=p.html.toLowerCase().indexOf(name.toLowerCase());
  return {name,offset:i,snippet:i<0?"":p.html.slice(Math.max(0,i-350),i+380)};
 });
 console.log("LEADERSHIP_DIAGNOSTIC="+JSON.stringify({locale:p.locale,slug:p.slug,imageArray:p.images,imgTags:imgs.slice(0,18),samples}));
}
