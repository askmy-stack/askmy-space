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
    label: "Computer Vision",
    description:
      "3D object detection on cryo-electron tomography — mAP@50 of 0.948. Built for structural biologists who need results they can trust.",
    tag: "VISION",
  },
  {
    label: "Time-Series + Signals",
    description:
      "Benchmarking clinical EEG across 15+ architectures on 916 hours of real patient data. Honest evaluation over paper metrics.",
    tag: "SIGNALS",
  },
  {
    label: "MLOps + Infrastructure",
    description:
      "The infrastructure that ships models and keeps them running. 100+ Airflow DAGs, Docker, K8s, Terraform, AWS/Azure/GCP — observable at 3am.",
    tag: "MLOPS",
  },
  {
    label: "Agentic AI",
    description:
      "AI agents that route work between local and frontier — privacy where it matters, reasoning where it counts.",
    tag: "AGENTS",
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
              <p className="t-body" style={{ fontFamily: "var(--font-body)" }}>
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
