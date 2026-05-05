"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";

interface StatCounterProps {
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
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
    }
  }, [isInView, started]);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <div className="t-metric">
        {started ? (
          <CountUp
            start={0}
            end={end}
            duration={2.2}
            suffix={suffix}
            prefix={prefix}
            decimals={decimals}
            useEasing
          />
        ) : (
          <span style={{ opacity: 0 }}>
            {prefix}
            {end.toFixed(decimals)}
            {suffix}
          </span>
        )}
      </div>
      <p className="t-metric-label">{label}</p>
    </div>
  );
}
