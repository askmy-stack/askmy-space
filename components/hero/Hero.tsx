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
    target.style.filter = `blur(${Math.abs(x) * 1.1}px)`;
    window.setTimeout(() => {
      target.style.filter = "blur(0px)";
    }, 120);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-85">
        <HeroScene />
      </div>

      <div className="container-editorial relative z-10 max-w-4xl text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.12 }}
          className="t-label mb-5"
        >
          {siteConfig.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
          onMouseMove={handleMouseMove}
          className="t-hero glitch-once transition-[filter] duration-150 will-change-[filter]"
        >
          <span className="block">Abhinaysai</span>
          <span className="block">Kamineni</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.45 }}
          className="mt-7 t-lede"
          style={{ color: "var(--accent)" }}
        >
          {siteConfig.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.55 }}
          className="mt-3 t-body max-w-[40rem]"
        >
          Reliable agents · Harness engineering · Context engineering ·
          Evaluation · ML infrastructure
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.7 }}
          className="mt-11 flex flex-wrap justify-center gap-3"
        >
          <a
            href="/#work"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[var(--accent)] px-6 py-3 t-caption font-medium transition-colors duration-200 hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            style={{ color: "#fff" }}
          >
            Featured work
          </a>
          <a
            href="/#contact"
            className="inline-flex min-h-[44px] items-center rounded-sm border border-[var(--border)] px-6 py-3 t-caption font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--accent)]"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </section>
  );
}
