export const aboutParagraphs: readonly string[] = [
  "Experienced full-stack AI engineer working on product enhancements and research with modern AI/ML stacks — building reliable AI systems, agent workflows, and evaluation that hold up under real traffic.",
  "MS in Data Science at George Washington University. Global Leaders Award, 3.71 GPA, graduating May 2026. Graduate research on climate-driven species interactions with AI-assisted NLP workflows. Before grad school: multi-cloud MLOps at Jio Platforms and IT engineering at Tetra Pak.",
  "Right now: Cortex for organizational memory, Parallax for agent runtime reliability, clinical EEG benchmarking, and tool-semantics for MCP interface contracts.",
] as const;

export interface PhilosophyCell {
  pillar: string;
  lead: string;
  follow: string;
}

export const principles: readonly PhilosophyCell[] = [
  {
    pillar: "Systems",
    lead: "Build the substrate.",
    follow:
      "Memory, tools, evaluation, and infrastructure — the layers that make agent behavior reproducible under real constraints.",
  },
  {
    pillar: "Evaluation",
    lead: "Measure what breaks.",
    follow:
      "Failure benches, behavioral contracts, and observability that catch silent regressions before users do.",
  },
  {
    pillar: "Product",
    lead: "Ship the consequence.",
    follow:
      "Research that ends in a system someone can run, inspect, and depend on — not a notebook that dies in a week.",
  },
] as const;
