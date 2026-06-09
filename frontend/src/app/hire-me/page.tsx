import ContactForm from "../contact/ContactForm";
import { getServices } from "@/lib/api";

export default async function HireMePage() {
  const services = await getServices();

  const serviceRecord = services.find((s) => s.category === "service");
  const focusRecord = services.find((s) => s.category === "focus");

  // Fallbacks if no data in DB yet
  const defaultServices = [
    "Cloud infrastructure projects using AWS",
    "Docker and containerized application setup",
    "CI/CD pipeline setup with GitHub Actions",
    "Terraform Infrastructure as Code practice projects",
    "Linux, deployment, and backend API support",
    "DevOps portfolio/project collaboration",
  ];

  const defaultFocusAreas = [
    "DevOps internships",
    "Cloud engineering opportunities",
    "Backend Python projects",
    "AWS infrastructure practice",
    "Entry-level cloud support",
    "Automation and deployment workflows",
  ];

  const helpPoints = serviceRecord?.points_list.length ? serviceRecord.points_list : defaultServices;
  const focusPoints = focusRecord?.points_list.length ? focusRecord.points_list : defaultFocusAreas;

  return (
    <main className="min-h-screen text-slate-100">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Hire Me
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Let&apos;s build something together.
            </h1>

            <p className="mt-6 leading-8 text-slate-400">
              I&apos;m actively looking for roles and projects where I can contribute,
              learn, and ship real work. If you have something interesting in mind,
              I&apos;d love to hear about it.
            </p>
          </div>

          {/* Areas I can help with */}
          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">
              Areas I can help with
            </h2>

            <ul className="mt-5 grid gap-3 text-slate-400">
              {helpPoints.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-cyan-400">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Best fit opportunities */}
          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">
              Best fit opportunities
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {focusPoints.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-cyan-700/40 bg-cyan-950/30 px-4 py-2 text-sm text-cyan-300"
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
              This form saves your inquiry directly to my dashboard.
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
