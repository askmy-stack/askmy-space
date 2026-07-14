"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "agent";
  text: string;
}

const SUGGESTIONS = [
  "what's in today's signals?",
  "how does the pipeline score items?",
  "walk me through the EEG work",
] as const;

const INTRO: Message = {
  role: "agent",
  text: "I'm this site's agent. I can walk you through the work, explain how the pipeline decides what's significant, or pull from today's signals. Plain text is all you need.",
};

export default function AskAgent(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function ask(question: string): Promise<void> {
    const text = question.trim();
    if (!text || busy) return;
    setBusy(true);
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => ({}));
      const reply: string = res.ok
        ? data.reply || "…I came back empty. Try rephrasing?"
        : data.error || "The agent hit a snag — try again in a moment.";
      setMessages((m) => [...m, { role: "agent", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "agent", text: "Network hiccup — the question never left your browser. Try again." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[560px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:p-8">
      <div
        ref={scrollRef}
        className="flex max-h-[480px] flex-1 flex-col gap-3 overflow-y-auto pb-4"
        aria-busy={busy}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "self-end max-w-[85%] rounded-2xl rounded-br-md border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 py-3 text-sm leading-relaxed text-[var(--fg)]"
                : "self-start max-w-[85%] rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm leading-relaxed text-[var(--fg)]"
            }
          >
            {m.text}
          </div>
        ))}
        {busy && (
          <div className="self-start rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--bg)] px-5 py-4">
            <span className="inline-flex gap-1.5" aria-label="Agent is thinking">
              {[0, 1, 2].map((d) => (
                <i
                  key={d}
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--fg-muted)]"
                  style={{ animationDelay: `${d * 160}ms` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>
      <div aria-live="polite" className="sr-only">
        {!busy && messages.length > 1 && messages[messages.length - 1].role === "agent"
          ? `Agent: ${messages[messages.length - 1].text}`
          : ""}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => ask(s)}
            disabled={busy}
            className="min-h-[44px] rounded-full border border-[var(--border)] px-4 font-mono text-xs text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--fg)] disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void ask(input);
        }}
        className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] p-1.5 pl-5 transition-colors focus-within:border-[var(--accent)]/60"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Ask about the work, the pipeline, or today's AI news…"
          aria-label="Message the agent"
          className="min-h-[44px] flex-1 bg-transparent text-sm text-[var(--fg)] outline-none placeholder:text-[var(--fg-muted)]"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send"
          className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
        >
          ↑
        </button>
      </form>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
        text-first · answers are generated · no chat history stored
      </p>
    </div>
  );
}
