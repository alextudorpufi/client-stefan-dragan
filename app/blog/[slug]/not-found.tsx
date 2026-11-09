import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function ArticleNotFound() {
  return <main id="main-content" className="container blog-heading blog-missing"><p className="eyebrow">Blog</p><h1>Articolul nu a<br /><em>fost găsit.</em></h1><p>Poți reveni la lista de articole pentru a continua lectura.</p><Link className="button button-dark" href="/blog"><BookOpen size={18} aria-hidden="true" /> Vezi articolele</Link></main>;
}
