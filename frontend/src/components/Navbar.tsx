import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-slate-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold text-cyan-400">
          Aarjan Portfolio
        </Link>

        <div className="flex gap-5 text-sm text-slate-300">
          <Link href="/" className="hover:text-cyan-400">
            Home
          </Link>

          <Link href="/blog" className="hover:text-cyan-400">
            Blog
          </Link>

          <Link href="/hire-me" className="hover:text-cyan-400">
            Hire Me
          </Link>

          <Link href="/contact" className="hover:text-cyan-400">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}