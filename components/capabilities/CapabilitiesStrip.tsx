"use client";

import { motion } from "framer-motion";
import { revealUp, stagger, viewportOnce } from "@/lib/motion";
import CapabilityIcon from "./CapabilityIcon";

interface Capability {
  label: string;
  description: string;
  tag: string;
}

/** Three focused columns: shorter copy, no harness/context duplication. */
const capabilities: readonly Capability[] = [
  {
    label: "Reliable Agents",
    description:
      "Failure benches, judges, and recovery so agents degrade into diagnosis—not silence.",
    tag: "AGENTS",
  },
  {
    label: "Context Engineering",
    description:
      "MCP memory with ingest, retrieval, provenance, and access control for agent Tools.",
    tag: "SIGNALS",
  },
  {
    label: "ML Infrastructure",
    description:
      "Training, serving, and observability that hold under real traffic.",
    tag: "MLOPS",
  },
];

export default function CapabilitiesStrip(): JSX.Element {
  return (
    <section className="py-24 md:py-28 border-b border-[var(--border)]">
      <div className="container-editorial">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]"
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.label}
              className="bg-[var(--bg)] hover:bg-[var(--surface)] p-8 md:p-10 group cursor-default transition-colors duration-300 flex flex-col gap-3"
              variants={revealUp}
            >
              <div className="mb-2 text-[var(--accent)] group-hover:text-[var(--fg)] transition-colors duration-200">
                <CapabilityIcon tag={cap.tag} />
              </div>
              <h3 className="t-headline group-hover:text-[var(--accent)] transition-colors duration-200">
                {cap.label}
              </h3>
              <p className="t-body">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
