"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

const nowItems = [
  { label: "Building", text: "Agentic research assistant with tool-use + RAG" },
  { label: "Finishing", text: "EEG seizure detection paper draft for publication" },
  { label: "Open to", text: "Collaborations at the research-to-product boundary" },
  { label: "Reading", text: "The Pragmatic Programmer (re-read for taste)" },
  { label: "Based in", text: "Arlington, VA" },
] as const;

export default function NowBlock(): JSX.Element {
  const updated = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section id="now" className="pt-[120px] pb-10 md:pb-12 border-t border-[var(--border)]">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="t-display">
              What I&apos;m up to.
            </h2>
            <p className="t-caption mt-6">
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
                <span className="t-label text-[var(--accent)] w-24 shrink-0 pt-1">
                  {item.label}
                </span>
                <span className="t-body text-[var(--fg)]">
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
