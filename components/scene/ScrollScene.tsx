"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";
import NeuralLattice from "@/components/hero/NeuralLattice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ScrollScene — single persistent prism that docks to the right gutter
 * past the hero, with a thin scroll-progress hairline beside it.
 *
 * Design principles:
 *   1. ONE lattice — not multiple competing instances
 *   2. NEVER crosses the reading column (1280px max)
 *   3. Color storytelling — tint shifts research → engineering → product
 *      across scroll, encoding the three-pillar narrative through a
 *      single element instead of three
 *   4. Hero: large + centered (statement)
 *      Past hero: small + docked top-right (instrument)
 *
 * Mobile: hidden past hero — no room outside reading column.
 *
 * Performance: single lattice, transform/opacity only, GPU-composited.
 */

const TINT_RESEARCH = "163,177,138"; // sage / --mono
const TINT_ENGINEERING = "255,107,53"; // orange / --accent
const TINT_PRODUCT_LIGHT = "20,20,22";
const TINT_PRODUCT_DARK = "245,242,236";

// Linear interpolate between two "r,g,b" strings
function mixTint(a: string, b: string, t: number): string {
  const [ar, ag, ab] = a.split(",").map(Number);
  const [br, bg, bb] = b.split(",").map(Number);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `${r},${g},${bl}`;
}

export default function ScrollScene(): JSX.Element | null {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [productTint, setProductTint] = useState(TINT_PRODUCT_DARK);
  const [tint, setTint] = useState(TINT_ENGINEERING);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);

    const detectTheme = () => {
      const theme =
        document.documentElement.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setProductTint(theme === "light" ? TINT_PRODUCT_LIGHT : TINT_PRODUCT_DARK);
    };
    detectTheme();
    const themeObs = new MutationObserver(detectTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      mq.removeEventListener("change", update);
      themeObs.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  // Tint progression — drive a single continuous color story
  // 0.00–0.15 engineering (hero — full brand)
  // 0.15–0.40 → research (capabilities/work — research-led)
  // 0.40–0.70 → product (skills/about — user-centered work)
  // 0.70–1.00 → engineering (closing — back to brand)
  useEffect(() => {
    const unsub = sp.on("change", (v) => {
      let next: string;
      if (v < 0.15) {
        next = TINT_ENGINEERING;
      } else if (v < 0.4) {
        const t = (v - 0.15) / 0.25;
        next = mixTint(TINT_ENGINEERING, TINT_RESEARCH, t);
      } else if (v < 0.7) {
        const t = (v - 0.4) / 0.3;
        next = mixTint(TINT_RESEARCH, productTint, t);
      } else {
        const t = (v - 0.7) / 0.3;
        next = mixTint(productTint, TINT_ENGINEERING, t);
      }
      setTint(next);
    });
    return () => unsub();
  }, [sp, productTint]);

  // Position progression — hero centered → docked top-right past hero
  // Below 8% scroll: centered, full size
  // Above 12% scroll: docked top-right, small
  // Smooth transition between
  const x = useTransform(sp, [0, 0.08, 0.15], ["0vw", "0vw", "38vw"]);
  const y = useTransform(sp, [0, 0.08, 0.15], ["0vh", "0vh", "-32vh"]);
  const scale = useTransform(sp, [0, 0.08, 0.15, 1], [1, 1, 0.32, 0.32]);
  // Hero opacity: visible 0–15%, fade out, fade back in subtly past hero as docked instrument
  const opacity = useTransform(
    sp,
    [0, 0.08, 0.13, 0.18, 1],
    [0.85, 0.85, 0.45, 0.55, 0.45],
  );

  // Scroll progress hairline — only visible past hero
  const lineOpacity = useTransform(sp, [0.13, 0.18, 0.95, 1], [0, 0.6, 0.6, 0]);
  const linePct = useTransform(sp, [0, 1], [0, 100]);
  const lineHeight = useMotionTemplate`${linePct}%`;

  // Mobile hero-only lattice opacity (hooks must run unconditionally)
  const mobileOpacity = useTransform(sp, [0, 0.08, 0.12], [0.65, 0.5, 0]);

  if (!mounted || reduced) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ perspective: 1800 }}
      aria-hidden="true"
    >
      {/* Single persistent lattice */}
      <motion.div
        className="absolute inset-0"
        style={{
          x,
          y,
          scale,
          opacity,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
          display: isMobile ? "none" : undefined,
        }}
      >
        <NeuralLattice tint={tint} scale={1} glow={0.85} />
      </motion.div>

      {/* Scroll-progress hairline — page-instrument feel, top-right gutter */}
      {!isMobile && (
        <motion.div
          className="absolute top-32 right-10 w-px h-[40vh] bg-[var(--border)]"
          style={{ opacity: lineOpacity }}
        >
          <motion.div
            className="absolute top-0 left-0 w-px"
            style={{
              height: lineHeight,
              backgroundColor: "var(--accent)",
            }}
          />
        </motion.div>
      )}

      {/* Mobile-only: tiny ambient lattice in hero only */}
      {isMobile && (
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: mobileOpacity,
            scale: 0.7,
            transformStyle: "preserve-3d",
          }}
        >
          <NeuralLattice tint={tint} scale={0.65} glow={0.7} />
        </motion.div>
      )}
    </div>
  );
}
