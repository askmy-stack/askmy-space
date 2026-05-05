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
    category: "ML & AI",
    skills: [
      { name: "PyTorch", level: "core" },
      { name: "TensorFlow", level: "core" },
      { name: "Hugging Face", level: "core" },
      { name: "scikit-learn", level: "core" },
      { name: "LSTM", level: "research" },
      { name: "Mamba", level: "research" },
      { name: "Transformers", level: "research" },
      { name: "MoE", level: "research" },
      { name: "CenterNet", level: "research" },
      { name: "YOLOv10", level: "research" },
      { name: "Faster R-CNN", level: "research" },
      { name: "MLflow", level: "production" },
    ],
  },
  {
    category: "MLOps & Infra",
    skills: [
      { name: "Docker", level: "core" },
      { name: "Kubernetes", level: "core" },
      { name: "Apache Airflow", level: "core" },
      { name: "Terraform", level: "production" },
      { name: "Jenkins", level: "production" },
      { name: "GitHub Actions", level: "production" },
      { name: "Prometheus", level: "production" },
      { name: "Grafana", level: "production" },
      { name: "Vault", level: "production" },
      { name: "CI/CD", level: "production" },
      { name: "IaC", level: "production" },
    ],
  },
  {
    category: "Cloud",
    skills: [
      { name: "AWS", level: "core" },
      { name: "Azure", level: "core" },
      { name: "GCP", level: "core" },
      { name: "SageMaker", level: "production" },
      { name: "EC2 + S3", level: "production" },
      { name: "Databricks", level: "production" },
    ],
  },
  {
    category: "Data Engineering",
    skills: [
      { name: "Apache Spark", level: "core" },
      { name: "Spark Streaming", level: "core" },
      { name: "Apache Kafka", level: "production" },
      { name: "BigQuery", level: "production" },
      { name: "PostgreSQL", level: "production" },
      { name: "MongoDB", level: "production" },
      { name: "dbt", level: "production" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "Python", level: "core" },
      { name: "SQL", level: "core" },
      { name: "Go", level: "production" },
      { name: "Bash", level: "production" },
      { name: "R", level: "production" },
      { name: "TypeScript", level: "production" },
    ],
  },
  {
    category: "Signal Processing",
    skills: [
      { name: "MNE", level: "research" },
      { name: "EDF parsing", level: "research" },
      { name: "Time-series windowing", level: "research" },
      { name: "CLAHE", level: "research" },
      { name: "NumPy", level: "core" },
      { name: "Pandas", level: "core" },
    ],
  },
];

// Semantic color mapping — mapped to actual CSS variables in this codebase
export const levelColors: Record<SkillLevel, string> = {
  core: "var(--fg-muted)",
  production: "var(--accent)",
  research: "var(--mono)",
};
