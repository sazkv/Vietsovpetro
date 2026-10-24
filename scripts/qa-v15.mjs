/**
 * Interactive production-export QA at desktop / mobile widths.
 * Run after npm run build:
 *   npm install --no-save playwright@1.56.1
 *   npx playwright install chromium
 *   node scripts/qa-v15.mjs
 */
import {chromium} from "playwright";
import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {existsSync,mkdirSync,symlinkSync} from "node:fs";

const origin="http://127.0.0.1:4173";
const root=origin+"/Vietsovpetro";
const captures="tmp/qa-v15";
mkdirSync(captures,{recursive:true});
if(!existsSync("Vietsovpetro"))symlinkSync("out","Vietsovpetro","dir");
const server=spawn("python3",["-m","http.server","4173","--bind","127.0.0.1"],{stdio:"ignore"});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let browser;
try{
 await sleep(1600);
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 for(const {width,height,label} of [
  {width:1440,height:900,label:"desktop"},
  {width:390,height:844,label:"mobile"}
 ]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page=await context.newPage();
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));

  // Manual line control for EN and VI: no orphaned words.
  for(const locale of ["en","vi"]){
   await page.goto(root+"/"+locale+"/",{waitUntil:"networkidle",timeout:50000});
   await page.locator(".r-hero-line").first().waitFor({state:"visible"});
   const phrases=await page.locator(".r-hero-line").allTextContents();
   assert.equal(phrases.length,2,locale+" two-line hero required");
   assert.deepEqual(phrases,locale==="en"?["Offshore energy.","Proven expertise."]:["Năng lượng ngoài khơi.","Năng lực vững vàng."]);
   const boxes=await Promise.all([0,1].map(i=>page.locator(".r-hero-line").nth(i).boundingBox()));
   assert(boxes[0]&&boxes[1],"Hero line bounding boxes missing");
   assert(boxes[1].y>=boxes[0].y+boxes[0].height-2,"Two hero lines overlap");
   for(const box of boxes)assert(box.x>=0&&box.x+box.width<=width+2,locale+" headline overflows viewport");
   assert(await page.locator(".r-utility-signin").isVisible(),"Staff login icon not visible");
   await page.locator(".r-utility-dropdown summary").click();
   assert(await page.locator(".r-utility-panel").isVisible(),"Employee links dropdown missing");
   assert.equal(await page.locator(".r-utility-panel-grid a").count(),11,"Public employee URLs must be preserved");
   await page.screenshot({path:captures+"/"+label+"-"+locale+"-hero.png",fullPage:false});
  }

  // Museum split layout and actual interaction with the underlying images.
  await page.goto(root+"/ru/company/healthcare/",{waitUntil:"networkidle",timeout:50000});
  const art=page.locator(".museum-stage-art");
  const info=page.locator(".museum-stage-details");
  await art.waitFor({state:"visible"});
  const a=await art.boundingBox(),b=await info.boundingBox();
  assert(a&&b,"Museum stage panels absent");
  if(width>700){
    assert(a.x+ a.width<=b.x+2,"Desktop medal must be left of its information panel");
    assert(Math.abs(a.y-b.y)<4,"Desktop panels must share the same top baseline");
  }else assert(a.y+a.height<=b.y+3,"Mobile information must follow medal preview");
  assert(await page.locator(".museum-album-item").count()>8,"All medals should be selectable from album");
  const img=page.locator(".museum-stage-image-button img");
  assert(await img.count(),"Actual medal image missing from stage");
  assert.equal(await img.evaluate(el=>getComputedStyle(el).objectFit),"contain","Medal should never be cropped");
  const first=await page.locator(".museum-stage-title h3").textContent();
  await page.locator(".museum-album-item").nth(1).click();
  const second=await page.locator(".museum-stage-title h3").textContent();
  assert.notEqual(first,second,"Selecting album items must change main medal");
  await page.locator(".museum-stage-image-button").click();
  assert(await page.locator(".museum-v15-lightbox").isVisible(),"Medal zoom did not open");
  const zoom=page.locator(".museum-v15-modal-image img");
  assert(await zoom.count(),"Zoomed medal image is absent");
  assert.equal(await zoom.evaluate(el=>getComputedStyle(el).objectFit),"contain","Zoom image should use contain");
  const frame=await page.locator(".museum-v15-modal-image").boundingBox();
  const picture=await zoom.boundingBox();
  assert(frame&&picture,"Modal frame measurements unavailable");
  assert(picture.x>=frame.x-2&&picture.y>=frame.y-2
      &&picture.x+picture.width<=frame.x+frame.width+2
      &&picture.y+picture.height<=frame.y+frame.height+2,
      "Zoomed PNG overflows/clips modal image container");
  await page.screenshot({path:captures+"/"+label+"-medal-zoom.png",fullPage:false});
  await page.keyboard.press("Escape");
  assert(!(await page.locator(".museum-v15-lightbox").count()),"Escape did not close lightbox");
  await page.screenshot({path:captures+"/"+label+"-medals.png",fullPage:false});

  // No horizontal overflow from the header, hero, and museum.
  for(const url of [root+"/en/",root+"/ru/company/healthcare/"]){
   await page.goto(url,{waitUntil:"networkidle",timeout:50000});
   const overflow=await page.evaluate(()=>({
      body:document.documentElement.scrollWidth,width:window.innerWidth
   }));
   assert(overflow.body<=overflow.width+2,"Horizontal overflow "+url+" "+JSON.stringify(overflow));
  }
  assert.equal(errors.length,0,"Page errors: "+errors.join("; "));
  await context.close();
  console.log(label+": staff bar, EN+VI hero and interactive medal album passed");
 }
}finally{
 if(browser)await browser.close();
 server.kill();
}
console.log("V15 QA passed. Screenshots: "+captures);
