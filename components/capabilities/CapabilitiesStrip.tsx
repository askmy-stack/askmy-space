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
      "3D object detection on cryo-electron tomography — mAP@50 of 0.948 on noisy small-object biomedical benchmarks. Architecture comparison across CenterNet, YOLOv10, and Faster R-CNN under real research constraints.",
    tag: "VISION",
  },
  {
    label: "Time-Series + Signals",
    description:
      "Clinical EEG benchmarking across 15+ architectures — LSTM, Mamba, MoE, Transformers — on 916 hours of pediatric signal data. Subject-independent evaluation because real generalization is the only honest test.",
    tag: "SIGNALS",
  },
  {
    label: "MLOps + Infrastructure",
    description:
      "Shipping ML to production and keeping it there. 100+ Airflow DAGs at 99.9% reliability. 85% faster deploys. Containerized, version-pinned, observable at 3am. AWS, Azure, GCP — wherever the model needs to run.",
    tag: "MLOPS",
  },
  {
    label: "Agentic AI",
    description:
      "Hybrid local+cloud agent architecture — local Ollama for privacy-sensitive work, frontier API where reasoning depth matters. Tool-use, RAG, cost-aware routing. Built for real workflows, not demos.",
    tag: "AGENTS",
  },
];

export default function CapabilitiesStrip(): JSX.Element {
  return (
    <section className="py-[120px] border-b border-[var(--border)]">
      <div className="container-editorial">
        <span className="t-label block mb-12">
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
