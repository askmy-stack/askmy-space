"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Neural lattice — wireframe icosahedron-inspired geometry
 * of nodes + edges, rotated in 3D via CSS transforms.
 * Signals the ML/neural-networks theme without being literal.
 * GPU-cheap: only rotates a single transformed layer.
 */

// 12 vertices of an icosahedron (scaled), each at a specific 3D position.
// Coords normalized to roughly [-1, 1].
const t = 1.618; // golden ratio — icosahedron constant
const VERTICES: [number, number, number][] = [
  [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
  [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
  [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
];

// Edges — 30 connections forming the icosahedron wireframe
const EDGES: [number, number][] = [
  [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
  [1, 5], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
  [3, 4], [3, 6], [3, 8], [3, 9],
  [4, 5], [4, 9], [4, 11],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 8], [7, 10],
  [8, 9], [10, 11],
];

const BASE_SCALE = 120; // radius in px

interface Props {
  /** Tint as "r,g,b" — defaults to accent orange */
  tint?: string;
  /** Multiplier on base radius */
  scale?: number;
  /** Glow halo strength on nodes (0–1) */
  glow?: number;
}

export default function NeuralLattice({
  tint = "255,107,53",
  scale = 1,
  glow = 1,
}: Props = {}): JSX.Element {
  const reduced = useReducedMotion();
  const SCALE = BASE_SCALE * scale;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: SCALE * 2.5,
        height: SCALE * 2.5,
        perspective: 1000,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduced
            ? undefined
            : { rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 360] }
        }
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Edges — rendered as absolutely positioned thin divs in 3D */}
        {EDGES.map(([a, b], i) => {
          const [x1, y1, z1] = VERTICES[a];
          const [x2, y2, z2] = VERTICES[b];
          const dx = (x2 - x1) * SCALE;
          const dy = (y2 - y1) * SCALE;
          const dz = (z2 - z1) * SCALE;
          const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const rotY = Math.atan2(dz, dx) * (180 / Math.PI);
          const rotZ = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz)) * (180 / Math.PI);
          return (
            <div
              key={`edge-${i}`}
              className="absolute top-1/2 left-1/2"
              style={{
                width: length,
                height: 1.25,
                background: `linear-gradient(90deg, rgba(${tint},0.15), rgba(${tint},0.7), rgba(${tint},0.15))`,
                transformOrigin: "0 50%",
                transform: `
                  translate3d(${x1 * SCALE}px, ${y1 * SCALE}px, ${z1 * SCALE}px)
                  rotateY(${-rotY}deg)
                  rotateZ(${rotZ}deg)
                `,
              }}
            />
          );
        })}

        {/* Nodes — small glowing dots at each vertex */}
        {VERTICES.map(([x, y, z], i) => (
          <div
            key={`node-${i}`}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: 8,
              height: 8,
              marginLeft: -4,
              marginTop: -4,
              background: `rgb(${tint})`,
              boxShadow: `0 0 ${12 * glow}px rgba(${tint},${0.8 * glow}), 0 0 ${24 * glow}px rgba(${tint},${0.4 * glow})`,
              transform: `translate3d(${x * SCALE}px, ${y * SCALE}px, ${z * SCALE}px)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
