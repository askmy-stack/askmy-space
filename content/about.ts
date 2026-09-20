export const aboutParagraphs: readonly string[] = [
  "MS in Data Science at George Washington University. Global Leaders Award, 3.71 GPA, graduating May 2026. Before grad school: multi-cloud MLOps at Jio Platforms. Same thread throughout — agent platforms, honest evaluation, production-ready engineering, a real user at the end.",
  "I care about the parts most engineers skip. Containerized training. Version-pinned environments. Observability that works at 3am. Infrastructure-as-code so the experiment you ran six months ago still runs today. These are what separate a notebook model from a system someone actually depends on.",
  "Right now: shipping organizational memory for AI agents (Cortex), agent reliability evaluation (Parallax), and supply-chain risk intelligence (Meridian). Preparing for what comes after May 2026.",
] as const;

export interface PhilosophyCell {
  pillar: string;
  lead: string;
  follow: string;
}

export const principles: readonly PhilosophyCell[] = [
  {
    pillar: "Research",
    lead: "Define the intelligence.",
    follow:
      "Grounding complex algorithms in robust logic, reproducible experimentation, and uncompromising evaluation.",
  },
  {
    pillar: "Engineering",
    lead: "Scale the execution.",
    follow:
      "Building the automated, self-healing cloud architectures that allow models to survive contact with real-time traffic.",
  },
  {
    pillar: "Product",
    lead: "Deliver the experience.",
    follow:
      "Bridging the gap between an engineering breakthrough and a tangible solution that solves a real human problem.",
  },
] as const;
