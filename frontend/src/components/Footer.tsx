import Link from "next/link";
import type { Profile } from "@/lib/api";

type FooterProps = {
  profile?: Profile | null;
};

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Aarjan Pokharel
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-slate-400">
              Cloud-native portfolio built with Django REST Framework, Next.js,
              FastAPI, PostgreSQL, Docker, Terraform, Ansible, GitHub Actions,
              and AWS.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-lg transition hover:border-cyan-400 hover:bg-cyan-400/10"
              >
                🐙
              </a>
            )}

            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-lg transition hover:border-cyan-400 hover:bg-cyan-400/10"
              >
                💼
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-lg transition hover:border-cyan-400 hover:bg-cyan-400/10"
              >
                ✉️
              </a>
            )}

            {profile?.resume_file_url && (
              <a
                href={profile.resume_file_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Resume
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Aarjan Pokharel. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-cyan-300">
              Home
            </Link>
            <Link href="/blog" className="hover:text-cyan-300">
              Blog
            </Link>
            <Link href="/hire-me" className="hover:text-cyan-300">
              Hire Me
            </Link>
            <Link href="/contact" className="hover:text-cyan-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}