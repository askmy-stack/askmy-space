import type { Project } from "@/lib/types";

export const projects: readonly Project[] = [
  {
    slug: "cortex",
    title: "Cortex",
    subtitle: "Organizational Memory Platform for AI Agents",
    narrative:
      "MCP-based organizational memory that ingests Slack, GitHub, Jira, and Linear events through Kafka and serves structured context to AI agents via FastAPI and Neo4j.",
    year: 2026,
    updatedAt: "2026-09-19",
    category: "Agentic AI · Knowledge Graphs · MCP",
    heroMetric: "MCP memory · Kafka ingest · hybrid retrieval",
    metrics: [
      "MCP-based agent memory",
      "Kafka event ingest",
      "Neo4j + Qdrant hybrid retrieval",
    ],
    tags: ["Agentic AI", "MCP", "Kafka", "Neo4j", "Qdrant"],
    pillars: ["Product", "Engineering", "Research"],
    color: "#FF6B35",
    github: "https://github.com/askmy-stack/cortex",
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent",
    problem:
      "Enterprise knowledge is fragmented across Slack, GitHub, Jira, and Linear. Agents that only see one silo invent context, lose provenance, and cannot be trusted in production workflows.",
    approach: [
      "Built an MCP-based organizational memory platform that ingests collaboration events through Kafka and serves structured context to AI agents through FastAPI and Neo4j.",
      "Implemented hybrid retrieval with Neo4j full-text search and Qdrant cosine similarity over normalized sentence-transformer embeddings.",
      "Added Redis caching, provenance controls, RBAC, GDPR erasure, Prometheus metrics, and OpenTelemetry tracing for reliable production retrieval.",
    ],
    results: [
      "Reduced fragmented retrieval across enterprise knowledge sources for agent tool-use",
      "Hybrid graph + vector retrieval with provenance-aware responses",
      "Production controls: caching, RBAC, erasure, metrics, and distributed tracing",
    ],
    learnings:
      "Agent memory is an infrastructure problem before it is a prompting problem. Provenance, access control, and retrieval latency decide whether teams trust what the agent recalls.",
  },
  {
    slug: "parallax",
    title: "Parallax",
    subtitle: "Agent Reliability and LLM Evaluation Framework",
    narrative:
      "Ground-truth failure cases, semantic traces, fault injection, and rule-, ML-, and LLM-judge baselines for autonomous-agent regression testing.",
    year: 2026,
    updatedAt: "2026-08-11",
    category: "LLM Evaluation · Observability · Agent Reliability",
    heroMetric: "LLM-as-judge · OpenTelemetry · failure benchmarks",
    metrics: [
      "LLM-as-a-Judge baselines",
      "OpenTelemetry · Jaeger",
      "Agent failure benchmarks",
    ],
    tags: ["LLM Evaluation", "OpenTelemetry", "Agent Reliability"],
    pillars: ["Research", "Engineering"],
    color: "#4ADE80",
    github: "https://github.com/askmy-stack/parallax",
    gradient: "from-emerald-400/20 via-teal-500/10 to-transparent",
    problem:
      "Autonomous agents fail in ways unit tests miss — silent tool misuse, degraded reasoning, and recovery paths that never fire. Pass/fail suites do not measure detection lead time or diagnosis quality.",
    approach: [
      "Designed ground-truth failure cases, semantic traces, fault injection, and rule-, ML-, and LLM-judge baselines for autonomous-agent regression testing.",
      "Instrumented agent execution with OpenTelemetry and Jaeger to compare detection lead time, diagnosis quality, and recovery behavior.",
      "Established repeatable reliability benchmarks across failure scenarios beyond simple pass/fail evaluation.",
    ],
    results: [
      "Repeatable agent reliability benchmarks across injected failure scenarios",
      "Measurable observability signals for detection lead time and recovery",
      "Comparable rule, ML, and LLM-judge baselines on the same harness",
    ],
    learnings:
      "Reliability for agents is an evidence problem. Traces, judges, and recovery metrics matter more than a green checkmark on the happy path.",
  },
  {
    slug: "meridian",
    title: "Meridian",
    subtitle: "Supply Chain Risk Intelligence Platform",
    narrative:
      "Real-time supply-chain risk platform combining Kafka event streams, Neo4j graph retrieval, XGBoost scoring, and authenticated FastAPI services.",
    year: 2026,
    updatedAt: "2026-08-10",
    category: "Risk Intelligence · Graph ML · MLOps",
    heroMetric: "Kafka + Neo4j · XGBoost + SHAP · MLflow",
    metrics: [
      "Kafka + Neo4j risk graph",
      "XGBoost + SHAP explanations",
      "MLflow · GitHub Actions",
    ],
    tags: ["Kafka", "Neo4j", "XGBoost", "MLflow", "FastAPI"],
    pillars: ["Engineering", "Product", "Research"],
    color: "#818CF8",
    github: "https://github.com/askmy-stack/meridian",
    gradient: "from-indigo-400/20 via-violet-500/10 to-transparent",
    problem:
      "Supply-chain disruption signals arrive as multi-source event noise. Operators need scored risk, graph context, and explanations — not another offline notebook forecast.",
    approach: [
      "Built a real-time risk platform combining Kafka event streams, Neo4j graph retrieval, XGBoost scoring, and authenticated FastAPI services across multi-source supplier and disruption data.",
      "Tracked XGBoost experiments with MLflow, added SHAP explanations and Monte Carlo disruption simulation.",
      "Automated unit and integration testing through GitHub Actions to improve interpretability, repeatability, and release quality.",
    ],
    results: [
      "Operational risk scoring over live multi-source supplier and disruption data",
      "Explainable XGBoost outputs with SHAP and simulation support",
      "CI-backed experiment tracking and release validation via MLflow and GitHub Actions",
    ],
    learnings:
      "Risk products earn trust when scores are explainable and the data path is observable. Graph context plus SHAP beats a black-box probability every time.",
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
