"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { IntelItem } from "@/lib/intel";
import { intelCategories } from "@/lib/intel";
import { snapCascade } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import FilterRail, { type SortMode } from "./FilterRail";
import SignalCard from "./SignalCard";

interface SignalFeedProps {
  items: IntelItem[];
}

const PAGE_SIZE = 30;

/**
 * Filter state lives in the URL (?cat=&sort=&q=) so filtered views are
 * shareable; state hydrates from useSearchParams (render under Suspense)
 * and writes back with history.replace on change, keeping the page static.
 */
export default function SignalFeed({ items }: SignalFeedProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();

  const [category, setCategory] = useState<string | null>(
    () => searchParams.get("cat"),
  );
  const [sort, setSort] = useState<SortMode>(() =>
    searchParams.get("sort") === "score" ? "score" : "latest",
  );
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const categories = useMemo(() => intelCategories(items), [items]);

  const syncUrl = (cat: string | null, s: SortMode, q: string) => {
    const params = new URLSearchParams();
    if (cat) params.set("cat", cat);
    if (s !== "latest") params.set("sort", s);
    if (q) params.set("q", q);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const update = (cat: string | null, s: SortMode, q: string) => {
    setCategory(cat);
    setSort(s);
    setQuery(q);
    setLimit(PAGE_SIZE);
    syncUrl(cat, s, q);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Keep original feed indices — they are the detail-route ids.
    let result = items.map((item, id) => ({ item, id }));
    if (category) result = result.filter(({ item }) => item.category === category);
    if (q) {
      result = result.filter(
        ({ item }) =>
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (sort === "score") {
      result = [...result].sort((a, b) => b.item.score - a.item.score);
    } else {
      result = [...result].sort(
        (a, b) => Date.parse(b.item.published) - Date.parse(a.item.published),
      );
    }
    return result;
  }, [items, category, sort, query]);

  const visible = filtered.slice(0, limit);

  return (
    <div className="space-y-6">
      <FilterRail
        categories={categories}
        active={category}
        sort={sort}
        query={query}
        resultCount={filtered.length}
        onCategory={(cat) => update(cat, sort, query)}
        onSort={(s) => update(category, s, query)}
        onQuery={(q) => update(category, sort, q)}
      />

      <motion.div
        key={`${category ?? "all"}-${sort}-${query}`}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={reduced ? undefined : snapCascade}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : "visible"}
      >
        {visible.map(({ item, id }) => (
          <SignalCard key={id} item={item} id={id} />
        ))}
      </motion.div>

      {visible.length === 0 && (
        <p className="t-body text-[var(--color-dashboard-text-muted)] py-8">
          No signals match. The pipeline keeps only scored items — try a
          broader query or clear the category filter.
        </p>
      )}

      {filtered.length > limit && (
        <button
          type="button"
          onClick={() => setLimit((l) => l + PAGE_SIZE)}
          className="t-mono w-full rounded-lg border border-[var(--color-dashboard-border)] py-3 text-[var(--color-dashboard-text-muted)] transition-colors duration-[var(--motion-dashboard-snap)] hover:border-[var(--color-dashboard-accent-1)] hover:text-[var(--color-dashboard-text-bright)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.99]"
        >
          show {Math.min(PAGE_SIZE, filtered.length - limit)} more of{" "}
          {filtered.length - limit} remaining
        </button>
      )}
    </div>
  );
}
