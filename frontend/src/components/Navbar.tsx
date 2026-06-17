"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { EmailIcon } from "./Icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar({ name, email }: { name?: string; email?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line/80 bg-bg/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "border-transparent bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={name || "Logo"}
            className="h-10 w-10 rounded-full object-contain transition group-hover:scale-105"
          />
          <p className="text-sm font-bold tracking-wide text-content">
            {name || "Aarjan Pokharel"}
          </p>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition hover:text-accent-soft after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Email me — desktop */}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label="Email me"
              className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent-soft md:inline-flex"
            >
              <EmailIcon className="h-4 w-4" /> Email me
            </a>
          )}

          {/* Contact — desktop */}
          <Link
            href="/contact"
            className="hidden rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-soft transition hover:bg-accent hover:text-slate-950 md:block"
          >
            Contact
          </Link>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent-soft md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="2" x2="14" y2="14" />
                <line x1="14" y1="2" x2="2" y2="14" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="4" x2="14" y2="4" />
                <line x1="2" y1="8" x2="14" y2="8" />
                <line x1="2" y1="12" x2="14" y2="12" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-line bg-bg/95 px-6 py-5">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface hover:text-accent-soft"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-center text-sm font-semibold text-muted transition hover:border-accent hover:text-accent-soft"
                onClick={() => setMenuOpen(false)}
              >
                <EmailIcon className="h-4 w-4" /> Email me
              </a>
            )}
            <Link
              href="/contact"
              className="mt-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2.5 text-center text-sm font-semibold text-accent-soft transition hover:bg-accent hover:text-slate-950"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
