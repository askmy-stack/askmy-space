import type { IntelItem } from "@/lib/intel";
import { intelCategories } from "@/lib/intel";

interface CategoryBreakdownProps {
  items: IntelItem[];
}

/**
 * Horizontal bar per category, width proportional to count. Amber fill
 * intensity steps down with rank; counts are printed so the bars are
 * never the only carrier of the number.
 */
export default function CategoryBreakdown({ items }: CategoryBreakdownProps) {
  const categories = intelCategories(items);
  const max = categories[0]?.[1] ?? 1;
  const fills = [
    "var(--color-dashboard-accent-1)",
    "var(--color-dashboard-accent-2)",
    "color-mix(in srgb, var(--color-dashboard-accent-1) 55%, transparent)",
    "color-mix(in srgb, var(--color-dashboard-accent-2) 55%, transparent)",
  ];

  return (
    <div className="rounded-lg border border-[var(--color-dashboard-border)] p-5">
      <p className="t-mono uppercase tracking-[0.2em] text-[var(--color-dashboard-text-muted)] mb-4">
        Category breakdown
      </p>
      <ul className="space-y-3">
        {categories.map(([category, count], i) => (
          <li key={category} className="flex items-center gap-3">
            <span className="t-mono text-[var(--color-dashboard-text-bright)] w-36 shrink-0 truncate">
              {category}
            </span>
            <span
              className="h-2 rounded-full transition-[width] duration-[var(--motion-dashboard-snap)]"
              style={{
                width: `${Math.max(4, (count / max) * 100)}%`,
                backgroundColor: fills[Math.min(i, fills.length - 1)],
              }}
              aria-hidden="true"
            />
            <span className="t-mono text-[var(--color-dashboard-text-muted)] tabular-nums">
              {count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
