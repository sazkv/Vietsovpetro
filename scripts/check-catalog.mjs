import {readFileSync} from "node:fs";

const pages = JSON.parse(readFileSync(new URL("../src/data/original-pages.json", import.meta.url)));
const home = JSON.parse(readFileSync(new URL("../src/data/home-content.json", import.meta.url)));
const locales = ["vi", "ru", "en"];
const routes = new Set();
const sources = new Set();
const errors = [];

for (const locale of locales) {
  const content = home[locale];
  if (!content) { errors.push(`Missing ${locale} homepage`); continue; }
  if (content.services.length !== 15) errors.push(`${locale}: expected 15 source services`);
  if (content.news.length !== 3) errors.push(`${locale}: expected 3 source news categories`);
  if (content.projects.length !== 5) errors.push(`${locale}: expected 5 source projects`);
  if (!content.serviceTitle || !content.serviceIntro) errors.push(`${locale}: missing source introduction`);
}

for (const page of pages) {
  if (!locales.includes(page.locale)) errors.push(`Unknown locale: ${page.route}`);
  if (!page.route.startsWith(`/${page.locale}/`)) errors.push(`Invalid route: ${page.route}`);
  if (routes.has(page.route)) errors.push(`Duplicate route: ${page.route}`);
  if (sources.has(page.sourceUrl)) errors.push(`Duplicate source: ${page.sourceUrl}`);
  if (!page.sourceUrl.startsWith("https://www.vietsov.com.vn/")) errors.push(`Invalid source: ${page.route}`);
  if (!page.title.trim()) errors.push(`Missing title: ${page.route}`);
  if (!page.html.trim()) errors.push(`Missing body: ${page.route}`);
  if (/<(?:script|iframe|form)\b|\son\w+\s*=|javascript:/i.test(page.html)) errors.push(`Unsafe markup: ${page.route}`);
  routes.add(page.route);
  sources.add(page.sourceUrl);
}

for (const page of pages) {
  for (const match of page.html.matchAll(/href="(\/(?:vi|ru|en)\/[^"#]*)/g)) {
    if (!routes.has(match[1])) errors.push(`Broken local link from ${page.route}: ${match[1]}`);
  }
}

for (const locale of locales) {
  for (const category of home[locale]?.news || []) {
    for (const article of category.articles) {
      if (article.href.startsWith("/") && !routes.has(article.href)) errors.push(`Missing news route: ${article.href}`);
    }
  }
}

console.log(`Original pages: ${pages.length}; by language: ${locales.map((locale) => `${locale} ${pages.filter((page) => page.locale === locale).length}`).join(", ")}`);
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log("Source content checks passed.");
