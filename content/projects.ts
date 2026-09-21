import type { Project } from "@/lib/types";

export const projects: readonly Project[] = [
  {
    slug: "cortex",
    title: "Cortex",
    subtitle: "Organizational Memory for AI Agents",
    narrative:
      "MCP-based organizational memory that ingests Slack, GitHub, Jira, and Linear through Kafka and serves structured context to agents via FastAPI, Neo4j, and Qdrant.",
    year: 2026,
    updatedAt: "2026-09-19",
    category: "Context Engineering · MCP · Knowledge Graphs",
    heroMetric: "MCP memory · hybrid retrieval · provenance",
    metrics: [
      "MCP agent memory",
      "Kafka event ingest",
      "Neo4j + Qdrant retrieval",
    ],
    tags: ["MCP", "Kafka", "Neo4j", "Qdrant", "FastAPI"],
    pillars: ["Product", "Engineering", "Research"],
    color: "#FF6B35",
    github: "https://github.com/askmy-stack/cortex",
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent",
    problem:
      "Enterprise knowledge is fragmented across Slack, GitHub, Jira, and Linear. Agents that only see one silo invent context, lose provenance, and cannot be trusted in production workflows.",
    approach: [
      "Built an MCP-based memory platform that ingests enterprise events through Kafka and serves structured context through FastAPI and Neo4j.",
      "Implemented hybrid retrieval with Neo4j full-text search and Qdrant cosine similarity over sentence-transformer embeddings.",
      "Added Redis caching, provenance controls, RBAC, GDPR erasure, Prometheus metrics, and OpenTelemetry tracing.",
    ],
    results: [
      "Structured context for agent tool-use across fragmented enterprise sources",
      "Hybrid graph + vector retrieval with provenance-aware responses",
      "Production controls: caching, RBAC, erasure, metrics, and tracing",
    ],
    learnings:
      "Agent memory is an infrastructure problem before it is a prompting problem. Provenance and access control decide whether teams trust what the agent recalls.",
  },
  {
    slug: "parallax",
    title: "Parallax",
    subtitle: "Runtime Reliability for Autonomous Agents",
    narrative:
      "Ground-truth failure cases, semantic traces, fault injection, and rule-, ML-, and LLM-judge baselines for autonomous-agent regression testing.",
    year: 2026,
    updatedAt: "2026-08-11",
    category: "Evaluation · Observability · Agent Reliability",
    heroMetric: "LLM-as-judge · OpenTelemetry · failure benches",
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
      "Designed ground-truth failure cases, semantic traces, fault injection, and rule-, ML-, and LLM-judge baselines.",
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
    slug: "eeg-seizure-detection",
    title: "EEG Seizure Detection",
    subtitle: "Multi-Architecture Benchmark on Pediatric EEG",
    narrative:
      "Benchmark of 15+ neural architectures on 916 hours of pediatric EEG (CHB-MIT) for seizure detection under subject-independent evaluation.",
    year: 2026,
    updatedAt: "2026-08-10",
    category: "Research · Neural Signal Processing · Deep Learning",
    heroMetric: "15+ architectures · 916 hours CHB-MIT",
    metrics: [
      "15+ neural architectures",
      "916 hours CHB-MIT EEG",
      "Patient-disjoint evaluation",
    ],
    tags: ["Deep Learning", "PyTorch", "Neural Signal Processing"],
    pillars: ["Research", "Engineering"],
    color: "#818CF8",
    github: "https://github.com/askmy-stack/eeg-seizure-detection",
    gradient: "from-indigo-400/20 via-violet-500/10 to-transparent",
    problem:
      "Most published seizure-detection models report numbers on a single architecture or subject — leaving open which model class actually generalizes across patients in real conditions.",
    approach: [
      "Built a unified preprocessing pipeline on the CHB-MIT corpus using MNE so every architecture trains on byte-identical inputs.",
      "Benchmarked 15+ architectures across recurrent, Transformer, state-space, and Mixture-of-Experts families with patient-disjoint splits.",
      "Containerized training with version-pinned environments so a full re-evaluation is reproducible end-to-end.",
    ],
    results: [
      "15+ architectures compared under identical preprocessing",
      "916 hours of CHB-MIT EEG across pediatric subjects",
      "Reproducible training and evaluation from a locked environment",
    ],
    learnings:
      "Architecture choice matters less than preprocessing rigor and patient-disjoint evaluation. The infrastructure to run a fair comparison is the scientific contribution.",
  },
  {
    slug: "tool-semantics",
    title: "tool-semantics",
    subtitle: "Behavioral Compatibility Testing for MCP Tools",
    narrative:
      "Behavioral compatibility testing for MCP tools and AI-agent interfaces — know when a change breaks the agent, not just the schema.",
    year: 2026,
    updatedAt: "2026-09-18",
    category: "Evaluation · MCP · Agent Interfaces",
    heroMetric: "Schema + behavior · MCP tool contracts",
    metrics: [
      "MCP tool interfaces",
      "Behavioral compatibility",
      "Agent-breaking change detection",
    ],
    tags: ["MCP", "Evaluation", "Tool Calling", "TypeScript"],
    pillars: ["Engineering", "Research", "Product"],
    color: "#F472B6",
    github: "https://github.com/askmy-stack/tool-semantics",
    gradient: "from-pink-400/20 via-rose-500/10 to-transparent",
    problem:
      "MCP tool schemas can stay valid while agent behavior breaks — silent contract drift that unit tests and type checks miss.",
    approach: [
      "Defined behavioral compatibility checks for MCP tools and AI-agent interfaces beyond static schema validation.",
      "Focused on detecting changes that break agent workflows even when the published schema still type-checks.",
      "Treated tool interfaces as runtime contracts that need regression evidence, not only API documentation.",
    ],
    results: [
      "A framework for catching agent-breaking tool changes early",
      "Clearer separation between schema validity and behavioral compatibility",
      "Practical evaluation surface for MCP tool evolution",
    ],
    learnings:
      "For agent systems, the interface is incomplete without behavior. A green schema check is not enough when the agent’s tool-use path has shifted.",
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
