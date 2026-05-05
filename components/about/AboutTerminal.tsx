/**
 * AboutTerminal — replaces the AK monogram with a real-work terminal block.
 * Shows current project (eeg-seizure-detection) with honest metrics.
 *
 * Color tokens map to this codebase:
 *   --surface, --border, --bg-elevated, --fg-muted, --mono (research/sage), --accent
 */
export default function AboutTerminal(): JSX.Element {
  return (
    <div
      className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        lineHeight: 1.7,
      }}
    >
      {/* Header bar — macOS traffic lights + path */}
      <div
        className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-[var(--border)] bg-[var(--bg-elevated)]"
      >
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28CA41" }} />
        <span
          className="ml-2 text-[0.6875rem] tracking-[0.08em] text-[var(--fg-muted)]"
        >
          ~/eeg-seizure-detection
        </span>
      </div>

      {/* Body */}
      <div className="px-[18px] py-5">
        {/* Command */}
        <div className="text-[var(--fg-muted)] mb-1">
          <span className="text-[var(--mono)]">$ </span>
          python train.py \
        </div>
        <div className="pl-4 text-[var(--fg-muted)]">--arch mamba \</div>
        <div className="pl-4 text-[var(--fg-muted)]">--eval subject_independent \</div>
        <div className="pl-4 mb-4 text-[var(--fg-muted)]">--dataset chbmit</div>

        {/* Output */}
        <div className="text-[var(--fg-muted)] mb-1">epoch 48/50 · loss 0.312</div>
        <div className="mb-1">
          <span className="text-[var(--mono)] font-medium">AUROC 0.740</span>
          <span className="text-[var(--fg-muted)]"> · best checkpoint ✓</span>
        </div>
        <div className="text-[var(--fg-muted)] mb-6">generalizes across 24 patients</div>

        {/* Identity line */}
        <div
          className="flex justify-between border-t border-[var(--border)] pt-3.5 text-[var(--fg-muted)]"
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
    </div>
  );
}
