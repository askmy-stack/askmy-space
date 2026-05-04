"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Header(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent",
        )}
      >
        <div className="container-editorial flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-mono text-sm tracking-[0.2em] text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            askmystack
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.resume}
              download
              className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] hover:text-[var(--fg)] transition-colors"
            >
              Resume ↗
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
          >
            <span className="block w-5 h-px bg-[var(--fg)]" />
            <span className="block w-5 h-px bg-[var(--fg)]" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[var(--bg)] flex flex-col"
          >
            <div className="container-editorial flex items-center justify-between h-16">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm tracking-[0.2em]"
              >
                askmystack
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]"
              >
                Close
              </button>
            </div>
            <nav className="flex-1 container-editorial flex flex-col justify-center gap-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-display-md text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                >
                  <span className="font-mono text-sm text-[var(--fg-muted)] mr-4">
                    0{i + 1}
                  </span>
                  {link.label}
                </a>
              ))}
              <a
                href={siteConfig.resume}
                download
                onClick={() => setMenuOpen(false)}
                className="text-display-md text-[var(--accent)]"
              >
                <span className="font-mono text-sm text-[var(--fg-muted)] mr-4">
                  05
                </span>
                Resume ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
