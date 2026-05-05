import type { Principle } from "@/lib/types";

export const aboutParagraphs: readonly string[] = [
  "I build AI/ML systems at the intersection of research rigor, engineering execution, and product thinking — moving between all three depending on what the problem needs.",
  "MS Data Science at George Washington University (Global Leaders Award, 3.77 GPA), graduating May 2026. Before that, ML infrastructure at Jio Platforms — 85% faster model deployments, 99.9% pipeline reliability. Before that, systems for biomedical imaging (mAP@50 = 0.948), clinical EEG benchmarking (AUROC 0.740 across 15+ architectures on 916 hours of CHB-MIT), and agentic automation — each one grounded in honest evaluation, production-ready engineering, and a real user at the end.",
  "I care about the boring parts: containerized training, version-pinned environments, observability that works at 3am, infrastructure-as-code. These are what separate \"I trained a model in a notebook\" from \"I shipped AI to real users.\"",
  "Open to collaborations and teams building AI that matters — especially at the research-to-product boundary, in healthcare, robotics, scientific computing, or developer tools.",
] as const;

export const principles: readonly Principle[] = [
  { title: "Research without shipping is a paper. Shipping without research is a guess." },
  { title: "Reproducibility is infrastructure. Containers, IaC, version pinning — not optional." },
  { title: "A metric that impresses on paper but fails on real patients means nothing." },
] as const;

