import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/posts";

const title = "Blog — Gânduri și conversații";
const description = "Articole, reflecții și povești din activitatea lui Ștefan Drăgan. Un loc pentru lectură, întrebări și perspective noi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/blog" } : {},
  openGraph: { title, description, type: "website", locale: "ro_RO" },
  twitter: { card: "summary_large_image", title, description },
};

export default function BlogPage() {
  return (
    <main id="main-content" className="blog-page">
      <section className="blog-heading container">
        <p className="eyebrow">Blog / Un timp pentru lectură</p>
        <h1>Gânduri care deschid<br /><em>conversații.</em></h1>
        <p>Articole, reflecții și povești din activitate. De citit în ritmul tău.</p>
      </section>
      <section className="container blog-list" aria-label="Articole">
        {posts.map((post, index) => <PostCard key={post.slug} post={post} featured={index === 0} />)}
      </section>
    </main>
  );
}
