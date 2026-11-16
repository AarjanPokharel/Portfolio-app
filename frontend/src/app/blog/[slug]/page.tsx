// SLUG PAGE
import Link from "next/link";
import { notFound } from "next/navigation";
// import { formatDisplayDate, getBlogPost } from "@/lib/api";
import { formatDisplayDate, getBlogPost, getBlogPosts } from "@/lib/api";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// A static site can't build pages on request, so list every post up front
export const dynamicParams = false;

// export async function generateStaticParams() {
//   const posts = await getBlogPosts();
//   return posts.map((post) => ({ slug: post.slug }));
// }

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  // A static export needs at least one page per [slug] route.
  // With no posts yet, build one placeholder that renders the 404 page.
  if (posts.length === 0) return [{ slug: "coming-soon" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let post;

  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen text-content">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center rounded-full border border-line bg-surface/70 px-4 py-2 text-sm font-semibold text-accent-soft transition hover:border-accent/50 hover:text-accent"
        >
          ← Back to Blog
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-line bg-surface/70 shadow-2xl shadow-black/10">
          {post.cover_image_url && (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="max-h-[32rem] w-full bg-surface-2 object-contain"
            />
          )}

          <div className="p-8 md:p-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-soft">
              Blog Post
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-content md:text-6xl">
              {post.title}
            </h1>

            {post.published_at && (
              <p className="mt-5 text-sm text-faint">
                Published on {formatDisplayDate(post.published_at)}
              </p>
            )}

            <p className="mt-8 text-xl leading-8 text-muted">
              {post.excerpt}
            </p>

            <div className="mt-10 border-t border-line pt-10">
              <div className="whitespace-pre-line text-justify leading-9 text-muted">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
