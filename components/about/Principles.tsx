"use client";

import { motion } from "framer-motion";
import { principles } from "@/content/about";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";

export default function Principles(): JSX.Element {
  return (
    <motion.div
      className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]"
      variants={stagger(0.09, 0.04)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {principles.map((p) => (
        <motion.div
          key={p.pillar}
          variants={revealUp}
          className="bg-[var(--bg)] p-8 md:p-10 flex flex-col gap-3"
        >
          <span className="t-label text-[var(--accent)]">
            {p.pillar}
          </span>
          <p className="t-lede">
            {p.lead}
          </p>
          <p className="t-body">
            {p.follow}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
