import {groups,allContent,serviceLinks} from "../src/lib/site-map.ts";
const errors=[];const groupKeys=new Set();
for(const group of groups){if(groupKeys.has(group.slug))errors.push("duplicate group "+group.slug);groupKeys.add(group.slug);const seen=new Set();for(const item of group.items){if(seen.has(item.slug))errors.push("duplicate page "+group.slug+"/"+item.slug);seen.add(item.slug);if(!item.vi||!item.en)errors.push("missing label "+item.slug);if(!item.source?.startsWith("https://"))errors.push("bad source "+group.slug+"/"+item.slug);if(!["index-only","verified-page"].includes(item.status))errors.push("bad status "+group.slug+"/"+item.slug)}}
if(groups.find(g=>g.slug==="services")?.items.length!==15)errors.push("services must include 15 published categories");
if(groups.find(g=>g.slug==="company")?.items.length!==11)errors.push("company should include 11 mapped sections");
if(!serviceLinks.length)errors.push("no external systems");
console.log("Groups:",groups.length,"Mapped page records:",allContent.length,"External links:",serviceLinks.length);
if(errors.length){console.error(errors.join("\n"));process.exitCode=1}else console.log("Content structure checks passed.");
