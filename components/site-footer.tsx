import { Brand } from "./brand";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-top"><Brand /><p>Cu timp pentru ceea ce contează.</p><a href="https://www.instagram.com/stefandragan.psih/" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a></div><div className="container footer-bottom"><span>© Ștefan Drăgan</span><span>Un spațiu pentru tine.</span><a href="#top">Înapoi sus ↑</a></div></footer>;
}
