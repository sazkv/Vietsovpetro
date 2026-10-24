import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {parseAwards} from "../src/lib/structured-content.ts";

const image=(name)=>`<img src="https://www.vietsov.com.vn/assets/danhhieu/${name}.jpg">`;
const gold=/Sao vàng|Gold Star Order|Золот/i;

// The Vietsovpetro source places the date of its Gold Star Order in a
// separate <h4>, which used to make the award disappear from year filters.
const vietnamese=parseAwards(
 `${image("sv")}<h4>Huân chương Sao vàng</h4><h4>2010</h4>${image("hcm")}<h4>Huân chương Hồ Chí Minh - 2009</h4>`
);
assert.equal(vietnamese.length,2);
assert.equal(vietnamese[0].year,"2010");
assert.equal(vietnamese[0].title,"Huân chương Sao vàng");
assert.equal(vietnamese[1].year,"2009");

// Some translated source archives mention Gold Star before the first image.
const english=parseAwards(
 `<h4>Gold Star Order</h4><h4>2010</h4>${image("hcm")}<h4>Ho Chi Minh Order - 2009</h4>`
);
assert.equal(english.length,2);
assert.equal(english[0].title,"Gold Star Order");
assert.equal(english[0].year,"2010");

// Preface plus the same image-backed decoration must not double count.
const duplicate=parseAwards(
 `<h4>Gold Star Order</h4><h4>2010</h4>${image("sv")}<h4>Gold Star Order</h4><h4>2010</h4>`
);
assert.equal(duplicate.length,1);

// Verify imported official archives, not only synthetic fixtures.
const pages=JSON.parse(readFileSync(new URL("../src/data/original-pages.json",import.meta.url),"utf8"));
const slugs={vi:"cacdanhhieu",ru:"healthcare",en:"healthcare"};
for(const [locale,slug] of Object.entries(slugs)){
 const page=pages.find(item=>item.locale===locale&&item.section==="company"&&item.slug===slug);
 assert(page,`Source archive missing ${locale}/company/${slug}`);
 const awards=parseAwards(page.html);
 assert(awards.length>=15,`${locale}: suspiciously few award records (${awards.length})`);
 const stars=awards.filter(item=>gold.test(item.title));
 assert.equal(stars.length,1,`${locale}: Gold Star should occur exactly once`);
 assert.equal(stars[0].year,"2010",`${locale}: Gold Star must retain its 2010 year`);
 const missingYears=awards.filter(item=>!item.year||!/^\\d{4}$/.test(item.year));
 assert.equal(missingYears.length,0,`${locale}: entries with missing years: ${missingYears.map(item=>item.title).join("; ")}`);
 console.log(`${locale}: verified ${awards.length} original awards; Gold Star 2010; all years valid`);
}
const manifest=JSON.parse(readFileSync(new URL("../public/awards/manifest.json",import.meta.url),"utf8"));
assert.equal(Object.keys(manifest).length,13,"Source-backed medal assets must remain 13");
for(const {asset} of Object.values(manifest)){
 assert(existsSync(new URL("../public"+asset,import.meta.url)),`Missing medal asset ${asset}`);
}
console.log("Awards parser and medal assets: PASS");
