import type { Metadata } from "next";
import { Suspense } from "react";
import StatusBar from "@/components/Dashboard/StatusBar";
import MetricsGrid from "@/components/Dashboard/MetricsGrid";
import CategoryBreakdown from "@/components/Dashboard/CategoryBreakdown";
import SignalFeed from "@/components/Dashboard/SignalFeed";
import SignalsGraph from "@/components/signals/SignalsGraph";
import { getIntelFeed } from "@/lib/intel";

export const metadata: Metadata = {
  title: "Signals — Intelligence Dashboard",
  description:
    "High-signal AI items kept by an autonomous intelligence pipeline: 30+ sources, LLM triage, scored and filtered four times a day.",
};

export default function SignalsPage(): JSX.Element {
  const feed = getIntelFeed();

  return (
    <div className="min-h-screen bg-[var(--color-dashboard-bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-10">
        {/* Status */}
        <StatusBar generatedAt={feed.generated_at} count={feed.count} />

        {/* Metrics */}
        <MetricsGrid feed={feed} />

        {/* Category breakdown */}
        <CategoryBreakdown items={feed.items} />

        {/* Feed with filters */}
        <section aria-label="Signal feed">
          <h1 className="t-display-lg text-[var(--color-dashboard-text-bright)] mb-6">
            Signal feed
          </h1>
          <Suspense fallback={null}>
            <SignalFeed items={feed.items} />
          </Suspense>
        </section>

        {/* Knowledge graph (shipped in PR #32, kept as its own view) */}
        <section aria-label="Signal graph" className="pt-4">
          <h2 className="t-mono uppercase tracking-[0.2em] text-[var(--color-dashboard-text-muted)] mb-4">
            Graph view
          </h2>
          <SignalsGraph items={feed.items} />
        </section>
      </div>
    </div>
  );
}
