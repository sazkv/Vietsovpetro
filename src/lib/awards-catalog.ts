import type {AwardItem} from "@/lib/structured-content";
import type {Locale} from "@/lib/original-content";

/**
 * Source of record: Vietsovpetro official awards catalogue:
 * https://www.vietsov.com.vn/Pages/cacDanhHieu.aspx
 *
 * Nineteen separate award events share thirteen distinct decoration designs.
 * In particular, different years of the same class must reuse the same asset.
 * Historical dates refer to awards, not the year of the image asset.
 * Audited 2026-10-25.
 */
const records=[
 // [asset stem, year, Vietnamese title, Russian title, English title]
 ["sv","2010","Huân chương Sao vàng","Орден «Золотая звезда»","Gold Star Order"],
 ["hcm","2009","Huân chương Hồ Chí Minh","Орден Хо Ши Мина","Ho Chi Minh Order"],
 ["ahld","1997","Danh hiệu Anh hùng Lao động","Звание «Герой труда»","Hero of Labor"],
 ["ahld","2001","Danh hiệu Anh hùng Lao động","Звание «Герой труда»","Hero of Labor"],
 ["dl","2005","Huân chương Độc lập hạng I","Орден Независимости I степени","Independence Order, Class I"],
 ["dl2","1996","Huân chương Độc lập hạng II","Орден Независимости II степени","Independence Order, Class II"],
 ["dl3","1993","Huân chương Độc lập hạng III","Орден Независимости III степени","Independence Order, Class III"],
 ["qc","2011","Huân chương Quân công hạng III","Орден Военных заслуг III степени","Military Exploit Order, Class III"],
 ["qc","2016","Huân chương Quân công hạng III","Орден Военных заслуг III степени","Military Exploit Order, Class III"],
 ["ld1","1985","Huân chương Lao động hạng I","Орден Труда I степени","Labor Order, Class I"],
 ["ld1","1990","Huân chương Lao động hạng I","Орден Труда I степени","Labor Order, Class I"],
 ["ld2","2008","Huân chương Lao động hạng II","Орден Труда II степени","Labor Order, Class II"],
 ["ld2","2021","Huân chương Lao động hạng II","Орден Труда II степени","Labor Order, Class II"],
 ["ld3","2007","Huân chương Lao động hạng III","Орден Труда III степени","Labor Order, Class III"],
 ["ld3","1997","Huân chương Lao động hạng III","Орден Труда III степени","Labor Order, Class III"],
 ["ld3","1996","Huân chương Lao động hạng III","Орден Труда III степени","Labor Order, Class III"],
 ["cc1","1995","Huy chương Chiến công hạng I","Медаль «За боевые заслуги» I степени","Combat Merit Medal, Class I"],
 ["cc3","2001","Huy chương Chiến công hạng III","Медаль «За боевые заслуги» III степени","Combat Merit Medal, Class III"],
 ["bv","2015","Huân chương Bảo vệ Tổ quốc hạng I","Орден Защиты Отечества I степени","Fatherland Protection Order, Class I"]
] as const;

export const AWARDS_OFFICIAL_SOURCE="https://www.vietsov.com.vn/Pages/cacDanhHieu.aspx";

export function officialAwards(locale:Locale):AwardItem[]{
 const titleIndex=locale==="vi"?2:locale==="ru"?3:4;
 return records.map(row=>({
  title:row[titleIndex],
  year:row[1],
  image:`/awards/${row[0]}.png`
 }));
}
export function awardsAudit(){
 return {records:records.length,distinctAssets:new Set(records.map(r=>r[0])).size,years:records.map(r=>r[1])};
}
