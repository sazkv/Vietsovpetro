import Link from "next/link";
import NewsArchive, {type ArchiveCategory} from "@/components/news-archive";
import PartnersDirectory from "@/components/partners-directory";
import ServiceIcon from "@/components/service-icon";
import SourceCopy from "@/components/source-copy";
import {ResourceIndex} from "@/components/resource-pages";
import {home, sectionIndex, sectionPages, type Locale, type Section} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";
import {displayTitle} from "@/lib/site-titles";
import {previewParagraphs} from "@/lib/present-content";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const contactLabels={
  vi:{office:"Liên doanh Vietsovpetro",address:"105 Lê Lợi, phường Vũng Tàu, Thành phố Hồ Chí Minh, Việt Nam",phone:"Điện thoại",fax:"Fax",mail:"Email",people:"Danh bạ liên hệ",ext:"Máy lẻ"},
  ru:{office:"Совместное предприятие «Вьетсовпетро»",address:"Вьетнам, Хошимин, квартал Вунгтау, улица Ле Лой, 105",phone:"Телефон",fax:"Факс",mail:"Почта",people:"Контактные лица",ext:"Добавочный"},
  en:{office:"Vietsovpetro Joint Venture",address:"105 Le Loi, Vung Tau Ward, Ho Chi Minh City, Vietnam",phone:"Phone",fax:"Fax",mail:"Email",people:"Contact directory",ext:"Extension"}
};
const people=[
 {name:"Vũ Mai Khanh",vi:"Tổng giám đốc",ru:"Генеральный директор",en:"General Director",ext:"2428",email:"khanhvm.pt@vietsov.com.vn"},
 {name:"Vũ Việt Kiều",vi:"Phó bí thư Đảng ủy",ru:"Заместитель секретаря парткома",en:"Deputy Party Committee Secretary",ext:"2556",email:"kieuvv.hq@vietsov.com.vn"},
 {name:"Hoàng Phúc Long",vi:"Chủ tịch Công đoàn",ru:"Председатель профсоюза",en:"Trade Union Chairman",ext:"2334",email:"longhp.se@vietsov.com.vn"},
 {name:"Hoàng Thanh Bình",vi:"Bí thư Đoàn Thanh niên",ru:"Секретарь молодёжной организации",en:"Youth Union Secretary",ext:"2035",email:"binhht.hq@vietsov.com.vn"},
 {name:"Nguyễn Thanh Tịnh",vi:"Phó Chủ tịch Hội Cựu chiến binh",ru:"Заместитель председателя совета ветеранов",en:"Deputy Veterans Association Chairman",ext:"3890",email:"tinhnt.at@vietsov.com.vn"},
 {name:"Đới Mạnh Cường",vi:"Chánh văn phòng",ru:"Руководитель администрации",en:"Head of Administration",ext:"5151",email:"cuongdm.hq@vietsov.com.vn"}
];
const projectNames={
 vi:"Các dự án đã hoàn thành",ru:"Реализованные проекты",en:"Completed projects"
};
function Directory({items,className=""}:{items:{route:string,title:string}[],className?:string}){
 return <nav className={`v-directory ${className}`.trim()}>
  {items.map((item,i)=><Link href={item.route} className="v-directory-row" key={item.route}>
    <span className="v-directory-number">{String(i+1).padStart(2,"0")}</span>
    <span className="v-directory-title">{item.title}</span>
    <span className="v-directory-arrow" aria-hidden="true">↗</span>
  </Link>)}
 </nav>;
}

export default function SourceSection({locale,section}:{locale:Locale,section:Section}){
 const m=messageSet(locale);
 const index=sectionIndex(locale,section);
 const children=sectionPages(locale,section).filter(p=>p.route!==`/${locale}/${section}/`);
 const title=m.nav[section];
 const companyFull=section==="company"?children.find(p=>/gioithieuct\.aspx/i.test(p.sourceUrl)):undefined;
 const groups:ArchiveCategory[]=section==="news"?home[locale].news.map((category,i)=>({
  label:category.title,items:children.filter(p=>p.slug.endsWith(`-${i+1}`))
   .sort((a,b)=>Number(b.slug.split("-")[1])-Number(a.slug.split("-")[1]))
   .map(p=>({title:p.title,route:p.route,date:p.date,image:p.images?.[0]}))
 })):[];
 const info=contactLabels[locale];
 return <main className={`v-section v-section--${section}`}>
  <div className="shell v-section-top">
    <nav className="r-breadcrumb" aria-label="Breadcrumb">
      <Link href={`/${locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><span>{title}</span>
    </nav>
    <h1>{title}</h1>
  </div>

  {section==="company"&&<div className="shell v-company-new">
    <div className="v-about-feature">
      <div className="v-about-intro">
        <h2>{locale==="vi"?"Liên doanh Vietsovpetro":locale==="ru"?"Вьетсовпетро":"Vietsovpetro Joint Venture"}</h2>
        {(companyFull?.html||index?.html)&&<SourceCopy html={previewParagraphs(companyFull?.html||index?.html||"",2)} title={title}/>}
      </div>
      <div className="v-about-photo"><img src={companyFull?.images?.[0]||index?.images?.[0]||`${base}/brand/hero-offshore-6.jpg`} alt="" loading="lazy"/></div>
    </div>
    {children.length>0&&<Directory items={children.map(p=>({route:p.route,title:displayTitle(p)}))} className="v-about-directory"/>}
  </div>}

  {section==="units"&&<div className="shell v-units">
    <div className="v-unit-grid">{children.map((unit,i)=><Link href={unit.route} key={unit.route} className="v-unit">
      <span className="v-unit-number">{String(i+1).padStart(2,"0")}</span>
      <h2>{displayTitle(unit)}</h2>
      <span className="v-unit-arrow" aria-hidden="true">↗</span>
    </Link>)}</div>
  </div>}

  {section==="projects"&&<div className="shell v-projects">
    <div className="v-projects-editorial">
      <div className="v-projects-photo"><img src={`${base}/brand/hero-offshore-2.jpg`} alt="" loading="lazy"/></div>
      <div className="v-projects-directory"><h2>{projectNames[locale]}</h2>
        <Directory items={home[locale].projects.map(item=>{const p=children.find(child=>child.route===item.href);return {title:p?displayTitle(p):item.title,route:item.href||`/${locale}/projects/`};})}/>
      </div>
    </div>
    <PartnersDirectory locale={locale} compact/>
  </div>}

  {section==="resources"&&<ResourceIndex locale={locale} page={index}/>}

  {section==="services"&&<div className="shell v-services">
    {home[locale].serviceIntro&&<p className="v-services-lead">{home[locale].serviceIntro}</p>}
    <div className="v-service-grid">
      {home[locale].services.map((item,i)=><div className="v-service" id={`service-${i+1}`} key={item.title}>
        <ServiceIcon index={i} className="v-service-icon"/>
        <div><span className="v-service-number">{String(i+1).padStart(2,"0")}</span><h2>{item.title}</h2></div>
      </div>)}
    </div>
  </div>}

  {section==="news"&&<div className="shell v-news"><NewsArchive categories={groups} locale={locale}/></div>}

  {section==="contact"&&<div className="shell v-contact">
    <div className="v-contact-main">
      <div className="v-contact-office">
        <h2>{info.office}</h2><address>{info.address}</address>
      </div>
      <div className="v-contact-ways">
        <a href="tel:+842543839871"><span>{info.phone}</span><strong>+84 254 3839 871</strong><span className="v-contact-link-arrow" aria-hidden="true">↗</span></a>
        <a href="mailto:vspadmin@vietsov.com.vn"><span>{info.mail}</span><strong>vspadmin@vietsov.com.vn</strong><span className="v-contact-link-arrow" aria-hidden="true">↗</span></a>
        <div><span>{info.fax}</span><strong>+84 254 3839 857</strong></div>
      </div>
    </div>
    <h2 className="v-contact-title">{info.people}</h2>
    <div className="v-contact-people">{people.map(person=><div className="v-contact-person" key={person.email}>
      <h3>{person.name}</h3><p>{person[locale]}</p>
      <div><a href={`mailto:${person.email}`}>{person.email} ↗</a><span>{info.ext}: {person.ext}</span></div>
    </div>)}</div>
  </div>}

  {!["company","units","projects","resources","services","news","contact"].includes(section)&&<div className="shell v-generic">
    {index?.html&&<SourceCopy html={index.html} title={index.title}/>}
    {children.length>0&&<Directory items={children.map(p=>({route:p.route,title:displayTitle(p)}))} className="v-generic-index"/>}
  </div>}
 </main>;
}
