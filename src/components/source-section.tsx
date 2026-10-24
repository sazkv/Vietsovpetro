import Link from "next/link";
import NewsArchive, {type ArchiveCategory} from "@/components/news-archive";
import ServiceIcon from "@/components/service-icon";
import SourceCopy from "@/components/source-copy";
import {home,sectionIndex,sectionPages,type Locale,type Section} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

const base=process.env.NEXT_PUBLIC_BASE_PATH||"";
const contactLabels={
 vi:{office:"Trụ sở Vietsovpetro",address:"105 Lê Lợi, phường Vũng Tàu, Thành phố Hồ Chí Minh, Việt Nam",phone:"Điện thoại",fax:"Fax",mail:"Email",leadership:"Danh bạ liên hệ",ext:"Máy lẻ",original:"Thông tin trên trang gốc",info:"Địa chỉ và liên hệ"},
 ru:{office:"Головной офис Вьетсовпетро",address:"Вьетнам, Хошимин, квартал Вунгтау, улица Ле Лой, 105",phone:"Телефон",fax:"Факс",mail:"Почта",leadership:"Контактные лица",ext:"Добавочный",original:"Исходная контактная информация",info:"Контактная информация"},
 en:{office:"Vietsovpetro headquarters",address:"105 Le Loi, Vung Tau Ward, Ho Chi Minh City, Vietnam",phone:"Phone",fax:"Fax",mail:"Email",leadership:"Contact directory",ext:"Extension",original:"Original contact directory",info:"Contact information"}
};
const contacts=[
 {name:"Vũ Mai Khanh",vi:"Tổng giám đốc",ru:"Генеральный директор",en:"General Director",ext:"2428",email:"khanhvm.pt@vietsov.com.vn"},
 {name:"Vũ Việt Kiều",vi:"Phó bí thư Đảng ủy",ru:"Заместитель секретаря парткома",en:"Deputy Party Committee Secretary",ext:"2556",email:"kieuvv.hq@vietsov.com.vn"},
 {name:"Hoàng Phúc Long",vi:"Chủ tịch Công đoàn",ru:"Председатель профсоюза",en:"Trade Union Chairman",ext:"2334",email:"longhp.se@vietsov.com.vn"},
 {name:"Hoàng Thanh Bình",vi:"Bí thư Đoàn Thanh niên",ru:"Секретарь молодёжной организации",en:"Youth Union Secretary",ext:"2035",email:"binhht.hq@vietsov.com.vn"},
 {name:"Nguyễn Thanh Tịnh",vi:"Phó Chủ tịch Hội Cựu chiến binh",ru:"Заместитель председателя совета ветеранов",en:"Deputy Veterans Association Chairman",ext:"3890",email:"tinhnt.at@vietsov.com.vn"},
 {name:"Đới Mạnh Cường",vi:"Chánh văn phòng",ru:"Руководитель администрации",en:"Head of Administration",ext:"5151",email:"cuongdm.hq@vietsov.com.vn"}
];
const sectionHeading=(locale:Locale,section:Section)=>{
 const a={vi:{company:"Liên doanh Vietsovpetro",projects:"Các dự án đã hoàn thành",units:"Đơn vị trực thuộc"},ru:{company:"Вьетсовпетро",projects:"Реализованные проекты",units:"Подразделения"},en:{company:"Vietsovpetro",projects:"Completed projects",units:"Operating units"}};
 return (section==="company"||section==="projects"||section==="units")?a[locale][section]:undefined;
};
function SourceLinks({locale,section,children}:{locale:Locale,section:Section,children:{route:string,title:string}[]}){
 return <nav className="r-directory-links" aria-label={section}>
  {children.map((item,i)=><Link href={item.route} key={item.route} className="r-directory-link"><span className="r-number">{String(i+1).padStart(2,"0")}</span><span>{item.title}</span><span className="r-arrow" aria-hidden="true">↗</span></Link>)}
 </nav>;
}
export default function SourceSection({locale,section}:{locale:Locale;section:Section}){
 const m=messageSet(locale);
 const index=sectionIndex(locale,section);
 const children=sectionPages(locale,section).filter(p=>p.route!==`/${locale}/${section}/`);
 const title=m.nav[section];
 const isNews=section==="news";
 const isServices=section==="services";
 const isUnits=section==="units";
 const isProjects=section==="projects";
 const isCompany=section==="company";
 const isContact=section==="contact";
 const groups:ArchiveCategory[]=isNews?home[locale].news.map((category,i)=>({
  label:category.title,items:children.filter(p=>p.slug.endsWith(`-${i+1}`)).sort((a,b)=>Number(b.slug.split("-")[1])-Number(a.slug.split("-")[1])).map(p=>({title:p.title,route:p.route,date:p.date,image:p.images?.[0]}))
 })):[];
 const info=contactLabels[locale];
 return <main className={`r-section r-section--${section}`}>
  <div className="shell">
    <nav className="r-breadcrumb" aria-label="Breadcrumb"><Link href={`/${locale}/`}>{m.nav.home}</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
    <header className="r-page-title"><h1>{title}</h1></header>
  </div>

  {isNews&&<div className="shell r-section-body"><NewsArchive categories={groups} locale={locale}/></div>}

  {isServices&&<div className="shell r-section-body">
    <p className="r-service-intro">{home[locale].serviceIntro}</p>
    <div className="r-service-grid">
     {home[locale].services.map((item,i)=><article className="r-service-card" id={`service-${i+1}`} key={item.title}>
        <div className="r-service-icon"><ServiceIcon index={i}/></div>
        <div className="r-service-card-bottom"><span className="r-number">{String(i+1).padStart(2,"0")}</span><h2>{item.title}</h2></div>
      </article>)}
    </div>
    {index?.html&&<details className="r-source-details"><summary>{m.page.contents}<span aria-hidden="true">＋</span></summary><div className="r-source-details-body"><SourceCopy html={index.html}/></div></details>}
   </div>}

  {isProjects&&<div className="shell r-section-body">
    <div className="r-project-layout">
      <div className="r-project-visual"><img src={`${base}/brand/hero-offshore-2.jpg`} loading="lazy" alt=""/></div>
      <div className="r-project-index">
        <h2>{sectionHeading(locale,section)}</h2>
        <SourceLinks locale={locale} section={section} children={children}/>
      </div>
    </div>
    {index?.html&&<div className="r-source-bottom"><SourceCopy html={index.html}/></div>}
  </div>}

  {isUnits&&<div className="shell r-section-body">
    <div className="r-unit-directory">
      {children.map((item,i)=><Link href={item.route} key={item.route} className="r-unit-item">
        <span className="r-unit-id">{String(i+1).padStart(2,"0")}</span><h2>{item.title}</h2><span className="r-unit-arrow" aria-hidden="true">↗</span>
      </Link>)}
    </div>
    {index?.html&&<div className="r-source-bottom"><SourceCopy html={index.html}/></div>}
  </div>}

  {isCompany&&<div className="shell r-section-body">
    <div className="r-company-overview">
      <div className="r-company-photo"><img src={`${base}/brand/hero-offshore-6.jpg`} alt="" loading="lazy"/></div>
      <div className="r-company-copy">{index?.html?<SourceCopy html={index.html}/>:<h2>{sectionHeading(locale,section)}</h2>}</div>
    </div>
    <SourceLinks locale={locale} section={section} children={children}/>
  </div>}

  {isContact&&<div className="shell r-section-body">
    <div className="r-contact-hero">
      <div className="r-contact-address">
        <h2>{info.office}</h2>
        <address>{info.address}</address>
      </div>
      <div className="r-contact-actions">
        <a href="tel:+842543839871"><span>{info.phone}</span><strong>+84 254 3839 871</strong><span aria-hidden="true">↗</span></a>
        <a href="mailto:vspadmin@vietsov.com.vn"><span>{info.mail}</span><strong>vspadmin@vietsov.com.vn</strong><span aria-hidden="true">↗</span></a>
        <div><span>{info.fax}</span><strong>+84 254 3839 857</strong></div>
      </div>
    </div>
    <h2 className="r-contact-heading">{info.leadership}</h2>
    <div className="r-contact-directory">{contacts.map((person,i)=><article className="r-contact-person" key={person.email}>
      <span className="r-contact-index">{String(i+1).padStart(2,"0")}</span>
      <h3>{person.name}</h3>
      <p>{person[locale]}</p>
      <div><a href={`mailto:${person.email}`}>{person.email} ↗</a><span>{info.ext}: {person.ext}</span></div>
    </article>)}</div>
    {index?.html&&<details className="r-source-details"><summary>{info.original}<span aria-hidden="true">＋</span></summary><div className="r-source-details-body"><SourceCopy html={index.html}/></div></details>}
  </div>}

  {!isNews&&!isServices&&!isUnits&&!isProjects&&!isCompany&&!isContact&&<div className="shell r-section-body r-general-section">
    {index?.html&&<div className="r-original-overview"><SourceCopy html={index.html}/></div>}
    {children.length>0&&<SourceLinks locale={locale} section={section} children={children}/>}
  </div>}
 </main>;
}
