"use client";

import { useState } from "react";
import Link from "next/link";
import { GitHubIcon, ExternalLinkIcon } from "./Icons";

type Project = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  tech_stack_list: string[];
  github_url: string;
  live_url: string;
  image_url: string | null;
};

type Props = {
  projects: Project[];
};

const PAGE_SIZE = 3;

export default function ProjectSlider({ projects }: Props) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const visible = projects.slice(start, start + PAGE_SIZE);

  return (
    <div>
      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {visible.map((project) => (
          <article
            key={project.id}
            className="card-glow group flex h-full flex-col rounded-3xl border border-line bg-surface/70 p-5 transition hover:-translate-y-1 hover:border-accent/50"
          >
            {project.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image_url}
                alt={project.title}
                className="mb-5 h-44 w-full rounded-2xl bg-surface-2 object-contain transition duration-300 group-hover:brightness-110"
              />
            ) : (
              <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-surface to-surface-2 text-faint">
                <svg className="h-10 w-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}

            <h3 className="text-xl font-semibold text-content transition group-hover:text-accent-soft">
              {project.title}
            </h3>

            <p className="mt-3 flex-1 text-sm leading-6 text-muted">
              {project.short_description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech_stack_list.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent-soft">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-4">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-accent-soft"
                >
                  <GitHubIcon className="h-4 w-4" /> GitHub
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-accent-soft"
                >
                  <ExternalLinkIcon className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Navigation */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === page ? "w-8 bg-accent" : "w-2.5 bg-line hover:bg-faint"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-xl border border-line bg-surface-2 px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent-soft disabled:cursor-not-allowed disabled:opacity-30"
            >
              ❮ Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="rounded-xl border border-line bg-surface-2 px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent-soft disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next ❯
            </button>
          </div>

          {/* Counter */}
          <p className="text-sm text-faint">
            {start + 1}–{Math.min(start + PAGE_SIZE, projects.length)} of {projects.length}
          </p>
        </div>
      )}
    </div>
  );
}
