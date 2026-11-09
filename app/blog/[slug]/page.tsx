import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CalendarDays, ChevronLeft, Clock, ExternalLink } from "lucide-react";
import { getPost, getReadingMinutes, posts } from "@/lib/posts";
import { contact } from "@/lib/contact";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.description,
    ...(post.isDemo ? { robots: { index: false, follow: true } } : {}),
    alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `/blog/${post.slug}` } : {},
    openGraph: {
      type: "article", locale: "ro_RO", siteName: "Ștefan Drăgan",
      title: post.title, description: post.description,
      images: [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.image.src] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const titledSections = post.sections.filter((section) => section.title);

  return (
    <main id="main-content" className="article-page">
      <article>
        <header className="article-header reading-width">
          <Link href="/blog" className="article-back"><ChevronLeft size={16} aria-hidden="true" /> Toate articolele</Link>
          <div className="post-meta"><span>{post.category}</span><span><Clock size={14} aria-hidden="true" /> {getReadingMinutes(post)} min de lectură</span></div>
          <h1>{post.title}</h1>
          <p className="article-description">{post.description}</p>
          {post.isDemo && <p className="article-demo-note">Exemplu de articol · Text demonstrativ, în pregătire pentru publicare.</p>}
        </header>
        <figure className="article-cover container">
          <Image src={post.image} alt={post.imageAlt} placeholder="blur" sizes="(max-width: 700px) 100vw, 1200px" preload />
        </figure>
        <div className="reading-width article-body">
          {titledSections.length > 1 && <nav className="article-contents" aria-label="Cuprinsul articolului"><span className="eyebrow"><BookOpen size={16} aria-hidden="true" /> În acest articol</span><ul>{titledSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ul></nav>}
          {post.sections.map((section) => (
            <section key={section.id} id={section.id} className="article-section" aria-labelledby={section.title ? `${section.id}-title` : undefined}>
              {section.title && <h2 id={`${section.id}-title`}>{section.title}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          {post.tags && <nav className="article-tags" aria-label="Etichetele articolului">{post.tags.map((tag) => <a key={tag.url} href={tag.url} target="_blank" rel="noopener noreferrer">{tag.label}</a>)}</nav>}
        </div>
        {post.gallery && <div className="article-gallery container">{post.gallery.map((photo) => <figure key={photo.image.src}><Image src={photo.image} alt={photo.alt} placeholder="blur" sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>{photo.alt}</figcaption></figure>)}</div>}
        <div className="reading-width article-end">
          {post.source && <p className="article-source"><a href={post.source.url} target="_blank" rel="noopener noreferrer">{post.source.label} <ExternalLink size={14} aria-hidden="true" /></a></p>}
          <Link href="/blog" className="article-back"><ChevronLeft size={16} aria-hidden="true" /> Înapoi la blog</Link>
        </div>
      </article>
      <aside className="article-invitation reading-width" aria-label="Programare"><p className="eyebrow">Un pas mai departe</p><h2>Vrei să vorbim?</h2><p>Prima ședință este gratuită și se desfășoară online.</p><a className="button button-dark" href={contact.bookingUrl} target="_blank" rel="noopener noreferrer"><CalendarDays size={18} aria-hidden="true" /> Programează o ședință</a></aside>
    </main>
  );
}
