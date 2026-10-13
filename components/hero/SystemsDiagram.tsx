"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const nodes = [
  { id: "agents", label: "Agents", x: 32, y: 48 },
  { id: "context", label: "Context", x: 50, y: 22 },
  { id: "eval", label: "Evaluation", x: 68, y: 48 },
  { id: "infra", label: "Infra", x: 50, y: 78 },
] as const;

/** Edges as [fromIndex, toIndex] into `nodes`. */
const edges: readonly [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
];

/**
 * Systems diagram for the hero: Agents ↔ Context ↔ Evaluation ↔ Infra.
 * One deliberate motion (path draw + node fade). Pure SVG, no cards.
 */
export default function SystemsDiagram(): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative w-full aspect-[5/4] max-w-lg mx-auto md:mx-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        role="presentation"
      >
        <defs>
          <linearGradient id="sys-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {edges.map(([a, b], i) => {
          const from = nodes[a];
          const to = nodes[b];
          const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
          return (
            <motion.path
              key={`${from.id}-${to.id}`}
              d={d}
              fill="none"
              stroke="url(#sys-edge)"
              strokeWidth="0.35"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.35 + i * 0.08,
                ease: easeOutExpo,
              }}
            />
          );
        })}

        {nodes.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="1.6"
              fill="var(--accent)"
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.55 + i * 0.1,
                ease: easeOutExpo,
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            {!reduced && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="3.2"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.25"
                initial={{ opacity: 0.45, scale: 0.6 }}
                animate={{ opacity: [0.45, 0, 0.45], scale: [0.6, 1.35, 0.6] }}
                transition={{
                  duration: 3.2,
                  delay: 1.2 + i * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            )}
            <motion.text
              x={node.x}
              y={node.y + (node.y < 40 ? -4.5 : 6.5)}
              textAnchor="middle"
              fill="var(--fg-muted)"
              style={{
                fontSize: "3.2px",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.75 + i * 0.1,
                ease: easeOutExpo,
              }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}
