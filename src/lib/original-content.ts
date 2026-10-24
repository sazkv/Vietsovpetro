import sourcePages from "@/data/original-pages.json";
import homeSource from "@/data/home-content.json";

export const locales = ["vi", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export type Section = "company" | "units" | "services" | "news" | "projects" | "resources" | "careers" | "contact" | "pages";
export type SourcePage = {
  locale: Locale;
  section: Section | "home";
  slug: string;
  route: string;
  sourceUrl: string;
  title: string;
  date: string;
  html: string;
  text: string;
  images: string[];
};
export type HomeContent = {
  serviceTitle: string;
  serviceIntro: string;
  services: { title: string; image: string }[];
  news: { title: string; articles: { title: string; href: string }[] }[];
  projects: { title: string; href: string; image: string }[];
};

export const pages = sourcePages as SourcePage[];
export const home = homeSource as Record<Locale, HomeContent>;

export const externalLinks: Record<Locale, {title: string; href: string}[]> = {
  vi: [
    {title: "Vietsovpetro Mail", href: "https://mail.vietsov.com.vn/"},
    {title: "Bán Hồ sơ mời thầu", href: "https://tender.vietsov.com.vn/"},
    {title: "Lịch Bay", href: "https://www.vietsov.com.vn/Pages/LichBay.aspx"},
    {title: "Lịch Tàu", href: "https://www.vietsov.com.vn/LichTau/Forms/AllItems.aspx"},
    {title: "Thi an toàn chung", href: "https://ktat.vietsov.com.vn/"},
    {title: "Thi an toàn điện", href: "https://antoandien.vietsov.com.vn/vspatd"},
    {title: "Khám sức khỏe định kỳ", href: "https://khamsuckhoe.vietsov.com.vn/"},
    {title: "Đăng ký phép", href: "https://phep.vietsov.com.vn/"},
    {title: "Hệ thống Đào Tạo", href: "https://daotao.vietsov.com.vn/"},
  ],
  en: [
    {title: "Vietsovpetro Mail", href: "https://mail.vietsov.com.vn/"},
    {title: "Invitation to Bid", href: "https://tender.vietsov.com.vn/Eng/Pages/Home.aspx"},
    {title: "General Safety Tests", href: "https://ktat.vietsov.com.vn/"},
  ],
  ru: [
    {title: "Почта Вьетсовпетро", href: "https://mail.vietsov.com.vn/"},
    {title: "Продажа тендерной документации", href: "https://tender.vietsov.com.vn/"},
    {title: "Проверка знаний по безопасности", href: "https://ktat.vietsov.com.vn/"},
    {title: "Проверка знаний по электро-безопасности", href: "https://antoandien.vietsov.com.vn/vspatd"},
  ],
};

export const sectionOrder: Record<Locale, Section[]> = {
  vi: ["company", "units", "services", "news", "projects", "resources", "careers", "contact"],
  en: ["company", "services", "units", "news", "projects", "resources", "contact"],
  ru: ["company", "services", "units", "news", "projects", "resources", "contact"],
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function sectionPages(locale: Locale, section: Section): SourcePage[] {
  return pages.filter((page) => page.locale === locale && page.section === section);
}

export function sectionIndex(locale: Locale, section: Section): SourcePage | undefined {
  return sectionPages(locale, section).find((page) => page.route === `/${locale}/${section}/`);
}

export function findPage(locale: Locale, section: Section, slug: string): SourcePage | undefined {
  return pages.find((page) => page.locale === locale && page.section === section && page.slug === slug);
}
