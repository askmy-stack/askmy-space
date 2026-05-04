import type { Project } from "@/lib/types";

export const projects: readonly Project[] = [
  {
    slug: "eeg-seizure-detection",
    title: "EEG Seizure Detection",
    subtitle: "Multi-Architecture Benchmark on Pediatric EEG",
    narrative:
      "Benchmarking 15+ neural architectures on 916 hours of pediatric EEG — finding what actually generalizes to real patients.",
    year: 2026,
    category: "Deep Learning · Neural Signal Processing",
    heroMetric: "AUROC 0.740 across 15+ architectures",
    metrics: ["AUROC 0.740", "15+ architectures", "916 hours CHB-MIT", "24 patients"],
    tags: ["Deep Learning", "Neural Signal Processing", "PyTorch"],
    color: "#4ADE80",
    github: "https://github.com/askmy-stack/spring-2026-group2",
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent",
  },
  {
    slug: "byu-flagellar-motors",
    title: "Locating Bacterial Flagellar Motors",
    subtitle: "3D Object Detection in Cryo-Electron Tomography",
    narrative:
      "3D object detection in cryo-electron tomography for structural biologists — bridging computer vision and biomedical imaging.",
    year: 2025,
    category: "Computer Vision · Biomedical Imaging",
    heroMetric: "mAP@50 = 0.948 · Precision = 1.00",
    metrics: ["mAP@50 = 0.948", "Precision = 1.00", "CenterNet · YOLOv10 · Faster R-CNN"],
    tags: ["Computer Vision", "Biomedical Imaging", "CenterNet"],
    color: "#FF6B35",
    github: "https://github.com/askmy-stack/byu-flagellar-motors",
    gradient: "from-cyan-400/20 via-blue-500/10 to-transparent",
  },
  {
    slug: "nasa-landslide",
    title: "NASA Landslide Predictive Analysis",
    subtitle: "Time-Series Modeling with Automated MLOps",
    narrative:
      "Time-series geospatial risk modeling with automated MLOps — the model is secondary; the infrastructure that ships it is everything.",
    year: 2024,
    category: "Time-Series · MLOps · Geospatial",
    heroMetric: "70% faster iteration · 100% IaC coverage",
    metrics: ["70% faster iteration", "100% IaC coverage", "GitHub Actions · Jenkins"],
    tags: ["Time-Series", "MLOps", "Terraform"],
    color: "#818CF8",
    github: "https://github.com/askmy-stack/nasa-landslide",
    gradient: "from-emerald-400/20 via-teal-500/10 to-transparent",
  },
  {
    slug: "agentic-job-search",
    title: "Hybrid Agentic Job Search Pipeline",
    subtitle: "Local Ollama + Anthropic API for Personal Automation",
    narrative:
      "Local Ollama + Anthropic API hybrid architecture — keeping cost low and privacy high while benefiting from frontier reasoning where it matters.",
    year: 2026,
    category: "Agentic AI · LLM Tooling",
    heroMetric: "Personal AI agent · Hybrid local+cloud architecture",
    metrics: ["Hybrid local+cloud", "Ollama · Anthropic API", "Go"],
    tags: ["Agentic AI", "LLM Tooling", "Go"],
    color: "#F472B6",
    github: "https://github.com/askmy-stack/job-search-pipeline",
    gradient: "from-amber-400/20 via-orange-500/10 to-transparent",
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
