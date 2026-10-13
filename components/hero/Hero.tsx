"use client";

import { motion } from "framer-motion";
import SystemsDiagram from "./SystemsDiagram";
import { riseInTransition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero(): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[720px] overflow-hidden border-b border-[var(--border)] flex items-center">
      {/* Soft radial atmosphere — no prism / lattice */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 78% 42%, rgba(145,47,17,0.19), transparent 42%), radial-gradient(ellipse at 14% 46%, rgba(117,46,20,0.10), transparent 45%), linear-gradient(180deg, rgba(255,255,255,0.008), transparent 44%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[9] opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "linear-gradient(90deg, transparent 0, black 53%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, black 53%, transparent 100%)",
        }}
      />

      <div className="container-editorial relative z-10 w-full py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Copy */}
          <div className="relative z-[3] max-w-xl">
            <motion.p
              className="flex items-center gap-3 t-label text-[var(--accent)]"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0)}
            >
              <span
                className="block h-px w-6 bg-[var(--accent)]"
                aria-hidden="true"
              />
              Full Stack AI Engineer / Systems Builder
            </motion.p>

            <motion.h1
              id="heroHeading"
              className="mt-8 t-hero max-w-[18ch]"
              initial={reduced ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0.1)}
            >
              AI is powerful.
              <br />
              Making it{" "}
              <em className="italic font-[450] text-[var(--accent)]">
                reliable
              </em>
              <br />
              is engineering.
            </motion.h1>

            <motion.p
              className="mt-7 t-body-lg max-w-[34rem]"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0.22)}
            >
              I&apos;m Abhinaysai. I build intelligent products—from agent
              architecture and context engineering to cloud infrastructure and
              the evaluation loops that make systems dependable.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0.35)}
            >
              <a
                href="/#work"
                className="btn-lift inline-flex min-h-[52px] items-center justify-between gap-6 rounded-sm bg-[var(--accent)] px-5 py-3.5 t-caption font-semibold text-[var(--bg)] transition-colors hover:bg-[#ff8f61]"
              >
                Explore selected work
                <span aria-hidden="true" className="text-lg leading-none">
                  ↗
                </span>
              </a>
              <a
                href="/#contact"
                className="btn-lift inline-flex min-h-[52px] items-center justify-between gap-6 rounded-sm border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.018)] px-5 py-3.5 t-caption font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
              >
                Start a conversation
                <span aria-hidden="true" className="text-lg leading-none">
                  →
                </span>
              </a>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap items-center gap-4 t-label text-[var(--fg-muted)]"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={riseInTransition(0.46)}
            >
              <span>Agentic AI &amp; LLMs</span>
              <span
                className="inline-block h-1 w-1 rounded-full bg-[#b96747]"
                aria-hidden="true"
              />
              <span>Cloud &amp; platform</span>
              <span
                className="inline-block h-1 w-1 rounded-full bg-[#b96747]"
                aria-hidden="true"
              />
              <span>Full-stack products</span>
            </motion.div>
          </div>

          {/* Stage */}
          <div className="relative z-[2] min-w-0">
            <SystemsDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
