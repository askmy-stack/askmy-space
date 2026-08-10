import type { Role } from "@/lib/types";

export const career: readonly Role[] = [
  {
    title: "System Operations Analyst",
    company: undefined,
    duration: "May 2025 – May 2026",
    timezone: "ET",
    description:
      "Architecting and optimizing intelligence infrastructure. Responsible for data pipeline reliability, signal ingestion optimization, system health monitoring, and emerging research integration.",
  },
  {
    title: "Data Operations Engineer",
    company: "Jio Platforms Limited",
    duration: "Jul 2023 – Jul 2024",
    timezone: "IST",
    description:
      "Engineered CI/CD automation for ML deployment across AWS/Azure/GCP using Jenkins, Docker, Kubernetes. Built 100+ Airflow DAGs with Vault-secured auth for ML and data workloads, achieving 99.9% reliability. Optimized Spark Streaming for real-time feature pipelines and provisioned cloud infrastructure via Terraform.",
  },
  {
    title: "Data Analyst",
    company: "PHN Technologies",
    duration: "Mar 2023 – Jun 2023",
    timezone: "IST",
    description:
      "Engineered data pipelines in BigQuery achieving 30% efficiency gains and 40% latency reduction. Built 10+ real-time monitoring dashboards surfacing data quality issues and model drift signals. Implemented key-based authentication in Airflow, securing critical data and ML pipelines.",
  },
] as const;
