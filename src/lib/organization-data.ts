/**
 * Vietsovpetro organizational chart transcribed from official source PNGs:
 * /_catalogs/masterpage/vietsov/assets/images/cocau/O11.PNG (Joint Board)
 * /_catalogs/masterpage/vietsov/assets/images/cocau/O2.PNG (Board members)
 * /_catalogs/masterpage/vietsov/assets/images/cocau/O6.PNG (Executive)
 * /_catalogs/masterpage/vietsov/assets/images/cocau/O7.PNG (18 central offices)
 * /_catalogs/masterpage/vietsov/assets/images/cocau/O92.png (18 units)
 *
 * The organizational groups, not person identities, are modeled here.
 * This preserves the pictured hierarchy without assuming private personnel
 * relationships or inventing department descriptions.
 */
export const organizationBoard=[
 "Đại diện Chính phủ Việt Nam",
 "Đại diện Chính phủ Nga",
 "Tổng Giám đốc Tập đoàn Dầu khí Việt Nam",
 "Tổng Giám đốc AO Zarubezhneft",
 "Tổng Giám đốc Vietsovpetro",
 "Phó Tổng Giám đốc thứ nhất Vietsovpetro"
];
export const organizationExecutive=[
 "Phó Tổng Giám đốc thứ nhất",
 "Chánh Kỹ sư",
 "Phó Tổng Giám đốc Nội chính",
 "Phó Tổng Giám đốc Địa chất",
 "Phó Tổng Giám đốc Vật tư",
 "Phó Tổng Giám đốc Khoa học Công nghệ",
 "Phó Tổng Giám đốc Thương mại",
 "Phó Tổng Giám đốc Xây dựng cơ bản",
 "Phó Tổng Giám đốc Khoan và Sửa giếng",
 "Phó Tổng Giám đốc Dịch vụ",
 "Chánh Kế toán",
 "Chánh Kinh tế"
];
export const organizationDepartments=[
 "Phòng Kỹ thuật sản xuất",
 "Phòng Tổ chức nhân sự",
 "Phòng Địa chất khai thác mỏ",
 "Phòng Tài chính kế toán",
 "Phòng Khoan và sửa chữa lớn giếng khoan",
 "Phòng Kinh tế kế hoạch",
 "Phòng Xây dựng cơ bản",
 "Phòng Vật tư thiết bị",
 "Phòng Thương mại",
 "Phòng Khai thác tàu biển và vận tải công nghệ",
 "Văn phòng",
 "Ban Điều độ sản xuất trung tâm",
 "Phòng Thanh tra và bảo vệ",
 "Phòng Tiếp thị dịch vụ",
 "Phòng Luật",
 "Phòng An toàn sức khỏe và môi trường",
 "Phòng Quản lý rủi ro và bảo hiểm",
 "Ban Thanh tra nội bộ"
];
export const organizationUnits=[
 "Xí nghiệp Khai thác dầu khí",
 "Xí nghiệp Khoan và sửa giếng",
 "Xí nghiệp Khai thác các công trình khí",
 "Xí nghiệp Xây lắp, khảo sát và sửa chữa các công trình dầu khí",
 "Viện Nghiên cứu khoa học và thiết kế dầu khí biển",
 "Xí nghiệp Dịch vụ cảng và cung ứng vật tư thiết bị",
 "Xí nghiệp Vận tải biển và công tác lặn",
 "Trung tâm Công nghệ thông tin và liên lạc",
 "Xí nghiệp Địa vật lý giếng khoan",
 "Trung tâm An toàn và bảo vệ môi trường",
 "Xí nghiệp Cơ điện",
 "Trung tâm Y tế",
 "Ban Đời sống - Nhà ở và văn phòng làm việc",
 "Đội Bảo vệ vũ trang",
 "Ban Điều hành mỏ Nam Rồng - Đồi Mồi",
 "Ban Quản lý hợp đồng dầu khí",
 "Khu nghỉ dưỡng Vietsovpetro Resort",
 "Khách sạn Vietsovpetro Đà Lạt"
];
export type OrganizationLevel="board"|"executive"|"departments"|"units";
export const organizationLevels:OrganizationLevel[]=["board","executive","departments","units"];
export const organizationSets:Record<OrganizationLevel,string[]>={
 board:organizationBoard,
 executive:organizationExecutive,
 departments:organizationDepartments,
 units:organizationUnits
};
export const organizationI18n={
 vi:{
 root:"LIÊN DOANH VIETSOVPETRO",intro:"Cơ cấu tổ chức được tái hiện từ sơ đồ công bố của Vietsovpetro.",pick:"Khám phá cấu trúc",
 levels:{board:"Hội đồng Liên doanh",executive:"Ban Tổng Giám đốc",departments:"Bộ máy điều hành",units:"Đơn vị trực thuộc"},
 roots:{board:"Hội đồng Liên doanh Vietsovpetro",executive:"Tổng Giám đốc Vietsovpetro",departments:"Bộ máy điều hành",units:"Đơn vị trực thuộc"},
 totals:{board:"thành phần",executive:"chức danh",departments:"phòng ban",units:"đơn vị"},
 footer:"Nguồn: sơ đồ tổ chức Vietsovpetro. Các chức danh và đơn vị được giữ theo công bố chính thức."
 },
 ru:{
 root:"СП «ВЬЕТСОВПЕТРО»",intro:"Интерактивное представление организационной структуры на основе официальных схем Vietsovpetro.",pick:"Уровни организации",
 levels:{board:"Совет предприятия",executive:"Генеральная дирекция",departments:"Аппарат управления",units:"Подразделения"},
 roots:{board:"Совет СП «Вьетсовпетро»",executive:"Генеральный директор",departments:"Центральный аппарат",units:"Производственные подразделения"},
 totals:{board:"представителей",executive:"должностей",departments:"отделов",units:"подразделений"},
 footer:"Источник: опубликованные схемы Vietsovpetro. Наименования подразделений сохранены на вьетнамском."
 },
 en:{
 root:"VIETSOVPETRO JOINT VENTURE",intro:"An interactive organizational map reconstructed from the officially published Vietsovpetro diagrams.",pick:"Explore organization",
 levels:{board:"Joint Venture Council",executive:"Executive management",departments:"Head office departments",units:"Operating units"},
 roots:{board:"Vietsovpetro Joint Council",executive:"General Director",departments:"Head office administration",units:"Operating units"},
 totals:{board:"representatives",executive:"roles",departments:"departments",units:"units"},
 footer:"Source: published Vietsovpetro organizational diagrams. Department names are retained in Vietnamese."
 }
} as const;
