"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { easeOutExpo, riseInTransition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LayerId = "context" | "agents" | "evaluation" | "infra";

interface Layer {
  id: LayerId;
  label: string;
  main: string;
  bottom: string;
  x: number;
  y: number;
}

const layers: readonly Layer[] = [
  {
    id: "context",
    label: "Context",
    main: "Right context.",
    bottom: "retrieve. reason. remember",
    x: 50,
    y: 18,
  },
  {
    id: "agents",
    label: "Agents",
    main: "Useful action.",
    bottom: "plan. act. coordinate",
    x: 22,
    y: 50,
  },
  {
    id: "evaluation",
    label: "Evaluation",
    main: "Earn trust.",
    bottom: "test. observe. improve",
    x: 78,
    y: 50,
  },
  {
    id: "infra",
    label: "Infra",
    main: "Built to scale.",
    bottom: "deploy. monitor. adapt",
    x: 50,
    y: 82,
  },
];

/**
 * Interactive systems stage inspired by the motion reference:
 * orbits, signal paths, selectable layers, core copy swap, pointer parallax.
 * Styled for this portfolio (Fraunces/Geist tokens, no floating cards).
 */
export default function SystemsDiagram(): JSX.Element {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<LayerId>("evaluation");
  const [paused, setPaused] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.5 });

  const activeLayer = layers.find((l) => l.id === active) ?? layers[2];
  const motionOn = !reduced && !paused;

  useEffect(() => {
    if (reduced) setPaused(true);
  }, [reduced]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!motionOn || !stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 14);
    },
    [motionOn, mx, my],
  );

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <div className="relative w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
      <motion.div
        ref={stageRef}
        className="relative aspect-square w-full select-none"
        style={{ x: sx, y: sy }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={riseInTransition(0.2)}
        aria-label="Interactive diagram of four engineering layers"
      >
        {/* Soft core glow */}
        <div
          className="pointer-events-none absolute inset-[12%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.16) 0%, rgba(255,107,53,0.05) 40%, transparent 70%)",
            filter: "blur(12px)",
          }}
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          role="presentation"
        >
          <defs>
            <linearGradient id="sys-edge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Orbit tracks */}
          <g className={motionOn ? "sys-orbit" : undefined}>
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="rgba(255,107,53,0.14)"
              strokeWidth="0.25"
              strokeDasharray="1.2 2.8"
            />
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="rgba(245,241,234,0.08)"
              strokeWidth="0.2"
              strokeDasharray="0.8 3.2"
            />
          </g>

          {/* Orbiting electrons */}
          {motionOn && (
            <>
              <g className="sys-orbit-spin">
                <circle cx="50" cy="12" r="0.7" fill="var(--accent)" className="sys-electron" />
                <circle cx="50" cy="88" r="0.45" fill="var(--accent)" opacity="0.7" />
              </g>
              <g className="sys-orbit-spin-rev">
                <circle cx="82" cy="50" r="0.55" fill="var(--accent)" className="sys-electron" />
              </g>
            </>
          )}

          {/* Signal paths */}
          <path
            d="M 22 50 Q 50 18 78 50"
            fill="none"
            stroke="rgba(255,107,53,0.28)"
            strokeWidth="0.3"
            strokeDasharray="1.2 2.4"
            className={motionOn ? "sys-signal" : undefined}
          />
          <path
            d="M 78 50 Q 50 82 22 50"
            fill="none"
            stroke="rgba(255,107,53,0.18)"
            strokeWidth="0.3"
            strokeDasharray="1.2 2.8"
            className={motionOn ? "sys-signal-slow" : undefined}
          />

          {/* Spokes to core */}
          {layers.map((layer) => (
            <line
              key={`spoke-${layer.id}`}
              x1={layer.x}
              y1={layer.y}
              x2="50"
              y2="50"
              stroke="url(#sys-edge)"
              strokeWidth={active === layer.id ? 0.45 : 0.25}
              opacity={active === layer.id ? 1 : 0.55}
            />
          ))}

          {/* Core ring */}
          <circle
            cx="50"
            cy="50"
            r="14"
            fill="none"
            stroke="rgba(255,107,53,0.22)"
            strokeWidth="0.3"
            className={motionOn ? "sys-core-ring" : undefined}
          />
          <circle cx="50" cy="50" r="1.1" fill="var(--accent)" />
        </svg>

        {/* Core label */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-[10rem]">
            <p className="t-label text-[var(--accent)] mb-2">Systems that</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeLayer.main}
                className="t-headline text-[var(--fg)]"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                {activeLayer.main}
              </motion.p>
            </AnimatePresence>
            <p className="t-caption mt-2">{activeLayer.bottom}</p>
          </div>
        </div>

        {/* Layer hit targets */}
        {layers.map((layer) => {
          const isActive = active === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`${layer.label}: ${layer.main}`}
              onClick={() => setActive(layer.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 rounded-sm px-2 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                left: `${layer.x}%`,
                top: `${layer.y}%`,
              }}
            >
              <span
                className="block h-2.5 w-2.5 rounded-full transition-shadow"
                style={{
                  background: "var(--accent)",
                  boxShadow: isActive
                    ? "0 0 16px rgba(255,107,53,0.55)"
                    : "0 0 0 transparent",
                }}
              />
              <span
                className={`t-label transition-colors ${
                  isActive ? "text-[var(--accent)]" : "text-[var(--fg-muted)]"
                }`}
              >
                {layer.label}
              </span>
            </button>
          );
        })}

        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="absolute bottom-2 right-2 z-10 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 px-3 py-1.5 t-label text-[var(--fg-muted)] backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
          >
            {paused ? "Resume motion" : "Pause motion"}
          </button>
        )}
      </motion.div>

      <p className="t-caption mt-4 text-center lg:text-right">
        Tap a layer to explore the system
      </p>
    </div>
  );
}
