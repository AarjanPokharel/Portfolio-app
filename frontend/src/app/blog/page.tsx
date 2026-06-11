import Link from "next/link";
import { formatDisplayDate, getBlogPosts } from "@/lib/api";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="min-h-screen text-slate-100">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40 md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Blog
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Writing, notes, and things on my mind.
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-slate-400">
            Tech deep-dives, project write-ups, and whatever else I find interesting.
            Not limited to any one topic.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogPosts.length === 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-slate-400">
              No published blog posts yet.
            </div>
          )}

          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/50"
            >
              {post.cover_image_url ? (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="mb-5 h-48 w-full rounded-2xl bg-slate-950 object-contain"
                />
              ) : (
                <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-slate-950 text-slate-600">
                  Blog image
                </div>
              )}

              <p className="mb-3 text-xs uppercase tracking-widest text-cyan-400">
                Blog Post
              </p>

              <h2 className="text-xl font-semibold text-white group-hover:text-cyan-300">
                {post.title}
              </h2>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                {post.excerpt}
              </p>

              {post.published_at && (
                <p className="mt-4 text-xs text-slate-500">
                  {formatDisplayDate(post.published_at)}
                </p>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Read post →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}