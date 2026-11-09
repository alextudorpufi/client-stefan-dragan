import { Brand } from "./brand";
import { ChevronUp } from "lucide-react";
import { ContactLinks } from "./contact-links";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Brand />
        <p>Psihoterapie și evaluare clinică online.</p>
        <ContactLinks variant="footer" />
      </div>
      <div className="container footer-bottom">
        <span>© Ștefan Drăgan</span><Link href="/blog">Blog</Link>
        <a href="#top">Înapoi sus <ChevronUp size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
