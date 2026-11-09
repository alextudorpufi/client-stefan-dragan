import { ProfilePicture } from "@/components/profile-picture";

const practiceValues = [
  {
    title: "Autenticitate",
    description: "Un spațiu în care poți fi tu, cu gândurile, emoțiile și experiențele tale, așa cum sunt ele.",
  },
  {
    title: "Acceptare necondiționată",
    description: "Te întâmpin cu deschidere și fără judecată, cu respect pentru povestea și identitatea ta.",
  },
  {
    title: "Curiozitate",
    description: "Explorăm împreună ceea ce trăiești, cu întrebări și cu dorința de a înțelege ce este important pentru tine.",
  },
  {
    title: "Răbdare",
    description: "Lucrăm în ritmul tău, cu respect pentru timpul de care ai nevoie să te descoperi și să faci pași spre schimbare.",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero atmosphere">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-line" /> Un loc pentru conversație</p>
            <h1>Un spațiu pentru tine.<br /><em>În ritmul tău.</em></h1>
            <p className="hero-description">Un spațiu sigur pentru gândurile, emoțiile și povestea ta.</p>
            <a className="button button-light" href="#despre">Descoperă spațiul <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-art hero-portrait"><ProfilePicture /><span className="art-note">Ștefan Drăgan</span></div>
        </div>
        <div className="container hero-bottom"><span>Cu timp. Cu grijă. Cu deschidere.</span><a href="#despre">Mai departe <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className="intro section-space" id="despre">
        <div className="container intro-grid">
          <div><p className="eyebrow">01 / Despre</p><h2>O întâlnire.<br /><em>Un început.</em></h2></div>
          <div className="content-slot about-copy">
            <span className="slot-label">Un spațiu pentru povestea ta</span>
            <p>Am pornit acest proiect din dorința de a crea un spațiu sigur, în care să îți poți explora gândurile, emoțiile și propria identitate, fără teama de a fi judecat.</p>
            <p>Ofer ședințe de psihoterapie cognitiv-comportamentală și evaluare clinică, în format online.</p>
            <span className="editorial-note">În curând, și fizic în Cluj-Napoca.</span>
          </div>
        </div>
      </section>
      <section className="approach section-space" id="abordare" aria-labelledby="approach-title">
        <div className="container approach-grid">
          <div className="approach-intro">
            <p className="eyebrow">02 / Abordarea mea</p>
            <h2 id="approach-title">Cred în<br /><em>potențialul tău.</em></h2>
            <p>Cred că fiecare om are potențialul de a-și înfrunta problemele și fricile. Rolul meu este să te sprijin să descoperi acest potențial.</p>
          </div>
          <div className="practice-values">
            <h3>Valorile care îmi<br /><em>ghidează practica</em></h3>
            <dl className="values-list">
              {practiceValues.map((value, index) => (
                <div className="value-row" key={value.title}>
                  <dt><span className="value-number" aria-hidden="true">0{index + 1}</span><span>{value.title}</span></dt>
                  <dd>{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section className="session atmosphere" id="prima-sedinta">
        <div className="container session-grid">
          <div><p className="eyebrow">03 / Prima ședință</p><h2>Totul începe cu<br /><em>o conversație.</em></h2><p className="session-caption">Un loc pentru întrebări. Și pentru începuturi.</p></div>
          <div className="session-detail">
            <span className="asterisk" aria-hidden="true">✳</span>
            <p>Prima ședință<br />este gratuită.</p>
            <span className="session-rule" />
            <p className="session-description">Este o ocazie să ne cunoaștem și să stabilim împreună obiectivele pentru care vom lucra.</p>
          </div>
        </div>
      </section>
      <section className="contact section-space" id="contact">
        <div className="container contact-inner"><p className="eyebrow">04 / Să păstrăm legătura</p><h2>Loc pentru<br /><em>următorul pas.</em></h2><p>Datele de contact vor fi adăugate în curând.</p><a className="text-link" href="https://www.instagram.com/stefandragan.psih/" target="_blank" rel="noopener noreferrer">Între timp, pe Instagram <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}
