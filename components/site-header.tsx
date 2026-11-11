import { Brand } from "./brand";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner"><Brand /><nav aria-label="Navigare principală"><Link href="/#despre">Servicii</Link><Link href="/#prima-sedinta">Prima ședință</Link><Link href="/blog">Blog</Link><Link className="nav-contact" href="/#contact">Să vorbim <MessageCircle size={16} aria-hidden="true" /></Link></nav></div></header>;
}
