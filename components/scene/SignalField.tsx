"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Signal Field — the brand background from the Signal Black prototype:
 * drifting knowledge-graph nodes, hairline edges, an occasional accent
 * pulse traveling between them. Renders the platform's actual
 * architecture (items connecting into a graph) at ~4% opacity.
 *
 * Perf/a11y: DPR capped at 2, node count scales with viewport, pauses on
 * hidden tabs, draws a single still frame under prefers-reduced-motion,
 * re-tints from CSS tokens on theme change.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Pulse {
  a: Node;
  b: Node;
  t: number;
}

const LINK = 130;
const PULSE_EVERY_MS = 2200;

function rgb(hex: string): string {
  const h = hex.trim().replace("#", "");
  if (h.length < 6) return "255,107,53";
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",");
}

export default function SignalField(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    let raf = 0;
    let lastPulse = 0;
    let fg = "255,255,255";
    let accent = "255,107,53";

    const readTokens = () => {
      const styles = getComputedStyle(document.documentElement);
      const light = document.documentElement.classList.contains("light");
      fg = light ? "20,20,20" : "255,255,255";
      accent = rgb(styles.getPropertyValue("--accent") || "#FF6B35");
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(50, Math.max(16, Math.floor((W * H) / 28000)));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.1 + 0.7,
      }));
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of nodes) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = (1 - Math.sqrt(d2) / LINK) * 0.05;
            ctx.strokeStyle = `rgba(${fg},${o.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of nodes) {
        ctx.fillStyle = `rgba(${fg},0.11)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fill();
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pl = pulses[i];
        pl.t += 0.016;
        if (pl.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const x = pl.a.x + (pl.b.x - pl.a.x) * pl.t;
        const y = pl.a.y + (pl.b.y - pl.a.y) * pl.t;
        const f = Math.sin(pl.t * Math.PI);
        ctx.fillStyle = `rgba(${accent},${(f * 0.8).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 7);
        ctx.fill();
      }
      if (ts - lastPulse > PULSE_EVERY_MS && !document.hidden) {
        lastPulse = ts;
        for (let tries = 0; tries < 30; tries++) {
          const a = nodes[Math.floor(Math.random() * nodes.length)];
          const b = nodes[Math.floor(Math.random() * nodes.length)];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (a !== b && dx * dx + dy * dy < LINK * LINK) {
            pulses.push({ a, b, t: 0 });
            break;
          }
        }
      }
    };

    const loop = (ts: number) => {
      draw(ts);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    };

    const themeObserver = new MutationObserver(readTokens);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    readTokens();
    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
