interface MetricCardProps {
  label: string;
  value: string;
  detail?: string;
}

export default function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-[var(--color-dashboard-border)] bg-[var(--color-dashboard-bg)] p-5 transition-colors duration-[var(--motion-dashboard-snap)] hover:border-[var(--color-dashboard-accent-1)]">
      <p className="t-mono uppercase tracking-[0.2em] text-[var(--color-dashboard-text-muted)] mb-3">
        {label}
      </p>
      <p className="t-display-lg font-mono text-[var(--color-dashboard-accent-1)]">
        {value}
      </p>
      {detail && (
        <p className="t-caption text-[var(--color-dashboard-text-muted)] mt-2">
          {detail}
        </p>
      )}
    </div>
  );
}
