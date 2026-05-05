import type { JSX } from "react";

/**
 * Monoline capability icons — 24x24 viewbox, 1.5px stroke.
 * Slightly larger than the 16x16 social-proof marks because
 * these anchor a card, not a scrolling label.
 * All render in currentColor.
 */

type IconProps = { className?: string };

const common = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// VISION — stylized eye with crosshair pupil
function VisionIcon({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// SIGNALS — EEG / oscilloscope waveform
function SignalsIcon({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <polyline points="2,12 5,12 7,6 9,18 11,8 13,16 15,10 17,14 19,12 22,12" />
    </svg>
  );
}

// MLOPS — interlocking gears + pipeline arrow
function MLOpsIcon({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <circle cx="7" cy="10" r="3.5" />
      <circle cx="7" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="3.5" />
      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
      <path d="M10 8.5l2.5 3" />
      <path d="M19.5 14h2M2 10h2" />
    </svg>
  );
}

// AGENTS — branching decision tree / bot mind
function AgentsIcon({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="4.5" r="2.5" />
      <circle cx="12" cy="4.5" r="0.75" fill="currentColor" stroke="none" />
      <path d="M12 7v3" />
      <path d="M12 10l-5 5M12 10l5 5" />
      <circle cx="7" cy="16.5" r="2" />
      <circle cx="17" cy="16.5" r="2" />
      <path d="M12 10v6.5" />
      <circle cx="12" cy="18" r="2" />
    </svg>
  );
}

const registry: Record<string, (p: IconProps) => JSX.Element> = {
  VISION: VisionIcon,
  SIGNALS: SignalsIcon,
  MLOPS: MLOpsIcon,
  AGENTS: AgentsIcon,
};

export default function CapabilityIcon({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}): JSX.Element | null {
  const Icon = registry[tag];
  if (!Icon) return null;
  return <Icon className={className} />;
}
