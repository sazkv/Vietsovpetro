import Link from "next/link";
import {home, pages, type Locale} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

/**
 * An editorial, media-led front page. All service, news and project entries are
 * rendered from the existing source content index, not invented demo content.
 */
const words: Record<Locale, {
  kicker: string; title: string; emphasis: string; description: string; about: string;
  services: string; serviceHeading: string; serviceCopy: string; allServices: string;
  heritage: string; heritageHeading: string; heritageCopy: string; heritageCta: string;
  projectsLabel: string; projectsCopy: string; journal: string; journalCopy: string;
  more: string; people: string; peopleHeading: string; peopleCopy: string; peopleCta: string;
  concept: string; year: string; serviceNumber: string; languages: string;
}> = {
  vi: {
    kicker: "Liên doanh Việt – Nga · Từ năm 1981",
    title: "Vững vàng", emphasis: "giữa biển khơi.",
    description: "Hơn bốn thập kỷ nghiên cứu, tìm kiếm, thăm dò và khai thác dầu khí ngoài khơi Việt Nam.",
    about: "Tìm hiểu Vietsovpetro", services: "Khám phá dịch vụ",
    serviceHeading: "Năng lực được chứng minh trong thực tiễn.",
    serviceCopy: "Từ nghiên cứu và phát triển mỏ đến thiết kế, xây lắp và vận hành các công trình ngoài khơi.",
    allServices: "Xem tất cả 15 nhóm dịch vụ", heritage: "Dấu ấn lịch sử",
    heritageHeading: "Hơn bốn thập kỷ hợp tác Việt – Nga.",
    heritageCopy: "Thành lập năm 1981, Vietsovpetro đánh dấu hành trình hợp tác lâu dài trong ngành dầu khí Việt Nam. Khám phá các cột mốc, con người và thành tựu đã tạo nên liên doanh.",
    heritageCta: "Lịch sử & tổ chức", projectsLabel: "Công trình & dự án",
    projectsCopy: "Các dự án được dẫn trực tiếp đến trang nội dung gốc của từng ngôn ngữ.",
    journal: "Từ Vietsovpetro", journalCopy: "Tin tức, hoạt động sản xuất và hợp tác.",
    more: "Xem thông tin", people: "Nguồn lực & con người",
    peopleHeading: "Kỹ thuật được xây dựng trên nền tảng con người.",
    peopleCopy: "Khám phá nguồn lực, đào tạo và các cơ hội nghề nghiệp được công bố.",
    peopleCta: "Tìm hiểu cơ hội", concept: "Independent redesign concept · Không phải trang chính thức",
    year: "Năm thành lập", serviceNumber: "Lĩnh vực dịch vụ", languages: "Phiên bản ngôn ngữ"
  },
  ru: {
    kicker: "Совместное предприятие Вьетнама и России · С 1981 года",
    title: "Инженерия", emphasis: "открытого моря.",
    description: "Более четырёх десятилетий геологоразведки, добычи нефти и газа и работы на морских месторождениях Вьетнама.",
    about: "О предприятии", services: "Наши услуги",
    serviceHeading: "Технологии, проверенные морем.",
    serviceCopy: "От изучения месторождений и бурения до проектирования, строительства и обслуживания морской инфраструктуры.",
    allServices: "Все 15 направлений услуг", heritage: "История предприятия",
    heritageHeading: "Десятилетия российско-вьетнамского сотрудничества.",
    heritageCopy: "Основанное в 1981 году совместное предприятие стало частью истории нефтегазовой отрасли Вьетнама. Узнайте о ключевых этапах, достижениях и людях.",
    heritageCta: "История и структура", projectsLabel: "Проекты и объекты",
    projectsCopy: "Публикуем проекты из исходного каталога предприятия, сохраняя ссылки на источники.",
    journal: "Новости предприятия", journalCopy: "Производство, события и сотрудничество.",
    more: "Подробнее", people: "Команда и кадры",
    peopleHeading: "В основе сложной инженерии — люди.",
    peopleCopy: "Сведения о специалистах, профессиональной подготовке и доступных вакансиях.",
    peopleCta: "Ресурсы предприятия", concept: "Независимый концепт · Неофициальный сайт",
    year: "Год основания", serviceNumber: "Направлений услуг", languages: "Языковые версии"
  },
  en: {
    kicker: "Vietnam–Russia Joint Venture · Established 1981",
    title: "Engineering", emphasis: "the open sea.",
    description: "Over four decades of offshore exploration, oil and gas production, and engineering operations in Vietnam.",
    about: "About the venture", services: "Our capabilities",
    serviceHeading: "Experience forged offshore.",
    serviceCopy: "From field development and drilling to the design, construction and operation of offshore infrastructure.",
    allServices: "Explore 15 service categories", heritage: "Our heritage",
    heritageHeading: "Decades of Vietnam–Russia cooperation.",
    heritageCopy: "Established in 1981, Vietsovpetro is part of Vietnam’s offshore energy history. Explore its milestones, people and achievements.",
    heritageCta: "History and structure", projectsLabel: "Selected projects",
    projectsCopy: "Explore project information preserved from the original language-specific source catalogue.",
    journal: "News & perspectives", journalCopy: "Operations, company news and cooperation.",
    more: "Explore", people: "People & expertise",
    peopleHeading: "Behind every project are the people who build it.",
    peopleCopy: "Explore the company’s human resources, training and recruitment information.",
    peopleCta: "People and resources", concept: "Independent redesign concept · Not an official site",
    year: "Founded", serviceNumber: "Service categories", languages: "Language versions"
  }
};

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function SourceHome({locale}: {locale: Locale}) {
  const content = home[locale];
  const m = messageSet(locale);
  const t = words[locale];
  const servicePreview = content.services.slice(0, 6);
  const topNews = content.news.map(category => {
    const article = category.articles[0];
    if (!article) return null;
    const page = pages.find(p => p.route === article.href);
    return {category: category.title, title: article.title, url: article.href, date: page?.date || "", image: page?.images?.[0]};
  }).filter((item): item is NonNullable<typeof item> => item !== null);
  const projectImages = ["hero-offshore-2.jpg", "hero-offshore-3.jpg", "hero-offshore-6.jpg"];

  return <main className="editorial-home">
    <section className="ed-hero" aria-labelledby="ed-hero-heading">
      <div className="ed-hero-photo" style={{backgroundImage: `url("${base}/brand/hero-offshore-1.jpg")`}} aria-hidden="true"/>
      <div className="ed-hero-shade" aria-hidden="true"/>
      <div className="shell ed-hero-inner">
        <div className="ed-hero-content">
          <div className="ed-kicker ed-kicker-light"><span className="ed-rule"/> {t.kicker}</div>
          <h1 id="ed-hero-heading">{t.title}<br/><em>{t.emphasis}</em></h1>
          <p>{t.description}</p>
          <div className="ed-hero-actions">
            <Link href={`/${locale}/company/`} className="ed-button ed-button-light">{t.about}<Arrow/></Link>
            <Link href={`/${locale}/services/`} className="ed-text-link ed-text-link-light">{t.services}<Arrow/></Link>
          </div>
        </div>
        <div className="ed-hero-bottom"><span>01 — VIETSOVPETRO</span><span>OFFSHORE ENERGY / VIETNAM</span></div>
      </div>
    </section>

    <section className="ed-intro shell" aria-labelledby="ed-intro-title">
      <div className="ed-section-marker"><span className="ed-index">01 / 05</span><span className="ed-rule"/></div>
      <div className="ed-intro-main">
        <p className="ed-overline">{t.heritage}</p>
        <h2 id="ed-intro-title">{t.heritageHeading}</h2>
        <p className="ed-body">{t.heritageCopy}</p>
        <Link className="ed-inline-link" href={`/${locale}/company/`}>{t.heritageCta}<Arrow/></Link>
      </div>
      <div className="ed-metrics">
        <div><strong>1981</strong><span>{t.year}</span></div>
        <div><strong>15</strong><span>{t.serviceNumber}</span></div>
        <div><strong>03</strong><span>{t.languages}</span></div>
      </div>
    </section>

    <section className="ed-services" aria-labelledby="ed-services-title">
      <div className="shell ed-services-shell">
        <div className="ed-section-marker"><span className="ed-index">02 / 05</span><span className="ed-rule"/></div>
        <div className="ed-services-main">
          <div className="ed-heading-row"><div><p className="ed-overline">{m.nav.services}</p><h2 id="ed-services-title">{t.serviceHeading}</h2></div><p>{t.serviceCopy}</p></div>
          <div className="ed-service-list">{servicePreview.map((service, index) => <Link key={index} href={`/${locale}/services/#service-${index + 1}`} className="ed-service-row"><span className="ed-service-id">{String(index + 1).padStart(2, "0")}</span><span className="ed-service-name">{service.title}</span><span className="ed-service-arrow"><Arrow/></span></Link>)}</div>
          <Link href={`/${locale}/services/`} className="ed-inline-link">{t.allServices}<Arrow/></Link>
        </div>
      </div>
    </section>

    <section className="ed-projects" aria-labelledby="ed-projects-title">
      <div className="shell ed-projects-head">
        <div className="ed-section-marker"><span className="ed-index">03 / 05</span><span className="ed-rule"/></div>
        <div className="ed-projects-title"><div><p className="ed-overline">{t.projectsLabel}</p><h2 id="ed-projects-title">{m.home.projects}</h2></div><Link href={`/${locale}/projects/`} className="ed-inline-link">{m.home.allProjects}<Arrow/></Link></div>
      </div>
      <div className="shell ed-projects-feature">
        {content.projects.slice(0, 3).map((project, index) => <Link key={`${project.title}-${index}`} href={project.href || `/${locale}/projects/`} className={index === 0 ? "ed-project-card ed-project-card-lead" : "ed-project-card"}>
          <div className="ed-project-image">
            <img src={index === 0 ? `${base}/brand/${projectImages[0]}` : project.image || `${base}/brand/${projectImages[index]}`} loading="lazy" alt=""/>
            <span className="ed-project-id">{String(index+1).padStart(2,"0")} / {m.nav.projects}</span>
          </div>
          <div className="ed-project-info"><h3>{project.title}</h3><span><Arrow/></span></div>
        </Link>)}
      </div>
      <div className="shell ed-projects-note">{t.projectsCopy}</div>
    </section>

    <section className="ed-news" aria-labelledby="ed-news-title">
      <div className="shell ed-news-shell">
        <div className="ed-section-marker"><span className="ed-index">04 / 05</span><span className="ed-rule"/></div>
        <div className="ed-news-body"><div className="ed-heading-row"><div><p className="ed-overline">{m.nav.news}</p><h2 id="ed-news-title">{t.journal}</h2></div><div className="ed-news-aside"><p>{t.journalCopy}</p><Link href={`/${locale}/news/`} className="ed-inline-link">{m.home.allNews}<Arrow/></Link></div></div>
          <div className="ed-news-grid">{topNews.map((article, index) => <Link className="ed-news-item" href={article.url} key={article.url}>
            <div className="ed-news-photo">{article.image ? <img src={article.image} loading="lazy" alt=""/> : <div className="ed-news-fallback"/>}</div>
            <div className="ed-news-meta"><span>{article.category}</span>{article.date && <time>{article.date}</time>}</div>
            <h3>{article.title}</h3><span className="ed-news-arrow"><Arrow/></span>
          </Link>)}</div>
        </div>
      </div>
    </section>

    <section className="ed-people" aria-labelledby="ed-people-title">
      <div className="ed-people-photo" style={{backgroundImage: `url("${base}/brand/hero-offshore-3.jpg")`}} aria-hidden="true"/>
      <div className="shell ed-people-shell"><div className="ed-section-marker"><span className="ed-index">05 / 05</span><span className="ed-rule"/></div><div className="ed-people-content"><p className="ed-overline">{t.people}</p><h2 id="ed-people-title">{t.peopleHeading}</h2><p>{t.peopleCopy}</p><Link className="ed-button ed-button-light" href={locale==="vi"?"/vi/careers/":`/${locale}/resources/`}>{t.peopleCta}<Arrow/></Link></div></div>
    </section>
    <div className="ed-disclaimer shell">{t.concept}</div>
  </main>;
}
