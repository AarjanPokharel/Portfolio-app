import Link from "next/link";
import AnimatedHeroText from "@/components/AnimatedHeroText";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import InfoSlider from "@/components/InfoSlider";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { GitHubIcon, LinkedInIcon, EmailIcon, ArrowDownIcon, ExternalLinkIcon } from "@/components/Icons";
import {
  formatDisplayDate,
  getBlogPosts,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getRoles,
  getSkills,
} from "@/lib/api";

// Color-code skill pills by category keyword
function getSkillColor(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("cloud") || c.includes("aws") || c.includes("azure") || c.includes("gcp"))
    return "border-orange-700/50 bg-orange-950/40 text-orange-300";
  if (c.includes("devops") || c.includes("ci") || c.includes("cd") || c.includes("docker") || c.includes("k8s") || c.includes("container"))
    return "border-blue-700/50 bg-blue-950/40 text-blue-300";
  if (c.includes("backend") || c.includes("python") || c.includes("django") || c.includes("api") || c.includes("database") || c.includes("db"))
    return "border-emerald-700/50 bg-emerald-950/40 text-emerald-300";
  if (c.includes("frontend") || c.includes("react") || c.includes("next") || c.includes("js") || c.includes("css") || c.includes("ui"))
    return "border-violet-700/50 bg-violet-950/40 text-violet-300";
  if (c.includes("infra") || c.includes("terraform") || c.includes("ansible") || c.includes("linux") || c.includes("network"))
    return "border-yellow-700/50 bg-yellow-950/40 text-yellow-300";
  return "border-slate-700 bg-slate-950 text-slate-300";
}

export default async function Home() {
  const [profile, education, experience, skills, projects, blogPosts, roles] =
    await Promise.all([
      getProfile(),
      getEducation(),
      getExperience(),
      getSkills(),
      getProjects(),
      getBlogPosts(),
      getRoles(),
    ]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayedProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);
  const displayedBlogPosts = blogPosts.slice(0, 3);
  const displayedSkills = skills;

  const experienceSliderItems = experience.map((item) => ({
    id: item.id,
    title: item.job_title,
    subtitle: item.company_name,
    meta: `${formatDisplayDate(item.start_date)} – ${item.currently_working ? "Present" : formatDisplayDate(item.end_date)}`,
    description: item.description,
  }));

  const educationSliderItems = education.map((item) => ({
    id: item.id,
    title: item.school_name,
    subtitle: `${item.degree}${item.field_of_study ? `, ${item.field_of_study}` : ""}`,
    meta: `${formatDisplayDate(item.start_date)} – ${formatDisplayDate(item.end_date)}`,
    description: item.description,
  }));

  return (
    <main className="min-h-screen text-slate-100">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative mx-auto flex min-h-[calc(100vh-65px)] max-w-7xl items-center px-6 py-20">
        {/* Dot grid */}
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute left-10 top-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-20 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/8 blur-3xl" />

        <div className="relative max-w-4xl">
          {/* Status badge */}
          <div className="hero-animate mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300" style={{ animationDelay: "0ms" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile?.headline || "Aspiring Cloud & DevOps Engineer — Open to Opportunities"}
          </div>

          {/* Heading */}
          <h1 className="hero-animate text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl" style={{ animationDelay: "80ms" }}>
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {profile?.full_name || "Aarjan Pokharel"}
            </span>
          </h1>

          {/* Animated typewriter */}
          <div className="hero-animate" style={{ animationDelay: "160ms" }}>
            <AnimatedHeroText roles={roles} />
          </div>

          {/* Bio */}
          <p className="hero-animate mt-8 max-w-2xl text-lg leading-8 text-slate-400" style={{ animationDelay: "240ms" }}>
            {profile?.bio ||
              "I design, build, and deploy cloud-native applications while learning real-world backend, automation, infrastructure, and DevOps practices."}
          </p>

          {/* CTA buttons */}
          <div className="hero-animate mt-9 flex flex-wrap gap-4" style={{ animationDelay: "320ms" }}>
            <Link
              href="#projects"
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-300 hover:shadow-cyan-400/30"
            >
              View My Work →
            </Link>

            {profile?.resume_file_url && (
              <a
                href={profile.resume_file_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Resume ↓
              </a>
            )}
          </div>

          {/* Social icons */}
          <div className="hero-animate mt-8 flex flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
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
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                <EmailIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a href="#skills" aria-label="Scroll down" className="flex flex-col items-center gap-1 text-slate-600 transition hover:text-cyan-400">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDownIcon className="h-4 w-4 animate-bounce-slow" />
          </a>
        </div>
      </section>

      {/* ── TECH STACK ──────────────────────────────────────────── */}
      {displayedSkills.length > 0 && (
        <section id="skills" className="mx-auto max-w-7xl px-6 py-16">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <p className="text-sm uppercase tracking-widest text-cyan-400">Tech Stack</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Technologies I work with</h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedSkills.map((skill, i) => (
              <ScrollReveal key={skill.id} delay={i * 60}>
                <div className={`h-full rounded-2xl border p-5 ${getSkillColor(skill.category)}`}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest opacity-70">
                    {skill.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items_list.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium transition hover:bg-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <ScrollReveal>
          <div className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:grid-cols-[0.75fr_1.25fr] md:p-8">
            {/* Profile image */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              {profile?.profile_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profile_image_url}
                  alt={profile.full_name}
                  className="h-full min-h-[280px] w-full object-cover transition duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center text-slate-600">
                  No photo added yet
                </div>
              )}
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-cyan-400">About Me</p>

              <p className="mt-5 leading-8 text-slate-400">
                {profile?.about_me ||
                  "I'm a Computer Science student who enjoys building things — from backend APIs and full-stack apps to cloud infrastructure and automation. I like understanding how systems work end to end."}
              </p>

              {/* Stats */}
              <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { value: projects.length > 0 ? `${projects.length}+` : "0", label: "Projects" },
                  { value: skills.length > 0 ? `${skills.length}+` : "0", label: "Technologies" },
                  { value: "24/7", label: "Learning" },
                  { value: "🛠", label: "Always Building", isCyan: true },
                ].map(({ value, label, isCyan }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-center transition hover:border-slate-700"
                  >
                    <p className={`text-2xl font-bold ${isCyan ? "text-cyan-300" : "text-white"}`}>{value}</p>
                    <p className="mt-1 text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── EXPERIENCE & EDUCATION ──────────────────────────────── */}
      <ScrollReveal>
        <InfoSlider
          label="Experience"
          heading="Professional and hands-on experience"
          items={experienceSliderItems}
          emptyMessage="Add experience"
        />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <InfoSlider
          label="Education"
          heading="Academic background"
          items={educationSliderItems}
          emptyMessage="Add education"
        />
      </ScrollReveal>

      {/* ── PROJECTS ────────────────────────────────────────────── */}
      {displayedProjects.length > 0 && (
        <section id="projects" className="mx-auto max-w-7xl px-6 py-10">
          <ScrollReveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-cyan-400">Featured Projects</p>
                <h2 className="mt-3 text-3xl font-bold text-white">Things I&apos;ve built</h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {displayedProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80}>
                <article className="card-glow group flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/50">
                  {project.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="mb-5 h-44 w-full rounded-2xl object-cover transition duration-300 group-hover:brightness-110"
                    />
                  ) : (
                    <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-slate-600">
                      <svg className="h-10 w-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition">
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">
                    {project.short_description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech_stack_list.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-4">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-cyan-300"
                      >
                        <GitHubIcon className="h-4 w-4" /> GitHub
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-cyan-300"
                      >
                        <ExternalLinkIcon className="h-4 w-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── RECENT BLOGS ────────────────────────────────────────── */}
      {displayedBlogPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <ScrollReveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-cyan-400">Recent Blogs</p>
                <h2 className="mt-3 text-3xl font-bold text-white">From the blog</h2>
              </div>
              <Link href="/blog" className="hidden text-sm font-semibold text-cyan-400 transition hover:text-cyan-300 md:block">
                View all posts →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {displayedBlogPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 80}>
                <article className="card-glow group flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/50">
                  {post.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.cover_image_url} alt={post.title} className="mb-5 h-44 w-full rounded-2xl object-cover" />
                  ) : (
                    <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-slate-600">
                      <svg className="h-10 w-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-300">{post.title}</h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">{post.excerpt}</p>

                  {post.published_at && (
                    <p className="mt-4 text-xs text-slate-500">{formatDisplayDate(post.published_at)}</p>
                  )}

                  <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-sm font-semibold text-cyan-400 transition hover:text-cyan-300">
                    Read post →
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── HIRE ME + ARCHITECTURE ──────────────────────────────── */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-2">
        <ScrollReveal>
          <div className="h-full rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-8 shadow-lg shadow-cyan-950/20">
            <p className="text-sm uppercase tracking-widest text-cyan-400">Hire Me</p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Want to work together?
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              I&apos;m looking for opportunities to build real things — backend systems,
              cloud infrastructure, full-stack projects, or anything in between.
              Open to internships, freelance, and collaboration.
            </p>
            <Link
              href="/hire-me"
              className="mt-6 inline-block rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
            >
              Send Hiring Inquiry →
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
            <p className="text-sm uppercase tracking-widest text-cyan-400">Architecture</p>
            <h2 className="mt-4 text-3xl font-bold text-white">See how this project is built.</h2>
            {profile?.architecture_description && (
              <p className="mt-3 leading-7 text-slate-400">{profile.architecture_description}</p>
            )}
            <div className="mt-5">
              <ArchitectureDiagram />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <Footer profile={profile} />
    </main>
  );
}
