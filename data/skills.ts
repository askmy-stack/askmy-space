export type SkillLevel = "core" | "production" | "research";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Generative AI & Agents",
    skills: [
      { name: "LLMs", level: "core" },
      { name: "RAG", level: "core" },
      { name: "MCP", level: "core" },
      { name: "Tool Calling", level: "core" },
      { name: "LangGraph", level: "production" },
      { name: "Embeddings", level: "production" },
      { name: "Vector Search", level: "production" },
      { name: "LLM Evaluation", level: "research" },
      { name: "Prompt Engineering", level: "production" },
    ],
  },
  {
    category: "ML & Data Science",
    skills: [
      { name: "PyTorch", level: "core" },
      { name: "scikit-learn", level: "core" },
      { name: "XGBoost", level: "core" },
      { name: "SHAP", level: "production" },
      { name: "MLflow", level: "production" },
      { name: "TensorFlow", level: "production" },
      { name: "Time-Series", level: "research" },
      { name: "Feature Engineering", level: "core" },
    ],
  },
  {
    category: "Data Eng & APIs",
    skills: [
      { name: "Kafka", level: "core" },
      { name: "Airflow", level: "core" },
      { name: "Spark Streaming", level: "core" },
      { name: "Neo4j", level: "production" },
      { name: "Qdrant", level: "production" },
      { name: "BigQuery", level: "production" },
      { name: "PostgreSQL", level: "production" },
      { name: "FastAPI", level: "core" },
    ],
  },
  {
    category: "Cloud & MLOps",
    skills: [
      { name: "Docker", level: "core" },
      { name: "Kubernetes", level: "core" },
      { name: "Terraform", level: "production" },
      { name: "Jenkins", level: "production" },
      { name: "GitHub Actions", level: "production" },
      { name: "AWS Bedrock", level: "production" },
      { name: "Azure ML", level: "production" },
      { name: "GCP Vertex AI", level: "production" },
      { name: "Vault", level: "production" },
    ],
  },
  {
    category: "Observability",
    skills: [
      { name: "Prometheus", level: "core" },
      { name: "Grafana", level: "core" },
      { name: "OpenTelemetry", level: "production" },
      { name: "Jaeger", level: "production" },
      { name: "SLA Monitoring", level: "production" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "Python", level: "core" },
      { name: "SQL", level: "core" },
      { name: "TypeScript", level: "production" },
      { name: "Bash", level: "production" },
    ],
  },
];

export const levelColors: Record<SkillLevel, string> = {
  core: "var(--fg-muted)",
  production: "var(--accent)",
  research: "var(--mono)",
};
