"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { easeOutExpo, riseInTransition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LayerId = "context" | "agents" | "evaluation" | "infra";

interface Layer {
  id: LayerId;
  label: string;
  sub: string;
  main: string;
  bottom: string;
  hint: string;
  position: string;
  icon: JSX.Element;
}

const iconClass = "w-[18px] h-[18px]";

const layers: readonly Layer[] = [
  {
    id: "context",
    label: "Context engineering",
    sub: "Right information, right time",
    main: "Right context.",
    bottom: "retrieve • reason • remember",
    hint: "Curated context guides each decision",
    position: "left-[2%] top-[4%] sm:left-[0%] sm:top-[8%] md:left-[-2%] md:top-[6%]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconClass}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <path d="M6.5 10v4.5H17.5V10M12 14.5V21" />
      </svg>
    ),
  },
  {
    id: "agents",
    label: "Agent systems",
    sub: "Plan, act, coordinate",
    main: "Useful action.",
    bottom: "plan • act • coordinate",
    hint: "Agents turn decisions into controlled actions",
    position: "right-[2%] top-[10%] sm:right-[0%] sm:top-[14%] md:right-[-2%] md:top-[12%]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M9 10l-3 2 3 2m6-4 3 2-3 2M12.5 9l-1 6" />
      </svg>
    ),
  },
  {
    id: "evaluation",
    label: "Evaluation",
    sub: "Measure, test, improve",
    main: "Earn trust.",
    bottom: "test • observe • improve",
    hint: "Evaluation makes reliability measurable",
    position: "right-[2%] bottom-[8%] sm:right-[-2%] sm:bottom-[12%] md:right-[-4%] md:bottom-[14%]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconClass}>
        <path d="M4 19V7m5 12V11m5 8V5m5 14v-8" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
  {
    id: "infra",
    label: "Cloud & platform",
    sub: "Deploy, scale, observe",
    main: "Built to scale.",
    bottom: "deploy • monitor • adapt",
    hint: "Reliable infrastructure powers the product",
    position: "left-[2%] bottom-[6%] sm:left-[0%] sm:bottom-[10%] md:left-[-2%] md:bottom-[8%]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}>
        <path d="M7 18h11a4 4 0 0 0 .2-8A6.5 6.5 0 0 0 5.8 11a3.6 3.6 0 0 0 1.2 7Z" />
        <path d="M9 14h6m-3-3v6" />
      </svg>
    ),
  },
];

/**
 * Hero systems stage aligned to the motion reference:
 * glowing core, orbit tracks, floating layer cards, parallax, pause.
 * No lattice / prism.
 */
export default function SystemsDiagram(): JSX.Element {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<LayerId>("agents");
  const [paused, setPaused] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.5 });

  const activeLayer = layers.find((l) => l.id === active) ?? layers[1];
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
    <div className="relative w-full max-w-[620px] mx-auto">
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
        {/* Ambient glow behind core */}
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.18) 0%, rgba(128,40,10,0.08) 38%, transparent 72%)",
            filter: "blur(18px)",
          }}
          aria-hidden="true"
        />

        {/* Orbit SVG */}
        <svg
          className="absolute inset-[4%] h-[92%] w-[92%] overflow-visible"
          viewBox="0 0 600 600"
          role="presentation"
        >
          <circle
            cx="300"
            cy="300"
            r="238"
            fill="none"
            stroke="rgba(255,140,84,0.18)"
            strokeWidth="0.7"
            strokeDasharray="2 7"
          />
          <circle
            cx="300"
            cy="300"
            r="205"
            fill="none"
            stroke="rgba(223,229,226,0.10)"
            strokeWidth="0.7"
            strokeDasharray="1.5 10"
          />
          <circle
            cx="300"
            cy="300"
            r="272"
            fill="none"
            stroke="rgba(223,229,226,0.08)"
            strokeWidth="0.6"
            strokeDasharray="1.5 10"
          />

          {motionOn && (
            <>
              <g className="sys-orbit-spin origin-center" style={{ transformOrigin: "300px 300px" }}>
                <circle cx="300" cy="62" r="4" fill="var(--accent)" className="sys-electron" />
                <circle cx="300" cy="538" r="2.5" fill="var(--accent)" opacity="0.75" />
              </g>
              <g className="sys-orbit-spin-rev" style={{ transformOrigin: "300px 300px" }}>
                <circle cx="505" cy="300" r="3.5" fill="var(--accent)" className="sys-electron" />
                <circle cx="95" cy="300" r="2" fill="#c46a41" />
              </g>
              <path
                d="M 126 121 Q 300 65 458 160"
                fill="none"
                stroke="rgba(239,113,67,0.35)"
                strokeWidth="1.2"
                strokeDasharray="5 11"
                className="sys-signal"
              />
              <path
                d="M 458 160 Q 545 360 454 480"
                fill="none"
                stroke="rgba(239,113,67,0.2)"
                strokeWidth="1.2"
                strokeDasharray="5 11"
                className="sys-signal-slow"
              />
              <path
                d="M 454 480 Q 260 561 122 470"
                fill="none"
                stroke="rgba(239,113,67,0.35)"
                strokeWidth="1.2"
                strokeDasharray="5 11"
                className="sys-signal"
              />
              <path
                d="M 122 470 Q 54 295 126 121"
                fill="none"
                stroke="rgba(239,113,67,0.2)"
                strokeWidth="1.2"
                strokeDasharray="5 11"
                className="sys-signal-slow"
              />
            </>
          )}
        </svg>

        {/* Core orb */}
        <div
          className={`absolute left-[24%] top-[24%] flex h-[52%] w-[52%] items-center justify-center rounded-full border border-[rgba(255,127,69,0.24)] ${motionOn ? "sys-core-breathe" : ""}`}
          style={{
            background:
              "radial-gradient(circle at 36% 25%, rgba(255,157,96,0.55), rgba(116,44,18,0.5) 21%, rgba(29,19,14,0.94) 49%, #0A0A0B 73%)",
            boxShadow:
              "inset -24px -24px 45px rgba(0,0,0,0.92), inset 11px 8px 22px rgba(255,103,53,0.17), 0 0 95px 13px rgba(176,59,22,0.16)",
          }}
        >
          <div className="relative z-[2] px-4 text-center pointer-events-none">
            <p className="t-label mb-2 text-[rgba(255,211,169,0.83)]">
              Systems that
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeLayer.main}
                className="font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.2vw,2.15rem)] leading-none tracking-[-0.02em] text-[#f3ddd0]"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                {activeLayer.main}
              </motion.p>
            </AnimatePresence>
            <p className="mt-3 t-label uppercase text-[#d6a28b] tracking-[0.14em]">
              {activeLayer.bottom}
            </p>
          </div>
        </div>

        {/* Floating layer cards */}
        {layers.map((layer) => {
          const isActive = active === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(layer.id)}
              className={`absolute z-[3] w-[min(168px,40%)] sm:w-[min(200px,44%)] rounded-xl border px-3 py-3 sm:px-3.5 sm:py-3.5 text-left backdrop-blur-md transition-[border-color,transform,box-shadow] duration-300 ${layer.position} ${
                isActive
                  ? "border-[rgba(255,117,71,0.65)] shadow-[0_0_28px_rgba(255,105,56,0.14),0_14px_28px_rgba(0,0,0,0.28)]"
                  : "border-[rgba(231,228,221,0.14)] bg-[linear-gradient(145deg,rgba(22,24,26,0.92),rgba(12,14,15,0.88))] hover:-translate-y-1 hover:border-[rgba(255,117,71,0.55)]"
              } ${motionOn ? "sys-card-float" : ""}`}
              style={{
                background: isActive
                  ? "linear-gradient(145deg,rgba(30,22,18,0.96),rgba(14,12,12,0.92))"
                  : undefined,
                animationDelay: `${["context", "agents", "infra", "evaluation"].indexOf(layer.id) * 0.6}s`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[rgba(255,117,71,0.22)] bg-[rgba(255,117,71,0.065)] text-[var(--accent)]">
                  {layer.icon}
                </span>
                <span className="t-caption font-medium text-[var(--fg)] leading-snug">
                  {layer.label}
                </span>
              </div>
              <p className="mt-2 pl-10 t-caption text-[var(--fg-muted)] leading-snug">
                {layer.sub}
              </p>
              <span
                className="absolute bottom-0 left-4 h-0.5 bg-[var(--accent)] transition-[width] duration-400"
                style={{ width: isActive ? "calc(100% - 2rem)" : "1.25rem" }}
                aria-hidden="true"
              />
            </button>
          );
        })}

        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="absolute bottom-3 right-3 z-[5] rounded-full border border-[var(--border)] bg-[rgba(19,21,22,0.86)] px-3.5 py-2 t-label text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
          >
            {paused ? "▶ Resume motion" : "Ⅱ Pause motion"}
          </button>
        )}
      </motion.div>

      <p className="mt-3 flex items-center justify-center gap-2 t-label text-[var(--fg-muted)]">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] ${motionOn ? "animate-pulse-dot" : ""}`}
          aria-hidden="true"
        />
        {activeLayer.hint}
      </p>
    </div>
  );
}
