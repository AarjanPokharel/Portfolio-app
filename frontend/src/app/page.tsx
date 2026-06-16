import Link from "next/link";
import AnimatedHeroText from "@/components/AnimatedHeroText";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import ProjectSlider from "@/components/ProjectSlider";
import InfoSlider from "@/components/InfoSlider";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/app/contact/ContactForm";
import { GitHubIcon, LinkedInIcon, EmailIcon, ArrowDownIcon, ExternalLinkIcon, SkillIcon } from "@/components/Icons";
import {
  formatDisplayDate,
  getBlogPosts,
  getEducation,
  getExperience,
  getInvolvements,
  getProfile,
  getProjects,
  getRoles,
  getSkills,
  getStats,
} from "@/lib/api";

// Category accent color for the skill label (readable on both light & dark)
function getSkillColor(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("cloud") || c.includes("aws") || c.includes("azure") || c.includes("gcp"))
    return "text-orange-400 light:text-orange-600";
  if (c.includes("devops") || c.includes("ci") || c.includes("cd") || c.includes("docker") || c.includes("k8s") || c.includes("container"))
    return "text-blue-400 light:text-blue-600";
  if (c.includes("backend") || c.includes("python") || c.includes("django") || c.includes("api") || c.includes("database") || c.includes("db"))
    return "text-emerald-400 light:text-emerald-600";
  if (c.includes("frontend") || c.includes("react") || c.includes("next") || c.includes("js") || c.includes("css") || c.includes("ui"))
    return "text-violet-400 light:text-violet-600";
  if (c.includes("infra") || c.includes("terraform") || c.includes("ansible") || c.includes("linux") || c.includes("network"))
    return "text-amber-400 light:text-amber-600";
  return "text-accent-soft";
}

export default async function Home() {
  const [profile, education, experience, skills, projects, blogPosts, roles, stats, involvements] =
    await Promise.all([
      getProfile(),
      getEducation(),
      getExperience(),
      getSkills(),
      getProjects(),
      getBlogPosts(),
      getRoles(),
      getStats(),
      getInvolvements(),
    ]);

  const featuredProjects = projects.filter((p) => p.featured);
  const displayedProjects = featuredProjects.length > 0 ? featuredProjects : projects;
  const displayedBlogPosts = blogPosts.slice(0, 3);
  const displayedSkills = skills;

  // Backend-driven stats; fall back to sensible computed ones if none are set.
  const displayedStats =
    stats.length > 0
      ? stats.map((s) => ({ value: s.value, label: s.label }))
      : [
          { value: projects.length > 0 ? `${projects.length}+` : "0", label: "Projects" },
          { value: skills.length > 0 ? `${skills.length}+` : "0", label: "Skill Areas" },
          { value: experience.length > 0 ? `${experience.length}+` : "0", label: "Roles" },
          { value: education.length > 0 ? `${education.length}` : "0", label: "Degrees" },
        ];

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
    <main className="min-h-screen text-content">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative mx-auto flex min-h-[calc(100svh-65px)] max-w-7xl items-center overflow-hidden px-6 py-20">
        {/* Dot grid */}
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute left-10 top-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-20 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/8 blur-3xl" />

        <div className="relative grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT: intro */}
          <div>
          {/* Status badge */}
          <div className="hero-animate mb-7 inline-flex items-start gap-2 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent-soft sm:rounded-full sm:items-center" style={{ animationDelay: "0ms" }}>
            <span className="relative mt-1.5 flex h-2 w-2 flex-shrink-0 sm:mt-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile?.headline || "Aspiring Cloud & DevOps Engineer — Open to Opportunities"}
          </div>

          {/* Heading */}
          <h1 className="hero-animate text-4xl font-bold leading-tight tracking-tight text-content sm:text-5xl md:text-7xl" style={{ animationDelay: "80ms" }}>
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              {profile?.full_name || "Aarjan Pokharel"}
            </span>
          </h1>

          {/* Animated typewriter */}
          <div className="hero-animate" style={{ animationDelay: "160ms" }}>
            <AnimatedHeroText roles={roles} />
          </div>

          {/* Bio */}
          <p className="hero-animate mt-8 max-w-2xl text-lg leading-8 text-muted" style={{ animationDelay: "240ms" }}>
            {profile?.bio ||
              "I design, build, and deploy cloud-native applications while learning real-world backend, automation, infrastructure, and DevOps practices."}
          </p>

          {/* CTA buttons */}
          <div className="hero-animate mt-9 flex flex-wrap gap-4" style={{ animationDelay: "320ms" }}>
            <Link
              href="#projects"
              className="rounded-xl bg-accent px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-accent-soft hover:shadow-cyan-400/30"
            >
              View My Work →
            </Link>

            {profile?.resume_file_url && (
              <a
                href={profile.resume_file_url}
                target="_blank"
                rel="noreferrer"
                download
                className="rounded-xl border border-line bg-surface/70 px-5 py-3 font-semibold text-content transition hover:border-accent hover:text-accent-soft"
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
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface/80 text-muted transition hover:border-accent hover:bg-accent/10 hover:text-accent-soft"
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
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface/80 text-muted transition hover:border-accent hover:bg-accent/10 hover:text-accent-soft"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface/80 text-muted transition hover:border-accent hover:bg-accent/10 hover:text-accent-soft"
              >
                <EmailIcon className="h-5 w-5" />
              </a>
            )}
          </div>
          </div>

          {/* RIGHT: Hire-Me form */}
          <div className="hero-animate w-full min-w-0" style={{ animationDelay: "320ms" }}>
            <div className="rounded-3xl border border-accent/20 bg-surface/80 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-soft">Hire Me</p>
              <h2 className="mt-2 text-2xl font-bold text-content">Let&apos;s build something together</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Looking for someone to ship real work? Send me a quick note.
              </p>
              <div className="mt-5">
                <ContactForm defaultMessageType="hire_me" defaultSubject="Hire me inquiry" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block">
          <a href="#skills" aria-label="Scroll down" className="flex flex-col items-center gap-1 text-faint transition hover:text-accent-soft">
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
              <p className="text-sm uppercase tracking-widest text-accent-soft">Tech Stack</p>
              <h2 className="mt-3 text-3xl font-bold text-content">Technologies I work with</h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedSkills.map((skill, i) => (
              <ScrollReveal key={skill.id} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-surface p-5">
                  <div className={`mb-3 flex items-center gap-2 ${getSkillColor(skill.category)}`}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-current/10">
                      <SkillIcon category={skill.category} className="h-4 w-4" />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-widest">
                      {skill.label}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items_list.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-line bg-surface-2 px-3 py-1 text-sm font-medium text-muted transition hover:text-content"
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
          <div className="grid gap-8 rounded-3xl border border-line bg-surface/70 p-6 md:grid-cols-[0.75fr_1.25fr] md:p-8">
            {/* Profile image */}
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
              {profile?.profile_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profile_image_url}
                  alt={profile.full_name}
                  className="h-full min-h-[280px] w-full object-cover transition duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center text-faint">
                  No photo added yet
                </div>
              )}
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-accent-soft">About Me</p>

              <p className="mt-5 text-justify leading-8 text-muted">
                {profile?.about_me ||
                  "I'm a Computer Science student who enjoys building things — from backend APIs and full-stack apps to cloud infrastructure and automation. I like understanding how systems work end to end."}
              </p>

              {/* Stats — managed from Django admin (Portfolio → Stats) */}
              <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
                {displayedStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-line bg-surface-2/80 p-4 text-center transition hover:border-accent/40"
                  >
                    <p className="text-xl font-bold text-content">{stat.value}</p>
                    <p className="mt-1.5 text-xs text-faint">{stat.label}</p>
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
                <p className="text-sm uppercase tracking-widest text-accent-soft">Featured Projects</p>
                <h2 className="mt-3 text-3xl font-bold text-content">Things I&apos;ve built</h2>
              </div>
            </div>
          </ScrollReveal>

          <ProjectSlider projects={displayedProjects} />
        </section>
      )}

      {/* ── RECENT BLOGS ────────────────────────────────────────── */}
      {displayedBlogPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <ScrollReveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-accent-soft">Recent Blogs</p>
                <h2 className="mt-3 text-3xl font-bold text-content">From the blog</h2>
              </div>
              <Link href="/blog" className="hidden text-sm font-semibold text-accent-soft transition hover:text-accent-soft md:block">
                View all posts →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {displayedBlogPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 80}>
                <article className="card-glow group flex h-full flex-col rounded-3xl border border-line bg-surface/70 p-5 transition hover:-translate-y-1 hover:border-accent/50">
                  {post.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.cover_image_url} alt={post.title} className="mb-5 h-44 w-full rounded-2xl bg-surface-2 object-contain" />
                  ) : (
                    <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-surface to-surface-2 text-faint">
                      <svg className="h-10 w-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-content transition group-hover:text-accent-soft">{post.title}</h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted">{post.excerpt}</p>

                  {post.published_at && (
                    <p className="mt-4 text-xs text-faint">{formatDisplayDate(post.published_at)}</p>
                  )}

                  <Link href={`/blog/${post.slug}`} className="mt-5 inline-block text-sm font-semibold text-accent-soft transition hover:text-accent-soft">
                    Read post →
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── CONTACT + ARCHITECTURE ──────────────────────────────── */}
      <section id="contact" className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-2 md:items-start">
        <ScrollReveal className="min-w-0">
          <div className="rounded-3xl border border-accent/20 bg-surface/70 p-6 shadow-lg shadow-black/10 sm:p-8">
            <p className="text-sm uppercase tracking-widest text-accent-soft">Contact</p>
            <h2 className="mt-3 text-3xl font-bold text-content">Send me a message</h2>
            <p className="mt-3 text-justify leading-7 text-muted">
              Have a role, a project, or just a question? Drop me a note and I&apos;ll get back to you.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} className="min-w-0">
          <div className="h-full rounded-3xl border border-line bg-surface/70 p-6 sm:p-8">
            <p className="text-sm uppercase tracking-widest text-accent-soft">Architecture</p>
            <h2 className="mt-4 text-3xl font-bold text-content">See how this project is built.</h2>
            {profile?.architecture_description && (
              <p className="mt-3 text-justify leading-7 text-muted">{profile.architecture_description}</p>
            )}
            {/* Scrolls horizontally within the card on small screens instead of overflowing the page */}
            <div className="mt-5 -mx-2 overflow-x-auto px-2">
              <div className="min-w-[300px]">
                <ArchitectureDiagram />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── BEYOND THE CODE ─────────────────────────────────────── */}
      {involvements.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <ScrollReveal>
            <div className="mb-8">
              <p className="text-sm uppercase tracking-widest text-accent-soft">Beyond the Code</p>
              <h2 className="mt-3 text-3xl font-bold text-content">Leadership &amp; community</h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {involvements.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 80}>
                <div className="h-full rounded-3xl border border-line bg-surface/70 p-6 sm:p-8">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-content">{item.title}</h3>
                      {item.organization && (
                        <p className="mt-1 font-medium text-accent-soft">{item.organization}</p>
                      )}
                    </div>
                    {item.period && (
                      <p className="rounded-full border border-line px-3 py-1 text-xs text-faint">
                        {item.period}
                      </p>
                    )}
                  </div>

                  {item.description && (
                    <ul className="mt-5 space-y-2 text-muted">
                      {item.description
                        .split("\n")
                        .map((line) => line.trim())
                        .filter((line) => line.length > 0)
                        .map((line, index) => (
                          <li key={index} className="flex gap-3 leading-7">
                            <span className="flex h-7 flex-shrink-0 items-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            </span>
                            <span className="text-justify">{line}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <Footer profile={profile} />
    </main>
  );
}
