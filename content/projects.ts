import type { Project } from "@/lib/types";

export const projects: readonly Project[] = [
  {
    slug: "eeg-seizure-detection",
    title: "EEG Seizure Detection",
    subtitle: "Multi-Architecture Benchmark on Pediatric EEG",
    narrative:
      "Benchmarking 15+ neural architectures on 916 hours of pediatric EEG. Finding what actually generalizes to real patients.",
    year: 2026,
    category: "Deep Learning · Neural Signal Processing",
    heroMetric: "AUROC 0.740 across 15+ architectures",
    metrics: ["AUROC 0.740", "15+ architectures", "916 hours CHB-MIT", "24 patients"],
    tags: ["Deep Learning", "Neural Signal Processing", "PyTorch"],
    pillars: ["Research", "Engineering"],
    color: "#4ADE80",
    github: "https://github.com/askmy-stack/spring-2026-group2",
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent",
    problem:
      "Most published seizure-detection models report numbers on a single architecture or subject — leaving a critical question unanswered: which model class actually generalizes across patients in real conditions?",
    approach: [
      "Built a unified preprocessing pipeline on the CHB-MIT corpus (24 patients, 916 hours of recording) using MNE for filtering, artifact handling, and windowing. So every architecture trains on byte-identical inputs.",
      "Benchmarked 15+ architectures across four families. LSTM/GRU recurrent, Transformer, Mamba/state-space, and Mixture-of-Experts. With patient-disjoint splits to measure cross-subject generalization, not memorization.",
      "Containerized training with version-pinned environments and tracked every run. Swapping an architecture is one config change and a full re-evaluation is reproducible end-to-end.",
    ],
    results: [
      "AUROC 0.740 (best family, patient-disjoint evaluation)",
      "15+ architectures benchmarked under identical preprocessing",
      "916 hours of CHB-MIT EEG processed across 24 pediatric subjects",
      "Reproducible: any run can be re-executed from the locked environment",
    ],
    learnings:
      "Architecture choice matters less than preprocessing rigor and patient-disjoint evaluation. Several models that look state-of-the-art on shuffled splits collapse on held-out patients. The infrastructure to run a fair comparison is the actual scientific contribution; the model rankings are downstream of that.",
  },
  {
    slug: "agentic-job-search",
    title: "Hybrid Agentic Job Search Pipeline",
    subtitle: "Local Ollama + Anthropic API for Personal Automation",
    narrative:
      "A personal AI agent for job search automation. Hybrid local Ollama for parsing and ranking, Anthropic API for fit analysis and drafting. Privacy and cost stay local. Reasoning goes to the frontier.",
    year: 2026,
    category: "Agentic AI · LLM Tooling",
    heroMetric: "Hybrid local+cloud agent · cost- and privacy-aware",
    metrics: [
      "Hybrid local + cloud routing",
      "Ollama (local) · Anthropic API (frontier)",
      "Tool-use · RAG · cost-aware routing",
    ],
    tags: ["Agentic AI", "LLM Tooling", "Go"],
    pillars: ["Product", "Engineering"],
    color: "#F472B6",
    github: "https://github.com/askmy-stack/job-search-pipeline",
    gradient: "from-amber-400/20 via-orange-500/10 to-transparent",
    problem:
      "Hundreds of job postings, most irrelevant, each needing slightly different framing. Frontier LLMs can help — but running every step through a paid API is wasteful for easy tasks and uncomfortable for private data.",
    approach: [
      "Split the agent across two backends: a local Ollama model for cheap, privacy-sensitive operations (parsing resumes, screening listings, drafting first passes) and the Anthropic API for the hard reasoning (tailored cover letters, structured comparisons).",
      "Implemented in Go for a tight, fast control loop — tool-use, retrieval, and routing live in code, not in a prompt.",
      "Cost-aware routing rules pick the cheapest backend that meets the quality bar for each step, so frontier calls are reserved for the work that actually needs them.",
    ],
    results: [
      "Functional end-to-end personal agent (parse → screen → draft → review)",
      "Hybrid routing: local-first, frontier where it matters",
      "Privacy: resume + personal data never leave the local node",
      "Cost: pay-per-token only on the steps that genuinely benefit from frontier models",
    ],
    learnings:
      "Agent design is mostly routing and constraints, not prompting. The interesting question isn't 'can the LLM do this'. It's 'which LLM, on which machine, with which tools, under which budget.'",
  },
  {
    slug: "byu-flagellar-motors",
    title: "Locating Bacterial Flagellar Motors",
    subtitle: "3D Object Detection in Cryo-Electron Tomography",
    narrative:
      "Locating bacterial flagellar motors in 3D cryo-electron tomography. Built for structural biologists who need precision, not just accuracy. mAP@50 = 0.948. Precision = 1.00. Zero tolerance for false positives in a scientist's workflow.",
    year: 2025,
    category: "Computer Vision · Biomedical Imaging",
    heroMetric: "mAP@50 = 0.948 · Precision = 1.00",
    metrics: ["mAP@50 = 0.948", "Precision = 1.00", "CenterNet · YOLOv10 · Faster R-CNN"],
    tags: ["Computer Vision", "Biomedical Imaging", "CenterNet"],
    pillars: ["Research", "Engineering"],
    color: "#FF6B35",
    github: "https://github.com/askmy-stack/byu-flagellar-motors",
    gradient: "from-cyan-400/20 via-blue-500/10 to-transparent",
    problem:
      "Flagellar motors are tiny, sparse, and buried in noisy cryo-ET volumes. Manual annotation is slow and inconsistent — and a structural biologist will only trust a detector with near-perfect precision.",
    approach: [
      "Compared three families of detectors on the same tomographic dataset. Anchor-based (Faster R-CNN), anchor-free (CenterNet), and a modern one-stage detector (YOLOv10). To isolate which inductive biases hold up under cryo-ET noise.",
      "Tuned input resolution, augmentation, and post-processing per architecture rather than using off-the-shelf defaults, because cryo-ET slices look nothing like natural images and standard augmentations actively hurt performance.",
      "Containerized the full pipeline and ran training on AWS GPU instances, so the entire experiment is reproducible from a single Docker image and a config file.",
    ],
    results: [
      "mAP@50 = 0.948 on held-out tomograms",
      "Precision = 1.00 — zero false positives at the operating threshold",
      "Three architectures benchmarked under identical preprocessing",
      "Reproducible: Dockerized, AWS-ready, single-config re-run",
    ],
    learnings:
      "On scientific imaging, architecture matters less than calibrating the precision/recall trade-off to what the downstream user actually trusts. A biologist will use a detector with perfect precision and missing recall; they won't use one with 0.95 precision no matter how high the recall climbs.",
  },
  {
    slug: "nasa-landslide",
    title: "NASA Landslide Predictive Analysis",
    subtitle: "Time-Series Modeling with Automated MLOps",
    narrative:
      "Time-series geospatial risk modeling with automated MLOps. The model is secondary; the infrastructure that ships it is everything.",
    year: 2024,
    category: "Time-Series · MLOps · Geospatial",
    heroMetric: "70% faster iteration · 100% IaC coverage",
    metrics: ["70% faster iteration", "100% IaC coverage", "GitHub Actions · Jenkins"],
    tags: ["Time-Series", "MLOps", "Terraform"],
    pillars: ["Engineering", "Research"],
    color: "#818CF8",
    github: "https://github.com/askmy-stack/nasa-landslide",
    gradient: "from-emerald-400/20 via-teal-500/10 to-transparent",
    problem:
      "Geospatial risk models rot without fresh data, but re-training and deployment pipelines are often slow, fragile, and environment-inconsistent. The bottleneck isn't the model — it's the path from notebook to running service.",
    approach: [
      "Provisioned the full training and serving environment in Terraform on AWS, so the infrastructure is one PR away from being torn down and rebuilt identically.",
      "Containerized training and inference, then wired GitHub Actions and Jenkins for CI/CD so a model change goes through the same review-and-deploy path as application code.",
      "Added basic observability — metrics, alerts, lineage — so a regression in production triggers a page, not a slack screenshot three days later.",
    ],
    results: [
      "~70% faster iteration cycle (notebook → deployed model)",
      "100% infrastructure-as-code coverage",
      "CI/CD parity between application and ML deploys",
      "Repeatable teardown / rebuild from a single Terraform plan",
    ],
    learnings:
      "On time-series risk problems, half the modeling battle is freshness. A slightly worse model retrained weekly beats a better model retrained quarterly. Optimizing the deploy loop is doing science, not avoiding it.",
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
