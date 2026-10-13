"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
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
      "Runtime failure benches, judges, and recovery signals. Agent systems degrade into diagnosis, not silence.",
    tag: "AGENTS",
  },
  {
    label: "Context Engineering",
    description:
      "Organizational memory over MCP. Ingest, retrieve, provenance, and access control for agent Tools.",
    tag: "SIGNALS",
  },
  {
    label: "ML Infrastructure",
    description:
      "Training, serving, and observability that survive real traffic. Containers, CI/CD, and infrastructure as code.",
    tag: "MLOPS",
  },
];

export default function CapabilitiesStrip(): JSX.Element {
  return (
    <section className="py-24 md:py-28 border-b border-[var(--border)]">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              className="bg-[var(--bg)] hover:bg-[var(--surface)] p-8 md:p-10 group cursor-default transition-colors duration-300 flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easeOutExpo }}
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
        </div>
      </div>
    </section>
  );
}
