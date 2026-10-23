import Link from "next/link";
import Navigation from "@/components/navigation";
import SiteFooter from "@/components/site-footer";
import HeroScene from "@/components/hero-scene";
import HomeMotion from "@/components/home-motion";
import NewsCarousel from "@/components/news-carousel";
import {groups, allContent, historicalMilestones} from "@/lib/site-map";

const bySlug = (slug:string) => groups.find(group => group.slug === slug)!;
const featured = ["services", "units", "projects", "news"].map(bySlug);
const capabilities = [
  bySlug("services").items[0],
  bySlug("services").items[4],
  bySlug("services").items[8],
  bySlug("services").items[3]
];
const projectItems = bySlug("projects").items.slice(0, 3);

export default function Home() {
  return <>
    <Navigation/>
    <main className="home-main">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">Liên doanh Việt – Nga · Thành lập năm 1981</p>
            <h1 id="home-title">Vững nền tảng.<br/><em>Vươn biển lớn.</em></h1>
            <p className="hero-lead">Hơn bốn thập kỷ hợp tác, tìm kiếm, thăm dò và khai thác dầu khí ngoài khơi Việt Nam.</p>
            <div className="hero-actions">
              <Link className="button button-red" href="/company">Khám phá Vietsovpetro <span aria-hidden="true">↗</span></Link>
              <Link className="button button-line" href="/services">Sản phẩm & dịch vụ <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="hero-art"><HeroScene/><span className="hero-art-note">Minh họa chuyển động · Công trình ngoài khơi</span></div>
        </div>
        <div className="container hero-rule"><span>Biển Đông, Việt Nam</span><span>Cuộn để khám phá <span aria-hidden="true">↓</span></span></div>
      </section>

      <section className="numbers-chapter" aria-label="Vietsovpetro qua các mốc">
        <div className="container numbers-grid">
          <div><strong>1981</strong><span>Năm thành lập liên doanh</span></div>
          <div><strong>15</strong><span>Nhóm sản phẩm và dịch vụ trong danh mục</span></div>
          <div><strong>05</strong><span>Nhóm dự án trong danh mục</span></div>
          <div><strong>{allContent.length}</strong><span>Trang thông tin được lập bản đồ</span></div>
        </div>
      </section>

      <section className="intro-chapter container">
        <div className="chapter-aside"><span className="accent-line"/><p>Một hành trình trên biển</p></div>
        <div className="intro-body">
          <h2>Năng lực kỹ thuật.<br/><span>Hợp tác bền vững.</span></h2>
          <p>Được thành lập năm 1981, Vietsovpetro hoạt động trong lĩnh vực thăm dò, phát triển mỏ, khai thác dầu khí và các dịch vụ kỹ thuật ngoài khơi. Thông tin ở đây được tổ chức theo cấu trúc website gốc và đối chiếu với từng nguồn chính thức.</p>
          <Link className="text-link" href="/company">Tìm hiểu về liên doanh <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <div className="milestone-marquee" aria-label="Các mốc lịch sử">
        <div className="marquee-track">
          {[...historicalMilestones.slice(0, 6), ...historicalMilestones.slice(0, 6)].map((milestone, index) =>
            <span key={milestone.date + index} aria-hidden={index >= 6}><b>{milestone.date.slice(-4)}</b>{milestone.title}</span>
          )}
        </div>
      </div>

      <section className="expertise-chapter" aria-labelledby="expertise-title">
        <div className="container">
          <div className="chapter-heading"><div><p>Hoạt động và thông tin</p><h2 id="expertise-title">Một hệ sinh thái<br/>ngoài khơi.</h2></div><Link className="text-link" href="/services">Toàn bộ dịch vụ <span aria-hidden="true">↗</span></Link></div>
          <div className="expertise-grid">
            {featured.map((group, index) => <Link href={"/" + group.slug} className={"expertise-panel expertise-panel-" + index} key={group.slug}>
              <span className="panel-index">{String(index + 1).padStart(2, "0")} / {String(group.items.length).padStart(2, "0")}</span>
              <div><h3>{group.vi}</h3><p>{group.intro}</p></div>
              <span className="panel-arrow" aria-hidden="true">↗</span>
            </Link>)}
          </div>
          <div className="capability-intro"><p>Năng lực được công bố</p><span>Chọn một lĩnh vực để xem trang nguồn và tình trạng chuyển nội dung.</span></div>
          <div className="capability-accordion">
            {capabilities.map((item, index) => <Link href={"/services/" + item.slug} className="capability-slice" key={item.slug}>
              <span className="slice-number">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.vi}</strong>
              <span className="slice-arrow" aria-hidden="true">↗</span>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="project-chapter" aria-labelledby="project-title">
        <div className="container project-layout">
          <div className="project-heading">
            <p>Dự án và đối tác</p>
            <h2 id="project-title">Công trình<br/>từ thực tiễn.</h2>
            <span>Danh mục dự án giữ nguyên các nhóm công bố trên website chính thức. Trang chi tiết dẫn về nội dung gốc trong thời gian chuyển dữ liệu.</span>
            <Link className="text-link" href="/projects">Khám phá dự án <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="project-stack">
            {projectItems.map((item, index) => <Link href={"/projects/" + item.slug} className="project-panel" key={item.slug}>
              <div className="project-panel-top"><span>{String(index + 1).padStart(2, "0")} / {String(projectItems.length).padStart(2, "0")}</span><span aria-hidden="true">↗</span></div>
              <div className={"project-symbol project-symbol-" + index} aria-hidden="true"><i/><i/><i/><i/></div>
              <h3>{item.vi}</h3>
              <p>{item.en}</p>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="news-chapter" aria-labelledby="news-title">
        <div className="container news-layout">
          <div className="news-intro"><p>Tin tức và sự kiện</p><h2 id="news-title">Những chuyển động<br/>mới nhất.</h2><span>Bài viết trong bản đề xuất dẫn tới nguồn chính thức. Ngày đăng được giữ theo bản gốc.</span><Link className="text-link" href="/news">Tất cả tin tức <span aria-hidden="true">↗</span></Link></div>
          <NewsCarousel items={bySlug("news").items}/>
        </div>
      </section>

      <section className="careers-chapter"><div className="container careers-layout"><div><p>Con người Vietsovpetro</p><h2>Con người tạo nên<br/>giá trị bền vững.</h2></div><Link className="button button-white" href="/careers">Tuyển dụng & đào tạo <span aria-hidden="true">↗</span></Link></div></section>

      <section className="quick-chapter container"><div><p>Tra cứu thông tin</p><h2>Đi thẳng đến<br/>điều bạn cần.</h2><span>Toàn bộ danh mục hiện có tiếp tục được giữ trong cấu trúc mới.</span></div><div className="quick-links">{groups.filter(group => !featured.includes(group)).map(group => <Link href={"/" + group.slug} key={group.slug}>{group.vi}<span aria-hidden="true">↗</span></Link>)}<Link href="/systems">Hệ thống nội bộ & liên kết<span aria-hidden="true">↗</span></Link><Link href="/search">Tìm kiếm trong danh mục<span aria-hidden="true">↗</span></Link></div></section>
      <HomeMotion/>
    </main>
    <SiteFooter/>
  </>;
}

