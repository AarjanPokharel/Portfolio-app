import Link from "next/link";
import type { Profile } from "@/lib/api";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "./Icons";

type FooterProps = {
  profile?: Profile | null;
};

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-3xl border border-line bg-surface/70 p-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-content">{profile?.full_name || "Aarjan Pokharel"}</h2>
            <p className="mt-3 max-w-xl leading-7 text-muted">
              Cloud-native portfolio built with Django REST Framework, Next.js,
              PostgreSQL, Docker, and AWS.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted transition hover:border-accent hover:bg-accent/10 hover:text-accent-soft"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            )}

            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted transition hover:border-accent hover:bg-accent/10 hover:text-accent-soft"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-muted transition hover:border-accent hover:bg-accent/10 hover:text-accent-soft"
              >
                <EmailIcon className="h-5 w-5" />
              </a>
            )}

            {profile?.resume_file_url && (
              <a
                href={profile.resume_file_url}
                target="_blank"
                rel="noreferrer"
                download
                className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent-soft"
              >
                Resume ↓
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-line pt-6 text-sm text-faint md:flex-row">
          <p>© {new Date().getFullYear()} {profile?.full_name || "Aarjan Pokharel"}. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/" className="transition hover:text-accent-soft">Home</Link>
            <Link href="/blog" className="transition hover:text-accent-soft">Blog</Link>
            <Link href="/hire-me" className="transition hover:text-accent-soft">Hire Me</Link>
            <Link href="/contact" className="transition hover:text-accent-soft">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
