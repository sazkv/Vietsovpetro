import Link from "next/link";
import {groups} from "@/lib/site-map";

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-main">
        <div className="footer-intro">
          <Link href="/" className="footer-wordmark">VIETSOVPETRO<span>.</span></Link>
          <p>Hợp tác trên biển. Kiến tạo từ chiều sâu.</p>
          <span>Bản đề xuất thiết kế độc lập. Không thuộc, không được Vietsovpetro ủy quyền hay vận hành.</span>
        </div>
        <div className="footer-link-column"><strong>Khám phá</strong>{groups.slice(0,4).map(group => <Link key={group.slug} href={"/" + group.slug}>{group.vi}</Link>)}</div>
        <div className="footer-link-column"><strong>Thông tin</strong>{groups.slice(4).map(group => <Link key={group.slug} href={"/" + group.slug}>{group.vi}</Link>)}<Link href="/systems">Hệ thống & liên kết</Link></div>
        <div className="footer-link-column"><strong>Liên hệ công bố</strong><span>105 Lê Lợi, phường Vũng Tàu,<br/>TP. Hồ Chí Minh, Việt Nam</span><a href="tel:+842543839871">+84 254 3839 871</a><a href="https://www.vietsov.com.vn/" target="_blank" rel="noopener noreferrer">Website chính thức ↗</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 · Independent design study</span><span>Nội dung gốc thuộc Vietsovpetro · Đang đối chiếu nguồn</span></div>
    </div>
  </footer>;
}

