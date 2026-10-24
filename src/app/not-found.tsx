import Link from "next/link";

export default function NotFound(){
  return <main className="r-document shell">
    <header className="r-document-head"><h1>404</h1></header>
    <p>Page not found.</p>
    <Link className="r-arrow-link" href="/">← Vietsovpetro</Link>
  </main>;
}