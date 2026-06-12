import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen text-content">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="rounded-[2rem] border border-line bg-surface/70 p-8 shadow-2xl shadow-black/10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-soft">
              Contact
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-content md:text-6xl">
              Let&apos;s connect.
            </h1>

            <p className="mt-6 leading-8 text-muted">
              Whether it&apos;s a job opportunity, a project idea, a question,
              or just a conversation — feel free to reach out.
            </p>
          </div>

          <div className="mt-6 grid gap-6">
            <div className="rounded-3xl border border-line bg-surface/70 p-6">
              <h2 className="text-xl font-semibold text-content">
                What happens next?
              </h2>

              <p className="mt-3 leading-7 text-muted">
                Your message is always appreciated...
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-surface/70 p-6">
              <h2 className="text-xl font-semibold text-content">
                Coming later
              </h2>

              <p className="mt-3 leading-7 text-muted">
                The FastAPI notification microservice will send me email alerts
                when new messages arrive.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-2xl" />

          <div className="relative rounded-[2rem] border border-line bg-surface/80 p-6 shadow-2xl shadow-black/10">
            <h2 className="mb-6 text-2xl font-semibold text-content">
              Send a message
            </h2>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
