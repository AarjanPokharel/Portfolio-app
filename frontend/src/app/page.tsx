import Link from "next/link";
import AnimatedHeroText from "@/components/AnimatedHeroText";
import InfoSlider from "@/components/InfoSlider";
import Footer from "@/components/Footer";
import {
  formatDisplayDate,
  getBlogPosts,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/api";

export default async function Home() {
  const [profile, education, experience, skills, projects, blogPosts] =
    await Promise.all([
      getProfile(),
      getEducation(),
      getExperience(),
      getSkills(),
      getProjects(),
      getBlogPosts(),
    ]);

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);

  const displayedProjects =
    featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  const displayedBlogPosts = blogPosts.slice(0, 3);
  const displayedSkills = skills.slice(0, 12);
  // const latestExperience = experience[0];
  // const latestEducation = education[0];

  const experienceSliderItems = experience.map((item) => ({
    id: item.id,
    title: item.job_title,
    subtitle: item.company_name,
    meta: `${formatDisplayDate(item.start_date)} - ${
      item.currently_working ? "Present" : formatDisplayDate(item.end_date)
    }`,
    description: item.description,
  }));

  const educationSliderItems = education.map((item) => ({
    id: item.id,
    title: item.school_name,
    subtitle: `${item.degree}${
      item.field_of_study ? `, ${item.field_of_study}` : ""
    }`,
    meta: `${formatDisplayDate(item.start_date)} - ${formatDisplayDate(
      item.end_date
    )}`,
    description: item.description,
  }));

  return (
    <main className="min-h-screen text-slate-100">
      {/* HERO */}
      <section className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-20">
        <div className="pointer-events-none absolute left-10 top-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-20 top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Aspiring Cloud & DevOps Engineer
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {profile?.full_name || "Aarjan Pokharel"}
            </span>
          </h1>

          <AnimatedHeroText />

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            I design, build, and deploy cloud-native applications while learning
            real-world backend, automation, infrastructure, and DevOps practices.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
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

          <div className="mt-8 flex flex-wrap gap-3">
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-lg transition hover:border-cyan-400 hover:bg-cyan-400/10"
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
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-lg transition hover:border-cyan-400 hover:bg-cyan-400/10"
              >
                💼
              </a>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-lg transition hover:border-cyan-400 hover:bg-cyan-400/10"
              >
                ✉️
              </a>
            )}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
    {displayedSkills.length > 0 && (
      <section id="skills" className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40">
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
            Tech Stack
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {displayedSkills.length > 0 ? (
              displayedSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Not yet added..
              </p>
            )}
          </div>
        </div>
      </section>
    )}

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:grid-cols-[0.75fr_1.25fr] md:p-8">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
            {profile?.profile_image_url ? (
              <img
                src={profile.profile_image_url}
                alt={profile.full_name}
                className="h-full min-h-[280px] w-full object-cover"
              />
            ) : (
              <div className="flex min-h-[280px] items-center justify-center text-slate-500">
                Not yet added..
              </div>
            )}
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-cyan-400">
              About Me
            </p>

            <p className="mt-5 leading-8 text-slate-400">
              {profile?.bio ||
                "I am a Computer Science student and aspiring DevOps Engineer. I enjoy building backend APIs, automating infrastructure, and deploying applications on the cloud."}
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              This portfolio is a hands-on project where I implement real-world DevOps
              practices including CI/CD, Infrastructure as Code, containerization, and
              monitoring.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {projects.length > 0 ? `${projects.length}+` : "0"}
                </p>
                <p className="mt-1 text-xs text-slate-500">Projects</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {skills.length > 0 ? `${skills.length}+` : "0"}
                </p>
                <p className="mt-1 text-xs text-slate-500">Technologies</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-center">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="mt-1 text-xs text-slate-500">Learning</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-center">
                <p className="text-2xl font-bold text-cyan-300">☁</p>
                <p className="mt-1 text-xs text-slate-500">Cloud Focused</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InfoSlider
        label="Experience"
        heading="Professional and hands-on experience"
        items={experienceSliderItems}
        emptyMessage="Add experience from Django Admin."
      />

      <InfoSlider
        label="Education"
        heading="Academic background"
        items={educationSliderItems}
        emptyMessage="Add education from Django Admin."
      />
 
      {/* PROJECTS */}
    {displayedProjects.length > 0 && (
      <section id="projects" className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-cyan-400">
              Featured Projects
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Real cloud and DevOps practice projects
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project) => (
              <article
                key={project.id}
                className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/50"
              >
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="mb-5 h-44 w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-slate-950 text-slate-600">
                    Project image
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                  {project.short_description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech_stack_list.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      GitHub
                    </a>
                  )}

                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))
          ) : (
            <p className="text-slate-400">Not added yet..</p>
          )}
        </div>
      </section>
    )}

      {/* RECENT BLOGS */}
    {displayedBlogPosts.length > 0 && (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-cyan-400">
              Recent Blogs
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Notes from my cloud and DevOps journey
            </h2>
          </div>

          <Link
            href="/blog"
            className="hidden text-sm font-semibold text-cyan-400 hover:text-cyan-300 md:block"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {displayedBlogPosts.length > 0 ? (
            displayedBlogPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/50"
              >
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="mb-5 h-44 w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-slate-950 text-slate-600">
                    Blog image
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white">
                  {post.title}
                </h3>

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
            ))
          ) : (
            <p className="text-slate-400">
              Not added yet..
            </p>
          )}
        </div>
      </section>
    )}

      {/* HIRE ME + ARCHITECTURE PREVIEW */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
          <p className="text-sm uppercase tracking-widest text-cyan-400">
            Hire Me
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Looking for cloud, backend, or DevOps help?
          </h2>

          <p className="mt-5 leading-8 text-slate-400">
            I am open to DevOps internships, cloud engineering opportunities,
            backend Python projects, and project-based collaboration.
          </p>

          <Link
            href="/hire-me"
            className="mt-6 inline-block rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Send Hiring Inquiry →
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <p className="text-sm uppercase tracking-widest text-cyan-400">
            Architecture
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white">
            See how this project is built.
          </h2>

          <p className="mt-5 leading-8 text-slate-400">
            This portfolio is designed as a cloud-native system using Next.js,
            Django REST Framework, FastAPI, PostgreSQL, Docker, Terraform,
            Ansible, GitHub Actions, and AWS.
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-5 text-sm text-slate-400">
            Live architecture and CI/CD diagram will be added near the final
            deployment phase.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer profile={profile} />
    </main>
  );
}