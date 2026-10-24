import Link from "next/link";
import type {Locale} from "@/lib/original-content";
import UIIcon from "@/components/ui-icon";

/**
 * Staff quick-links from official Vietsovpetro's top navigation.
 * Public links and original SharePoint login URLs read from the official
 * homepage anchor hrefs on 2026-10-25. No guessed destinations.
 */
const links=[
 {id:"museum",label:"Phòng truyền thống VSP 3D",url:"https://3dscanning.vn/360/matterport/index.html"},
 {id:"mail",label:"Vietsovpetro Mail",url:"https://mail.vietsov.com.vn/"},
 {id:"certificate",label:"Vietsovpetro Certificate",url:"https://www.vietsov.com.vn/_layouts/15/download.aspx?SourceUrl=%2FDocuments%2FVietsovPetroRootCertificate%2Ecrt&FldUrl=&Source=http%3A%2F%2Fwww%2Evietsov%2Ecom%2Evn%2FDocuments%2FForms%2FAllItems%2Easpx%3FInitialTabId%3DRibbon%252EDocument%26VisibilityContext%3DWSSTabPersistence"},
 {id:"tenders",label:"Bán Hồ sơ mời thầu",url:"https://tender.vietsov.com.vn/"},
 {id:"flights",label:"Lịch Bay",url:"https://www.vietsov.com.vn/Pages/LichBay.aspx"},
 {id:"ships",label:"Lịch Tàu-DM hàng gửi đi CT",url:"https://www.vietsov.com.vn/LichTau/Forms/AllItems.aspx"},
 {id:"general-safety",label:"Thi an toàn chung",url:"https://ktat.vietsov.com.vn/"},
 {id:"electrical-safety",label:"Thi an toàn điện",url:"https://antoandien.vietsov.com.vn/vspatd/"},
 {id:"hotel",label:"Khách sạn Đà Lạt",url:"https://vietsovpetrohotel.com/"},
 {id:"resort",label:"Vietsovpetro Resort",url:"https://vietsovpetroresort.com/"},
 {id:"health-declare",label:"Khai báo y tế",url:"https://khaibaoyte.vietsov.com.vn/"},
 {id:"health-check",label:"Khám sức khỏe định kỳ",url:"https://khamsuckhoe.vietsov.com.vn/"},
 {id:"leave",label:"Đăng ký phép",url:"https://phep.vietsov.com.vn/"},
] as const;
const officialSignIn="https://www.vietsov.com.vn/_layouts/15/Authenticate.aspx?Source=%2FPages%2Fdefault%2Easpx";
const labels={
 vi:{signin:"Đăng nhập",handbook:"Cẩm nang văn hóa VSP",links:"Liên kết",contact:"Liên hệ",resources:"Hệ thống Vietsovpetro",original:"Chỉ có trên trang gốc"},
 ru:{signin:"Вход",handbook:"Корпоративная культура ВСП",links:"Ссылки",contact:"Контакты",resources:"Сервисы Вьетсовпетро",original:"На официальном сайте"},
 en:{signin:"Sign in",handbook:"VSP Culture Handbook",links:"Links",contact:"Contact",resources:"Vietsovpetro services",original:"On official site"}
} as const;
function LoginIcon(){
 return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M12 3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6"/>
 </svg>;
}
export default function EmployeeUtility({locale}:{locale:Locale}){
 const t=labels[locale];
 return <div className="r-utility">
   <div className="shell r-utility-inner">
    <a className="r-utility-signin" href={officialSignIn} target="_blank" rel="noopener noreferrer" aria-label={t.signin+": Vietsovpetro"}>
     <LoginIcon/><span>{t.signin}</span>
    </a>
    <nav className="r-utility-navigation" aria-label={t.resources}>
     <a className="r-utility-item r-utility-eoffice" href="https://eoffice.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">eOffice</a>
     <a className="r-utility-item r-utility-handbook" href="https://www.vietsov.com.vn/FlipBook/mobile/home.html" target="_blank" rel="noopener noreferrer">{t.handbook}</a>
     <details className="r-utility-dropdown">
      <summary className="r-utility-item">{t.links}<UIIcon name="chevron-down" size={15}/></summary>
      <div className="r-utility-panel">
       <div className="r-utility-panel-top">{t.resources}</div>
       <div className="r-utility-panel-grid">
        {links.map(item=><a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
         <span>{item.label}</span><UIIcon name="up-right" size={15}/>
        </a>)}
       </div>
      </div>
     </details>
     <Link className="r-utility-item r-utility-contact" href={"/"+locale+"/contact/"}>{t.contact}</Link>
    </nav>
   </div>
 </div>;
}
