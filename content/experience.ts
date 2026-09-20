import type { Experience } from "@/lib/types";

export const experience: readonly Experience[] = [
  {
    title: "System Operations Analyst",
    company: "Follett Higher Education",
    dates: "May 2025 — May 2026",
    location: "Washington, DC",
    bullets: [
      "Reengineered forecasting and inventory data validation with role-based IAM, schema controls, and business-rule checks before downstream ML consumption; reduced inventory exposure by 25% across 50+ delivery sprints.",
      "Automated exception reporting and real-time KPI dashboards across fulfillment and inventory workflows; eliminated 10+ hours of weekly manual effort and accelerated customer turnaround by 40%.",
      "Configured SLA-driven telemetry, health checks, and escalation criteria for enterprise inventory databases; reduced operational downtime by 35%.",
      "Translated forecasting and fulfillment requirements into acceptance criteria, KPI definitions, and a prioritized data/ML backlog across 50+ Agile sprints.",
    ],
  },
  {
    title: "Data Operations Engineer",
    company: "Jio Platforms Limited",
    dates: "Jul 2023 — Jul 2024",
    location: "Navi Mumbai, India",
    bullets: [
      "Standardized multi-cloud ML deployment with reusable Jenkins pipelines, Docker images, Kubernetes manifests, and rollback patterns across AWS, Azure, and GCP; cut model time-to-production by 85% and release failures by 60% while supporting 20 engineers.",
      "Orchestrated 100+ Airflow DAGs and Spark Streaming feature pipelines across 30+ sources and 50M+ events/day; improved reliability and reduced feature-freshness latency by 40%.",
      "Instrumented production pipelines and model-serving services with Prometheus and Grafana; reduced mean time to detect by 45% and mean time to recovery by 50% across three cloud environments.",
      "Deployed auto-scaling Kubernetes inference services with health probes, resource policies, and controlled rollouts; reduced serving downtime by 40% under high-velocity traffic.",
    ],
  },
  {
    title: "Data Analyst",
    company: "PHN Technologies",
    dates: "May 2022 — Jun 2023",
    location: "Pune, India",
    bullets: [
      "Engineered parameterized BigQuery ETL pipelines and authenticated Airflow orchestration for feature preparation; accelerating ML feature delivery by 40% across 50 production workflows while securing 75% of critical data and ML pipelines.",
      "Standardized Terraform provisioning and Airflow recovery practices; reduced production workflow failures by 40% and eliminated 40 hours of repetitive manual operations each week.",
      "Built 10+ monitoring dashboards and data-quality controls spanning freshness, SLA, pipeline failure, anomaly, and model-drift signals.",
    ],
  },
  {
    title: "Data/ML Intern",
    company: "Tetra Pak",
    dates: "Mar 2021 — Jun 2021",
    location: "Pune, India",
    bullets: [
      "Prepared industrial sensor time-series for predictive maintenance with pandas and scikit-learn for reproducible failure modeling.",
      "Trained and benchmarked Random Forest and Gradient Boosting equipment-failure models with cross-validation and repeatable Azure ML scoring workloads.",
      "Evaluated model behavior with precision, recall, F1, and feature-importance analysis; tuned classification thresholds for practical maintenance alerts.",
    ],
  },
] as const;
