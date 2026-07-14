"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

  const isActive = (href: string): boolean =>
    href.startsWith("/#") ? false : pathname === href;

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg)]/75 px-2.5 py-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          style={{ WebkitBackdropFilter: "blur(20px) saturate(1.5)" }}
        >
          <Link
            href="/"
            aria-label="Home — Abhinaysai Kamineni"
            className="px-3 font-mono text-sm font-bold tracking-[0.08em] text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
          >
            ASK<span className="text-[var(--accent)]">.</span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[13px] font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-[var(--accent-soft)] font-semibold text-[var(--accent)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
            <a
              href={siteConfig.resume}
              download
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-[var(--accent)] transition-colors hover:text-[var(--fg)]"
            >
              Resume ↗
            </a>
            <span
              className="hidden items-center gap-2 px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-muted)] lg:inline-flex"
              title="The intelligence pipeline behind /signals is running"
            >
              <span className="live-dot" aria-hidden="true" />
              live
            </span>
          </nav>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="block h-px w-5 bg-[var(--fg)]" />
            <span className="block h-px w-5 bg-[var(--fg)]" />
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
                aria-label="Home"
                className="font-mono font-bold text-lg tracking-[0.12em] text-[var(--fg)] leading-none"
              >
                ASK<span className="text-[var(--accent)]">.</span>
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
                href={siteConfig.social.medium}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-display-md text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
              >
                <span className="font-mono text-sm text-[var(--fg-muted)] mr-4">
                  06
                </span>
                Writing ↗
              </a>
              <a
                href={siteConfig.resume}
                download
                onClick={() => setMenuOpen(false)}
                className="text-display-md text-[var(--accent)]"
              >
                <span className="font-mono text-sm text-[var(--fg-muted)] mr-4">
                  07
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
