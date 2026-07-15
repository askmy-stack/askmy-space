"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site";

/**
 * ReportIssue — lightweight, no-backend issue reporter.
 *
 * Primary path: mailto draft. Fallback: copy body to clipboard + open a
 * prefilled GitHub issue when no mail client is available.
 */
export default function ReportIssue(): JSX.Element {
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "copied">("idle");

  function buildBody(): string {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const href =
      typeof window !== "undefined" ? window.location.href : siteConfig.url;
    return [
      summary,
      "",
      details ? `Details:\n${details}` : "",
      contact ? `Contact: ${contact}` : "",
      "",
      "— environment —",
      `page: ${href}`,
      `agent: ${ua}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;

    const body = buildBody();
    const subject = `[Portfolio Issue] ${summary.slice(0, 60)}`;
    const mailto =
      `mailto:${siteConfig.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("sent");
  };

  const handleCopyAndGithub = async () => {
    if (!summary.trim()) return;
    const body = buildBody();
    const subject = `[Portfolio Issue] ${summary.slice(0, 60)}`;
    try {
      await navigator.clipboard.writeText(body);
      setStatus("copied");
    } catch {
      setStatus("copied");
    }
    const gh =
      "https://github.com/askmy-stack/askmy-space/issues/new" +
      `?title=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.open(gh, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="report" className="py-20 md:py-24 border-t border-[var(--border)]">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <p className="t-label text-[var(--accent)] mb-6">Report an issue</p>
            <h3 className="t-headline text-[var(--fg)] mb-4">
              Found something broken?
            </h3>
            <p className="t-body max-w-sm">
              Layout bug, dead link, typo, or a suggestion — send it over. I read
              every one. No mail client? Copy the draft and open a GitHub issue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="md:col-span-8 space-y-5"
            aria-label="Report an issue"
          >
            <div>
              <label
                htmlFor="issue-summary"
                className="t-label block mb-2 text-[var(--fg-muted)]"
              >
                Summary *
              </label>
              <input
                id="issue-summary"
                type="text"
                required
                maxLength={120}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div>
              <label
                htmlFor="issue-details"
                className="t-label block mb-2 text-[var(--fg-muted)]"
              >
                Details
              </label>
              <textarea
                id="issue-details"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div>
              <label
                htmlFor="issue-contact"
                className="t-label block mb-2 text-[var(--fg-muted)]"
              >
                Contact (optional)
              </label>
              <input
                id="issue-contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
              >
                Open email draft
              </button>
              <button
                type="button"
                onClick={handleCopyAndGithub}
                className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors underline-offset-4 hover:underline"
              >
                Copy + open GitHub issue
              </button>
            </div>

            {status === "sent" && (
              <p className="t-caption text-[var(--fg-muted)]">
                Opening your email client… If nothing happens, use Copy + GitHub.
              </p>
            )}
            {status === "copied" && (
              <p className="t-caption text-[var(--fg-muted)]">
                Draft copied. A GitHub issue form should open in a new tab.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
