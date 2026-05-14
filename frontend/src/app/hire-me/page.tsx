import ContactForm from "../contact/ContactForm";

const services = [
  "Cloud infrastructure projects using AWS",
  "Docker and containerized application setup",
  "CI/CD pipeline setup with GitHub Actions",
  "Terraform Infrastructure as Code practice projects",
  "Linux, deployment, and backend API support",
  "DevOps portfolio/project collaboration",
];

const focusAreas = [
  "DevOps internships",
  "Cloud engineering opportunities",
  "Backend Python projects",
  "AWS infrastructure practice",
  "Entry-level cloud support",
  "Automation and deployment workflows",
];

export default function HireMePage() {
  return (
    <main className="min-h-screen text-slate-100">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Hire Me
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Need help with cloud, backend, or DevOps work?
            </h1>

            <p className="mt-6 leading-8 text-slate-400">
              I am building practical experience in cloud engineering, DevOps,
              backend APIs, automation, and AWS-based deployments. Use this page
              to contact me for job opportunities, internships, collaboration,
              or project-based work.
            </p>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">
              Areas I can help with
            </h2>

            <ul className="mt-5 grid gap-3 text-slate-400">
              {services.map((service) => (
                <li key={service} className="flex gap-3">
                  <span className="mt-1 text-cyan-400">•</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">
              Best fit opportunities
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-2xl" />

          <div className="relative rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/20">
            <h2 className="mb-2 text-2xl font-semibold text-white">
              Send a hiring inquiry
            </h2>

            <p className="mb-6 text-sm leading-6 text-slate-400">
              This form will save your inquiry in my Django Admin dashboard.
              Email notifications will be added later through the FastAPI
              microservice.
            </p>

            <ContactForm
              defaultMessageType="hire_me"
              defaultSubject="Hire me inquiry"
            />
          </div>
        </div>
      </section>
    </main>
  );
}