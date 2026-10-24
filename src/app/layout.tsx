import type {Metadata} from "next";
import "./globals.css";
import "./editorial.css";
import "./sections.css";
import "./about-resources.css";
import "./polish-v6.css";
import "./fullwidth-v7.css";
import "./leadership-v8.css";
import "./experience-v9.css";

export const metadata: Metadata = {
  title: "Vietsovpetro",
  description: "Vietsovpetro — Liên doanh Việt – Nga",
  robots: {index: false, follow: false},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="vi"><body>{children}</body></html>;
}
