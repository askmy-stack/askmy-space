import type { Project } from "@/lib/types";

export const projects: readonly Project[] = [
  {
    slug: "eeg-seizure-detection",
    title: "EEG Seizure Detection",
    subtitle: "Multi-Architecture Benchmark on Pediatric EEG",
    narrative:
      "Benchmarking 15+ neural architectures on 916 hours of pediatric EEG. Finding what actually generalizes to real patients.",
    year: 2026,
    updatedAt: "2026-07-01",
    category: "Deep Learning · Neural Signal Processing",
    heroMetric: "AUROC 0.740 across 15+ architectures",
    metrics: ["AUROC 0.740", "15+ architectures", "916 hours CHB-MIT", "24 patients"],
    tags: ["Deep Learning", "Neural Signal Processing", "PyTorch"],
    pillars: ["Research", "Engineering"],
    color: "#4ADE80",
    github: "https://github.com/askmy-stack/eeg-seizure-detection",
    image: "/info/projects/EEG Seizure Detection.jpg",
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
    slug: "startupintel",
    title: "StartupIntel",
    subtitle: "Specialized ML Bots for Startup Intelligence",
    narrative:
      "Open-source startup intelligence powered by specialized ML bots. Each bot owns one job — crawl, enrich, classify, rank. The pipeline composes them into a live picture of an emerging market.",
    year: 2026,
    updatedAt: "2026-06-15",
    category: "Intelligence · ML Systems",
    heroMetric: "Specialized bot pipeline · crawl → enrich → rank",
    metrics: [
      "Modular bot architecture",
      "Crawl · enrich · classify · rank",
      "Open source, extensible sources",
    ],
    tags: ["Intelligence", "ML Systems", "Python"],
    pillars: ["Product", "Engineering"],
    color: "#FBBF24",
    github: "https://github.com/askmy-stack/startupintel",
    gradient: "from-yellow-400/20 via-amber-500/10 to-transparent",
    problem:
      "Startup research is scattered across funding databases, news, job boards, and social chatter. A single monolithic scraper-plus-LLM either drowns in noise or misses the signal that only shows up when sources are cross-referenced.",
    approach: [
      "Decomposed the problem into specialized bots — each one crawls, enriches, classifies, or ranks, and does nothing else. A bot that only classifies funding stages is easy to evaluate, easy to replace, and hard to break.",
      "Built a composition layer that chains bots into pipelines, so cross-referencing (this company, this hiring spike, this filing) is an orchestration concern rather than a prompt-engineering one.",
      "Shipped it open source with pluggable sources, so adding a new data feed means writing one adapter, not touching the analysis stack.",
    ],
    results: [
      "End-to-end pipeline: raw web sources → ranked startup intelligence",
      "Specialized bots evaluated and tuned independently",
      "New data sources land as single adapters",
      "Open source — the architecture is the documentation",
    ],
    learnings:
      "Specialization beats generality in intelligence pipelines. Ten small bots you can test individually outperform one clever agent you can only judge end-to-end — and when quality drops, you know exactly which stage to blame.",
  },
  {
    slug: "cortex",
    title: "Cortex",
    subtitle: "Organizational Memory for AI Agents",
    narrative:
      "Organizational memory for AI agents. Decisions, context, and relationships captured into a knowledge graph — so agents stop re-learning the same organization every session.",
    year: 2026,
    updatedAt: "2026-05-20",
    category: "Knowledge Graph · Agent Infrastructure",
    heroMetric: "Decision capture → queryable knowledge graph",
    metrics: [
      "Structured decision capture",
      "Graph-native retrieval",
      "Cross-session agent continuity",
    ],
    tags: ["Knowledge Graph", "Agent Infrastructure", "TypeScript"],
    pillars: ["Engineering", "Research"],
    color: "#A78BFA",
    github: "https://github.com/askmy-stack/cortex",
    gradient: "from-violet-400/20 via-purple-500/10 to-transparent",
    problem:
      "AI agents are amnesiacs. Every session starts from zero: past decisions, who owns what, why an approach was rejected — all gone. Context windows don't fix this; they just make the amnesia more expensive.",
    approach: [
      "Modeled organizational knowledge as a graph — decisions, people, systems, and the relationships between them — instead of a flat pile of embeddings, because 'why did we choose X over Y' is a traversal, not a similarity search.",
      "Built capture paths that turn agent sessions into structured graph writes, so memory accumulates as a side effect of doing work rather than as a separate documentation chore.",
      "Exposed retrieval as typed queries agents can call mid-task — fetch the decision, its alternatives, and who signed off — rather than dumping raw context into the prompt.",
    ],
    results: [
      "Agents recover prior decisions and rationale across sessions",
      "Graph queries return structured context, not text soup",
      "Memory grows automatically from agent activity",
      "Knowledge survives model swaps — the graph outlives any one agent",
    ],
    learnings:
      "The hard part of agent memory isn't storage, it's schema. Deciding what a 'decision' is — its alternatives, its owner, its expiry — matters more than the database underneath. Get the ontology right and retrieval becomes boring.",
  },
  {
    slug: "meridian",
    title: "Meridian",
    subtitle: "Supply Chain Risk from Geopolitical Signals",
    narrative:
      "Real-time supply chain risk intelligence. Geopolitical signals in, ranked exposure out — before the disruption shows up as a shipping delay.",
    year: 2026,
    updatedAt: "2026-04-10",
    category: "Risk Intelligence · Signal Processing",
    heroMetric: "Geopolitical signals → ranked supply-chain exposure",
    metrics: [
      "Multi-source signal ingestion",
      "Risk scoring per route and supplier",
      "Real-time monitoring",
    ],
    tags: ["Risk Intelligence", "Signal Processing", "Python"],
    pillars: ["Product", "Research"],
    color: "#DC5D4F",
    github: "https://github.com/askmy-stack/meridian",
    gradient: "from-red-400/20 via-rose-500/10 to-transparent",
    problem:
      "Supply chain teams find out about geopolitical disruptions the same way everyone else does — from the news, after the delay is already booked. The signals existed days earlier; nobody was mapping them onto this supply chain.",
    approach: [
      "Ingested signals across news, policy announcements, and shipping data into one normalized stream, because a port strike, an export ban, and a rerouted lane are the same event type at different altitudes.",
      "Mapped signals onto a model of routes and suppliers, so risk lands as 'your exposure via this lane' rather than a generic headline.",
      "Scored and ranked exposure continuously so the output is a shortlist worth acting on, not a feed to babysit.",
    ],
    results: [
      "Live pipeline: raw geopolitical signals → per-route risk scores",
      "Exposure ranked by supply-chain relevance, not headline volume",
      "Signals surfaced ahead of operational impact",
      "Extensible source layer for new signal feeds",
    ],
    learnings:
      "Risk intelligence is a mapping problem, not a detection problem. The world already publishes the warning signs. Value comes from joining them to a specific supply chain fast enough to act — the join is the product.",
  },
  {
    slug: "parallax",
    title: "Parallax",
    subtitle: "Runtime Reliability for Autonomous Agents",
    narrative:
      "Runtime reliability, diagnosis, and recovery for autonomous AI agents. Watches agents work, catches them failing, and gets them back on track — or fails loudly.",
    year: 2026,
    updatedAt: "2026-03-05",
    category: "Agent Reliability · Observability",
    heroMetric: "Detect → diagnose → recover, at agent runtime",
    metrics: [
      "Runtime behavior monitoring",
      "Failure-mode taxonomy",
      "Automated recovery hooks",
    ],
    tags: ["Agent Reliability", "Observability", "Python"],
    pillars: ["Engineering", "Research"],
    color: "#34D399",
    github: "https://github.com/askmy-stack/parallax",
    gradient: "from-emerald-400/20 via-green-500/10 to-transparent",
    problem:
      "Autonomous agents fail in ways traditional software doesn't: silent loops, confident nonsense, half-finished side effects. Standard observability sees a healthy process while the agent burns tokens doing nothing useful.",
    approach: [
      "Instrumented the agent loop itself — tool calls, retries, output drift — instead of just infrastructure metrics, because agent failure is behavioral, not infrastructural.",
      "Built a taxonomy of failure modes (loops, stalls, goal drift, degenerate output) with detectors for each, so failures get names instead of vibes.",
      "Wired recovery hooks per failure mode — retry with adjusted context, roll back side effects, or escalate to a human — making 'fail loudly' the worst case rather than the default silence.",
    ],
    results: [
      "Agent failures detected from behavior, not process health",
      "Named failure modes with per-mode recovery paths",
      "Side-effect rollback for partial completions",
      "Escalation path: agents fail loudly, never silently",
    ],
    learnings:
      "Reliability for agents means admitting they fail differently. The interesting engineering isn't preventing failure — it's noticing it fast, naming it precisely, and making recovery cheaper than a human retry.",
  },
  {
    slug: "agentic-job-search",
    title: "Hybrid Agentic Job Search Pipeline",
    subtitle: "Local Ollama + Anthropic API for Personal Automation",
    narrative:
      "A personal AI agent for job search automation. Hybrid local Ollama for parsing and ranking, Anthropic API for fit analysis and drafting. Privacy and cost stay local. Reasoning goes to the frontier.",
    year: 2026,
    updatedAt: "2026-06-15",
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
    image: "/info/projects/Hybrid Agentic Job Search Pipeline.jpg",
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
    updatedAt: "2025-12-01",
    category: "Computer Vision · Biomedical Imaging",
    heroMetric: "mAP@50 = 0.948 · Precision = 1.00",
    metrics: ["mAP@50 = 0.948", "Precision = 1.00", "CenterNet · YOLOv10 · Faster R-CNN"],
    tags: ["Computer Vision", "Biomedical Imaging", "CenterNet"],
    pillars: ["Research", "Engineering"],
    color: "#FF6B35",
    github: "https://github.com/askmy-stack/byu-flagellar-motors",
    image: "/info/projects/Locating Bacterial Flagellar Motors.jpg",
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
    updatedAt: "2024-11-01",
    category: "Time-Series · MLOps · Geospatial",
    heroMetric: "70% faster iteration · 100% IaC coverage",
    metrics: ["70% faster iteration", "100% IaC coverage", "GitHub Actions · Jenkins"],
    tags: ["Time-Series", "MLOps", "Terraform"],
    pillars: ["Engineering", "Research"],
    color: "#818CF8",
    github: "https://github.com/askmy-stack/nasa-landslide",
    image: "/info/projects/NASA Landslide Predictive Analysis.jpg",
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
