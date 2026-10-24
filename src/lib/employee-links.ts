import type {Locale} from "@/lib/original-content";

/** Official Vietsovpetro employee links, sourced from www.vietsov.com.vn. */
export const employeeNavigation={
 signIn:"https://www.vietsov.com.vn/_layouts/15/Authenticate.aspx?Source=%2FPages%2Fdefault.aspx",
 eoffice:"https://eoffice.vietsov.com.vn/",
 handbook:"https://www.vietsov.com.vn/FlipBook/mobile/home.html"
} as const;

type Labels=Record<Locale,string>;
type Resource={label:Labels;href:string};
export const employeeResources:Resource[]=[
 {label:{vi:"Giới thiệu phòng truyền thống VSP 3D",ru:"3D-музей Vietsovpetro",en:"Vietsovpetro 3D museum"},href:"https://3dscanning.vn/360/matterport/index.html"},
 {label:{vi:"Vietsovpetro Mail",ru:"Корпоративная почта",en:"Vietsovpetro Mail"},href:"https://mail.vietsov.com.vn/"},
 {label:{vi:"Vietsovpetro Certificate",ru:"Сертификат Vietsovpetro",en:"Vietsovpetro Certificate"},href:"https://www.vietsov.com.vn/_layouts/15/download.aspx?FldUrl=&Source=http%3A%2F%2Fwww.vietsov.com.vn%2FDocuments%2FForms%2FAllItems.aspx%3FInitialTabId%3DRibbon%252EDocument%26VisibilityContext%3DWSSTabPersistence&SourceUrl=%2FDocuments%2FVietsovPetroRootCertificate.crt"},
 {label:{vi:"Bán Hồ sơ mời thầu",ru:"Тендерная площадка",en:"Tender documents"},href:"https://tender.vietsov.com.vn/"},
 {label:{vi:"Lịch Bay",ru:"Расписание авиарейсов",en:"Flight schedule"},href:"https://www.vietsov.com.vn/Pages/LichBay.aspx"},
 {label:{vi:"Lịch Tàu-DM hàng gửi đi CT",ru:"Расписание судов и отправок",en:"Vessel and cargo schedule"},href:"https://www.vietsov.com.vn/LichTau/Forms/AllItems.aspx"},
 {label:{vi:"Thi an toàn chung",ru:"Экзамен по общей безопасности",en:"General safety examination"},href:"https://ktat.vietsov.com.vn/"},
 {label:{vi:"Thi an toàn điện",ru:"Экзамен по электробезопасности",en:"Electrical safety examination"},href:"https://antoandien.vietsov.com.vn/vspatd/"},
 {label:{vi:"Khách sạn Đà Lạt",ru:"Отель Vietsovpetro в Далате",en:"Vietsovpetro Da Lat Hotel"},href:"https://vietsovpetrohotel.com/"},
 {label:{vi:"VietsovPetro Resort",ru:"Курорт Vietsovpetro",en:"Vietsovpetro Resort"},href:"https://vietsovpetroresort.com/"},
 {label:{vi:"Khai báo y tế",ru:"Медицинская декларация",en:"Health declaration"},href:"https://khaibaoyte.vietsov.com.vn/"},
 {label:{vi:"Khám sức khỏe định kỳ",ru:"Периодический медосмотр",en:"Periodic health examination"},href:"https://khamsuckhoe.vietsov.com.vn/"},
 {label:{vi:"Đăng ký phép",ru:"Оформление отпуска",en:"Leave application"},href:"https://phep.vietsov.com.vn/"}
];
export const employeeLabels:Record<Locale,{signIn:string;handbook:string;shortHandbook:string;resources:string}>={
 vi:{signIn:"Đăng nhập",handbook:"Cẩm nang văn hóa Vietsovpetro",shortHandbook:"Cẩm nang văn hóa",resources:"Liên kết"},
 ru:{signIn:"Вход",handbook:"Справочник по корпоративной культуре ВСП",shortHandbook:"Корпоративная культура",resources:"Ссылки"},
 en:{signIn:"Sign in",handbook:"Vietsovpetro culture handbook",shortHandbook:"Culture handbook",resources:"Resources"}
};
