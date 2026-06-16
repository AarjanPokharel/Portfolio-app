import Link from "next/link";
import type { Profile } from "@/lib/api";
import { GitHubIcon, LinkedInIcon, EmailIcon, InstagramIcon } from "./Icons";

type FooterProps = {
  profile?: Profile | null;
};

const columns = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/#about", label: "About" },
      { href: "/#skills", label: "Skills" },
      { href: "/#projects", label: "Projects" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/hire-me", label: "Hire Me" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer({ profile }: FooterProps) {
  const name = profile?.full_name || "Aarjan Pokharel";

  // "Elsewhere" column built from whatever profile links exist
  const elsewhere = [
    profile?.github_url && { href: profile.github_url, label: "GitHub", external: true },
    profile?.linkedin_url && { href: profile.linkedin_url, label: "LinkedIn", external: true },
    profile?.instagram_url && { href: profile.instagram_url, label: "Instagram", external: true },
    profile?.resume_file_url && { href: profile.resume_file_url, label: "Resume", external: true },
    profile?.email && { href: `mailto:${profile.email}`, label: "Email", external: true },
  ].filter(Boolean) as { href: string; label: string; external: boolean }[];

  return (
    <footer className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-3xl border border-line bg-surface/70 p-8 md:p-12">
        {/* ── Link columns ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h2 className="text-xl font-bold text-content">{name}</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
              Cloud-native portfolio built with Next.js, Django REST Framework,
              PostgreSQL, Docker, and AWS.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition hover:text-accent-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {elsewhere.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">
                Elsewhere
              </h3>
              <ul className="mt-4 space-y-2.5">
                {elsewhere.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="text-sm text-muted transition hover:text-accent-soft"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Social row ───────────────────────────────────────── */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-muted">Find me online</p>
          <div className="flex gap-3">
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:bg-accent hover:text-slate-950"
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:bg-accent hover:text-slate-950"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            )}
            {profile?.instagram_url && (
              <a
                href={profile.instagram_url}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:bg-accent hover:text-slate-950"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:bg-accent hover:text-slate-950"
              >
                <EmailIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* ── Copyright ────────────────────────────────────────── */}
        <div className="mt-10 border-t border-line pt-6 text-center text-sm text-faint">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
