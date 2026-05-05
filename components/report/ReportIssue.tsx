"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site";

/**
 * ReportIssue — lightweight, no-backend issue reporter.
 *
 * User fills a short form; on submit we open their email client with
 * a prefilled draft. Zero server dependencies, zero tracking, works
 * offline, and keeps the report in the user's own sent-mail record.
 */
export default function ReportIssue(): JSX.Element {
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const href = typeof window !== "undefined" ? window.location.href : siteConfig.url;
    const body = [
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

    const mailto =
      `mailto:${siteConfig.email}` +
      `?subject=${encodeURIComponent(`[Portfolio Issue] ${summary.slice(0, 60)}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  };

  return (
    <section id="report" className="py-20 md:py-24 border-t border-[var(--border)]">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left rail — label + description */}
          <div className="md:col-span-4">
            <p className="t-label text-[var(--accent)] mb-6">Report an issue</p>
            <h3 className="t-headline text-[var(--fg)] mb-4">
              Found something broken?
            </h3>
            <p className="t-body max-w-sm">
              Layout bug, dead link, typo, or a suggestion — send it over. I read
              every one.
            </p>
          </div>

          {/* Right — form */}
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
                placeholder="e.g. scroll cue overlaps prism on iPad"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] px-4 py-3 text-[var(--fg)] placeholder-[var(--fg-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}
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
                maxLength={2000}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Steps to reproduce, device, browser — whatever helps."
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] px-4 py-3 text-[var(--fg)] placeholder-[var(--fg-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-y"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}
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
                maxLength={120}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="email or handle, if you want a reply"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] px-4 py-3 text-[var(--fg)] placeholder-[var(--fg-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={!summary.trim()}
                className="inline-flex items-center justify-center gap-2 font-mono text-sm tracking-wide px-6 py-3 rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent)]/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send report ↗
              </button>
              {sent && (
                <span
                  role="status"
                  className="t-caption text-[var(--mono)]"
                >
                  Opening your email client…
                </span>
              )}
              <span className="t-caption text-[var(--fg-muted)] ml-auto">
                Sends via your email client. No tracking.
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
