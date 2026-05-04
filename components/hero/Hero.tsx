"use client";

import { motion } from "framer-motion";
import HeroBlob from "./HeroBlob";
import { heroStats } from "@/content/about";
import { siteConfig } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero(): JSX.Element {
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
        <HeroBlob />
      </div>

      <div className="container-editorial relative z-10">
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-muted)]">
            {siteConfig.location}
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

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 1 }}
          className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-[var(--border)] max-w-3xl"
        >
          {heroStats.map((stat, i) => (
            <span
              key={stat}
              className="font-mono text-xs md:text-sm text-[var(--fg)] tracking-wide"
            >
              {stat}
              {i < heroStats.length - 1 && (
                <span className="ml-6 text-[var(--fg-muted)]">·</span>
              )}
            </span>
          ))}
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
