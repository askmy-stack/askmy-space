"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import CapabilityIcon from "./CapabilityIcon";

interface Capability {
  label: string;
  description: string;
  tag: string;
}

const capabilities: readonly Capability[] = [
  {
    label: "Reliable Agents",
    description:
      "Runtime failure benches, judges, and recovery signals — so agent systems degrade into diagnosis, not silence.",
    tag: "AGENTS",
  },
  {
    label: "Harness Engineering",
    description:
      "Eval harnesses that pin agent behavior: ground-truth failure cases, LLM-as-judge baselines, and regression gates before ship.",
    tag: "HARNESS",
  },
  {
    label: "Context Engineering",
    description:
      "Organizational memory over MCP: ingest, retrieve, provenance, and access control for agent tool-use.",
    tag: "SIGNALS",
  },
  {
    label: "ML Infrastructure",
    description:
      "Training, serving, and observability that survive real traffic — containers, CI/CD, and infrastructure-as-code.",
    tag: "MLOPS",
  },
];

export default function CapabilitiesStrip(): JSX.Element {
  return (
    <section className="py-24 md:py-28 border-b border-[var(--border)]">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              className="bg-[var(--bg)] hover:bg-[var(--surface)] p-7 md:p-8 group cursor-default transition-colors duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easeOutExpo }}
            >
              <div className="mb-5 text-[var(--accent)] group-hover:text-[var(--fg)] transition-colors duration-200">
                <CapabilityIcon tag={cap.tag} />
              </div>
              <h3 className="t-headline mb-3 group-hover:text-[var(--accent)] transition-colors duration-200">
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
