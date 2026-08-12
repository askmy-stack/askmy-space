import type { IntelFeed } from "@/lib/intel";
import { intelCategories } from "@/lib/intel";
import MetricCard from "./MetricCard";

interface MetricsGridProps {
  feed: IntelFeed;
}

/** All metrics derive from the committed feed — nothing is fabricated. */
export default function MetricsGrid({ feed }: MetricsGridProps) {
  const categories = intelCategories(feed.items);
  const avgScore =
    feed.items.reduce((sum, item) => sum + item.score, 0) /
    Math.max(1, feed.items.length);
  const [topCategory, topCount] = categories[0] ?? ["—", 0];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Signals kept"
        value={String(feed.count)}
        detail="after LLM triage"
      />
      <MetricCard
        label="Avg score"
        value={avgScore.toFixed(1)}
        detail="scored 0–10 at ingest"
      />
      <MetricCard
        label="Categories"
        value={String(categories.length)}
        detail="active this run"
      />
      <MetricCard
        label="Top category"
        value={topCategory}
        detail={`${topCount} signals`}
      />
    </div>
  );
}
