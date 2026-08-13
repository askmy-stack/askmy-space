"use client";

export type SortMode = "latest" | "score";

interface FilterRailProps {
  categories: [string, number][];
  active: string | null;
  sort: SortMode;
  query: string;
  resultCount: number;
  onCategory: (category: string | null) => void;
  onSort: (sort: SortMode) => void;
  onQuery: (query: string) => void;
}

function Pill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`t-mono rounded-full border px-3 py-1.5 min-h-[44px] transition-colors duration-[var(--motion-dashboard-snap)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97] ${
        selected
          ? "border-[var(--color-dashboard-accent-1)] bg-[var(--color-dashboard-accent-1)] font-bold text-[var(--color-dashboard-bg)]"
          : "border-[var(--color-dashboard-border)] text-[var(--color-dashboard-text-muted)] hover:border-[var(--color-dashboard-accent-1)] hover:text-[var(--color-dashboard-text-bright)]"
      }`}
    >
      {children}
    </button>
  );
}

export default function FilterRail({
  categories,
  active,
  sort,
  query,
  resultCount,
  onCategory,
  onSort,
  onQuery,
}: FilterRailProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Pill selected={active === null} onClick={() => onCategory(null)}>
          all
        </Pill>
        {categories.map(([category, count]) => (
          <Pill
            key={category}
            selected={active === category}
            onClick={() => onCategory(active === category ? null : category)}
          >
            {category} · {count}
          </Pill>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="t-mono text-[var(--color-dashboard-text-muted)]" htmlFor="signal-search">
          search
        </label>
        <input
          id="signal-search"
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="title, summary, tag…"
          className="t-mono min-h-[44px] w-full max-w-xs rounded-md border border-[var(--color-dashboard-border)] bg-transparent px-3 py-1.5 text-[var(--color-dashboard-text-bright)] placeholder:text-[var(--color-dashboard-text-muted)] focus:border-[var(--color-dashboard-accent-1)] focus:outline-none focus:ring-2 focus:ring-offset-2"
        />
        <div className="flex items-center gap-2 ml-auto">
          <span className="t-mono text-[var(--color-dashboard-text-muted)]">sort</span>
          <Pill selected={sort === "latest"} onClick={() => onSort("latest")}>
            latest
          </Pill>
          <Pill selected={sort === "score"} onClick={() => onSort("score")}>
            score
          </Pill>
        </div>
      </div>

      <p
        className="t-mono text-[var(--color-dashboard-text-muted)]"
        aria-live="polite"
      >
        {resultCount} result{resultCount === 1 ? "" : "s"}
        {active ? ` in ${active}` : ""}
        {query ? ` for “${query}”` : ""}
      </p>
    </div>
  );
}
