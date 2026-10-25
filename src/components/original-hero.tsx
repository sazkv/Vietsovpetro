"use client";

import Link from "next/link";
import {useState} from "react";
import type {Locale} from "@/lib/original-content";
import {messageSet} from "@/lib/messages";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const photos = ["hero-offshore-1.jpg", "hero-offshore-2.jpg", "hero-offshore-3.jpg"];

export default function OriginalHero({locale}: {locale: Locale}) {
  const [active, setActive] = useState(0);
  const m = messageSet(locale);
  return <section className="industrial-hero" aria-labelledby="hero-title">
    <div className="industrial-hero-media" aria-hidden="true">
      {photos.map((name, index) => <img key={name} src={`${basePath}/brand/${name}`} alt="" className={active === index ? "is-active" : ""} fetchPriority={index === 0 ? "high" : undefined}/>) }
    </div>
    <div className="shell industrial-hero-inner">
      <div className="industrial-hero-copy">
        <h1 id="hero-title">{m.home.hero1}<br/>{m.home.hero2}</h1>
        <p>{m.home.heroDescription}</p>
        <div className="hero-actions"><Link href={`/${locale}/company/`}>{m.nav.company}<span aria-hidden="true">↗</span></Link><Link href={`/${locale}/services/`}>{m.nav.services}<span aria-hidden="true">↗</span></Link></div>
      </div>
      <div className="hero-photo-controls" aria-label={m.home.photos}>{photos.map((_, index) => <button key={index} type="button" onClick={() => setActive(index)} aria-label={`${m.home.photo} ${index + 1}`} aria-current={active === index ? "true" : undefined}>{String(index + 1).padStart(2, "0")}</button>)}</div>
    </div>
  </section>;
}
