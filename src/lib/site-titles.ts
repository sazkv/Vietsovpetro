import {home,type Locale,type SourcePage} from "@/lib/original-content";

const companyTitles:Record<Locale,Record<string,string>>={
 vi:{
  cocau:"Cơ cấu tổ chức",lichsuhinhthanh:"Lịch sử hình thành",
  antoanskmt:"An toàn - Sức khỏe - Môi trường",gioithieuct:"Tổng quan Vietsovpetro",
  tiemnang:"Năng lực hoạt động",cacdanhhieu:"Các danh hiệu",
  linhvuc:"Lĩnh vực hoạt động",lanhdao:"Ban lãnh đạo",
  nhungthanhtuu:"Thành tựu nổi bật"
 },
 ru:{
  cocau:"Организационная структура",lichsuhinhthanh:"История предприятия",
  antoanskmt:"Охрана труда, здоровье и экология",gioithieuct:"О предприятии",
  tiemnang:"Производственные возможности",cacdanhhieu:"Награды и звания",
  linhvuc:"Направления деятельности",lanhdao:"Руководство",
  nhungthanhtuu:"Достижения"
 },
 en:{
  cocau:"Organization",lichsuhinhthanh:"Company history",
  antoanskmt:"Health, Safety & Environment",gioithieuct:"Company overview",
  tiemnang:"Capabilities",cacdanhhieu:"Awards",
  linhvuc:"Areas of operation",lanhdao:"Leadership",
  nhungthanhtuu:"Achievements"
 }
};

export function displayTitle(page:SourcePage):string{
 const slug=page.slug.trim().toLowerCase();
 if(page.section==="company" && companyTitles[page.locale][slug])
  return companyTitles[page.locale][slug];
 if(page.section==="projects"){
  const entry=home[page.locale].projects.find(project=>project.href?.replace(/\/$/,"")===page.route.replace(/\/$/,""));
  if(entry){
   // The original archive contains spelling and casing inconsistencies.
   if(page.locale==="vi"&&slug==="khoithuongtang")return "Dự án lắp đặt khối thượng tầng";
   if(page.locale==="vi"&&slug==="ctkt")return "Dự án thiết kế, mua sắm, xây dựng và lắp đặt (EPCI)";
   return entry.title.trim().replace(/[\u200b-\u200d\ufeff]/g,"").replace(/\s+/g," ");
  }
 }
 if(page.locale==="vi"&&page.section==="pages"){
  const known:Record<string,string>={vmk:"Vũ Mai Khanh",yako:"Yakovenko E.V.",lqd:"Lương Quốc Dân"};
  if(known[slug])return known[slug];
 }
 return page.title.replace(/[\u200b-\u200d\ufeff]/g,"").replace(/\s+/g," ").trim();
}
