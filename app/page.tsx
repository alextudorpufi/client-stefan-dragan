import { ProfilePicture } from "@/components/profile-picture";
import { ContactLinks } from "@/components/contact-links";
import { CalendarDays, ChevronDown, ExternalLink } from "lucide-react";
import { contact } from "@/lib/contact";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/posts";

const supportAreas = [
  {
    title: "Dependențe",
    description: "Experiență de lucru în clinică de dezintoxicare, cu o abordare fără judecată și orientată spre reducerea riscurilor.",
  },
  {
    title: "Anxietate și depresie",
    description: "Griji persistente, atacuri de panică, tristețe sau lipsă de motivație.",
  },
  {
    title: "ADHD și autism la adulți",
    description: "Sprijin pentru dificultățile cu care te confrunți în viața de zi cu zi.",
  },
  {
    title: "Adaptare și schimbări de viață",
    description: "Stres, relaționare și dificultăți de adaptare în perioade de schimbare.",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero atmosphere">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-line" /> Psihoterapie și evaluare clinică online</p>
            <h1>Un spațiu pentru tine.<br /><em>În ritmul tău.</em></h1>
            <p className="hero-description hero-professional-intro">Sunt Ștefan Drăgan, psihoterapeut CBT și psiholog clinician în supervizare. Lucrez online cu adulți și adolescenți.</p>
            <a className="button button-light" href={contact.bookingUrl} target="_blank" rel="noopener noreferrer">Programează prima ședință <CalendarDays size={19} aria-hidden="true" /></a>
          </div>
          <div className="hero-art hero-portrait"><ProfilePicture /><span className="art-note">Ștefan Drăgan</span></div>
        </div>
        <div className="container hero-bottom"><span>Exclusiv online · Prima ședință gratuită</span><a href="#despre">Cum te pot ajuta <ChevronDown size={17} aria-hidden="true" /></a></div>
      </section>
      <section className="intro section-space" id="despre">
        <div className="container intro-grid">
          <div><p className="eyebrow">01 / Servicii</p><h2>Sprijin adaptat<br /><em>nevoilor tale.</em></h2></div>
          <div className="content-slot about-copy">
            <div className="service-item">
              <h3>Psihoterapie individuală</h3>
              <p>Ședințe de psihoterapie cognitiv-comportamentală (CBT) pentru adulți și adolescenți, în format online.</p>
            </div>
            <div className="service-item">
              <h3>Evaluare clinică</h3>
              <p>Evaluare psihologică și psihodiagnostic, inclusiv evaluarea emoțională, cognitivă, comportamentală și a personalității.</p>
            </div>
            <a className="text-link professional-profile-link" href={contact.professionalProfileUrl} target="_blank" rel="noopener noreferrer">Profil profesional pe La-Psiholog.ro <ExternalLink size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <section className="approach section-space" id="abordare" aria-labelledby="approach-title">
        <div className="container approach-grid">
          <div className="approach-intro">
            <p className="eyebrow">02 / Abordarea mea</p>
            <h2 id="approach-title">Încredere.<br /><em>Fără judecată.</em></h2>
            <p>Îmi doresc să îți poți explora gândurile, emoțiile și identitatea într-un spațiu sigur. Lucrăm în ritmul tău, pentru a descoperi resursele cu care poți înfrunta dificultățile.</p>
            <p className="practice-principles">Autenticitate · Acceptare necondiționată · Curiozitate · Răbdare</p>
          </div>
          <div className="practice-values">
            <h3>Cu ce te pot<br /><em>sprijini</em></h3>
            <dl className="values-list">
              {supportAreas.map((value, index) => (
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
          <div><p className="eyebrow">03 / Prima ședință</p><h2>Prima ședință<br /><em>este gratuită.</em></h2><p className="session-caption">Ne cunoaștem și stabilim împreună obiectivele pentru care vom lucra.</p></div>
          <div className="session-detail">
            <h3>Cum începi</h3>
            <ol className="session-steps">
              <li>Alegi un interval disponibil în calendar.</li>
              <li>Ne întâlnim online și vorbim despre ce te aduce la terapie.</li>
              <li>Discutăm despre nevoile tale și cum putem lucra împreună.</li>
            </ol>
          </div>
        </div>
      </section>
      <section className="blog-preview section-space" id="blog" aria-labelledby="blog-preview-title">
        <div className="container">
          <div className="blog-preview-heading"><div><p className="eyebrow">04 / Din blog</p><h2 id="blog-preview-title">Un timp pentru<br /><em>lectură.</em></h2></div><Link href="/blog" className="text-link">Toate articolele <BookOpen size={18} aria-hidden="true" /></Link></div>
          {posts.slice(0, 1).map((post) => <PostCard key={post.slug} post={post} featured />)}
        </div>
      </section>
      <section className="contact section-space" id="contact">
        <div className="container contact-inner">
          <p className="eyebrow">05 / Să păstrăm legătura</p>
          <h2>Programează<br /><em>prima întâlnire.</em></h2>
          <p>Ședințele se desfășoară exclusiv online. Pentru întrebări, mă poți suna.</p>
          <ContactLinks />
          <details className="scheduler">
            <summary><CalendarDays size={19} aria-hidden="true" /><span>Vezi disponibilitatea aici</span><ChevronDown className="scheduler-chevron" size={18} aria-hidden="true" /></summary>
            <iframe
              src={contact.bookingUrl}
              title="Programează o ședință cu Ștefan Drăgan în Google Calendar"
              loading="lazy"
              className="booking-calendar"
            />
            <p className="scheduler-note">Poți deschide programările și <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer">direct în Google Calendar</a>.</p>
          </details>
        </div>
      </section>
    </main>
  );
}
