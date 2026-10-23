"use client";

import Link from "next/link";
import {useState} from "react";
import type {ContentItem} from "@/lib/site-map";

export default function NewsCarousel({items}:{items:ContentItem[]}) {
  const [current, setCurrent] = useState(0);
  const item = items[current];
  const move = (direction:number) => setCurrent(index => (index + direction + items.length) % items.length);
  return <div className="news-carousel" aria-roledescription="carousel" aria-label="Tin tức Vietsovpetro">
    <div className="news-count"><span>{String(current + 1).padStart(2, "0")}</span><span> / {String(items.length).padStart(2, "0")}</span></div>
    <div className="news-stage" key={item.slug}>
      <time>{item.date || "Tin tức"}</time>
      <h3><Link href={"/news/" + item.slug}>{item.vi}</Link></h3>
      <p>{item.summary}</p>
      <Link className="text-link" href={"/news/" + item.slug}>Xem tin và nguồn gốc <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="carousel-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Tin trước">←</button>
      <button type="button" onClick={() => move(1)} aria-label="Tin tiếp">→</button>
    </div>
  </div>;
}

