"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import NeuralLattice from "@/components/hero/NeuralLattice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ScrollScene — page-wide persistent 3D motif.
 *
 * One core lattice morphs across document scroll into three pillar-tinted
 * lattices (Research / Engineering / Product) and back to a distilled
 * remnant. Renders once at page root, fixed-position, behind all content.
 *
 * Stages by scroll progress (0 → 1):
 *   A 0.00–0.12  Singular core, centered, large
 *   B 0.12–0.40  Splits into trio (mono / accent / fg tints)
 *   C 0.40–0.70  Trio drifts to top-right, ambient
 *   D 0.70–1.00  Distilled remnant, single small lattice
 *
 * Performance: each lattice is ~42 DOM nodes, animations are pure
 * transform/opacity, all GPU-composited.
 */

// Pillar tints — match semantic color tokens in this codebase
const TINT_RESEARCH = "163,177,138"; // var(--mono) — sage
const TINT_ENGINEERING = "255,107,53"; // var(--accent) — orange
const TINT_PRODUCT_LIGHT = "20,20,22"; // dark fg in light mode
const TINT_PRODUCT_DARK = "245,242,236"; // light fg in dark mode

export default function ScrollScene(): JSX.Element | null {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [productTint, setProductTint] = useState(TINT_PRODUCT_DARK);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);

    // Pick product tint based on theme
    const detectTheme = () => {
      const theme =
        document.documentElement.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setProductTint(theme === "light" ? TINT_PRODUCT_LIGHT : TINT_PRODUCT_DARK);
    };
    detectTheme();
    const themeObs = new MutationObserver(detectTheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      mq.removeEventListener("change", update);
      themeObs.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const sp = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  // ── Core (single lattice — present in stages A & D) ─────────────────────
  // Visible during 0–0.15 (intro) and 0.70–1.0 (distilled remnant)
  const coreOpacity = useTransform(sp, [0, 0.1, 0.15, 0.7, 0.78, 1], [0.85, 0.85, 0, 0, 0.35, 0.25]);
  const coreScale = useTransform(sp, [0, 0.15, 0.7, 1], [1, 0.6, 0.35, 0.32]);
  const coreX = useTransform(sp, [0, 0.7, 1], ["0vw", "0vw", "32vw"]);
  const coreY = useTransform(sp, [0, 0.7, 1], ["0vh", "0vh", "-32vh"]);

  // ── Trio (3 tinted lattices — stages B & C) ─────────────────────────────
  // Each appears during 0.12 → 0.70, with positional choreography
  const trioOpacity = useTransform(sp, [0.1, 0.18, 0.6, 0.72], [0, 0.7, 0.45, 0]);

  // Stage B: spread laterally; Stage C: drift to top-right corner together
  const trioGroupX = useTransform(sp, [0.12, 0.4, 0.7], ["0vw", "0vw", "28vw"]);
  const trioGroupY = useTransform(sp, [0.12, 0.4, 0.7], ["0vh", "0vh", "-28vh"]);
  const trioGroupScale = useTransform(sp, [0.12, 0.4, 0.7], [0.55, 0.55, 0.32]);

  // Lateral spread for the 3 — collapses back together as they drift to corner
  const spread = useTransform(sp, [0.12, 0.35, 0.55, 0.7], [0, 280, 200, 0]);
  const spreadNeg = useTransform(spread, (v) => -v);

  if (!mounted || reduced) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ perspective: 1800 }}
      aria-hidden="true"
    >
      {/* Core lattice — accent tinted, drives stages A and D */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: coreOpacity,
          scale: coreScale,
          x: coreX,
          y: coreY,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        <NeuralLattice tint={TINT_ENGINEERING} scale={isMobile ? 0.7 : 1} />
      </motion.div>

      {/* Trio group — moves as one cluster while individuals spread */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: trioOpacity,
          x: trioGroupX,
          y: trioGroupY,
          scale: trioGroupScale,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {/* Research — left */}
        <motion.div className="absolute inset-0" style={{ x: spreadNeg }}>
          <NeuralLattice tint={TINT_RESEARCH} scale={isMobile ? 0.5 : 0.75} glow={0.7} />
        </motion.div>

        {/* Engineering — center */}
        <motion.div className="absolute inset-0">
          <NeuralLattice tint={TINT_ENGINEERING} scale={isMobile ? 0.5 : 0.75} glow={0.9} />
        </motion.div>

        {/* Product — right */}
        <motion.div className="absolute inset-0" style={{ x: spread }}>
          <NeuralLattice tint={productTint} scale={isMobile ? 0.5 : 0.75} glow={0.6} />
        </motion.div>
      </motion.div>
    </div>
  );
}
