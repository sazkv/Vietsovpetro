import type {Locale} from "@/lib/original-content";

/** Roles as published on the Vietnamese leadership page, verified Oct 2026. */
const leadership=[
 {name:"Vũ Mai Khanh",role:"Tổng Giám đốc"},
 {name:"Сидоров Игорь Николаевич",role:"Phó Tổng giám đốc thứ nhất"},
 {name:"Lê Việt Dũng",role:"Phó Tổng giám đốc - Chánh Kỹ sư"},
 {name:"Yakovenko E.V.",role:"Phó Tổng giám đốc"},
 {name:"Trần Quốc Thắng",role:"Phó Tổng giám đốc"},
 {name:"Lương Quốc Dân",role:"Phó Tổng giám đốc - Chánh Kế toán"},
 {name:"Nguyễn Lâm Anh",role:"Phó Tổng giám đốc"},
 {name:"Đặng Đức Phong",role:"Phó Tổng giám đốc"},
 {name:"Mai Đăng Tuấn",role:"Phó Tổng giám đốc"},
 {name:"Nguyễn Thái Sơn",role:"Phó Tổng giám đốc"},
 {name:"Nguyễn Đức Chính",role:"Phó Tổng giám đốc"}
];
export default function LeadershipDirectory({locale}:{locale:Locale}){
 if(locale!=="vi")return null;
 return <div className="v-leadership-list">
  {leadership.map((person,i)=><div className="v-leader" key={person.name}>
    <span>{String(i+1).padStart(2,"0")}</span>
    <div><h2>{person.name}</h2><p>{person.role}</p></div>
  </div>)}
 </div>;
}
