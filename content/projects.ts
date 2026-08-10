import type { Project } from "@/lib/types";

export const projects: readonly Project[] = [
  {
    id: "1",
    slug: "eeg-seizure-detection",
    title: "EEG Seizure Detection",
    description: "Benchmark of 15+ neural architectures on 916 hours of pediatric EEG data",
    excerpt:
      "A comprehensive evaluation of neural network architectures for seizure detection in pediatric patients. Achieved AUROC 0.740 across 15+ architectures using the CHB-MIT dataset with patient-disjoint evaluation to measure real-world generalization.",
    systems: ["eeg-seizure-detection"],
    content:
      "Built a unified preprocessing pipeline on the CHB-MIT corpus (24 patients, 916 hours of recording) using MNE for filtering, artifact handling, and windowing. Benchmarked 15+ architectures across four families including LSTM/GRU recurrent, Transformer, Mamba/state-space, and Mixture-of-Experts. Containerized training with version-pinned environments to ensure reproducibility. AUROC 0.740 with patient-disjoint evaluation, zero false positives at operating threshold.",
    published: "2026-07-01",
  },
  {
    id: "2",
    slug: "startupintel",
    title: "StartupIntel",
    description: "Open-source startup intelligence platform powered by specialized ML bots",
    excerpt:
      "An intelligence platform that automates startup research through specialized ML agents. Combines web scraping, data enrichment, and pattern recognition to surface emerging opportunities and market signals.",
    systems: ["startupintel"],
    content:
      "Designed and built an open-source platform that leverages specialized ML bots to gather, enrich, and analyze startup data. The system crawls web sources, extracts key metrics and funding information, and applies pattern recognition to identify emerging trends. Deployed with modular architecture enabling easy addition of new data sources and analysis pipelines.",
    published: "2026-06-15",
  },
  {
    id: "3",
    slug: "cortex",
    title: "Cortex",
    description: "Organizational memory for AI agents capturing decisions into a knowledge graph",
    excerpt:
      "A knowledge graph system designed to give AI agents persistent, queryable organizational memory. Captures decisions, context, and relationships to enable agents to maintain long-term understanding and make informed decisions across sessions.",
    systems: ["cortex"],
    content:
      "Built a knowledge graph system that serves as organizational memory for autonomous AI agents. The system captures structured decisions, relationships, and context into a queryable graph database. Agents can retrieve historical context, learn from past decisions, and maintain continuity across sessions. Includes semantic search and reasoning capabilities for retrieving relevant context.",
    published: "2026-05-20",
  },
  {
    id: "4",
    slug: "meridian",
    title: "Meridian",
    description: "Real-time supply chain risk intelligence powered by geopolitical signals",
    excerpt:
      "A risk intelligence system that aggregates geopolitical signals and real-time data to surface supply chain vulnerabilities. Combines alternative data sources with risk modeling to enable proactive supply chain management.",
    systems: ["meridian"],
    content:
      "Developed a real-time intelligence platform that monitors geopolitical events, trade disruptions, and operational risks. The system ingests signals from multiple data sources including news, shipping data, and policy announcements. Applies risk modeling to identify supply chain vulnerabilities before they impact operations. Enables supply chain teams to make data-driven decisions on sourcing and inventory.",
    published: "2026-04-10",
  },
  {
    id: "5",
    slug: "parallax",
    title: "Parallax",
    description: "Runtime reliability, diagnosis, and recovery framework for autonomous AI agents",
    excerpt:
      "A framework designed to make autonomous AI agents more reliable in production. Includes runtime monitoring, failure diagnosis, and automated recovery mechanisms to reduce operational risk.",
    systems: ["parallax"],
    content:
      "Built a comprehensive framework for improving agent reliability in production environments. The system provides real-time monitoring of agent behavior, automatic detection of failure modes, and triggered recovery actions. Includes diagnostic tools for understanding why agents fail and patterns for preventing similar failures. Enables teams to deploy autonomous agents with higher confidence and faster incident response.",
    published: "2026-03-05",
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
