"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import { useTerminal } from "@/hooks/useTerminal";
import type { Line } from "@/lib/terminal/engine";

/**
 * AboutTerminal — interactive portfolio terminal.
 *
 * Features:
 *   • Natural-language + structured commands routed through lib/terminal/engine
 *   • Session memory (first-visit greeting, last-section recall, command history)
 *   • Easter eggs: sudo hire-me, unlock secret, matrix, coffee
 *   • Auto-scroll to section on `cd work`, `projects vision`, etc.
 *
 * No external AI calls — all intents resolved against local portfolio data.
 */
export default function AboutTerminal(): JSX.Element {
  const {
    entries,
    input,
    setInput,
    submit,
    historyPrev,
    historyNext,
  } = useTerminal();

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll output to bottom on new entries
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      historyPrev();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      historyNext();
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div
      className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]"
      onClick={focusInput}
      role="presentation"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        lineHeight: 1.7,
      }}
    >
      {/* Header bar — macOS traffic lights + path */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-[var(--border)] bg-[var(--bg-elevated)]">
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28CA41" }} />
        <span className="ml-2 text-[0.6875rem] tracking-[0.08em] text-[var(--fg-muted)]">
          ~/abhinaysai — zsh
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="px-[18px] py-4 h-[320px] overflow-y-auto scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        {entries.map((entry) => (
          <div key={entry.id} className="mb-3">
            {entry.input !== null && (
              <div className="flex gap-1.5 text-[var(--fg-muted)]">
                <span className="text-[var(--accent)] shrink-0">$</span>
                <span className="text-[var(--fg)]">{entry.input}</span>
              </div>
            )}
            {entry.lines.map((line, i) => (
              <RenderedLine key={i} line={line} />
            ))}
          </div>
        ))}

        {/* Active prompt */}
        <div className="flex gap-1.5 items-center">
          <span className="text-[var(--accent)] shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal input"
            className="flex-1 bg-transparent outline-none text-[var(--fg)] caret-[var(--accent)] placeholder-[var(--fg-muted)]"
            placeholder="type 'help' or ask anything…"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
          />
          <span
            className="w-[7px] h-[13px] bg-[var(--accent)] animate-pulse"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Identity footer */}
      <div
        className="flex justify-between px-[18px] py-3 border-t border-[var(--border)] text-[var(--fg-muted)]"
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span>/ Abhinaysai Kamineni</span>
        <span>2026</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Line renderer
// ─────────────────────────────────────────────────────────────────────────

function RenderedLine({ line }: { line: Line }): JSX.Element {
  if (line.kind === "divider") {
    return <div className="my-1 border-t border-[var(--border)] opacity-50" />;
  }

  const toneClass = {
    muted: "text-[var(--fg-muted)]",
    accent: "text-[var(--accent)]",
    mono: "text-[var(--mono)]",
    fg: "text-[var(--fg)]",
    success: "text-[var(--mono)]",
    error: "text-[var(--accent)]",
  }[line.tone ?? "fg"];

  if (line.kind === "link" && line.href) {
    const isInternal = !line.external && line.href.startsWith("/");
    const content = (
      <span
        className={`${toneClass} underline decoration-[var(--border)] hover:decoration-[var(--accent)] transition-colors`}
      >
        {line.text}
      </span>
    );
    return isInternal ? (
      <div>
        <Link href={line.href} className="inline-block">
          {content}
        </Link>
      </div>
    ) : (
      <div>
        <a
          href={line.href}
          target={line.external ? "_blank" : undefined}
          rel={line.external ? "noopener noreferrer" : undefined}
          className="inline-block"
        >
          {content}
        </a>
      </div>
    );
  }

  return <div className={`${toneClass} whitespace-pre-wrap`}>{line.text}</div>;
}
