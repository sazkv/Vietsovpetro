import Link from "next/link";

export default function NotFound(){
  return <main className="vx-document shell">
    <header className="vx-document-heading"><h1>404</h1></header>
    <p>Page not found.</p>
    <Link className="vx-text-action" href="/">← Vietsovpetro</Link>
  </main>;
}