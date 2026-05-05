export const aboutParagraphs: readonly string[] = [
  "MS in Data Science at George Washington University. Global Leaders Award, 3.77 GPA, graduating May 2026. Before grad school: ML infrastructure at Jio Platforms. Before that: biomedical imaging, clinical EEG, agentic systems. Same thread throughout. Honest evaluation, production-ready engineering, a real user at the end.",
  "I care about the parts most engineers skip. Containerized training. Version-pinned environments. Observability that works at 3am. Infrastructure-as-code so the experiment you ran six months ago still runs today. These are what separate a notebook model from a system someone actually depends on.",
  "Right now: finishing a seizure detection benchmark across 15+ architectures on 916 hours of pediatric EEG. Building an agentic research assistant with tool-use and retrieval. Preparing for what comes after May 2026.",
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
      "Grounding complex algorithms in robust logic, reproducible experimentation, and uncompromising mathematical evaluation.",
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

