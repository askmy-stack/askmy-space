"use client";

import { useCallback, useId, useRef, useState } from "react";
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

const iconClass = "w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]";

/** Four corners, matched offsets — sequential reading order TL → TR → BL → BR. */
const layers: readonly Layer[] = [
  {
    id: "context",
    label: "Context engineering",
    sub: "Right information, right time",
    main: "Right context.",
    bottom: "retrieve • reason • remember",
    hint: "Curated context guides each decision",
    position: "left-[2%] top-[6%] sm:left-[0%] sm:top-[8%]",
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
    position: "right-[2%] top-[6%] sm:right-[0%] sm:top-[8%]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M9 10l-3 2 3 2m6-4 3 2-3 2M12.5 9l-1 6" />
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
    position: "left-[2%] bottom-[6%] sm:left-[0%] sm:bottom-[8%]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}>
        <path d="M7 18h11a4 4 0 0 0 .2-8A6.5 6.5 0 0 0 5.8 11a3.6 3.6 0 0 0 1.2 7Z" />
        <path d="M9 14h6m-3-3v6" />
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
    position: "right-[2%] bottom-[6%] sm:right-[0%] sm:bottom-[8%]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconClass}>
        <path d="M4 19V7m5 12V11m5 8V5m5 14v-8" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
];

const defaultCore = {
  main: "Useful action.",
  bottom: "plan • act • coordinate",
  hint: "Select a layer to inspect how reliability is built",
} as const;

/**
 * Hero systems stage: glowing core, calm orbits, floating layer cards.
 * Symmetric corners, no pause control, keyboard radiogroup.
 */
export default function SystemsDiagram(): JSX.Element {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const liveId = useId();
  const [active, setActive] = useState<LayerId | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 28, mass: 0.65 });
  const sy = useSpring(my, { stiffness: 50, damping: 28, mass: 0.65 });

  const activeLayer = active ? layers.find((l) => l.id === active) : undefined;
  const coreMain = activeLayer?.main ?? defaultCore.main;
  const coreBottom = activeLayer?.bottom ?? defaultCore.bottom;
  const hint = activeLayer?.hint ?? defaultCore.hint;
  const motionOn = !reduced;

  const selectLayer = useCallback((id: LayerId, index: number) => {
    setActive(id);
    setFocusIndex(index);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!motionOn || !stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 8);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 8);
    },
    [motionOn, mx, my],
  );

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const onCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let next = index;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (index + 1) % layers.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (index - 1 + layers.length) % layers.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = layers.length - 1;
      } else {
        return;
      }
      const layer = layers[next];
      selectLayer(layer.id, next);
      const buttons = stageRef.current?.querySelectorAll<HTMLButtonElement>(
        "[data-layer-card]",
      );
      buttons?.[next]?.focus();
    },
    [selectLayer],
  );

  return (
    <div className="relative w-full max-w-[560px] lg:max-w-[600px] mx-auto">
      <motion.div
        ref={stageRef}
        role="radiogroup"
        aria-label="Engineering layers"
        aria-describedby={liveId}
        className="relative aspect-square w-full select-none"
        style={reduced ? undefined : { x: sx, y: sy }}
        onPointerMove={reduced ? undefined : onPointerMove}
        onPointerLeave={reduced ? undefined : onPointerLeave}
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={riseInTransition(0.2)}
      >
        <div
          className="pointer-events-none absolute inset-[10%] sm:inset-[8%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.14) 0%, rgba(128,40,10,0.06) 40%, transparent 72%)",
            filter: "blur(16px)",
          }}
          aria-hidden="true"
        />

        <svg
          className="absolute inset-[5%] h-[90%] w-[90%] overflow-visible"
          viewBox="0 0 600 600"
          role="presentation"
        >
          <circle
            cx="300"
            cy="300"
            r="238"
            fill="none"
            stroke="rgba(255,140,84,0.14)"
            strokeWidth="0.7"
            strokeDasharray="2 8"
          />
          <circle
            cx="300"
            cy="300"
            r="205"
            fill="none"
            stroke="rgba(223,229,226,0.08)"
            strokeWidth="0.7"
            strokeDasharray="1.5 11"
          />
          <circle
            cx="300"
            cy="300"
            r="268"
            fill="none"
            stroke="rgba(223,229,226,0.06)"
            strokeWidth="0.6"
            strokeDasharray="1.5 12"
          />

          {motionOn && (
            <>
              <g className="sys-orbit-spin" style={{ transformOrigin: "300px 300px" }}>
                <circle cx="300" cy="62" r="3.5" fill="var(--accent)" className="sys-electron" />
                <circle cx="300" cy="538" r="2" fill="var(--accent)" opacity="0.7" />
              </g>
              <g className="sys-orbit-spin-rev" style={{ transformOrigin: "300px 300px" }}>
                <circle cx="505" cy="300" r="3" fill="var(--accent)" className="sys-electron" />
                <circle cx="95" cy="300" r="1.8" fill="#c46a41" />
              </g>
            </>
          )}
        </svg>

        <div
          className={`absolute left-[26%] top-[26%] flex h-[48%] w-[48%] items-center justify-center rounded-full border border-[rgba(255,127,69,0.2)] ${motionOn ? "sys-core-breathe" : ""}`}
          style={{
            background:
              "radial-gradient(circle at 36% 25%, rgba(255,157,96,0.48), rgba(116,44,18,0.45) 21%, rgba(29,19,14,0.94) 49%, #0A0A0B 73%)",
            boxShadow:
              "inset -24px -24px 45px rgba(0,0,0,0.92), inset 11px 8px 22px rgba(255,103,53,0.14), 0 0 72px 10px rgba(176,59,22,0.12)",
          }}
        >
          <div className="relative z-[2] px-3 sm:px-4 text-center pointer-events-none">
            <p className="t-label mb-1.5 sm:mb-2 text-white/80">Systems that</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={coreMain}
                className="font-[family-name:var(--font-display)] text-[clamp(1.15rem,2.8vw,1.95rem)] leading-none tracking-[-0.02em] text-white"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: easeOutExpo }}
              >
                {coreMain}
              </motion.p>
            </AnimatePresence>
            <p className="mt-2.5 sm:mt-3 t-label uppercase text-white/70 tracking-[0.12em]">
              {coreBottom}
            </p>
          </div>
        </div>

        {layers.map((layer, index) => {
          const isActive = active === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              data-layer-card
              role="radio"
              aria-checked={isActive}
              tabIndex={focusIndex === index ? 0 : -1}
              onClick={() => selectLayer(layer.id, index)}
              onFocus={() => selectLayer(layer.id, index)}
              onKeyDown={(e) => onCardKeyDown(e, index)}
              className={`absolute z-[3] w-[min(168px,40%)] sm:w-[min(188px,42%)] rounded-xl border px-2.5 py-2.5 sm:px-3.5 sm:py-3 text-left backdrop-blur-md transition-[border-color,box-shadow,background] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${layer.position} ${
                isActive
                  ? "border-[rgba(255,117,71,0.55)] shadow-[0_0_22px_rgba(255,105,56,0.1),0_10px_22px_rgba(0,0,0,0.22)]"
                  : "border-[rgba(231,228,221,0.12)] bg-[linear-gradient(145deg,rgba(22,24,26,0.92),rgba(12,14,15,0.88))] hover:border-[rgba(255,117,71,0.4)]"
              } ${motionOn ? "sys-card-float" : ""}`}
              style={{
                background: isActive
                  ? "linear-gradient(145deg,rgba(30,22,18,0.96),rgba(14,12,12,0.92))"
                  : undefined,
                animationDelay: `${index * 0.85}s`,
              }}
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md border border-[rgba(255,117,71,0.2)] bg-[rgba(255,117,71,0.055)] text-[var(--accent)]">
                  {layer.icon}
                </span>
                <span className="t-caption font-medium text-white leading-snug">
                  {layer.label}
                </span>
              </div>
              <p className="mt-1.5 sm:mt-2 pl-9 sm:pl-10 t-caption text-white/75 leading-snug hidden min-[400px]:block">
                {layer.sub}
              </p>
              <span
                className="absolute bottom-0 left-3 h-0.5 bg-[var(--accent)] transition-[width] duration-300"
                style={{ width: isActive ? "calc(100% - 1.5rem)" : "0.85rem" }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </motion.div>

      <p
        id={liveId}
        aria-live="polite"
        className="mt-3 flex items-center justify-center gap-2 t-label text-white/70"
      >
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] ${motionOn ? "animate-pulse-dot" : ""}`}
          aria-hidden="true"
        />
        {hint}
      </p>
    </div>
  );
}
