import Link from "next/link";
import {notFound} from "next/navigation";
import PartnersDirectory from "@/components/partners-directory";
import {isLocale,locales} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

export const dynamicParams=false;
export function generateStaticParams(){return locales.map(locale=>({locale}));}
const heading={
 vi:"Đối tác - Khách hàng",
 ru:"Партнёры и заказчики",
 en:"Partners & Clients"
};
export default async function PartnersPage({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(!isLocale(locale))notFound();
 const m=messageSet(locale);
 return <main className="v-document v-partners-page"><div className="shell">
  <nav className="r-breadcrumb" aria-label="Breadcrumb">
    <Link href={`/${locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span>
    <Link href={`/${locale}/projects/`}>{m.nav.projects}</Link>
  </nav>
  <header className="v-document-header"><h1>{heading[locale]}</h1></header>
  <PartnersDirectory locale={locale}/>
 </div></main>;
}
