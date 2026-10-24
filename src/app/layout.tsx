import type {Metadata} from "next";
import "./globals.css";
import "./editorial.css";
import "./sections.css";

export const metadata: Metadata = {
  title: "Vietsovpetro",
  description: "Vietsovpetro — Liên doanh Việt – Nga",
  robots: {index: false, follow: false},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="vi"><body>{children}</body></html>;
}
