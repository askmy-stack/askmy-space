"use client";

import { motion } from "framer-motion";
import { easeOutExpo, revealUp, viewportOnce } from "@/lib/motion";

const steps = [
  "Understand",
  "Architect",
  "Build",
  "Evaluate",
  "Iterate",
] as const;

/**
 * Engineering loop strip — motion-reference idea, portfolio typography.
 * No cards; hairline separators; serif steps.
 */
export default function ProcessRibbon(): JSX.Element {
  return (
    <section
      aria-label="Engineering process"
      className="border-y border-[var(--border)] bg-[var(--surface)]"
    >
      <motion.div
        className="container-editorial flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-8 md:py-10"
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="t-label text-[var(--accent)] shrink-0">
          The engineering loop
        </p>
        <ol className="flex flex-wrap items-baseline gap-x-4 gap-y-3 md:justify-end">
          {steps.map((step, i) => (
            <li key={step} className="flex items-baseline gap-4">
              <motion.span
                className="t-headline"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.06,
                  ease: easeOutExpo,
                }}
              >
                {step}
              </motion.span>
              {i < steps.length - 1 && (
                <span
                  className="t-caption text-[var(--accent)]"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
