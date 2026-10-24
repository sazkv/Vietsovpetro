import type {Locale} from "@/lib/original-content";

/** Names and roles reproduced from the published Vietsovpetro leadership list. */
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
 const director=leadership[0];
 return <div className="v-leadership">
  <section className="v-leadership-feature">
   <div className="v-leadership-feature-body">
    <span className="v-leadership-feature-role">{director.role}</span>
    <h2>{director.name}</h2>
   </div>

  </section>
  <div className="v-leadership-grid">
   {leadership.slice(1).map(person=><article className="v-leadership-person" key={person.name}>
     <span className="v-leadership-person-role">{person.role}</span>
     <h2>{person.name}</h2>
   </article>)}
  </div>
 </div>;
}