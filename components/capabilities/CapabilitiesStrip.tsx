"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

interface Capability {
  label: string;
  description: string;
  tag: string;
}

const capabilities: readonly Capability[] = [
  {
    label: "Computer Vision",
    description:
      "CenterNet, YOLO family, Faster R-CNN. 3D detection on cryo-ET. mAP@50 of 0.948 on noisy small-object benchmarks.",
    tag: "CV",
  },
  {
    label: "Time-Series + Signals",
    description:
      "LSTM, Mamba, MoE, Transformers on clinical EEG. Geospatial risk modeling. 916 hours of pediatric signal data.",
    tag: "TS",
  },
  {
    label: "MLOps + Infrastructure",
    description:
      "Docker, Kubernetes, Terraform, Airflow. 99.9% pipeline reliability. 85% faster deploys. Multi-cloud AWS/GCP/Azure.",
    tag: "OPS",
  },
  {
    label: "Agentic AI",
    description:
      "Hybrid local+cloud LLM architectures. Tool-use, reasoning chains, cost-aware routing. Ollama + Anthropic API.",
    tag: "AGI",
  },
];

export default function CapabilitiesStrip(): JSX.Element {
  return (
    <section className="py-[120px] border-b border-[var(--border)]">
      <div className="container-editorial">
        <span className="text-[10px] font-mono text-[var(--fg-muted)] tracking-[0.3em] uppercase block mb-12">
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
              <span className="text-[10px] font-mono text-[var(--accent)] mb-4 block tracking-[0.25em] uppercase">
                {cap.tag}
              </span>
              <h3 className="text-xl font-[family-name:var(--font-display)] italic text-[var(--fg)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-200">
                {cap.label}
              </h3>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
