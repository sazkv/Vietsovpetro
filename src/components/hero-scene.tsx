"use client";

import {useRef} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroScene() {
  const scene = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(".scene-vessel", {x: 62, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1});
    gsap.to(".scene-hook", {y: 18, duration: 4.8, ease: "sine.inOut", yoyo: true, repeat: -1});
    gsap.to(".scene-water-a", {x: -48, duration: 10, ease: "none", yoyo: true, repeat: -1});
    gsap.to(".scene-water-b", {x: 36, duration: 13, ease: "none", yoyo: true, repeat: -1});
  }, {scope: scene});
  return <svg ref={scene} className="hero-scene" viewBox="0 0 840 620" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="scene-title scene-description" xmlns="http://www.w3.org/2000/svg">
    <title id="scene-title">Minh họa công trình dầu khí ngoài khơi</title>
    <desc id="scene-description">Một giàn khai thác và tàu dịch vụ trên mặt biển, được trình bày như bản vẽ kỹ thuật.</desc>
    <defs>
      <linearGradient id="scene-sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#F2F7F6"/><stop offset=".72" stopColor="#D8E9EB"/><stop offset="1" stopColor="#B4D0D8"/></linearGradient>
      <linearGradient id="scene-sea" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#8CB3C0"/><stop offset=".62" stopColor="#487E93"/><stop offset="1" stopColor="#205467"/></linearGradient>
      <linearGradient id="scene-steel" x1="0" x2="1"><stop stopColor="#153847"/><stop offset=".58" stopColor="#365D6C"/><stop offset="1" stopColor="#183B4D"/></linearGradient>
      <pattern id="scene-grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#18485A" strokeOpacity=".07"/></pattern>
    </defs>
    <rect width="840" height="620" fill="url(#scene-sky)"/>
    <rect width="840" height="450" fill="url(#scene-grid)"/>
    <path d="M0 408c112-16 195-9 298-8 107 1 183-12 277-8 104 4 176 12 265 0v228H0Z" fill="url(#scene-sea)"/>
    <path d="M0 404c156-17 260 4 408-8 164-13 288 14 432-8" stroke="#F7FBFA" strokeOpacity=".78" strokeWidth="3" fill="none"/>
    <g className="scene-water-a" stroke="#D5EBEC" strokeOpacity=".55" strokeWidth="2" fill="none"><path d="M20 454h168m63-14h105m318 18h150M53 499h193m245-44h130M278 529h184"/></g>
    <g className="scene-water-b" stroke="#164C63" strokeOpacity=".3" strokeWidth="2" fill="none"><path d="M0 474h115m155 22h184m129-22h170M91 555h215m298-29h236"/></g>
    <g className="scene-platform" fill="none" stroke="#173D4E" strokeLinejoin="miter">
      <path d="M322 340 303 432m215-92 24 93m129-93 20 93" strokeWidth="15"/>
      <path d="m319 364 203 57m0-57-206 58m208-57 156 53m-9-55-149 56" strokeWidth="4" strokeOpacity=".75"/>
      <path d="M258 325h463v31H258z" fill="url(#scene-steel)" strokeWidth="3"/>
      <path d="M280 312h418" strokeWidth="5"/>
      <path d="M277 304v-40h182v40M477 304v-65h109v65M603 304v-51h78v51" strokeWidth="5"/>
      <path d="M297 264v-84h100v84m-100-53h100m-100 26h100m-73-57v84m47-84v84" strokeWidth="4"/>
      <path d="M483 239v-45h96v45m-96-21h96m-65-24v45m35-45v45" strokeWidth="4"/>
      <path d="M603 253v-95h20v95m39 0v-65h14v65" strokeWidth="5"/>
      <path d="M402 312 456 83h51l57 229M435 173h101m-89-49h76m-79 95h90m-68-136 42 229m-1-229-41 229" strokeWidth="5"/>
      <path d="m424 247 116 47m-99-112 82 38m-67-92 67 43m-66 46 82 38m-102-7 105-50" strokeWidth="2" strokeOpacity=".68"/>
      <path d="M456 83h51m-37-17h24m-12-16v34" stroke="#C33530" strokeWidth="7"/>
      <path d="M268 311v-57h12v57m409 0v-57h12v57M250 325v-20h485v20" strokeWidth="3"/>
      <path d="M274 275h-71l-40-77m40 77 124-52m-123-24 122 24" strokeWidth="5"/>
      <path d="M203 275v88" strokeWidth="2" strokeDasharray="7 6"/>
      <g className="scene-hook"><path d="M203 361v23" strokeWidth="3"/><path d="M193 384h20l-10 14z" fill="#C33530" strokeWidth="2"/></g>
      <path d="M256 356h470m-469-10h469" stroke="#BFD4DA" strokeWidth="2"/>
    </g>
    <g fill="#C33530"><path d="M307 179h12v84h-12z"/><path d="M603 175h20v18h-20z"/><path d="M661 206h15v18h-15z"/></g>
    <g className="scene-vessel">
      <path d="M26 433h200l-27 31H64Z" fill="#133E50"/>
      <path d="M74 431v-36h72v36m-58-37v-19h30v19" fill="#F5F7F3" stroke="#163F50" strokeWidth="4"/>
      <path d="M149 430v-51h11v51m-11-41h36" stroke="#163F50" strokeWidth="4" fill="none"/>
      <path d="M52 446h166" stroke="#D84B3F" strokeWidth="6"/>
      <path d="M89 408h15m11 0h15" stroke="#5D8695" strokeWidth="5"/>
    </g>
    <path d="M28 465c25 5 52 6 81 2m85 0c35 6 62 5 95 1" stroke="#E6F3F1" strokeWidth="3" fill="none" opacity=".75"/>
    <g className="scene-caption" fill="#16485B" fontFamily="Arial,sans-serif" fontSize="10" letterSpacing="2"><text x="34" y="42">OFFSHORE / VIETNAM</text><text x="625" y="42">ILLUSTRATION / NOT TO SCALE</text></g>
  </svg>;
}

