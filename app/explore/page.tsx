import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore — Knowledge Graph",
  description:
    "Spatial knowledge graph of systems, research, and connections. In construction.",
};

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[var(--color-spatial-bg)] flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6 py-32">
        <p className="t-mono uppercase tracking-[0.3em] text-[var(--color-spatial-text-secondary)]">
          ~/explore
        </p>
        <h1 className="t-display-xl text-[var(--color-spatial-accent-1)]">
          Spatial mode is being built
        </h1>
        <p className="t-body text-[var(--color-spatial-text)]">
          This surface will render the knowledge graph — systems, research, and
          the connections between them — as an explorable space. It ships in
          Phase 3 of the redesign.
        </p>
        <p>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 font-semibold text-[var(--color-spatial-accent-1)] hover:text-[var(--color-spatial-accent-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            ← Back to Discover
          </Link>
        </p>
      </div>
    </div>
  );
}
