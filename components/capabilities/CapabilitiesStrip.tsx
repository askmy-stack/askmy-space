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
    label: "Organizational Memory",
    description:
      "MCP-based memory that ingests Slack, GitHub, Jira, and Linear through Kafka and serves hybrid Neo4j + Qdrant context to agents.",
    tag: "AGENTS",
  },
  {
    label: "Agent Reliability",
    description:
      "Failure benches, LLM-as-judge baselines, and OpenTelemetry traces that measure detection lead time and recovery — not just pass/fail.",
    tag: "SIGNALS",
  },
  {
    label: "Supply-Chain Risk",
    description:
      "Real-time risk intelligence over Kafka streams, Neo4j graphs, and explainable XGBoost scoring with SHAP.",
    tag: "VISION",
  },
  {
    label: "Production MLOps",
    description:
      "The infrastructure that ships models and keeps them running. 100+ Airflow DAGs, Docker, K8s, Terraform, AWS/Azure/GCP. Observable at 3am.",
    tag: "MLOPS",
  },
];

export default function CapabilitiesStrip(): JSX.Element {
  return (
    <section className="py-[120px] border-b border-[var(--border)]">
      <div className="container-editorial">
        <span className="t-label block mb-8">
          What I build
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              className="bg-[var(--bg)] hover:bg-[var(--surface)] p-8 group cursor-default transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
            >
              <div className="mb-5 text-[var(--accent)] group-hover:text-[var(--fg)] transition-colors duration-200">
                <CapabilityIcon tag={cap.tag} />
              </div>
              <span className="t-label text-[var(--accent)] mb-4 block">
                {cap.tag}
              </span>
              <h3 className="t-headline mb-3 group-hover:text-[var(--accent)] transition-colors duration-200">
                {cap.label}
              </h3>
              <p className="t-body">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
