import {readFileSync,existsSync} from "node:fs";
import {join} from "node:path";

const root=process.cwd();
const read=p=>readFileSync(join(root,p),"utf8");
const failures=[];
const page=(section,locale="vi")=>`out/${locale}/${section}/index.html`;
const tests=[
 ["company","v-company-columns"],
 ["units","v-unit-grid"],
 ["projects","v-projects-editorial"],
 ["resources","v-resources-feature"],
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
 if(html.split(sample).length>2)failures.push("Company intro is duplicated");
}
const archive=JSON.parse(read("src/data/original-pages.json"));
if(archive.length<2300)failures.push(`Content archive unexpectedly small: ${archive.length}`);
if(failures.length){console.error(failures.join("\n"));process.exit(1);}
console.log("UI contracts: seven sections, VI/RU/EN, project routes, no source accordions.");
console.log(`Original content retained: ${archive.length} pages.`);
