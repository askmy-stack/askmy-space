"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { knowledgeGraph, type NodeKind } from "@/content/knowledge-graph";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Spatial mode's centerpiece: a force-directed canvas of pillars,
 * projects, and tags. Luminous pale-gold hubs, amber projects, dim tag
 * satellites; nodes drift ±2px on a slow cycle unless reduced motion is
 * set. Click navigates to /explore/[node].
 *
 * Canvas is pointer-only by design — the Node Index below the graph and
 * the server-rendered node pages are the keyboard and screen-reader path
 * over the same data.
 */

interface SimNode {
  id: string;
  label: string;
  kind: NodeKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
}

const RADII: Record<NodeKind, number> = { pillar: 16, project: 9, tag: 3.5 };

function rgb(hex: string, fallback: string): string {
  const h = hex.trim().replace("#", "");
  if (h.length < 6) return fallback;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",");
}

export default function SpatialGraph(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const { nodes: rawNodes, edges: rawEdges } = knowledgeGraph;
    const index = new Map(rawNodes.map((n, i) => [n.id, i]));
    const nodes: SimNode[] = rawNodes.map((n, i) => {
      const angle = (i / rawNodes.length) * Math.PI * 2;
      const spread = n.kind === "pillar" ? 30 : n.kind === "project" ? 90 : 150;
      return {
        id: n.id,
        label: n.label,
        kind: n.kind,
        x: Math.cos(angle) * spread,
        y: Math.sin(angle) * spread,
        vx: 0,
        vy: 0,
        r: RADII[n.kind],
        phase: (i * 137.5) % (Math.PI * 2),
      };
    });
    const edges = rawEdges
      .map((e) => ({
        a: index.get(e.source) ?? -1,
        b: index.get(e.target) ?? -1,
        w: e.strength,
      }))
      .filter((e) => e.a >= 0 && e.b >= 0);

    let accent = "244,217,168";
    let accent2 = "201,168,119";
    let muted = "139,115,85";
    const readTokens = () => {
      const styles = getComputedStyle(document.documentElement);
      accent = rgb(styles.getPropertyValue("--color-spatial-accent-1"), accent);
      accent2 = rgb(styles.getPropertyValue("--color-spatial-accent-2"), accent2);
      muted = rgb(
        styles.getPropertyValue("--color-spatial-text-secondary"),
        muted,
      );
    };
    readTokens();

    const state = { settle: 220, hover: -1, raf: 0, t: 0 };

    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };
    resize();

    const step = () => {
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        const rest = a.kind === "pillar" || b.kind === "pillar" ? 110 : 60;
        const f = (d - rest) * 0.004 * Math.min(e.w, 3);
        a.vx += (dx / d) * f;
        a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f;
        b.vy -= (dy / d) * f;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          let d2 = dx * dx + dy * dy;
          if (d2 > 22500) continue;
          d2 = Math.max(d2, 64);
          // Pillars share no edges, so only repulsion keeps the three
          // hubs apart — give large-node pairs real personal space.
          const boost = a.kind === "pillar" && b.kind === "pillar" ? 14 : 1;
          const f = (620 * boost) / d2;
          const d = Math.sqrt(d2);
          a.vx -= (dx / d) * f;
          a.vy -= (dy / d) * f;
          b.vx += (dx / d) * f;
          b.vy += (dy / d) * f;
        }
      }
      for (const n of nodes) {
        n.vx += -n.x * 0.0018;
        n.vy += -n.y * 0.0018;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
      }
    };

    const drift = (n: SimNode): [number, number] => {
      if (reduced) return [n.x, n.y];
      // ±2px float on a ~3.5s cycle, phase-offset per node.
      const t = state.t / 60;
      return [
        n.x + Math.sin(t * 1.8 + n.phase) * 2,
        n.y + Math.cos(t * 1.5 + n.phase) * 2,
      ];
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.translate(W / 2, H / 2);

      const hotSet = new Set<number>();
      if (state.hover >= 0) {
        hotSet.add(state.hover);
        for (const e of edges) {
          if (e.a === state.hover) hotSet.add(e.b);
          if (e.b === state.hover) hotSet.add(e.a);
        }
      }

      for (const e of edges) {
        const [ax, ay] = drift(nodes[e.a]);
        const [bx, by] = drift(nodes[e.b]);
        const hot =
          state.hover >= 0 && (e.a === state.hover || e.b === state.hover);
        ctx.strokeStyle = hot
          ? `rgba(${accent},0.9)`
          : `rgba(${muted},${e.w > 1 ? 0.35 : 0.16})`;
        ctx.lineWidth = hot ? 1.4 : e.w > 1 ? 0.9 : 0.5;
        ctx.globalAlpha = state.hover >= 0 && !hot ? 0.15 : 1;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const [x, y] = drift(n);
        const dim = state.hover >= 0 && !hotSet.has(i);
        ctx.globalAlpha = dim ? 0.25 : 1;

        if (n.kind !== "tag") {
          ctx.shadowColor = `rgba(${n.kind === "pillar" ? accent : accent2},0.9)`;
          ctx.shadowBlur = i === state.hover ? 28 : n.kind === "pillar" ? 18 : 8;
        }
        ctx.fillStyle =
          n.kind === "pillar"
            ? `rgba(${accent},0.95)`
            : n.kind === "project"
              ? `rgba(${accent2},0.95)`
              : `rgba(${muted},0.8)`;
        ctx.beginPath();
        ctx.arc(x, y, n.r + (i === state.hover ? 2 : 0), 0, 7);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (n.kind === "pillar" || n.kind === "project" || i === state.hover) {
          ctx.fillStyle =
            n.kind === "pillar" ? `rgba(${accent},1)` : `rgba(${accent2},1)`;
          ctx.font = `${n.kind === "pillar" ? 12 : 10}px ui-monospace, monospace`;
          ctx.textAlign = "center";
          const label =
            n.label.length > 26 ? `${n.label.slice(0, 25)}…` : n.label;
          ctx.fillText(label, x, y + n.r + 14);
        }
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const loop = () => {
      state.t++;
      if (state.settle > 0) {
        step();
        state.settle--;
      }
      draw();
      if (reduced && state.settle <= 0) return; // static frame once settled
      state.raf = requestAnimationFrame(loop);
    };

    const pick = (clientX: number, clientY: number): number => {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left - W / 2;
      const py = clientY - rect.top - H / 2;
      let best = -1;
      let bd = 400;
      nodes.forEach((n, i) => {
        const d = (n.x - px) ** 2 + (n.y - py) ** 2;
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };

    const move = (e: PointerEvent) => {
      const i = pick(e.clientX, e.clientY);
      if (i !== state.hover) {
        state.hover = i;
        canvas.style.cursor = i >= 0 ? "pointer" : "default";
        if (reduced) draw();
      }
    };
    const leave = () => {
      state.hover = -1;
      canvas.style.cursor = "default";
      if (reduced) draw();
    };
    const click = (e: PointerEvent) => {
      const i = pick(e.clientX, e.clientY);
      if (i >= 0) router.push(`/explore/${nodes[i].id}`);
    };

    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("pointerup", click);
    window.addEventListener("resize", resize);
    state.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(state.raf);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointerup", click);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, router]);

  return (
    <div
      ref={wrapRef}
      className="relative h-[520px] w-full overflow-hidden rounded-lg border border-[var(--color-spatial-border)]/30 bg-[var(--color-spatial-layer-1)]"
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Knowledge graph: three pillars connected to project and topic nodes. Use the node index below for a keyboard-accessible view of the same data."
      />
      <p className="t-mono pointer-events-none absolute bottom-3 left-4 text-[var(--color-spatial-text-secondary)]">
        hover to trace · click to enter a node
      </p>
    </div>
  );
}
