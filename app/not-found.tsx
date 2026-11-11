import Link from "next/link";
import { House } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="container blog-heading blog-missing">
      <p className="eyebrow">404 / Pagina nu a fost găsită</p>
      <h1>Înapoi la<br /><em>un loc cunoscut.</em></h1>
      <p>Pagina pe care o cauți nu există sau a fost mutată.</p>
      <Link href="/" className="button button-dark"><House size={18} aria-hidden="true" /> Pagina principală</Link>
    </main>
  );
}
