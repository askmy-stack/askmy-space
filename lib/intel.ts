import feed from "@/data/public_intel.json";

/**
 * Public intel feed, exported by the askmy-brain pipeline after every run
 * (scripts/export_public_brief.py — strict allowlist schema). The file is
 * committed into this repo by the pipeline's publish step, so each refresh
 * triggers a redeploy and the page stays static/CDN-served.
 */
export interface IntelItem {
  title: string;
  url: string;
  summary: string;
  score: number;
  category: string;
  tags: string[];
  published: string;
}

export interface IntelFeed {
  generated_at: string;
  count: number;
  items: IntelItem[];
}

/**
 * Feed summaries originate from scraped RSS — some carry raw HTML fragments.
 * The exporter strips markup upstream (askmy-brain#11), but sanitize here
 * too so the UI stays clean regardless of the committed feed's vintage.
 */
const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

export function plainText(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

export function getIntelFeed(): IntelFeed {
  const raw = feed as IntelFeed;
  return {
    ...raw,
    items: raw.items.map((item) => ({
      ...item,
      title: plainText(item.title),
      summary: plainText(item.summary),
    })),
  };
}

/** Category -> item count, ordered by count descending. */
export function intelCategories(items: IntelItem[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

/** Compact "3h ago" / "2d ago" from an ISO timestamp; empty if unparseable. */
export function intelAge(published: string, now: Date = new Date()): string {
  const t = Date.parse(published);
  if (Number.isNaN(t)) return "";
  const hours = Math.max(0, Math.floor((now.getTime() - t) / 3_600_000));
  if (hours < 1) return "just in";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
