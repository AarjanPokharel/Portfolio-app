// SLUG PAGE
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/api";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let post;

  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Blog
        </Link>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mb-8 h-80 w-full rounded-2xl object-cover"
          />
        )}

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Blog Post
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>

        {post.published_at && (
          <p className="mt-4 text-sm text-slate-500">
            Published on {new Date(post.published_at).toLocaleDateString()}
          </p>
        )}

        <p className="mt-6 text-xl text-slate-300">{post.excerpt}</p>

        <div className="mt-10 whitespace-pre-line leading-8 text-slate-300">
          {post.content}
        </div>
      </article>
    </main>
  );
}