import type { Principle } from "@/lib/types";

export const aboutParagraphs: readonly string[] = [
  "I build AI/ML systems at the intersection of research rigor, engineering execution, and product thinking — moving between all three depending on what the problem needs.",
  "Currently: MS Data Science at George Washington University (Global Leaders Award, 3.77 GPA), graduating May 2026. Before that, ML infrastructure at Jio Platforms — 85% faster deploys, 99.9% pipeline reliability, 100K events/sec under real-time load. Before that, systems for biomedical imaging (mAP@50 = 0.948 on cryo-ET), clinical EEG (15+ architectures benchmarked on 916 hours of CHB-MIT), and agentic automation — each one grounded in honest evaluation, production-ready engineering, and a real user at the end.",
  "I care about the boring parts: containerized training, version-pinned environments, observability that works at 3am, infrastructure-as-code. These are what separate \"I trained a model in a notebook\" from \"I shipped AI to real users.\"",
  "Open to collaborations and teams building AI that matters — especially at the research-to-product boundary, in healthcare, robotics, scientific computing, or developer tools.",
] as const;

export const principles: readonly Principle[] = [
  { title: "Models in research, models in production. I do both." },
  { title: "Reproducibility is not optional. Containers, IaC, version pinning." },
  { title: "Metrics without context are vanity. Real systems, real users, real impact." },
] as const;

