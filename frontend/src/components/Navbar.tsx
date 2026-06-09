"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ name }: { name?: string }) {
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
          ? "border-slate-800/80 bg-slate-950/90 shadow-lg shadow-slate-950/40 backdrop-blur-xl"
          : "border-transparent bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-sm font-bold text-cyan-300 ring-1 ring-cyan-400/30 transition group-hover:bg-cyan-500/25 group-hover:ring-cyan-400/60">
            AP
          </div>
          <p className="text-sm font-bold tracking-wide text-white">
            {name || "Aarjan Pokharel"}
          </p>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition hover:text-cyan-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Hire Me — desktop */}
          <Link
            href="/hire-me"
            className="hidden rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 md:block"
          >
            Hire Me
          </Link>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-cyan-400 hover:text-cyan-300 md:hidden"
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
        <div className="border-t border-slate-800 bg-slate-950/95 px-6 py-5">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800/60 hover:text-cyan-300"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/hire-me"
              className="mt-3 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2.5 text-center text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
