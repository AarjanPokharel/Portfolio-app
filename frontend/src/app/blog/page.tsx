import Link from "next/link";
import { getBlogPosts } from "@/lib/api";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Blog
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Technical Writing & Learning Notes
        </h1>

        <p className="mt-5 max-w-2xl text-slate-400">
          I use this space to document what I learn while building cloud,
          backend, DevOps, and security projects.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {blogPosts.length === 0 && (
            <p className="text-slate-400">
              No published blog posts yet. Add one from Django Admin and set it
              to published.
            </p>
          )}

          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="mb-5 h-52 w-full rounded-xl object-cover"
                />
              )}

              <h2 className="text-2xl font-semibold">{post.title}</h2>

              <p className="mt-3 text-slate-400">{post.excerpt}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-block font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}