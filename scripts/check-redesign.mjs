import {readFileSync,existsSync} from "node:fs";
import {join,isAbsolute} from "node:path";

const root=process.cwd();
const read=p=>readFileSync(isAbsolute(p)?p:join(root,p),"utf8");
const failures=[];
const page=(section,locale="vi")=>`out/${locale}/${section}/index.html`;
const tests=[
 ["company","v-about-feature"],
 ["units","ug-directory"],
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
 ["lichsuhinhthanh","hc-experience"],
 ["cacdanhhieu","museum-v15"],
 ["nhungthanhtuu","ac-experience"],
 ["cocau","og-experience"],
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

const historyFile=join(root,"out","vi","company","lichsuhinhthanh","index.html");
if(existsSync(historyFile)){
 const html=read(historyFile);
 const buttons=(html.match(/class="hc-year-btn/g)||[]).length;
 if(buttons<15)failures.push("Interactive timeline must expose all original history events, found "+buttons);
 if(!html.includes('class="hc-scrub"')||!html.includes("hc-canvas")||!html.includes("hc-era-buttons"))
  failures.push("History must expose cinematic photograph, decade navigation and draggable scrubber");
}
const achievementsFile=join(root,"out","vi","company","nhungthanhtuu","index.html");
if(existsSync(achievementsFile)){
 const html=read(achievementsFile);
 if(!html.includes("ac-spotlight")||!html.includes("ac-index")||!html.includes("ac-tile"))
  failures.push("Achievements must render interactive metric explorer and index");
}

const organizationFile=join(root,"out","vi","company","cocau","index.html");
if(existsSync(organizationFile)){
 const html=read(organizationFile);
 if(!html.includes("og-switcher")||!html.includes("og-graph-root"))
  failures.push("Interactive company organization explorer is missing");
}
const galleryFile=join(root,"out","vi","company","gallery","index.html");
if(!existsSync(galleryFile))failures.push("Missing archival gallery route");
else{
 const html=read(galleryFile);
 if(!html.includes("ar-archive-cover")||!html.includes("ar-grid-section"))
  failures.push("React Bits archive gallery not present in exported HTML");
}
const orgSource=read("src/lib/organization-data.ts");
for(const [name,expected] of [["organizationDepartments",18],["organizationUnits",18]]){
 const match=orgSource.match(new RegExp("export const "+name+"=\\[([\\s\\S]*?)\\];"));
 if(!match)failures.push("Missing structured organization data: "+name);
 else{
  const count=(match[1].match(/^ "/gm)||[]).length;
  if(count!==expected)failures.push(name+" needs "+expected+" source-backed nodes, got "+count);
 }
}
const masonrySource=read("src/components/react-bits-masonry.tsx");
if(!masonrySource.includes("React Bits Masonry")||!masonrySource.includes("lightbox"))
 failures.push("Licensed interactive React Bits masonry component is missing");

const awardsFile=join(root,"out","vi","company","cacdanhhieu","index.html");
if(existsSync(awardsFile)){
 const html=read(awardsFile);
 if(!html.includes("museum-stage-art")||!html.includes("museum-stage-details")||!html.includes("museum-album-rail")||!html.includes("museum-album-item"))
  failures.push("Awards museum requires photo-left/details-right scene and selectable thumbnail album");
}
for(const slug of ["gioithieuct","tiemnang","antoanskmt"]){
 const path=join(root,"out","vi","company",slug,"index.html");
 if(!existsSync(path)){failures.push("Missing editorial company page: "+slug);continue;}
 const html=read(path);
 if(!html.includes("ep-editorial")||!html.includes("ep-banner")||!html.includes("ep-chapters"))
  failures.push("Company page must use designed editorial chapters: "+slug);
}
for(const slug of ["xnkt","xnkhoan","xncd","vien","ttyt"]){
 const path=join(root,"out","vi","units",slug,"index.html");
 if(!existsSync(path)){failures.push("Missing unit page: "+slug);continue;}
 const html=read(path);
 if(!html.includes("ud-experience")||!html.includes("ud-hero")||!html.includes("ud-content"))
  failures.push("Unit must use structured functional / resource / service chapters: "+slug);
}
const css=read("src/app/editorial-v11.css");
if(!css.includes(".ar-cover-bottom>a{justify-self:end")||!css.includes(".ar-grid-header>p{justify-self:end"))
 failures.push("Photo-archive alignment fixes are missing");

const capabilityFile=join(root,"out","vi","company","tiemnang","index.html");
if(existsSync(capabilityFile)){
 const html=read(capabilityFile);
 const chapters=(html.match(/class="ep-chapter ep-chapter-/g)||[]).length;
 if(chapters<2)failures.push("Capabilities should be segmented into source-backed chapters, found "+chapters);
}
const profileFile=join(root,"out","vi","company","gioithieuct","index.html");
if(existsSync(profileFile)){
 const html=read(profileFile);
 if(!html.includes("ep-intro-continuation"))failures.push("Full original company introduction must remain visible");
}

// Source imports have different slugs per locale. A previous version only
// routed the Vietnamese variants to interactive designs.
const experienceRoutes=[
 ["vi","lichsuhinhthanh","hc-experience"],
 ["ru","significant","hc-experience"],
 ["en","significant","hc-experience"],
 ["vi","nhungthanhtuu","ac-experience"],
 ["ru","environment","ac-experience"],
 ["en","environment","ac-experience"],
 ["vi","cacdanhhieu","museum-v15"],
 ["ru","healthcare","museum-v15"],
 ["en","healthcare","museum-v15"]
];
for(const [locale,slug,marker] of experienceRoutes){
 const path=join(root,"out",locale,"company",slug,"index.html");
 if(!existsSync(path)){failures.push("Missing localized interactive page: "+locale+"/"+slug);continue;}
 const html=read(path).split("</main>")[0];
 if(!html.includes(marker))failures.push(locale+"/"+slug+" still renders legacy HTML instead of "+marker);
 if(html.includes('class="source-copy"'))
  failures.push(locale+"/"+slug+" still exposes original legacy source layout");
}
for(const locale of ["vi","ru","en"]){
 const slug=locale==="vi"?"tiemnang":"community";
 const path=join(root,"out",locale,"company",slug,"index.html");
 if(!existsSync(path))continue;
 const html=read(path).split("</main>")[0];
 if(!html.includes("ep-editorial-v12"))
  failures.push(locale+"/capabilities missing corrected media layout");
 if(html.includes('class="ep-illustrations"')||html.includes('class="ep-technical-diagrams"'))
  failures.push(locale+"/capabilities still displays decorative/low-res images inside text blocks");
 if(!html.includes('class="ep-banner-image"'))
  failures.push(locale+"/capabilities missing dedicated original-ratio photo banner");
}

const awardManifest=JSON.parse(read("public/awards/manifest.json"));
const distinctMedals=Object.values(awardManifest);
if(distinctMedals.length!==13)failures.push("Expected 13 genuine cleaned source medal files, found "+distinctMedals.length);
for(const medal of distinctMedals){
 const path=join(root,"out",medal.asset.replace(/^\//,""));
 if(!existsSync(path))failures.push("Missing locally packaged transparent original medal: "+medal.asset);
 if(!medal.backgroundRemoved)failures.push("Medal still has scan background: "+medal.asset);
}
for(const [locale,slug] of [["vi","linhvuc"],["ru","activity"],["en","activity"]]){
 const path=join(root,"out",locale,"company",slug,"index.html");
 if(!existsSync(path)){failures.push("Missing industry scope: "+locale+"/"+slug);continue;}
 const html=read(path);
 if(!html.includes("scope-experience")||!html.includes("scope-group-items"))
  failures.push(locale+" activity page still renders a single unstructured paragraph");
 const paragraphs=(html.match(/class="scope-group-items"/g)||[]).length;
 if(paragraphs<3)failures.push(locale+" activity page missing content categories");
}
const achievementsUI=read("src/components/achievement-experience.tsx");
if(achievementsUI.includes("setPlaying")||achievementsUI.includes('className={"ac-play'))
 failures.push("Achievements still exposes a pointless start/autoplay button");
const awardsUI=read("src/components/awards-experience.tsx");
if(awardsUI.includes("MedalPlaceholder")||awardsUI.includes("aw-stage-halo"))
 failures.push("Awards still contains invented medal SVG or fake decorative halo");

for(const locale of ["vi","ru","en"]){
 const main=join(root,"out",locale,"index.html");
 if(!existsSync(main)){failures.push("Missing homepage for "+locale);continue;}
 const html=read(main);
 if(!html.includes("r-utility-signin")||!html.includes("r-utility-dropdown"))
  failures.push("Original employee bar and login icon missing on "+locale);
 for(const url of ["https://eoffice.vietsov.com.vn/","https://www.vietsov.com.vn/FlipBook/mobile/home.html","https://mail.vietsov.com.vn/","https://www.vietsov.com.vn/Pages/LichBay.aspx"]){
  if(!html.includes(url))failures.push("Original staff link not retained: "+locale+" "+url);
 }
 if(locale!=="ru"){
  const lines=(html.match(/class="r-hero-line"/g)||[]).length;
  if(lines!==2)failures.push("EN/VI hero must contain exactly two fixed lines: "+locale);
  if(locale==="en"&&(!html.includes("Offshore energy.")||!html.includes("Proven expertise.")))
   failures.push("English headline must have the approved word grouping");
 }
}
for(const [locale,slug] of [["vi","cacdanhhieu"],["ru","healthcare"],["en","healthcare"]]){
 const f=join(root,"out",locale,"company",slug,"index.html");
 if(!existsSync(f)){failures.push("No awards page for "+locale);continue;}
 const markup=read(f).split("</main>")[0];
 for(const klass of ["museum-stage-art","museum-stage-details","museum-album-rail","museum-album-image"]){
  if(!markup.includes(klass))failures.push("Award album layout missing "+klass+" in "+locale);
 }
 if(!markup.includes("/awards/"))failures.push("Award page has no real PNG references "+locale);
}
const v15css=read("src/app/studio-v15.css");
if(!v15css.includes(".museum-v15-modal-image img")||!v15css.includes("object-fit:contain!important"))
 failures.push("Award image enlargement must not crop medals");

const archive=JSON.parse(read("src/data/original-pages.json"));
if(archive.length<2300)failures.push(`Content archive unexpectedly small: ${archive.length}`);
if(failures.length){console.error(failures.join("\n"));process.exit(1);}
console.log("UI contracts: seven sections, VI/RU/EN, project routes, no source accordions.");
console.log(`Original content retained: ${archive.length} pages.`);
