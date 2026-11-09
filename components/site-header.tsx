import { Brand } from "./brand";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner"><Brand /><nav aria-label="Navigare principală"><a href="/#despre">Servicii</a><a href="/#prima-sedinta">Prima ședință</a><Link href="/blog">Blog</Link><a className="nav-contact" href="/#contact">Să vorbim <MessageCircle size={16} aria-hidden="true" /></a></nav></div></header>;
}
