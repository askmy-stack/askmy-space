"use client";

import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
import { siteConfig } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroProps {
  intel?: { generatedAt: string; count: number };
}

function runLabel(iso: string): string {
  const t = new Date(iso);
  if (Number.isNaN(t.getTime())) return "recently";
  return (
    t.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      hour12: false,
    }) + " UTC"
  );
}

export default function Hero({ intel }: HeroProps): JSX.Element {
  const reduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const target = e.currentTarget;
    target.style.filter = `blur(${Math.abs(x) * 2}px)`;
    window.setTimeout(() => {
      target.style.filter = "blur(0px)";
    }, 150);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* 3D placeholder blob (CP2: swap for R3F HeroSphere) */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="container-editorial relative z-10">
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/80 px-4 py-2 font-mono text-[11px] tracking-[0.06em] text-[var(--fg-muted)]">
            <span className="live-dot" aria-hidden="true" />
            {intel
              ? `Pipeline live · run ${runLabel(intel.generatedAt)} · ${intel.count} signals briefed`
              : `Pipeline live · ${siteConfig.location}`}
          </span>
        </motion.div>

        {/* Name — display xl, glitch once on mount, cursor-reactive blur */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.3 }}
          onMouseMove={handleMouseMove}
          className="text-display-xl text-[var(--fg)] leading-[0.9] glitch-once transition-[filter] duration-150 will-change-[filter]"
        >
          {siteConfig.alias}
        </motion.h1>

        {/* Subtitle — single line, fixed copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.8 }}
          className="mt-8 font-display italic text-2xl md:text-3xl text-[var(--fg)]/80 max-w-2xl leading-snug"
        >
          Building AI/ML systems that ship to real users.
        </motion.p>

        {/* Platform CTAs — route into the product */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.9 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="/ask"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
          >
            Ask my agent →
          </a>
          <a
            href="/signals"
            className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--accent)]/50"
          >
            Read today&apos;s signals
          </a>
        </motion.div>

        {/* Pillar strip — the three-pillar brand statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 1 }}
          className="mt-16 pt-6 border-t border-[var(--border)] max-w-3xl"
        >
          <p className="font-[family-name:var(--font-display)] italic text-[0.9375rem] md:text-[1.125rem] text-[var(--fg)] tracking-wide">
            Research <span className="text-[var(--fg-muted)]">·</span> Engineering{" "}
            <span className="text-[var(--fg-muted)]">·</span> Product
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-muted)] rotate-90 origin-center translate-y-6">
            scroll
          </span>
          <span className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
