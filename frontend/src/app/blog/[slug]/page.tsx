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
    <main className="min-h-screen text-slate-100">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:border-cyan-400/50 hover:text-cyan-300"
        >
          ← Back to Blog
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-950/40">
          {post.cover_image_url && (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-80 w-full object-cover"
            />
          )}

          <div className="p-8 md:p-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Blog Post
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              {post.title}
            </h1>

            {post.published_at && (
              <p className="mt-5 text-sm text-slate-500">
                Published on {new Date(post.published_at).toLocaleDateString()}
              </p>
            )}

            <p className="mt-8 text-xl leading-8 text-slate-300">
              {post.excerpt}
            </p>

            <div className="mt-10 border-t border-slate-800 pt-10">
              <div className="whitespace-pre-line text-lg leading-9 text-slate-300">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}