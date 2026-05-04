import type { Experience } from "@/lib/types";

export const experience: readonly Experience[] = [
  {
    title: "Operations Analytics Associate",
    company: "Follett Higher Education Group",
    dates: "May 2025 — Present",
    location: "Washington, DC",
    bullets: [
      "Operate fulfillment and inventory data workflows during peak academic cycles across online and on-campus systems.",
      "Maintain process-level data integrity across receiving, disposition, and reconciliation, reducing discrepancies during peak periods.",
      "Apply CourseTracks adoption data for demand planning and accuracy.",
    ],
  },
  {
    title: "Data Operations Engineer",
    company: "Jio Platforms Limited",
    dates: "Jul 2023 — Jul 2024",
    location: "Navi Mumbai, India",
    bullets: [
      "Engineered CI/CD automation for ML deployment across AWS/Azure/GCP using Jenkins, Docker, Kubernetes — cut time-to-production 85% and release failures 60%.",
      "Deployed Kubernetes-based ML inference microservices, reducing model-serving downtime 40% and enabling auto-scaling under real-time traffic.",
      "Built 100+ Airflow DAGs with Vault-secured auth for ML and data workloads, achieving 99.9% reliability across multi-terabyte daily volume.",
      "Optimized Spark Streaming for real-time feature pipelines, cutting data latency 40% under high-velocity workloads.",
      "Provisioned cloud infrastructure via Terraform on AWS and Azure, achieving 30% cost reduction through right-sizing.",
      "Integrated Prometheus + Grafana observability with automated alerting, cutting MTTD 45%.",
    ],
  },
  {
    title: "Data Analyst Intern",
    company: "PHN Technologies",
    dates: "Mar 2023 — Jun 2023",
    location: "Pune, India",
    bullets: [
      "Optimized ETL pipelines in BigQuery, improving processing efficiency 30% and cutting analytics latency 40%.",
      "Built 10+ interactive dashboards for real-time KPI tracking.",
      "Implemented key-based auth in Airflow, securing 75% of critical pipelines.",
    ],
  },
] as const;
