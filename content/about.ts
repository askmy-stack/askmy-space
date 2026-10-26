export const aboutParagraphs: readonly string[] = [
  "I build reliable AI systems end to end: agents that recover under failure, evaluation that catches silent regressions, and infrastructure that keeps research honest in production.",
  "The work spans product enhancements and applied research on modern AI/ML stacks. Meridian for supply chain risk intelligence. Cortex for organizational memory. Clinical EEG benchmarking. Tool-semantics for MCP interface contracts.",
  "Experience backs the idea. At Follett I ran enterprise fulfillment operations at scale. At GWU I ran graduate research on climate driven species interactions with AI assisted NLP. At Jio I shipped multi cloud MLOps. At Tetra Pak I worked as an Information Technology Engineer on Azure-backed predictive maintenance and data workflows.",
] as const;

export interface PhilosophyCell {
  pillar: string;
  lead: string;
  follow: string;
}

/** Alphabetical: Engineering → Product → Research */
export const principles: readonly PhilosophyCell[] = [
  {
    pillar: "Engineering",
    lead: "Build what holds.",
    follow:
      "Memory, Tools, evaluation, and infrastructure. The layers that make agent behavior reproducible under real constraints.",
  },
  {
    pillar: "Product",
    lead: "Ship the consequence.",
    follow:
      "Research that ends in a system someone can run, inspect, and depend on. Not a notebook that dies in a week.",
  },
  {
    pillar: "Research",
    lead: "Measure what breaks.",
    follow:
      "Failure benches, behavioral contracts, and observability that catch silent regressions before users do.",
  },
] as const;
