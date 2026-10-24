import {readFileSync,existsSync} from "node:fs";
import {join,isAbsolute} from "node:path";

const root=process.cwd();
const read=p=>readFileSync(isAbsolute(p)?p:join(root,p),"utf8");
const failures=[];
const page=(section,locale="vi")=>`out/${locale}/${section}/index.html`;
const tests=[
 ["company","v-about-feature"],
 ["units","v-unit-grid"],
 ["projects","v-projects-editorial"],
 ["resources","v-resource-index"],
 ["services","v-service-grid"],
 ["contact","v-contact-main"],
 ["news","r-news"]
];
for(const [section,marker] of tests){
 const file=page(section);
 if(!existsSync(file)){failures.push(`Missing exported page: ${file}`);continue;}
 const html=read(file);
 if(!html.includes(marker))failures.push(`Missing template ${marker} on ${section}`);
 if(!html.includes("<h1"))failures.push(`Missing H1 on ${section}`);
 if(html.includes('class="r-source-details"')||html.includes('class="v-source-details"'))
  failures.push(`Public page ${section} still renders a duplicate-source disclosure`);
}
for(const locale of ["vi","ru","en"]){
 const file=page("company",locale);
 if(!existsSync(file))failures.push(`Missing locale page: ${file}`);
}
const detail=read("src/components/source-document.tsx");
if(detail.includes("page.sourceUrl} target=")||detail.includes("m.page.source"))
 failures.push("Article UI unexpectedly links to duplicate original-source pages");
const sectionSource=read("src/components/source-section.tsx");
if(sectionSource.includes("<details")||sectionSource.includes("r-source-details"))
 failures.push("Section UI still includes duplicate source accordions");
const projectData=JSON.parse(read("src/data/home-content.json"));
for(const project of projectData.vi.projects){
 const route=(project.href||"").replace(/^\//,"");
 const htmlPath=join(root,"out",route,"index.html");
 if(!existsSync(htmlPath))failures.push(`Original project route unavailable: ${route}`);
}

const partnerPage=join(root,"out","vi","projects","partners","index.html");
if(!existsSync(partnerPage))failures.push("Missing dedicated partner/client page");
for(const [section,slug,expected] of [
 ["projects","ctkt","EPCI"],
 ["projects","khoithuongtang","thượng tầng"],
 ["company","cocau","Cơ cấu tổ chức"],
 ["company","lanhdao","Ban lãnh đạo"]
]){
 const p=join(root,"out","vi",section,slug,"index.html");
 if(!existsSync(p)){failures.push(`Missing detail: ${section}/${slug}`);continue;}
 const h=(read(p).match(/<h1[^>]*>(.*?)<\/h1>/is)||[])[1]||"";
 if(!h.includes(expected))failures.push(`Unresolved source title on ${section}/${slug}`);
}
if(existsSync(page("company"))){
 const html=read(page("company"));
 const sample="Liên doanh Vietsovpetro (gọi tắt là Vietsovpetro)";
 const visible=(html.split("<main")[1]||"").split("</main>")[0];
 if(visible.split(sample).length>2)failures.push("Company intro is duplicated");
}

for(const [slug,marker] of [
 ["lichsuhinhthanh","v-history-event"],
 ["cacdanhhieu","v-awards-grid"],
 ["nhungthanhtuu","v-achievement-grid"],
 ["cocau","v-organization"],
 ["lanhdao","v-leadership-grid"]
]){
 const path=join(root,"out","vi","company",slug,"index.html");
 if(!existsSync(path)){failures.push(`Missing company detail: ${slug}`);continue;}
 if(!read(path).includes(marker))failures.push(`Company detail ${slug} is not using intended layout ${marker}`);
}
for(const [section,slug,marker] of [
 ["resources",null,"v-resource-index"],
 ["resources","cosovatchat","v-facility"],
 ["services",null,"v-service-icon"]
]){
 const path=join(root,"out","vi",section,...(slug?[slug]:[]),"index.html");
 if(!existsSync(path)){failures.push(`Missing page: ${section}/${slug||""}`);continue;}
 const html=read(path);
 if(!html.includes(marker))failures.push(`Missing structured layout: ${section}/${slug||""} ${marker}`);
}
const svc=read("src/components/service-icon.tsx");
if((svc.match(/<path|<circle|<rect/g)||[]).length>0 && !svc.includes("lucide-icons"))failures.push("Professional icon system missing");
if(!svc.includes("serviceIconNames")||!svc.includes("Lucide"))failures.push("Expected professional Lucide icon package mapping");

const serviceSource=read("src/components/service-icon.tsx");
const named=serviceSource.match(/export const serviceIconNames = (\[[^\n]*\])/);
if(!named||JSON.parse(named[1]).length!==15)
 failures.push("Service icons must be a complete 15-item professional icon pack");
for(const path of [
 "src/components/source-home.tsx",
 "src/components/source-section.tsx",
 "src/components/source-navigation.tsx",
 "src/components/source-footer.tsx",
 "src/components/news-archive.tsx",
 "src/components/resource-pages.tsx"
]){
 const content=read(path);
 if(/[↗☰✕⌕＋]/u.test(content))failures.push(`Emoji-like Unicode glyph remains in ${path}`);
}
const leadershipFile=join(root,"out","vi","company","lanhdao","index.html");
if(existsSync(leadershipFile)){
  const html=read(leadershipFile).split("<main")[1]?.split("</main>")[0]||"";
  const num=(html.match(/class="v-leadership-card"/g)||[]).length;
  const photos=(html.match(/class="v-leadership-portrait"/g)||[]).length;
  if(num!==11||photos!==11)failures.push(`Expected 11 real, consistently framed portrait cards, found ${num} cards and ${photos} photos`);
}
const archive=JSON.parse(read("src/data/original-pages.json"));
if(archive.length<2300)failures.push(`Content archive unexpectedly small: ${archive.length}`);
if(failures.length){console.error(failures.join("\n"));process.exit(1);}
console.log("UI contracts: seven sections, VI/RU/EN, project routes, no source accordions.");
console.log(`Original content retained: ${archive.length} pages.`);
