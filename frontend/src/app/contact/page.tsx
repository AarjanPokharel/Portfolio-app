// CONTACT PAGE

import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Contact
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Let&apos;s Connect
          </h1>

          <p className="mt-5 leading-8 text-slate-400">
            Use this form to reach out for internships, cloud or DevOps
            opportunities, collaboration, technical discussions, or project
            feedback.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">What happens next?</h2>

            <p className="mt-3 text-slate-400">
              Your message will be stored securely in the Django backend and
              visible to me through the Django Admin dashboard.
            </p>

            <p className="mt-3 text-slate-400">
              Later, the FastAPI notification service will notify me when a new
              message arrives.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}