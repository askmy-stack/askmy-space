"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import HeroBlob from "./HeroBlob";
import NeuralLattice from "./NeuralLattice";
import DataOrbits from "./DataOrbits";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Hero 3D scene — composes the molten blob, orbiting data particles,
 * and a rotating neural lattice, with cursor parallax applied to the
 * whole stack for a subtle depth response.
 *
 * No WebGL — all CSS 3D transforms + SVG. GPU-cheap and responsive.
 */
export default function HeroScene(): JSX.Element {
  const reduced = useReducedMotion();

  // Pointer-driven parallax — clamped and spring-smoothed
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);

  useEffect(() => {
    if (reduced) return;
    // Skip pointer tracking on touch / small screens
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  return (
    <div
      className="relative w-full h-full pointer-events-none overflow-hidden"
      style={{ perspective: 1600 }}
      aria-hidden="true"
    >
      {/* Parallax layer 1 — blob (slower / deeper) */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <HeroBlob />
      </motion.div>

      {/* Parallax layer 2 — data orbits */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX: useTransform(sy, [-0.5, 0.5], [8, -8]),
          rotateY: useTransform(sx, [-0.5, 0.5], [-12, 12]),
          transformStyle: "preserve-3d",
        }}
      >
        <DataOrbits />
      </motion.div>

      {/* Parallax layer 3 — neural lattice (closest / strongest response) */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX: useTransform(sy, [-0.5, 0.5], [12, -12]),
          rotateY: useTransform(sx, [-0.5, 0.5], [-18, 18]),
          transformStyle: "preserve-3d",
        }}
      >
        <NeuralLattice />
      </motion.div>

      {/* Vignette — focuses attention on the center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--bg) 90%)",
        }}
      />
    </div>
  );
}
