"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { sendContactMessage } from "@/lib/api";

type ContactFormProps = {
  defaultMessageType?: string;
  defaultSubject?: string;
};

const messageTypeOptions = [
  { value: "general", label: "General Message" },
  { value: "job_opportunity", label: "Job Opportunity" },
  { value: "hire_me", label: "Hire Me Inquiry" },
  { value: "freelance_project", label: "Freelance / Project Work" },
  { value: "collaboration", label: "Collaboration" },
];

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

export default function ContactForm({
  defaultMessageType = "general",
  defaultSubject = "",
}: ContactFormProps) {
  const [messageType, setMessageType] = useState(defaultMessageType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await sendContactMessage({
        message_type: messageType,
        name,
        email,
        subject,
        message,
      });

      setSuccessMessage("Thanks! Your message has been saved. I’ll review it and respond soon.");
      setMessageType(defaultMessageType);
      setName("");
      setEmail("");
      setSubject(defaultSubject);
      setMessage("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Message Type
        </label>

        <select
          required
          value={messageType}
          onChange={(event) => setMessageType(event.target.value)}
          className={inputClass}
        >
          {messageTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Name
        </label>

        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Subject
        </label>

        <input
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={inputClass}
          placeholder="Internship opportunity, collaboration, project help..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Message
        </label>

        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          className={inputClass}
          placeholder="Write your message here..."
        />
      </div>

      {successMessage && (
        <p className="rounded-xl border border-emerald-700/60 bg-emerald-950/70 px-4 py-3 text-emerald-300">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className="rounded-xl border border-red-700/60 bg-red-950/70 px-4 py-3 text-red-300">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}