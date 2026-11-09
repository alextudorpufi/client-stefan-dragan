import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { getReadingMinutes, type BlogPost } from "@/lib/posts";

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`post-card${featured ? " post-card-featured" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="post-card-link">
        <div className="post-card-image">
          <Image src={post.image} alt={post.imageAlt} fill placeholder="blur" sizes={featured ? "(max-width: 700px) 100vw, 58vw" : "(max-width: 700px) 100vw, 40vw"} />
        </div>
        <div className="post-card-copy">
          <div className="post-meta"><span>{post.category}</span>{post.isDemo && <span className="demo-label">Exemplu de articol</span>}</div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <div className="post-card-bottom"><span><BookOpen size={17} aria-hidden="true" /> Citește articolul</span><span><Clock size={14} aria-hidden="true" /> {getReadingMinutes(post)} min</span></div>
        </div>
      </Link>
    </article>
  );
}
