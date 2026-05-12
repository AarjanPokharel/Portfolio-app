// HIRE ME 

import ContactForm from "../contact/ContactForm";

const services = [
  "Cloud infrastructure projects using AWS",
  "Docker and containerized application setup",
  "CI/CD pipeline setup with GitHub Actions",
  "Terraform Infrastructure as Code practice projects",
  "Linux, deployment, and backend API support",
  "DevOps portfolio/project collaboration",
];

export default function HireMePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Hire Me
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Need help with cloud, backend, or DevOps work?
          </h1>

          <p className="mt-5 leading-8 text-slate-400">
            I am building practical experience in cloud engineering, DevOps,
            backend APIs, automation, and AWS-based deployments. You can use
            this page to contact me for job opportunities, internships,
            collaboration, or project-based work.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Areas I can help with</h2>

            <ul className="mt-4 space-y-3 text-slate-400">
              {services.map((service) => (
                <li key={service} className="flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Best fit opportunities</h2>

            <p className="mt-3 text-slate-400">
              DevOps internship, cloud engineering internship, backend-focused
              Python projects, AWS infrastructure practice, and entry-level
              cloud support opportunities.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-5 text-2xl font-semibold">Send a hiring inquiry</h2>

          <ContactForm
            defaultMessageType="hire_me"
            defaultSubject="Hire me inquiry"
          />
        </div>
      </section>
    </main>
  );
}