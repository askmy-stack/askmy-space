import Link from "next/link";
import type { IntelItem } from "@/lib/intel";
import { intelAge } from "@/lib/intel";

interface SignalDetailProps {
  item: IntelItem;
  related: { item: IntelItem; id: number }[];
}

function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

export default function SignalDetail({ item, related }: SignalDetailProps) {
  const published = new Date(item.published).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  return (
    <article className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="t-mono text-[var(--color-dashboard-text-muted)] mb-8"
      >
        <Link
          href="/signals"
          className="hover:text-[var(--color-dashboard-accent-1)] transition-colors duration-[var(--motion-dashboard-snap)] focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-1"
        >
          Signals
        </Link>{" "}
        / <span className="text-[var(--color-dashboard-text-bright)]">{item.category}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 t-mono text-[var(--color-dashboard-text-muted)] mb-4">
          <span
            className="rounded-full bg-[var(--color-dashboard-accent-1)] px-2.5 py-0.5 font-bold text-[var(--color-dashboard-bg)] tabular-nums"
            aria-label={`score ${item.score}`}
          >
            {item.score}
          </span>
          <span>{sourceHost(item.url)}</span>
          <span>{published} ET</span>
          <span>{intelAge(item.published)}</span>
        </div>
        <h1 className="t-display-lg text-[var(--color-dashboard-text-bright)]">
          {item.title}
        </h1>
      </header>

      {/* Summary */}
      <p className="t-body text-[var(--color-dashboard-text-muted)] mb-8 whitespace-pre-line">
        {item.summary}
      </p>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="t-mono rounded-full border border-[var(--color-dashboard-border)] px-2.5 py-0.5 text-[var(--color-dashboard-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Source link */}
      <p className="mb-14">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="t-mono inline-flex items-center gap-2 rounded-md border border-[var(--color-dashboard-accent-1)] px-4 py-2 font-bold text-[var(--color-dashboard-accent-1)] transition-colors duration-[var(--motion-dashboard-snap)] hover:bg-[var(--color-dashboard-accent-1)] hover:text-[var(--color-dashboard-bg)] focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]"
        >
          read at {sourceHost(item.url)} →
        </a>
      </p>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[var(--color-dashboard-border)] pt-8">
          <h2 className="t-mono uppercase tracking-[0.2em] text-[var(--color-dashboard-text-muted)] mb-4">
            More in {item.category}
          </h2>
          <ul className="space-y-3">
            {related.map(({ item: rel, id }) => (
              <li key={id} className="flex items-baseline gap-3">
                <span className="t-mono text-[var(--color-dashboard-accent-1)] tabular-nums shrink-0">
                  {rel.score}
                </span>
                <Link
                  href={`/signals/${id}`}
                  className="t-body text-[var(--color-dashboard-text-bright)] hover:text-[var(--color-dashboard-accent-1)] transition-colors duration-[var(--motion-dashboard-snap)] focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
                >
                  {rel.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
