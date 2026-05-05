"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Orbiting data particles — 3 elliptical orbits at different
 * tilts, each carrying a small accent-colored particle.
 * Suggests data flow / pipelines without being on the nose.
 */

const orbits = [
  { size: 340, tiltX: 65, tiltZ: 15, duration: 14, particleDelay: 0 },
  { size: 460, tiltX: 75, tiltZ: -25, duration: 22, particleDelay: 5 },
  { size: 580, tiltX: 60, tiltZ: 40, duration: 30, particleDelay: 10 },
];

export default function DataOrbits(): JSX.Element {
  const reduced = useReducedMotion();

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ perspective: 1200, pointerEvents: "none" }}
      aria-hidden="true"
    >
      {orbits.map((o, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full border"
          style={{
            width: o.size,
            height: o.size,
            marginLeft: -o.size / 2,
            marginTop: -o.size / 2,
            borderColor: "rgba(255,107,53,0.08)",
            transform: `rotateX(${o.tiltX}deg) rotateZ(${o.tiltZ}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Particle — travels along the ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: 5,
              height: 5,
              marginLeft: -2.5,
              marginTop: -2.5,
              background: "var(--accent)",
              boxShadow:
                "0 0 10px rgba(255,107,53,0.9), 0 0 20px rgba(255,107,53,0.5)",
            }}
            animate={
              reduced
                ? undefined
                : {
                    x: [
                      o.size / 2,
                      0,
                      -o.size / 2,
                      0,
                      o.size / 2,
                    ],
                    y: [0, -o.size / 2, 0, o.size / 2, 0],
                    opacity: [1, 0.6, 1, 0.6, 1],
                  }
            }
            transition={{
              duration: o.duration,
              ease: "linear",
              repeat: Infinity,
              delay: o.particleDelay,
            }}
          />
        </div>
      ))}
    </div>
  );
}
