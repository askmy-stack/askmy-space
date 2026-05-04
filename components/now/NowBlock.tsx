"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

const nowItems = [
  { label: "Building", text: "Agentic research assistant with tool-use + RAG" },
  { label: "Finishing", text: "EEG seizure detection paper draft for publication" },
  { label: "Targeting", text: "Full-time AI/ML Engineer roles, summer 2026" },
  { label: "Reading", text: "The Pragmatic Programmer (re-read for taste)" },
  { label: "Based in", text: "Arlington, VA" },
] as const;

export default function NowBlock(): JSX.Element {
  const updated = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section id="now" className="py-[120px] border-t border-[var(--border)]">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-[10px] font-mono text-[var(--fg-muted)] tracking-[0.3em] uppercase block mb-4">
              04 — Now
            </span>
            <h2 className="text-display-lg font-[family-name:var(--font-display)] italic text-[var(--fg)] leading-[1]">
              What I&apos;m up to.
            </h2>
            <p className="text-[var(--fg-muted)] text-sm mt-6 font-mono">
              Updated {updated}
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {nowItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex gap-6 py-5 border-b border-[var(--border)]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: easeOutExpo }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)] w-24 shrink-0 pt-1">
                  {item.label}
                </span>
                <span className="text-sm text-[var(--fg)]/80 leading-relaxed">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
