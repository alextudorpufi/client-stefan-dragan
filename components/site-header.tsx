import { Brand } from "./brand";

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner"><Brand /><nav aria-label="Navigare principală"><a href="/#despre">Despre</a><a href="/#prima-sedinta">Prima ședință</a><a className="nav-contact" href="/#contact">Să vorbim <span aria-hidden="true">↗</span></a></nav></div></header>;
}
