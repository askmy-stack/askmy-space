"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { IntelItem } from "@/lib/intel";
import { intelAge } from "@/lib/intel";
import { snapIn } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SignalCardProps {
  item: IntelItem;
  /** Stable index into the current feed — the detail route key. */
  id: number;
}

function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

export default function SignalCard({ item, id }: SignalCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      variants={reduced ? undefined : snapIn}
      layout={reduced ? undefined : "position"}
      className="group rounded-lg border border-[var(--color-dashboard-border)] bg-[var(--color-dashboard-bg)] p-5 transition-colors duration-[var(--motion-dashboard-snap)] hover:border-[var(--color-dashboard-accent-1)] active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <p className="t-mono text-[var(--color-dashboard-text-muted)]">
          {sourceHost(item.url)} · {item.category} · {intelAge(item.published)}
        </p>
        <span
          className="t-mono shrink-0 rounded-full bg-[var(--color-dashboard-accent-1)] px-2.5 py-0.5 font-bold text-[var(--color-dashboard-bg)] tabular-nums"
          aria-label={`score ${item.score}`}
        >
          {item.score}
        </span>
      </div>

      <h3 className="t-display-md text-[var(--color-dashboard-text-bright)] mb-2">
        <Link
          href={`/signals/${id}`}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md transition-colors duration-[var(--motion-dashboard-snap)] group-hover:text-[var(--color-dashboard-accent-1)]"
        >
          {item.title}
        </Link>
      </h3>

      <p className="t-body text-[var(--color-dashboard-text-muted)] line-clamp-2 mb-3">
        {item.summary}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {item.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="t-mono rounded-full border border-[var(--color-dashboard-border)] px-2 py-0.5 text-[var(--color-dashboard-text-muted)]"
          >
            {tag}
          </span>
        ))}
        <Link
          href={`/signals/${id}`}
          className="t-mono ml-auto text-[var(--color-dashboard-accent-1)] hover:text-[var(--color-dashboard-text-bright)] transition-colors duration-[var(--motion-dashboard-snap)] focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-1"
        >
          read →
        </Link>
      </div>
    </motion.article>
  );
}
