"use client";

import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
import SystemsDiagram from "./SystemsDiagram";
import { siteConfig } from "@/content/site";
import { riseInTransition } from "@/lib/motion";
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
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-55">
        <HeroScene />
      </div>

      <div className="container-editorial relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-5 xl:col-span-5">
            <motion.p
              className="t-label text-[var(--accent)] mb-6"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0)}
            >
              Full stack AI engineer / systems builder
            </motion.p>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0.1)}
              onMouseMove={handleMouseMove}
              className="t-hero glitch-once transition-[filter] duration-150 will-change-[filter]"
            >
              <span className="block">Abhinaysai</span>
              <span className="block">Kamineni</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0.22)}
              className="mt-7 t-lede"
              style={{ color: "var(--accent)" }}
            >
              {siteConfig.role}
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0.35)}
              className="mt-3 t-body max-w-[32rem]"
            >
              Reliable agents. Context engineering. Evaluation.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0.46)}
              className="mt-11 flex flex-wrap gap-3"
            >
              <a
                href="/#work"
                className="btn-lift inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[var(--accent)] px-6 py-3 t-caption font-medium transition-colors duration-200 hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                style={{ color: "#fff" }}
              >
                Featured work
              </a>
              <a
                href="/#contact"
                className="btn-lift inline-flex min-h-[44px] items-center rounded-sm border border-[var(--border)] px-6 py-3 t-caption font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--accent)]"
              >
                Contact
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-7 xl:col-span-7">
            <SystemsDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
