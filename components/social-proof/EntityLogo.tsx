import type { JSX } from "react";

/**
 * Monoline geometric marks for social-proof entities.
 * All icons render in currentColor to inherit the text color
 * and participate in hover transitions.
 * 16x16 viewbox, 1.25px stroke — matches editorial weight.
 */

type IconProps = { className?: string };

const common = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// Jio — network node / signal tower
function JioMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
      <path d="M8 4.5V3M8 13v-1.5M4.5 8H3M13 8h-1.5" />
      <path d="M5.5 5.5L4.5 4.5M11.5 11.5L10.5 10.5M5.5 10.5L4.5 11.5M11.5 4.5L10.5 5.5" />
    </svg>
  );
}

// GWU — shield / crest
function GWUMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <path d="M8 2.5L3 4v4.5c0 3 2.2 4.5 5 5 2.8-.5 5-2 5-5V4L8 2.5z" />
      <path d="M6 8l2 2 2-2" />
    </svg>
  );
}

// Follett — book
function BookMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <path d="M3 3.5h4.5a1.5 1.5 0 0 1 1.5 1.5v8a1 1 0 0 0-1-1H3v-8.5z" />
      <path d="M13 3.5H8.5A1.5 1.5 0 0 0 7 5v8a1 1 0 0 1 1-1h5v-8.5z" />
    </svg>
  );
}

// PHN — stacked chevrons / data layers
function PHNMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <path d="M3 5l5-2.5L13 5l-5 2.5L3 5z" />
      <path d="M3 8l5 2.5L13 8" />
      <path d="M3 11l5 2.5L13 11" />
    </svg>
  );
}

// TEDx — bold square bracket mark
function TEDxMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <rect x="2.5" y="3.5" width="11" height="9" rx="1" />
      <path d="M5.5 6.5h5M8 6.5v4" />
    </svg>
  );
}

// Google Developer Club — "G" with dev brackets
function GDCMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <path d="M5 4.5L2.5 8 5 11.5" />
      <path d="M11 4.5L13.5 8 11 11.5" />
      <path d="M9.5 5L6.5 11" />
    </svg>
  );
}

// AWS — stylized cloud cube
function AWSMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <path d="M8 3L3 5.5v5L8 13l5-2.5v-5L8 3z" />
      <path d="M3 5.5L8 8l5-2.5M8 8v5" />
    </svg>
  );
}

// Global Leaders — globe with meridian
function GlobeMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <circle cx="8" cy="8" r="5.25" />
      <ellipse cx="8" cy="8" rx="2.25" ry="5.25" />
      <path d="M2.75 8h10.5" />
    </svg>
  );
}

// Red Hat — fedora silhouette
function RedHatMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <path d="M2.5 11c1-3 3-4.5 5.5-4.5S12.5 8 13.5 11" />
      <path d="M2.5 11c0 .8 2.5 1.5 5.5 1.5s5.5-.7 5.5-1.5" />
      <path d="M5.5 6.5c0-1.5 1-3 2.5-3s2.5 1.5 2.5 3" />
    </svg>
  );
}

// Google Advanced Data — bar chart
function ChartMark({ className }: IconProps): JSX.Element {
  return (
    <svg {...common} className={className}>
      <path d="M2.5 13h11" />
      <rect x="3.5" y="8.5" width="2" height="4" />
      <rect x="7" y="5.5" width="2" height="7" />
      <rect x="10.5" y="7" width="2" height="5.5" />
    </svg>
  );
}

const registry: Record<string, (p: IconProps) => JSX.Element> = {
  "Jio Platforms": JioMark,
  "George Washington University": GWUMark,
  "Follett Higher Education": BookMark,
  "PHN Technologies": PHNMark,
  "TEDx": TEDxMark,
  "Google Developer Club": GDCMark,
  "AWS AI Practitioner": AWSMark,
  "Global Leaders Award": GlobeMark,
  "Red Hat Certified": RedHatMark,
  "Google Advanced Data Analytics": ChartMark,
};

export default function EntityLogo({
  name,
  className,
}: {
  name: string;
  className?: string;
}): JSX.Element | null {
  const Mark = registry[name];
  if (!Mark) return null;
  return <Mark className={className} />;
}
