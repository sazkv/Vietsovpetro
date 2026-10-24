"use client";

import {useRef, useState} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import type {Locale} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

gsap.registerPlugin(useGSAP);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const photos = ["hero-offshore-1.jpg", "hero-offshore-2.jpg", "hero-offshore-3.jpg", "hero-offshore-6.jpg"];

export default function OriginalHero({locale}: {locale: Locale}) {
  const m = messageSet(locale);
  const slides = locale === "vi" ? ["hero-vi-a1.png", "hero-vi-a2.png"] : photos;
  const root = useRef<HTMLElement>(null);
  const goTo = useRef<(index: number) => void>(() => undefined);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    if (!root.current) return;
    const elements = Array.from(root.current.querySelectorAll<HTMLElement>(".hero-slide"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let moving = false;
    const advance = (index: number) => {
      if (index === current || moving) return;
      const next = elements[index];
      const previous = elements[current];
      if (!next || !previous) return;
      moving = true;
      if (reduce) {
        gsap.set(previous, {opacity: 0});
        gsap.set(next, {opacity: 1, clipPath: "inset(0 0 0 0%)"});
        current = index;
        setActive(index);
        moving = false;
        return;
      }
      gsap.set(next, {zIndex: 2, opacity: 1, clipPath: "inset(0 0 0 100%)", scale: 1.035});
      gsap.to(next, {clipPath: "inset(0 0 0 0%)", scale: 1, duration: 1.45, ease: "power3.inOut", onComplete: () => {
        gsap.set(previous, {opacity: 0, zIndex: 0});
        gsap.set(next, {zIndex: 1});
        current = index;
        setActive(index);
        moving = false;
      }});
    };
    goTo.current = advance;
    if (reduce) return;
    let cycle: gsap.core.Tween;
    const tick = () => {
      advance((current + 1) % elements.length);
      cycle = gsap.delayedCall(8.5, tick);
    };
    cycle = gsap.delayedCall(7, tick);
    return () => { cycle.kill(); goTo.current = () => undefined; };
  }, {scope: root, dependencies: [locale]});

  return <section className={`original-hero hero-${locale}`} ref={root} aria-label="Vietsovpetro">
    <div className="hero-slides" aria-hidden="true">{slides.map((name, index) => <img key={name} className="hero-slide" src={`${basePath}/brand/${name}`} alt="" style={{opacity: index === 0 ? 1 : 0}} />)}</div>
    <div className="hero-mobile-photo" aria-hidden="true"><img src={`${basePath}/brand/hero-offshore-1.jpg`} alt="" /></div>
    <div className="hero-statement shell">
      <h1>{m.home.hero1}<br/>{m.home.hero2}{m.home.hero3 && <><br/>{m.home.hero3}</>}</h1>
    </div>
    <div className="hero-controls shell" aria-label="Slides">{slides.map((_, index) => <button type="button" key={index} aria-label={`Slide ${index + 1}`} aria-current={active === index ? "true" : undefined} onClick={() => goTo.current(index)}><span/></button>)}</div>
  </section>;
}
