import Link from "next/link";
import { formatDisplayDate, getBlogPosts } from "@/lib/api";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="min-h-screen text-content">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-line bg-surface/70 p-8 shadow-2xl shadow-black/10 md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-soft">
            Blog
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-content md:text-6xl">
            Writing, notes, and things on my mind.
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-muted">
            Tech deep-dives, project write-ups, and whatever else I find interesting.
            Not limited to any one topic.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogPosts.length === 0 && (
            <div className="rounded-3xl border border-line bg-surface/70 p-8 text-muted">
              No published blog posts yet.
            </div>
          )}

          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl border border-line bg-surface/70 p-5 transition hover:-translate-y-1 hover:border-accent/50"
            >
              {post.cover_image_url ? (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="mb-5 h-48 w-full rounded-2xl bg-surface-2 object-contain"
                />
              ) : (
                <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-surface-2 text-faint">
                  Blog image
                </div>
              )}

              <p className="mb-3 text-xs uppercase tracking-widest text-accent-soft">
                Blog Post
              </p>

              <h2 className="text-xl font-semibold text-content group-hover:text-accent-soft">
                {post.title}
              </h2>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                {post.excerpt}
              </p>

              {post.published_at && (
                <p className="mt-4 text-xs text-faint">
                  {formatDisplayDate(post.published_at)}
                </p>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-block text-sm font-semibold text-accent-soft hover:text-accent"
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
