import { projects } from "@/content/projects";

/**
 * The Spatial mode graph is derived, not hand-maintained: pillars and
 * tags come straight out of content/projects.ts, so shipping a new case
 * study automatically extends the space.
 */
export type NodeKind = "pillar" | "project" | "tag";

export interface GraphNode {
  id: string;
  label: string;
  kind: NodeKind;
  blurb: string;
  /** Deep link to the richer surface for this node, if one exists. */
  href?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  strength: number;
}

const PILLAR_BLURBS: Record<string, string> = {
  Research:
    "Benchmarks, evaluations, and the discipline of measuring before claiming. The systems here exist to answer a question honestly.",
  Engineering:
    "Pipelines, infrastructure, and reliability. The unglamorous machinery that decides whether anything else matters.",
  Product:
    "Systems built for a user with a job to do — where routing, constraints, and trust matter more than model choice.",
};

export function slugifyNode(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();

  const add = (node: GraphNode) => {
    if (!seen.has(node.id)) {
      seen.add(node.id);
      nodes.push(node);
    }
  };

  for (const [pillar, blurb] of Object.entries(PILLAR_BLURBS)) {
    add({ id: slugifyNode(pillar), label: pillar, kind: "pillar", blurb });
  }

  for (const project of projects) {
    add({
      id: project.slug,
      label: project.title,
      kind: "project",
      blurb: project.narrative,
      href: `/discover/${project.slug}`,
    });
    for (const pillar of project.pillars) {
      edges.push({
        source: project.slug,
        target: slugifyNode(pillar),
        strength: 2,
      });
    }
    for (const tag of project.tags) {
      const tagId = `t-${slugifyNode(tag)}`;
      add({
        id: tagId,
        label: tag,
        kind: "tag",
        blurb: `A thread running through the work: ${tag}.`,
      });
      edges.push({ source: project.slug, target: tagId, strength: 1 });
    }
  }

  return { nodes, edges };
}

export const knowledgeGraph = buildGraph();

export function getNode(id: string): GraphNode | undefined {
  return knowledgeGraph.nodes.find((n) => n.id === id);
}

/** Nodes directly connected to `id`, strongest edges first. */
export function nodeConnections(
  id: string,
): { node: GraphNode; strength: number }[] {
  return knowledgeGraph.edges
    .filter((e) => e.source === id || e.target === id)
    .map((e) => ({
      node: getNode(e.source === id ? e.target : e.source),
      strength: e.strength,
    }))
    .filter((c): c is { node: GraphNode; strength: number } => Boolean(c.node))
    .sort((a, b) => b.strength - a.strength);
}
