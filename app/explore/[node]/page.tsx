import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getNode,
  knowledgeGraph,
  nodeConnections,
} from "@/content/knowledge-graph";
import { getProject } from "@/content/projects";

interface Props {
  params: { node: string };
}

const KIND_LABEL = { pillar: "pillar", project: "system", tag: "topic" } as const;

export function generateStaticParams() {
  return knowledgeGraph.nodes.map((n) => ({ node: n.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const node = getNode(params.node);
  if (!node) return { title: "Not found" };
  return {
    title: `${node.label} — Explore`,
    description: node.blurb,
  };
}

export default function NodeDetailPage({ params }: Props) {
  const node = getNode(params.node);
  if (!node) notFound();

  const connections = nodeConnections(node.id);
  const project = node.kind === "project" ? getProject(node.id) : undefined;

  return (
    <div className="min-h-screen bg-[var(--color-spatial-bg)] px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <article className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="t-mono text-[var(--color-spatial-text-secondary)] mb-10"
        >
          <Link
            href="/explore"
            className="hover:text-[var(--color-spatial-accent-1)] transition-colors duration-[var(--motion-spatial-expand)] focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-1"
          >
            Explore
          </Link>{" "}
          / <span className="text-[var(--color-spatial-text)]">{node.id}</span>
        </nav>

        {/* Node header — the expanded node */}
        <header className="mb-10">
          <p className="t-mono uppercase tracking-[0.3em] text-[var(--color-spatial-text-secondary)] mb-3">
            {KIND_LABEL[node.kind]} · {connections.length} connection
            {connections.length === 1 ? "" : "s"}
          </p>
          <h1 className="t-display-xl text-[var(--color-spatial-accent-1)] mb-5">
            {node.label}
          </h1>
          <p className="t-body text-[var(--color-spatial-text)]">{node.blurb}</p>
        </header>

        {/* Project deep-links */}
        {project && (
          <div className="mb-10 flex flex-wrap gap-4">
            <Link
              href={`/discover/${project.slug}`}
              className="t-mono rounded-full border border-[var(--color-spatial-accent-1)] px-4 py-2 font-bold text-[var(--color-spatial-accent-1)] transition-colors duration-[var(--motion-spatial-expand)] hover:bg-[var(--color-spatial-accent-1)] hover:text-[var(--color-spatial-bg)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]"
            >
              read the case study →
            </Link>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono rounded-full border border-[var(--color-spatial-border)]/40 px-4 py-2 text-[var(--color-spatial-text)] transition-colors duration-[var(--motion-spatial-expand)] hover:border-[var(--color-spatial-accent-1)] hover:text-[var(--color-spatial-accent-1)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]"
              >
                source ↗
              </a>
            )}
          </div>
        )}

        {/* Connections */}
        <section className="border-t border-[var(--color-spatial-border)]/30 pt-8">
          <h2 className="t-mono uppercase tracking-[0.2em] text-[var(--color-spatial-text-secondary)] mb-5">
            Connected nodes
          </h2>
          <ul className="flex flex-wrap gap-3">
            {connections.map(({ node: connected, strength }) => (
              <li key={connected.id}>
                <Link
                  href={`/explore/${connected.id}`}
                  className={`t-mono inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors duration-[var(--motion-spatial-expand)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97] ${
                    strength > 1
                      ? "border-[var(--color-spatial-accent-1)]/60 text-[var(--color-spatial-accent-1)] hover:bg-[var(--color-spatial-accent-1)] hover:text-[var(--color-spatial-bg)]"
                      : "border-[var(--color-spatial-border)]/30 text-[var(--color-spatial-text)] hover:border-[var(--color-spatial-accent-1)] hover:text-[var(--color-spatial-accent-1)]"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
                    aria-hidden="true"
                  />
                  {connected.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
