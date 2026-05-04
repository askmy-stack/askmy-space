import type { Principle } from "@/lib/types";

export const aboutParagraphs: readonly string[] = [
  "I build AI/ML systems that survive production.",
  "Master's candidate at George Washington University (Data Science, 3.77, Global Leaders Award). At Jio Platforms I shipped ML pipelines across hybrid AWS/Azure/GCP — 85% faster deploys, 99.9% pipeline reliability, 100K events/sec under real-time load. At GWU I've built 3D detection pipelines for biomedical cryo-electron tomography (mAP@50 = 0.948) and benchmarked 15+ neural architectures on 916 hours of pediatric EEG.",
  "I care about the boring parts: containerized training, version-pinned environments, observability that works at 3am, infrastructure-as-code. These are what separate \"I trained a model in a notebook\" from \"I shipped AI to real users.\"",
  "I'm looking for full-time AI/ML Engineer roles starting summer 2026 (F-1, OPT-eligible). Especially excited about teams shipping ML to real users in healthcare, robotics, scientific computing, or developer tools.",
] as const;

export const principles: readonly Principle[] = [
  { title: "Models in research, models in production. I do both." },
  { title: "Reproducibility is not optional. Containers, IaC, version pinning." },
  { title: "Metrics without context are vanity. Real systems, real users, real impact." },
] as const;

export const heroStats: readonly string[] = [
  "3+ yrs production ML",
  "First-principles for product",
  "100K events/sec",
] as const;
