"use client";

import { useEffect, useRef, useState } from "react";
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
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-left">
      <div className="text-4xl md:text-5xl font-mono text-[var(--mono)] mb-2 tabular-nums">
        {started ? (
          <CountUp
            start={0}
            end={end}
            duration={2}
            suffix={suffix}
            prefix={prefix}
            decimals={decimals}
          />
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </div>
      <p className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-[0.25em]">
        {label}
      </p>
    </div>
  );
}
