import type { Experience } from "@/lib/types";

export const experience: readonly Experience[] = [
  {
    title: "Sales Operations Analyst",
    company: "Follett Higher Education Group",
    dates: "May 2025 — Present",
    location: "Washington, DC",
    bullets: [
      "Operate fulfillment and inventory data workflows during peak academic cycles. Online and on-campus. Maintaining process-level data integrity for hundreds of SKUs per cycle.",
      "Apply CourseTracks adoption analytics for demand planning, check-in accuracy, and inventory reconciliation across multiple enterprise data sources.",
      "Adhere to PCI-compliant processes and IAM-aligned access control. Zero security incidents across all operational periods.",
    ],
  },
  {
    title: "Data Operations Engineer",
    company: "Jio Platforms Limited",
    dates: "Jul 2023 — Jul 2024",
    location: "Navi Mumbai, India",
    bullets: [
      "Engineered CI/CD automation for ML deployment across AWS/Azure/GCP using Jenkins, Docker, Kubernetes. Cut time-to-production 85% and release failures 60%.",
      "Deployed Kubernetes-based ML inference microservices, reducing model-serving downtime 40% and enabling auto-scaling under real-time traffic.",
      "Built 100+ Airflow DAGs with Vault-secured auth for ML and data workloads, achieving 99.9% reliability across multi-terabyte daily volume.",
      "Optimized Spark Streaming for real-time feature pipelines, cutting data latency 40% under high-velocity workloads.",
      "Provisioned cloud infrastructure via Terraform on AWS and Azure, achieving 30% cost reduction through right-sizing.",
      "Integrated Prometheus + Grafana observability with automated alerting, cutting MTTD 45%.",
    ],
  },
  {
    title: "Data Analyst",
    company: "PHN Technologies",
    dates: "Mar 2023 — Jun 2023",
    location: "Pune, India",
    bullets: [
      "Engineered data pipelines in BigQuery achieving 30% efficiency gains and 40% latency reduction. Enabling faster ML feature computation for downstream model serving.",
      "Built 10+ real-time monitoring dashboards surfacing data quality issues and model drift signals. Enabling the team to catch performance regressions before they reached users.",
      "Implemented key-based authentication in Airflow, securing 75% of critical data and ML pipelines while maintaining CI/CD velocity.",
    ],
  },
] as const;
