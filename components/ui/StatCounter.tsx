"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

interface Props {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}

export default function StatCounter({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
}: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-left">
      <div className="text-4xl md:text-5xl font-mono text-[var(--fg)] mb-2 tabular-nums">
        {isInView ? (
          <CountUp
            start={0}
            end={end}
            duration={2}
            suffix={suffix}
            prefix={prefix}
            decimals={decimals}
          />
        ) : (
          `${prefix}0${suffix}`
        )}
      </div>
      <p className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-[0.25em]">
        {label}
      </p>
    </div>
  );
}
