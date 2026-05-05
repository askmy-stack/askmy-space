"use client";

import { motion } from "framer-motion";
import { principles } from "@/content/about";
import { easeOutExpo } from "@/lib/motion";

export default function Principles(): JSX.Element {
  return (
    <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
      {principles.map((p, i) => (
        <motion.div
          key={p.pillar}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: i * 0.08 }}
          className="bg-[var(--bg)] p-8 md:p-10 flex flex-col gap-3"
        >
          <span className="t-label text-[var(--accent)]">
            {p.pillar}
          </span>
          <p
            className="text-[var(--fg)] leading-snug text-[clamp(1.05rem,1.3vw,1.25rem)]"
          >
            {p.lead}
          </p>
          <p
            className="t-body-lg"
          >
            {p.follow}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
