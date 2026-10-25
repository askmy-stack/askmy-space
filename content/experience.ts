import type { Experience } from "@/lib/types";

/** Synced to LinkedIn: https://linkedin.com/in/abhinaysai-kamineni */
export const experience: readonly Experience[] = [
  {
    title: "System Operations Analyst",
    company: "Follett Higher Education",
    dates: "May 2025 to May 2026",
    location: "Washington, DC",
    bullets: [
      "Administered enterprise fulfillment infrastructure, managing over 150K daily transactions while ensuring PCI compliance.",
      "Architected automated reporting workflows and real-time dashboards, reducing operational toil by 15 hours weekly.",
      "Optimized backend operations through CourseTracks integration, achieving a 25% reduction in inventory exposure.",
    ],
  },
  {
    title: "Graduate Research Assistant",
    company: "The George Washington University",
    dates: "Mar 2025 to Aug 2025",
    location: "Washington, DC",
    bullets: [
      "Analyzed over 5,000 ecological and species-interaction data points across 50+ global ecoregions to model species responses to climate change.",
      "Developed AI-assisted Python workflows utilizing NLP and machine learning, reducing manual research processing time by approximately 40%.",
      "Supported a large-scale meta-analysis on invasive species interactions, contributing to the understanding of ecosystem-level effects.",
    ],
  },
  {
    title: "Data Ops Engineer",
    company: "Jio Platforms Limited",
    dates: "Jul 2023 to Jul 2024",
    location: "Navi Mumbai, India",
    bullets: [
      "Engineered CI/CD automation for ML model deployment across AWS, Azure, and GCP using Jenkins, Docker, and Kubernetes; cut time-to-production by 85% and release failures by 60%.",
      "Deployed Kubernetes-based ML inference microservices for real-time and batch workloads; reduced model-serving downtime 40% with auto-scaling under high-velocity traffic.",
      "Built and maintained 100+ Apache Airflow DAGs with Vault-secured authentication for ML and data pipelines, achieving 94% pipeline reliability across multi-terabyte daily volume.",
      "Optimized Spark Streaming jobs for real-time feature pipelines, cutting data latency 40% under peak workloads.",
      "Provisioned cloud infrastructure via Terraform across AWS and Azure, achieving 30% cost reduction through right-sizing.",
      "Integrated Prometheus and Grafana observability with automated alerting, reducing MTTD by 45%.",
    ],
  },
  {
    title: "Data Analyst",
    company: "PHN Technology Pvt Ltd",
    dates: "May 2022 to Jun 2023",
    location: "Pune, India",
    bullets: [
      "Engineered data pipelines in BigQuery reducing ML feature-serving latency by 40%, enabling faster model iteration and real-time inference on production workloads.",
      "Designed and secured Apache Airflow infrastructure with key-based authentication, protecting 75% of critical data and ML pipelines while maintaining CI/CD deployment velocity.",
      "Built 10+ real-time monitoring dashboards surfacing data quality issues and model drift signals before degradation reached users.",
    ],
  },
  {
    title: "Data Machine Learning Intern",
    company: "Tetra Pak",
    dates: "Mar 2021 to Jun 2021",
    location: "Pune, India",
    bullets: [
      "Conducted experiments with supervised learning models, including Random Forest and Gradient Boosting, on sensor data for predictive maintenance.",
      "Designed and deployed scalable cloud infrastructure on Microsoft Azure to support enterprise-grade data and ML workloads.",
      "Automated data aggregation and reporting workflows using Python and SQL, reducing manual effort by 40%.",
    ],
  },
] as const;
