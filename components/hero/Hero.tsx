"use client";

import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
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
    target.style.filter = `blur(${Math.abs(x) * 1.25}px)`;
    window.setTimeout(() => {
      target.style.filter = "blur(0px)";
    }, 120);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-90">
        <HeroScene />
      </div>

      <div className="container-editorial relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.15 }}
          className="t-label mb-8"
        >
          {siteConfig.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.25 }}
          onMouseMove={handleMouseMove}
          className="text-display-xl uppercase text-[var(--fg)] leading-[0.9] glitch-once transition-[filter] duration-150 will-change-[filter]"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.55 }}
          className="mt-8 t-headline text-[var(--accent)]"
        >
          {siteConfig.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.7 }}
          className="mt-4 t-body-lg max-w-xl"
          style={{ color: "var(--fg)" }}
        >
          Reliable agents · Context engineering · Evaluation · ML infrastructure
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.85 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="/#work"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--fg)] hover:text-[var(--bg)]"
          >
            Selected systems
          </a>
          <a
            href="/#contact"
            className="inline-flex min-h-[44px] items-center rounded-sm border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--accent)]"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </section>
  );
}
