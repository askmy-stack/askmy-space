import type { Metadata } from "next";
import EntryPortal from "@/components/Spatial/EntryPortal";
import SpatialGraph from "@/components/Spatial/SpatialGraph";
import NodeIndex from "@/components/Spatial/NodeIndex";

export const metadata: Metadata = {
  title: "Explore — Knowledge Graph",
  description:
    "The knowledge graph behind the work: three pillars, shipped systems, and the topics threading between them, rendered as an explorable space.",
};

export default function ExplorePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[var(--color-spatial-bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-14">
        <EntryPortal />

        <section id="graph" aria-label="Knowledge graph" className="scroll-mt-24">
          <SpatialGraph />
        </section>

        <section id="index" aria-label="Node index" className="scroll-mt-24">
          <h2 className="t-display-lg text-[var(--color-spatial-text)] mb-8">
            Node index
          </h2>
          <NodeIndex />
        </section>
      </div>
    </div>
  );
}
