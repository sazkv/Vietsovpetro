import type {Locale} from "@/lib/original-content";

/**
 * Photographs and positions are mapped in the exact published order of
 * Vietsovpetro's leadership archive (/Pages/lanhdao.aspx).
 * We never invent portraits or associate a photo by loose name matching.
 */
const photoBase="https://www.vietsov.com.vn/_catalogs/masterpage/vietsov/assets/images/lanhdao/";
type Person={
  name:string;
  portrait:string;
  role:{vi:string;ru:string;en:string};
};
const people:Person[]=[
  {name:"Vũ Mai Khanh",portrait:"vmk1.jpg",role:{vi:"Tổng Giám đốc",ru:"Генеральный директор",en:"General Director"}},
  {name:"Сидоров Игорь Николаевич",portrait:"photong1.jpg",role:{vi:"Phó Tổng giám đốc thứ nhất",ru:"Первый заместитель генерального директора",en:"First Deputy General Director"}},
  {name:"Lê Việt Dũng",portrait:"lvd2.jpg",role:{vi:"Phó Tổng giám đốc - Chánh Kỹ sư",ru:"Заместитель генерального директора, главный инженер",en:"Deputy General Director, Chief Engineer"}},
  {name:"Yakovenko E.V.",portrait:"ptgdvt2.jpg",role:{vi:"Phó Tổng giám đốc",ru:"Заместитель генерального директора",en:"Deputy General Director"}},
  {name:"Trần Quốc Thắng",portrait:"tqt.jpg",role:{vi:"Phó Tổng giám đốc",ru:"Заместитель генерального директора",en:"Deputy General Director"}},
  {name:"Lương Quốc Dân",portrait:"lqd1.jpg",role:{vi:"Phó Tổng giám đốc - Chánh Kế toán",ru:"Заместитель генерального директора, главный бухгалтер",en:"Deputy General Director, Chief Accountant"}},
  {name:"Nguyễn Lâm Anh",portrait:"anhNL.png",role:{vi:"Phó Tổng giám đốc",ru:"Заместитель генерального директора",en:"Deputy General Director"}},
  {name:"Đặng Đức Phong",portrait:"phongdd.jpg",role:{vi:"Phó Tổng giám đốc",ru:"Заместитель генерального директора",en:"Deputy General Director"}},
  {name:"Mai Đăng Tuấn",portrait:"tuanmd5.jpg",role:{vi:"Phó Tổng giám đốc",ru:"Заместитель генерального директора",en:"Deputy General Director"}},
  {name:"Nguyễn Thái Sơn",portrait:"NTS.jpg",role:{vi:"Phó Tổng giám đốc",ru:"Заместитель генерального директора",en:"Deputy General Director"}},
  {name:"Nguyễn Đức Chính",portrait:"chinhnd.jpg",role:{vi:"Phó Tổng giám đốc",ru:"Заместитель генерального директора",en:"Deputy General Director"}}
];

export default function LeadershipDirectory({locale}:{locale:Locale}){
  return <section className="v-leadership" aria-label={locale==="vi"?"Ban lãnh đạo":locale==="ru"?"Руководство":"Board of Management"}>
    <div className="v-leadership-grid">
      {people.map((person)=>(
        <figure className="v-leadership-card" key={person.name}>
          <div className="v-leadership-portrait">
            <img
              src={photoBase+person.portrait}
              alt={person.name}
              loading="lazy"
              decoding="async"
              width={360}
              height={450}
            />
          </div>
          <figcaption className="v-leadership-card-body">
            <h2>{person.name}</h2>
            <p>{person.role[locale]}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>;
}
