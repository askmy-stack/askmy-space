"use client";

import { useEffect, useState } from "react";

interface StatusBarProps {
  generatedAt: string;
  count: number;
}

/** Feed older than this is reported as stale (pipeline runs 4×/day). */
const STALE_AFTER_HOURS = 24;

function formatRunTime(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "unknown";
  return new Date(t).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  });
}

/**
 * Pipeline status line. Honest by design: green only when the feed is
 * genuinely fresh, amber when the last run is older than a day. Staleness
 * is computed client-side so a long-lived static deploy can't report
 * "live" forever.
 */
export default function StatusBar({ generatedAt, count }: StatusBarProps) {
  const [staleHours, setStaleHours] = useState<number | null>(null);

  useEffect(() => {
    const t = Date.parse(generatedAt);
    if (Number.isNaN(t)) return;
    setStaleHours((Date.now() - t) / 3_600_000);
  }, [generatedAt]);

  const stale = staleHours !== null && staleHours > STALE_AFTER_HOURS;
  const dotColor = stale
    ? "var(--color-status-warning)"
    : "var(--color-status-live)";
  const label = stale ? "PIPELINE STALE" : "PIPELINE LIVE";

  return (
    <div
      className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-[var(--color-dashboard-border)] pb-4 t-mono text-[var(--color-dashboard-text-muted)]"
      role="status"
    >
      <span className="inline-flex items-center gap-2 text-[var(--color-dashboard-text-bright)]">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping"
            style={{ backgroundColor: dotColor, animationDuration: "2.4s" }}
          />
          <span
            className="relative inline-flex h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
        </span>
        {label}
      </span>
      <span>last run {formatRunTime(generatedAt)}</span>
      <span>{count} signals kept</span>
      <span className="hidden sm:inline">updates 4×/day</span>
    </div>
  );
}
