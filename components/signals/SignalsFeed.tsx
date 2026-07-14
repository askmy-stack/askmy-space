"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { intelAge, intelCategories, type IntelItem } from "@/lib/intel";
import { cn } from "@/lib/utils";

interface Props {
  items: IntelItem[];
  generatedAt: string;
}

export default function SignalsFeed({ items, generatedAt }: Props): JSX.Element {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [settling, setSettling] = useState(false);
  const firstRender = useRef(true);

  // Geometry-matched skeletons briefly bridge filter changes so results
  // feel like focus resolving, not a page swap.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSettling(true);
    const t = window.setTimeout(() => setSettling(false), 380);
    return () => window.clearTimeout(t);
  }, [category]);

  const categories = useMemo(() => intelCategories(items), [items]);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (category === "all" || item.category === category) &&
        (!q ||
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))),
    );
  }, [items, category, query]);

  const updated = new Date(generatedAt);
  const updatedLabel = Number.isNaN(updated.getTime())
    ? "recently"
    : updated.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        hour12: false,
      }) + " UTC";

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="t-display">Today in AI.</h1>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          run {updatedLabel} · {visible.length} of {items.length} signals · refreshes 4×/day
        </p>
      </div>
      <p className="t-body mt-4 max-w-[52ch]" style={{ color: "var(--fg-muted)" }}>
        What my pipeline kept this week: 30+ sources ingested every run, scored by an
        LLM triage pass, floor at 7/10. This page is the pipeline&apos;s public output —
        the same data that briefs me each morning.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[190px_1fr]">
        <aside aria-label="Filter signals">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search signals…"
            aria-label="Search signals"
            className="w-full min-h-[44px] rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-4 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:border-[var(--accent)] focus:outline-none"
          />
          <div className="mt-4 flex flex-row flex-wrap gap-1 md:flex-col">
            {[["all", items.length] as [string, number], ...categories].map(([cat, n]) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "active:scale-[0.97] flex min-h-[44px] items-center justify-between gap-3 rounded-xl px-3 text-left font-mono text-xs uppercase tracking-[0.12em] transition-colors md:w-full",
                  category === cat
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                )}
              >
                <span>{cat}</span>
                <span>{n}</span>
              </button>
            ))}
          </div>
        </aside>

        <div aria-live="polite" aria-busy={settling}>
          {settling ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6"
                >
                  <span className="skel h-3 w-2/5" />
                  <span className="skel h-4 w-11/12" />
                  <span className="skel h-3 w-4/5" />
                  <span className="skel mt-1 h-6 w-1/3 rounded-full" />
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border)] p-10 text-center">
              <p className="t-body" style={{ color: "var(--fg-muted)" }}>
                {items.length === 0
                  ? "Nothing in this window yet — the pipeline publishes after its next run. It runs four times a day."
                  : "No signals match that filter. Clear the search or pick another category."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {visible.map((item, i) => (
                <motion.a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/50"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: Math.min(i % 8, 6) * 0.05, ease: easeOutExpo }}
                >
                  <div className="flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                    <span>{item.category}</span>
                    <span>{intelAge(item.published)}</span>
                  </div>
                  <h2 className="text-[15px] font-semibold leading-snug text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    {item.title}
                  </h2>
                  {item.summary && (
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                      {item.summary}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-1">
                    <span className="font-mono text-[11px] text-[var(--fg-muted)]">
                      {new URL(item.url).hostname.replace(/^www\./, "")}
                    </span>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--accent)]">
                      score {item.score.toFixed(1)}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
