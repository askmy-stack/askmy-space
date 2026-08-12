"use client";

import { motion } from "framer-motion";
import { expandIn } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function EntryPortal(): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <motion.header
      className="max-w-2xl"
      {...(reduced
        ? {}
        : { variants: expandIn, initial: "hidden", animate: "visible" })}
    >
      <p className="t-mono uppercase tracking-[0.3em] text-[var(--color-spatial-text-secondary)] mb-4">
        ~/explore
      </p>
      <h1 className="t-display-xl text-[var(--color-spatial-accent-1)] mb-5">
        The space between the work
      </h1>
      <p className="t-body text-[var(--color-spatial-text)] mb-8">
        Every system here shares ideas with the others — pillars hold the
        space together, projects orbit them, and topics thread between.
        Trace a connection, or enter any node.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href="#graph"
          className="t-mono rounded-full border border-[var(--color-spatial-accent-1)] px-4 py-2 font-bold text-[var(--color-spatial-accent-1)] transition-colors duration-[var(--motion-spatial-expand)] hover:bg-[var(--color-spatial-accent-1)] hover:text-[var(--color-spatial-bg)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]"
        >
          enter the graph
        </a>
        <a
          href="#index"
          className="t-mono rounded-full border border-[var(--color-spatial-border)]/40 px-4 py-2 text-[var(--color-spatial-text)] transition-colors duration-[var(--motion-spatial-expand)] hover:border-[var(--color-spatial-accent-1)] hover:text-[var(--color-spatial-accent-1)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]"
        >
          browse the index
        </a>
      </div>
    </motion.header>
  );
}
