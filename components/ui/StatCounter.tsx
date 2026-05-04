"use client";

import CountUp from "react-countup";

interface Props {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}

/**
 * Animated stat counter using react-countup's built-in IntersectionObserver
 * (enableScrollSpy). The previous implementation gated CountUp behind
 * framer-motion's useInView, which intermittently failed to fire under Lenis
 * smooth scroll — leaving every counter stuck at 0.
 */
export default function StatCounter({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
}: Props): JSX.Element {
  return (
    <div className="text-left">
      <div className="text-4xl md:text-5xl font-mono text-[var(--mono)] mb-2 tabular-nums">
        <CountUp
          start={0}
          end={end}
          duration={2}
          suffix={suffix}
          prefix={prefix}
          decimals={decimals}
          enableScrollSpy
          scrollSpyOnce
        />
      </div>
      <p className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-[0.25em]">
        {label}
      </p>
    </div>
  );
}
