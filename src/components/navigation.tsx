"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {groups} from "@/lib/site-map";

const primary = groups.filter(group => ["company", "services", "projects", "news"].includes(group.slug));

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setDirectoryOpen(false);
  }, [pathname]);

  return <>
    <div className="concept-strip">
      <div className="container concept-inner">
        <span>Bản đề xuất thiết kế độc lập · Không phải website chính thức</span>
        <a href="https://www.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">Website chính thức <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Vietsovpetro concept — Trang chủ" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><i/><i/><i/></span>
          <span className="brand-name">VIETSOVPETRO<small>LIÊN DOANH VIỆT – NGA</small></span>
        </Link>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Điều hướng chính">
          {primary.map(group => <Link key={group.slug} href={"/" + group.slug} className={pathname.startsWith("/" + group.slug) ? "is-current" : ""}>{group.vi}</Link>)}
          <div className="directory-menu">
            <button type="button" aria-expanded={directoryOpen} aria-controls="directory-links" onClick={() => setDirectoryOpen(value => !value)}>
              Danh mục <span aria-hidden="true">{directoryOpen ? "−" : "+"}</span>
            </button>
            <div id="directory-links" className={directoryOpen ? "directory-links is-open" : "directory-links"}>
              {groups.map(group => <Link key={group.slug} href={"/" + group.slug}>{group.vi}<span aria-hidden="true">↗</span></Link>)}
              <Link href="/systems">Hệ thống & liên kết<span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <Link className="mobile-only" href="/units">Đơn vị trực thuộc</Link>
          <Link className="mobile-only" href="/resources">Nguồn lực</Link>
          <Link className="mobile-only" href="/careers">Tuyển dụng – Đào tạo</Link>
          <Link className="mobile-only" href="/contact">Liên hệ</Link>
          <Link className="mobile-only" href="/systems">Hệ thống & liên kết</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/search" className="search-link" aria-label="Tìm kiếm"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg></Link>
          <button type="button" className="menu-toggle" aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open} onClick={() => {setOpen(value => !value); setDirectoryOpen(false);}}>
            <span/><span/>
          </button>
        </div>
      </div>
    </header>
  </>;
}

