import type { Project } from "@/lib/types";

/**
 * Featured work — LinkedIn project order for newest first (Meridian),
 * then Cortex / EEG / Tool-semantics.
 * Metrics and narratives aligned to LinkedIn project writeups where present.
 */
export const projects: readonly Project[] = [
  {
    slug: "meridian",
    title: "Meridian",
    subtitle: "Supply Chain Risk Intelligence Platform",
    narrative:
      "Real-time supply chain risk platform combining geopolitical signals (GDELT, ACLED), AIS vessel tracking, and weather into a live Neo4j knowledge graph with explainable XGBoost scoring.",
    year: 2026,
    updatedAt: "2026-06-01",
    category: "Risk Intelligence. Graph ML. MLOps",
    heroMetric: "10K+ suppliers. 250+ risk edges. 500–700 req/s",
    metrics: [
      "10K+ supplier nodes",
      "XGBoost + SHAP scoring",
      "14 FastAPI endpoints",
    ],
    tags: ["Kafka", "Neo4j", "XGBoost", "FastAPI", "SHAP"],
    pillars: ["Engineering", "Product", "Research"],
    color: "#818CF8",
    github: "https://github.com/askmy-stack/meridian",
    image: "/info/projects/meridian.png",
    gradient: "from-indigo-400/20 via-violet-500/10 to-transparent",
    problem:
      "Supply chain disruption signals arrive as multi-source noise. Operators need scored risk, graph context, and explanations—not another offline notebook forecast.",
    approach: [
      "Combined GDELT and ACLED geopolitical signals, AIS vessel tracking, and weather into a live Neo4j knowledge graph with 250+ risk relationships and 10K+ supplier nodes.",
      "Scored risk with XGBoost and SHAP explanations, plus Monte Carlo simulation for disruption scenarios.",
      "Served 14 authenticated FastAPI endpoints at 500–700 req/s and validated the model against 50+ historical disruption events including the 2021 Suez blockage and Red Sea shipping crisis.",
    ],
    results: [
      "Operational risk scoring over live multi-source supplier and disruption data",
      "Explainable XGBoost outputs with SHAP and Monte Carlo simulation support",
      "Validated against 50+ real historical disruption events",
    ],
    learnings:
      "Risk products earn trust when scores are explainable and the data path is observable. Graph context plus SHAP beats a black-box probability every time.",
  },
  {
    slug: "cortex",
    title: "Cortex",
    subtitle: "Organizational Memory for AI Agents",
    narrative:
      "MCP-based organizational memory that ingests Slack, GitHub, and Jira through Kafka into a Neo4j knowledge graph and exposes persistent context to agents via a TypeScript MCP server.",
    year: 2026,
    updatedAt: "2026-05-01",
    category: "Context Engineering. MCP. Knowledge Graphs",
    heroMetric: "10K+ nodes. 30% recall lift. MCP native",
    metrics: [
      "MCP agent memory",
      "10K+ graph nodes",
      "30% recall vs baseline",
    ],
    tags: ["MCP", "Kafka", "Neo4j", "FastAPI", "GPT-4o"],
    pillars: ["Product", "Engineering", "Research"],
    color: "#FF6B35",
    github: "https://github.com/askmy-stack/cortex",
    image: "/info/projects/cortex.png",
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent",
    problem:
      "Enterprise knowledge is fragmented across Slack, GitHub, and Jira. Agents that only see one silo invent context, lose provenance, and cannot be trusted across sessions.",
    approach: [
      "Built a Python/FastAPI core with a Kafka extraction pipeline that pulls structured decisions into Neo4j via GPT-4o function calling.",
      "Exposed memory natively to MCP-compatible agents through a TypeScript MCP server, with trust scoring, contradiction detection, and RBAC.",
      "Tuned retrieval for multi-agent use across 10K+ nodes so context lands before inference, not after a failed answer.",
    ],
    results: [
      "Cut multi-agent retrieval latency by 120ms across 10K+ nodes",
      "Improved cross-session context recall 30% over baseline prompting",
      "Trust scoring, contradiction detection, and RBAC on agent memory",
    ],
    learnings:
      "Agent memory is an infrastructure problem before it is a prompting problem. Provenance and access control decide whether teams trust what the agent recalls.",
  },
  {
    slug: "eeg-seizure-detection",
    title: "EEG Seizure Detection",
    subtitle: "Multi-Architecture Benchmark on Pediatric EEG",
    narrative:
      "Benchmark of 15+ neural architectures on 916 hours of pediatric EEG (CHB-MIT, 24 patients) for seizure detection under strict subject-independent evaluation. Best AUROC 0.740.",
    year: 2026,
    updatedAt: "2026-04-01",
    category: "Research. Neural Signal Processing. Deep Learning",
    heroMetric: "15+ architectures. AUROC 0.740. 916 hours",
    metrics: [
      "15+ neural architectures",
      "Best AUROC 0.740",
      "Patient-disjoint evaluation",
    ],
    tags: ["Deep Learning", "PyTorch", "Neural Signal Processing"],
    pillars: ["Research", "Engineering"],
    color: "#A78BFA",
    github: "https://github.com/askmy-stack/eeg-seizure-detection",
    image: "/info/projects/eeg-seizure-detection.png",
    gradient: "from-violet-400/20 via-indigo-500/10 to-transparent",
    problem:
      "Most published seizure detection models report numbers on a single architecture or subject, leaving open which model class actually generalizes across patients in real conditions.",
    approach: [
      "Built an EDF-to-tensor preprocessing pipeline with MNE, sanitized corrupted PhysioNet timestamps, and used a weighted dataloader with BCEWithLogitsLoss for class imbalance.",
      "Benchmarked 15+ architectures across LSTM variants, Mamba, Mixture-of-Experts, CNNs, Transformers, and classical ML under patient-disjoint splits.",
      "Containerized the full PyTorch training pipeline for reproducible cross-environment experiments.",
    ],
    results: [
      "Best AUROC 0.740 under subject-independent evaluation on CHB-MIT",
      "916 hours of pediatric EEG across 24 patients compared fairly",
      "Mamba and small transformers proved most robust under strict generalization",
    ],
    learnings:
      "Subject-independent evaluation is brutal but honest. Architectures that look strong on subject-dependent splits often collapse when patients are held out.",
  },
  {
    slug: "tool-semantics",
    title: "Tool-semantics",
    subtitle: "Behavioral Compatibility Testing for MCP Tools",
    narrative:
      "Behavioral compatibility testing for MCP Tools and AI agent interfaces. Know when a change breaks the agent, not just the schema.",
    year: 2026,
    updatedAt: "2026-09-18",
    category: "Evaluation. MCP. Agent Interfaces",
    heroMetric: "Schema and behavior. MCP Tool contracts",
    metrics: [
      "MCP Tool interfaces",
      "Behavioral compatibility",
      "Agent breaking change detection",
    ],
    tags: ["MCP", "Evaluation", "Tool Calling", "TypeScript"],
    pillars: ["Engineering", "Research", "Product"],
    color: "#F472B6",
    github: "https://github.com/askmy-stack/tool-semantics",
    image: "/info/projects/tool-semantics.png",
    gradient: "from-pink-400/20 via-rose-500/10 to-transparent",
    problem:
      "MCP Tool schemas can stay valid while agent behavior breaks: silent contract drift that unit tests and type checks miss.",
    approach: [
      "Defined behavioral compatibility checks for MCP Tools and AI agent interfaces beyond static schema validation.",
      "Focused on detecting changes that break agent workflows even when the published schema still type checks.",
      "Treated Tool interfaces as runtime contracts that need regression evidence, not only API documentation.",
    ],
    results: [
      "A framework for catching agent breaking Tool changes early",
      "Clearer separation between schema validity and behavioral compatibility",
      "Practical evaluation surface for MCP Tool evolution",
    ],
    learnings:
      "For agent systems, the interface is incomplete without behavior. A green schema check is not enough when the agent’s Tool use path has shifted.",
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
