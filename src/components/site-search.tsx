"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import type {Locale} from "@/lib/original-content";

type Entry = {title: string; route: string; date: string; section: string};
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SiteSearch({locale, labels}: {locale: Locale; labels: {search: string; placeholder: string; results: string; empty: string}}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [query, setQuery] = useState("");
  useEffect(() => {let live = true; fetch(`${basePath}/search-index-${locale}.json`).then((response) => response.json()).then((items: Entry[]) => {if (live) setEntries(items)}).catch(() => undefined); return () => {live = false};}, [locale]);
  const matches = useMemo(() => {const q = query.trim().toLocaleLowerCase(locale); if (q.length < 2) return []; return entries.filter((item) => item.title.toLocaleLowerCase(locale).includes(q))}, [entries, locale, query]);
  return <div className="site-search"><label htmlFor="site-query">{labels.search}</label><input id="site-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.placeholder} autoComplete="off"/><p className="search-status" aria-live="polite">{query.trim().length > 1 ? `${labels.results}: ${matches.length}` : ""}</p>{query.trim().length > 1 && <ul className="search-results">{matches.slice(0, 60).map((entry) => <li key={entry.route}><Link href={entry.route}><span>{entry.section}{entry.date ? ` / ${entry.date}` : ""}</span><strong>{entry.title}</strong><span aria-hidden="true">↗</span></Link></li>)}{matches.length === 0 && <li className="search-empty">{labels.empty}</li>}</ul>}</div>;
}
