/**
 * Source-mapped information architecture.
 * "verified-page": direct source URL inspected.
 * "index-only": subsection identified on an index, exact detail URL not yet captured.
 * No page with index-only state should be described as migrated.
 */
export type ContentItem={slug:string;vi:string;en:string;source:string;summary:string;status:"verified-page"|"index-only";date?:string};
export type Group={slug:string;vi:string;en:string;intro:string;source:string;items:ContentItem[]};
const root="https://www.vietsov.com.vn";
const p=(name:string)=>root+"/Pages/"+name+".aspx";
const lines=(raw:string,defaultSource:string):ContentItem[]=>
 raw.trim().split("\n").map(row=>{const [slug,vi,en,source,summary,date]=row.split("|").map(s=>s.trim());return {slug,vi,en,source:source||defaultSource,summary:summary||"Nội dung gốc đang được đối chiếu để chuyển đầy đủ sang bản thiết kế mới.",status:source?"verified-page" as const:"index-only" as const,...(date?{date}:{})}});
export const groups:Group[]=[
{slug:"company",vi:"Giới thiệu",en:"Company",intro:"Lịch sử, tổ chức, lãnh đạo, hoạt động, thành tựu và thông tin môi trường của Liên doanh Việt – Nga Vietsovpetro.",source:p("GioiThieuCT"),items:lines(`
overview|Tổng quan Vietsovpetro|Company overview|https://www.vietsov.com.vn/Pages/GioiThieuCT.aspx|Liên doanh được thành lập năm 1981, hoạt động trong lĩnh vực tìm kiếm, thăm dò và khai thác dầu khí.
history|Lịch sử hình thành|History & milestones|https://www.vietsov.com.vn/Pages/lichsuhinhthanh.aspx|Các mốc phát triển từ năm 1981 đến 2021 trên trang gốc.
structure|Cơ cấu tổ chức|Organizational structure|https://www.vietsov.com.vn/Pages/CoCau.aspx|Bộ máy điều hành, các phòng ban và đơn vị trực thuộc.
leadership|Ban lãnh đạo|Leadership|https://www.vietsov.com.vn/Pages/lanhdao.aspx|Thông tin ban lãnh đạo trên website chính thức.
activities|Lĩnh vực hoạt động|Fields of operation|https://www.vietsov.com.vn/Pages/LinhVuc.aspx|Các lĩnh vực hoạt động của liên doanh.
capacity|Năng lực hoạt động|Operational capabilities|https://www.vietsov.com.vn/Pages/TiemNang.aspx|Năng lực kỹ thuật và sản xuất.
achievements|Thành tựu nổi bật|Key achievements|https://www.vietsov.com.vn/Pages/NhungThanhTuu.aspx|Các thành tựu và dấu mốc của doanh nghiệp.
awards|Các danh hiệu|Awards & recognition|https://www.vietsov.com.vn/Pages/cacDanhHieu.aspx|Danh hiệu và bằng khen được công bố.
archive|Hình ảnh tư liệu|Photo archive||Kho hình ảnh tư liệu lịch sử.
hse|An toàn – Sức khỏe – Môi trường|HSE|https://www.vietsov.com.vn/Pages/AnToanSKMT.aspx|Chính sách và hoạt động an toàn, sức khỏe, môi trường.
environment|Thông tin môi trường|Environmental information||Thông tin công khai về môi trường.
`,p("GioiThieuCT"))},
{slug:"units",vi:"Đơn vị trực thuộc",en:"Operating units",intro:"Danh mục 16 đơn vị được xác định từ các trang thông tin đơn vị trực thuộc. Hồ sơ giới thiệu nói đến 18 đơn vị; cần đối chiếu 2 đơn vị chưa xác định.",source:p("DVTV"),items:lines(`
oil-production|Xí nghiệp Khai thác Dầu khí|Oil production division|https://www.vietsov.com.vn/Pages/xnkt.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
construction|Xí nghiệp Xây lắp, Khảo sát và Sửa chữa công trình dầu khí|Offshore construction division|https://www.vietsov.com.vn/Pages/xnxl.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
marine-diving|Xí nghiệp Vận tải biển và Công tác lặn|Marine transport & diving division|https://www.vietsov.com.vn/Pages/xnvtb.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
research-design|Viện Nghiên cứu Khoa học và Thiết kế Dầu khí biển|Research & design institute|https://www.vietsov.com.vn/Pages/vien.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
well-logging|Xí nghiệp Địa vật lý Giếng khoan|Well logging division|https://www.vietsov.com.vn/Pages/xndvl.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
electro-mechanical|Xí nghiệp Cơ điện|Electro-mechanical division|https://www.vietsov.com.vn/Pages/xncd.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
drilling|Xí nghiệp Khoan và Sửa giếng|Drilling and well repair division|https://www.vietsov.com.vn/Pages/xnkhoan.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
gas-facilities|Xí nghiệp Khai thác các Công trình khí|Gas facilities division|https://www.vietsov.com.vn/Pages/xnk.aspx|Thông tin chi tiết từ website đơn vị khí.
port-supply|Xí nghiệp Dịch vụ cảng và Cung ứng vật tư thiết bị|Port & supply division|https://www.vietsov.com.vn/Pages/xndvc.aspx|Thông tin từ website của đơn vị.
safety-environment|Trung tâm An toàn và Bảo vệ môi trường|Safety & environment centre|https://www.vietsov.com.vn/Pages/ttat.aspx|Website của trung tâm.
medical|Trung tâm Y tế|Medical centre|https://www.vietsov.com.vn/Pages/ttyt.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
it-communications|Trung tâm Công nghệ Thông tin và Liên lạc|IT & communications centre|https://www.vietsov.com.vn/Pages/cntt.aspx|Trang thông tin chính thức của đơn vị trực thuộc.
resort|Khu nghỉ dưỡng Vietsovpetro|Vietsovpetro Resort|https://www.vietsov.com.vn/Pages/nghiduong.aspx|Thông tin về cơ sở nghỉ dưỡng.
hotel|Khách sạn Vietsovpetro|Vietsovpetro Hotel|https://www.vietsov.com.vn/Pages/khachsan.aspx|Thông tin khách sạn và các dịch vụ lưu trú.
security|Đội Bảo vệ vũ trang|Armed protection team|https://www.vietsov.com.vn/Pages/bvvt.aspx|Thông tin về đội bảo vệ của đơn vị.
housing|Ban Đời sống nhà ở và Văn phòng làm việc|Housing and office administration|https://www.vietsov.com.vn/Pages/dsno.aspx|Thông tin về cơ sở vật chất, nhà ở và văn phòng.
`,p("DVTV"))},
{slug:"services",vi:"Sản phẩm – Dịch vụ",en:"Products & services",intro:"Đầy đủ 15 nhóm dịch vụ từ danh mục hiện tại, без сокращения категорий.",source:p("SanPhamDV"),items:lines(`
offshore-design|Thiết kế các công trình dầu khí biển|Offshore facility design
exploration|Nghiên cứu thăm dò và khai thác mỏ|Exploration and field development
field-operations|Điều hành khai thác mỏ|Field operations
marine-diving|Dịch vụ vận tải biển và công tác lặn|Marine transport and diving
drilling-logging|Khoan, sửa chữa và đo địa vật lý các giếng khoan dầu khí|Drilling, repair and well logging
operations-maintenance|Vận hành, sửa chữa và bảo dưỡng công trình dầu khí, thiết bị năng lượng|Operations & maintenance
training-languages|Đào tạo nâng bậc thợ và ngoại ngữ Nga – Anh|Technical and language training
gas-compression|Thu gom, vận chuyển khí; vận hành và bảo dưỡng giàn nén khí|Gas gathering and compression
epci|Xây lắp (EPCI), khảo sát và sửa chữa công trình khai thác dầu khí|Offshore EPCI services
port-equipment|Dịch vụ cảng và cung ứng vật tư thiết bị|Port services and materials|https://port.vietsov.com.vn/|Dịch vụ cảng, logistics và vật tư thiết bị.
oil-spill|Phòng, chống và thu gom dầu tràn|Oil spill response
it-telecom|Công nghệ thông tin và liên lạc|Information technology & communications
laboratory|Phân tích thí nghiệm|Laboratory analysis
healthcare|Dịch vụ kiểm tra sức khỏe, khám chữa bệnh|Healthcare services
heavy-transport|Vận tải ô tô, vận tải siêu trường siêu trọng|Road and heavy-haul transport
`,p("SanPhamDV"))},
{slug:"projects",vi:"Dự án – Đối tác",en:"Projects & partners",intro:"Phân nhóm dự án theo cách công bố của Vietsovpetro: thăm dò, vận hành mỏ, EPCI, chân đế, khối thượng tầng; đồng thời giữ danh mục đối tác.",source:p("DuAn"),items:lines(`
exploration-production|Dự án nghiên cứu thăm dò – khai thác dầu khí|Exploration & production projects|https://www.vietsov.com.vn/Pages/Nghiencuuthamdo.aspx
field-operation|Dự án điều hành khai thác mỏ|Field operation projects|https://www.vietsov.com.vn/Pages/DieuHanhKhaiThac.aspx
epci|Dự án thiết kế, mua sắm, xây dựng, lắp đặt (EPCI)|EPCI projects|https://www.vietsov.com.vn/Pages/CTKT.aspx
jackets|Dự án lắp đặt chân đế|Jacket installation projects|https://www.vietsov.com.vn/Pages/LapDatChanDe.aspx
topsides|Dự án lắp đặt khối thượng tầng|Topside installation projects|https://www.vietsov.com.vn/Pages/KhoiThuongTang.aspx
partners|Các đối tác tiêu biểu|Key partners
`,p("DuAn"))},
{slug:"resources",vi:"Nguồn lực",en:"Resources",intro:"Nguồn nhân lực, cơ sở vật chất và năng lực tài chính. Số liệu lịch sử cần được đối chiếu với nội dung mới nhất.",source:p("nguonnhanluc"),items:lines(`
human-resources|Nguồn nhân lực|Human resources|https://www.vietsov.com.vn/Pages/nguonnhanluc.aspx|Nguồn nhân lực và cơ cấu chuyên môn.
facilities|Cơ sở vật chất|Facilities & equipment|https://www.vietsov.com.vn/Pages/cosovatchat.aspx|Giàn khoan, công trình khai thác, khí, phương tiện và cơ sở hỗ trợ.
financial|Năng lực tài chính|Financial capabilities||Thông tin tài chính được nêu tại hệ thống nguồn lực gốc.
`,p("nguonnhanluc"))},
{slug:"news",vi:"Tin tức – Sự kiện",en:"News & events",intro:"Tin hoạt động sản xuất, công tác đào tạo, dự án và các chuyên mục khác; bài viết phải giữ nguyên ngày và đường dẫn gốc.",source:p("TinTuc"),items:lines(`
management-training-2026|Bế giảng chương trình đào tạo nâng cao năng lực quản lý cấp cơ sở|Management training programme|https://www.vietsov.com.vn/Pages/Details.aspx?c=2&itemid=2115|Chương trình nâng cao năng lực quản lý cho đội ngũ quản lý cấp cơ sở.|19/10/2026
kpi-preparation-2026|Tiếp tục chuẩn bị triển khai hệ thống KPI tại Bộ máy Điều hành|KPI implementation preparation|https://www.vietsov.com.vn/Pages/Details.aspx?c=2&itemid=2114|Thông tin về quá trình chuẩn bị triển khai hệ thống KPI.|05/10/2026
bk24-2025|Khánh thành giàn đầu giếng BK-24|BK-24 platform inauguration|https://www.vietsov.com.vn/pages/Details.aspx?c=3&itemid=2058|Thông tin về dự án BK-24 tại mỏ Bạch Hổ.|08/11/2025
`,p("TinTuc"))},
{slug:"careers",vi:"Tuyển dụng – Đào tạo",en:"Careers & education",intro:"Đường dẫn tuyển dụng, tuyển sinh tại Liên bang Nga và hệ thống đào tạo hiện có. Không thu thập hồ sơ ứng tuyển trong concept.",source:p("tuyendung"),items:lines(`
recruitment|Tuyển dụng|Recruitment|https://www.vietsov.com.vn/Pages/tuyendung.aspx|Thông báo tuyển dụng theo nguồn chính thức, cần xác minh hạn nộp.
admissions|Tuyển sinh đào tạo tại LB Nga|Admissions for training in Russia|https://www.vietsov.com.vn/TuyenSinh1/index.html|Cổng thông tin tuyển sinh.
training-platform|Hệ thống đào tạo|Training system|https://daotao.vietsov.com.vn/|Hệ thống hiện có, giữ liên kết chính thức.
`,p("tuyendung"))},
{slug:"contact",vi:"Liên hệ",en:"Contact",intro:"Thông tin liên hệ, văn phòng, các đơn vị và hệ thống công tác. Mọi kênh chính thức vẫn thuộc Vietsovpetro.",source:p("lienhe"),items:lines(`
head-office|Văn phòng liên doanh|Head office|https://www.vietsov.com.vn/Pages/lienhe.aspx|105 Lê Lợi, phường Vũng Tàu, TP. Hồ Chí Minh. Điện thoại +84 254 3839 871.
management-office|Ban lãnh đạo và văn phòng|Management & administration|https://www.vietsov.com.vn/Pages/lienhe.aspx|Thông tin liên lạc đã công bố.
port-contacts|Liên hệ dịch vụ cảng|Port service enquiries|https://port.vietsov.com.vn/|Thông tin thương mại, dịch vụ cảng.
`,p("lienhe"))}
];
export const groupBySlug=Object.fromEntries(groups.map(g=>[g.slug,g])) as Record<string,Group>;
export const allContent=groups.flatMap(g=>g.items.map(item=>({...item,group:g.slug,groupTitle:g.vi})));
export const serviceLinks=[
{label:"eOffice",url:"https://eoffice.vietsov.com.vn/"},
{label:"Cẩm nang văn hóa Vietsovpetro",url:"https://www.vietsov.com.vn/FlipBook/mobile/home.html"},
{label:"Virtual heritage room (3D)",url:"https://3dscanning.vn/360/matterport/index.html"},
{label:"Flight schedule / Lịch Bay",url:"https://www.vietsov.com.vn/Pages/LichBay.aspx"},
{label:"Vessel schedule / Lịch Tàu",url:"https://www.vietsov.com.vn/LichTau/Forms/AllItems.aspx"},
{label:"Corporate certificate download",url:"https://www.vietsov.com.vn/Documents/VietsovPetroRootCertificate.crt"},
{label:"Vietsovpetro Mail",url:"https://mail.vietsov.com.vn/"},
{label:"Tenders / Hồ sơ mời thầu",url:"https://tender.vietsov.com.vn/"},
{label:"General safety test",url:"https://ktat.vietsov.com.vn/"},
{label:"Electrical safety test",url:"https://antoandien.vietsov.com.vn/"},
{label:"Health declaration",url:"https://khaibaoyte.vietsov.com.vn/"},
{label:"Periodic health checks",url:"https://khamsuckhoe.vietsov.com.vn/"},
{label:"Leave requests",url:"https://phep.vietsov.com.vn/"},
{label:"Training platform",url:"https://daotao.vietsov.com.vn/"},
{label:"Port services",url:"https://port.vietsov.com.vn/"},
{label:"Đà Lạt hotel",url:"https://vietsovpetrohotel.com/"},
{label:"Vietsovpetro Resort",url:"https://vietsovpetroresort.com/"}
];
export const historicalMilestones=[
{date:"19/06/1981",title:"Ký hiệp định thành lập Liên doanh dầu khí Việt – Xô"},
{date:"24/05/1984",title:"Phát hiện dòng dầu công nghiệp tại giếng BH-5, mỏ Bạch Hổ"},
{date:"21/06/1985",title:"Phát hiện dầu công nghiệp đầu tiên tại mỏ Rồng"},
{date:"26/06/1986",title:"Khai thác tấn dầu thô đầu tiên tại mỏ Bạch Hổ"},
{date:"11/05/1987",title:"Phát hiện dòng dầu tại tầng móng mỏ Bạch Hổ"},
{date:"16/04/1995",title:"Bắt đầu đưa khí đồng hành từ Bạch Hổ vào bờ"},
{date:"21/11/2001",title:"Khai thác tấn dầu thứ 100 triệu"},
{date:"04/12/2005",title:"Khai thác tấn dầu thứ 150 triệu"},
{date:"08/08/2012",title:"Khai thác tấn dầu thứ 200 triệu"},
{date:"19/12/2016",title:"Đưa mỏ khí Thiên Ưng vào khai thác"},
{date:"25/01/2019",title:"Khai thác dầu đầu tiên tại mỏ Cá Tầm"},
{date:"14/02/2021",title:"Khai thác tấn dầu thứ 240 triệu"}
];
