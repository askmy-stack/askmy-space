import Link from "next/link";
import { knowledgeGraph, nodeConnections } from "@/content/knowledge-graph";

const KIND_LABELS = [
  ["pillar", "Pillars"],
  ["project", "Systems"],
  ["tag", "Topics"],
] as const;

/**
 * The keyboard- and screen-reader-accessible view of the graph: every
 * node as a real link, grouped by kind, with its connection count.
 */
export default function NodeIndex(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {KIND_LABELS.map(([kind, heading]) => (
        <section key={kind} aria-label={heading}>
          <h3 className="t-mono uppercase tracking-[0.2em] text-[var(--color-spatial-text-secondary)] mb-4">
            {heading}
          </h3>
          <ul className="space-y-2">
            {knowledgeGraph.nodes
              .filter((n) => n.kind === kind)
              .map((n) => {
                const count = nodeConnections(n.id).length;
                return (
                  <li key={n.id} className="flex items-baseline gap-2">
                    <Link
                      href={`/explore/${n.id}`}
                      className="t-body text-[var(--color-spatial-text)] hover:text-[var(--color-spatial-accent-1)] transition-colors duration-[var(--motion-spatial-expand)] focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
                    >
                      {n.label}
                    </Link>
                    <span className="t-mono text-[var(--color-spatial-text-secondary)] tabular-nums">
                      {count}
                    </span>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
