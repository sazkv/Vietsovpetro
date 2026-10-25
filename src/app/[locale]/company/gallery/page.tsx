import Link from "next/link";
import {notFound} from "next/navigation";
import ArchivalGallery from "@/components/archival-gallery";
import {isLocale,locales} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export const dynamicParams=false;
export function generateStaticParams(){return locales.map(locale=>({locale}));}
const title={
 vi:"Hình ảnh tư liệu",
 ru:"Фотоархив",
 en:"Photo archive"
};
const photos=Array.from({length:20},(_,i)=>
 `https://www.vietsov.com.vn/_catalogs/masterpage/vietsov/assets/images/hinhanhtulieu/${i+1}.jpg`);
export default async function GalleryPage({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(!isLocale(locale))notFound();
 const m=messageSet(locale);
 return <main className="v-document v-document--company v-document--archival">
   <nav className="r-breadcrumb ar-breadcrumb" aria-label="Breadcrumb">
     <Link href={`/${locale}/`}>{m.nav.home}</Link>
     <span aria-hidden="true">/</span>
     <Link href={`/${locale}/company/`}>{m.nav.company}</Link>
   </nav>
   <h1 className="ar-accessible-h1">{title[locale]}</h1>
   <ArchivalGallery images={photos} locale={locale}/>
 </main>;
}
