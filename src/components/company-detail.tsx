import SourceCopy from "@/components/source-copy";
import {parseHistory,parseAwards,parseAchievements} from "@/lib/structured-content";
import HistoryExperience from "@/components/history-experience";
import AchievementExperience from "@/components/achievement-experience";
import AwardsExperience from "@/components/awards-experience";
import CompanyEditorial from "@/components/company-editorial";
import OrganizationExperience from "@/components/organization-experience";
import ArchivalGallery from "@/components/archival-gallery";
import {type SourcePage} from "@/lib/original-content";
import {displayTitle} from "@/lib/site-titles";

/**
 * Original import uses distinct slugs in VI vs RU/EN.
 * Route all three localized source pages to the SAME finished experiences.
 * Never fall back to raw source HTML for core company showcase pages.
 */
const interactiveSlugs={
 history:new Set(["lichsuhinhthanh","significant"]),
 awards:new Set(["cacdanhhieu","healthcare"]),
 achievements:new Set(["nhungthanhtuu","environment"]),
 organization:new Set(["cocau","organization"]),
 archive:new Set(["hinhanh","image"]),
 editorial:new Set(["gioithieuct","introduction","antoanskmt","safety","tiemnang","community","linhvuc","activity"])
};

export default function CompanyDetail({page}:{page:SourcePage}){
 const {locale,slug,html}=page;
 const key=slug.toLowerCase();
 if(interactiveSlugs.history.has(key)){
   const events=parseHistory(html);
   return events.length?<HistoryExperience locale={locale} events={events}/>:<div className="v-source-empty">{displayTitle(page)}</div>;
 }
 if(interactiveSlugs.awards.has(key)){
   const awards=parseAwards(html);
   return awards.length?<AwardsExperience locale={locale} items={awards}/>:<div className="v-source-empty">{displayTitle(page)}</div>;
 }
 if(interactiveSlugs.achievements.has(key)){
   const achievements=parseAchievements(html);
   return achievements.length?<AchievementExperience locale={locale} items={achievements}/>:<div className="v-source-empty">{displayTitle(page)}</div>;
 }
 if(interactiveSlugs.organization.has(key))return <OrganizationExperience locale={locale}/>;
 if(interactiveSlugs.archive.has(key)){
   const originals=Array.from({length:20},(_,i)=>
     `https://www.vietsov.com.vn/_catalogs/masterpage/vietsov/assets/images/hinhanhtulieu/${i+1}.jpg`);
   return <ArchivalGallery images={page.images?.length?page.images:originals} locale={locale}/>;
 }
 if(interactiveSlugs.editorial.has(key))return <CompanyEditorial page={page}/>;
 // Preserve other legacy company articles without inventing replacement content.
 return <article className="v-company-prose v-company-prose--text">
   <div className="v-company-prose-content">
     <SourceCopy html={html} title={displayTitle(page)}/>
   </div>
 </article>;
}
