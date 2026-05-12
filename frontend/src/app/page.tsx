import {
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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Cloud Native Portfolio
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {profile?.full_name || "Aarjan Pokharel"}
            </h1>

            <p className="mt-4 text-xl text-slate-300">
              {profile?.headline ||
                "Aspiring DevOps Engineer | Cloud Solutions Architect"}
            </p>

            <p className="mt-6 max-w-2xl leading-8 text-slate-400">
              {profile?.bio ||
                "This portfolio is powered by Next.js, Django REST Framework, PostgreSQL, and cloud-native DevOps tools."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {profile?.resume_file_url && (
                <a
                  href={profile.resume_file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Download Resume
                </a>
              )}

              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-cyan-400"
                >
                  GitHub
                </a>
              )}

              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-cyan-400"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            {profile?.profile_image_url ? (
              <img
                src={profile.profile_image_url}
                alt={profile.full_name}
                className="h-80 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-80 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
                Profile image will appear here
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-3xl font-bold">Skills</h2>

        <div className="mt-6 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-3xl font-bold">Featured Projects</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="mb-5 h-48 w-full rounded-xl object-cover"
                />
              )}

              <h3 className="text-xl font-semibold">{project.title}</h3>

              <p className="mt-3 text-slate-400">
                {project.short_description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech_stack_list.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-300"
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
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-3xl font-bold">Experience</h2>

        <div className="mt-6 space-y-5">
          {experience.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="text-xl font-semibold">{item.job_title}</h3>
              <p className="mt-1 text-cyan-400">{item.company_name}</p>
              <p className="mt-2 text-sm text-slate-500">
                {item.start_date} -{" "}
                {item.currently_working ? "Present" : item.end_date}
              </p>
              <p className="mt-4 whitespace-pre-line text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-3xl font-bold">Education</h2>

        <div className="mt-6 space-y-5">
          {education.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="text-xl font-semibold">{item.school_name}</h3>
              <p className="mt-1 text-cyan-400">
                {item.degree}
                {item.field_of_study && `, ${item.field_of_study}`}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {item.start_date} - {item.end_date || "Present"}
              </p>
              {item.description && (
                <p className="mt-4 text-slate-400">{item.description}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 pb-20">
        <h2 className="text-3xl font-bold">Latest Blog Posts</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="mb-5 h-48 w-full rounded-xl object-cover"
                />
              )}

              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="mt-3 text-slate-400">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}