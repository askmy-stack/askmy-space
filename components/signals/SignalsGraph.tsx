"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { intelAge, type IntelItem } from "@/lib/intel";

/**
 * Signal Graph — an Obsidian-style knowledge graph over the intel feed.
 * Nodes are signals; edges connect items that share a tag (or, failing
 * that, a category, so nothing floats unconnected). Click a node to open
 * its brief and jump straight to the source.
 *
 * Deliberately monochrome (per Signal Black's one-accent rule): node size
 * encodes score, the accent is reserved for the selected node and its
 * live connections. Canvas interaction is mouse/touch only — the Feed
 * view above remains the fully keyboard- and screen-reader-accessible
 * path over the same data.
 */

interface Props {
  items: IntelItem[];
}

interface GNode {
  item: IntelItem;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface GEdge {
  a: number;
  b: number;
  w: number;
  label: string;
}

const MAX_EDGES_PER_NODE = 6;

function buildEdges(items: IntelItem[]): GEdge[] {
  const shared: GEdge[] = [];
  const byCategory: GEdge[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const tagsA = items[i].tags;
      const tagsB = new Set(items[j].tags);
      const common = tagsA.filter((t) => tagsB.has(t));
      if (common.length > 0) {
        shared.push({ a: i, b: j, w: common.length, label: common.slice(0, 2).join(", ") });
      } else if (items[i].category === items[j].category) {
        byCategory.push({ a: i, b: j, w: 0.4, label: items[i].category });
      }
    }
  }

  const degree = new Array(items.length).fill(0);
  const kept: GEdge[] = [];
  const byNode: GEdge[][] = items.map(() => []);
  for (const e of shared.sort((a, b) => b.w - a.w)) {
    byNode[e.a].push(e);
    byNode[e.b].push(e);
  }
  const seen = new Set<string>();
  for (let i = 0; i < items.length; i++) {
    const top = byNode[i].sort((a, b) => b.w - a.w).slice(0, MAX_EDGES_PER_NODE);
    for (const e of top) {
      const key = `${e.a}-${e.b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      kept.push(e);
      degree[e.a]++;
      degree[e.b]++;
    }
  }
  // Category fallback only for nodes the tag pass left isolated.
  for (const e of byCategory) {
    if (degree[e.a] === 0 || degree[e.b] === 0) {
      kept.push(e);
      degree[e.a]++;
      degree[e.b]++;
    }
  }
  return kept;
}

function rgb(hex: string, fallback: string): string {
  const h = hex.trim().replace("#", "");
  if (h.length < 6) return fallback;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",");
}

export default function SignalsGraph({ items }: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<GNode | null>(null);
  const [related, setRelated] = useState<{ item: IntelItem; label: string }[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    setSelected(null);
    setRelated([]);
  }, [items]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx || items.length === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const edges = buildEdges(items);
    const nodes: GNode[] = items.map((item, i) => {
      const a = (i / items.length) * Math.PI * 2;
      return {
        item,
        x: Math.cos(a) * 40,
        y: Math.sin(a) * 40,
        vx: 0,
        vy: 0,
        r: 3 + Math.min(7, (item.score / 10) * 6),
      };
    });

    let fg = "245,241,234";
    let fgMuted = "138,134,128";
    let accent = "255,107,53";
    const readTokens = () => {
      const styles = getComputedStyle(document.documentElement);
      fg = rgb(styles.getPropertyValue("--fg"), fg);
      fgMuted = rgb(styles.getPropertyValue("--fg-muted"), fgMuted);
      accent = rgb(styles.getPropertyValue("--accent"), accent);
    };

    const state = {
      tx: 0,
      ty: 0,
      scale: 1,
      sel: -1,
      settle: 140,
      drag: null as GNode | null,
      raf: 0,
    };

    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      state.tx = W / 2;
      state.ty = H / 2;
    };

    function step(): void {
      const k = 0.9;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        const f = (d - 70) * 0.004 * Math.min(e.w, 3) * k;
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
          if (d2 > 14400) continue;
          d2 = Math.max(d2, 36);
          const f = (420 / d2) * k;
          const d = Math.sqrt(d2);
          a.vx -= (dx / d) * f;
          a.vy -= (dy / d) * f;
          b.vx += (dx / d) * f;
          b.vy += (dy / d) * f;
        }
      }
      for (const n of nodes) {
        if (state.drag === n) continue;
        n.vx += -n.x * 0.0015;
        n.vy += -n.y * 0.0015;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
      }
    }

    const draw = (): void => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.translate(state.tx, state.ty);
      ctx.scale(state.scale, state.scale);

      const selSet = new Set<number>();
      if (state.sel >= 0) {
        selSet.add(state.sel);
        edges.forEach((e) => {
          if (e.a === state.sel) selSet.add(e.b);
          if (e.b === state.sel) selSet.add(e.a);
        });
      }

      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const hot = state.sel >= 0 && (e.a === state.sel || e.b === state.sel);
        ctx.strokeStyle = hot ? `rgba(${accent},0.85)` : `rgba(${fgMuted},0.22)`;
        ctx.lineWidth = hot ? 1.4 : 0.6;
        ctx.globalAlpha = state.sel >= 0 && !hot ? 0.12 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dim = state.sel >= 0 && !selSet.has(i);
        ctx.globalAlpha = dim ? 0.25 : 1;
        ctx.fillStyle = i === state.sel ? `rgba(${accent},1)` : `rgba(${fg},0.55)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 7);
        ctx.fill();
        if (i === state.sel) {
          ctx.strokeStyle = `rgba(${accent},1)`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (selSet.has(i) && state.scale > 0.5) {
          ctx.fillStyle = `rgba(${fgMuted},0.9)`;
          ctx.font = "10px var(--font-mono, monospace)";
          ctx.fillText(n.item.title.slice(0, 30), n.x + n.r + 4, n.y + 3);
        }
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const loop = (): void => {
      if (state.settle > 0) {
        step();
        state.settle--;
      }
      draw();
      state.raf = requestAnimationFrame(loop);
    };

    const pick = (x: number, y: number): number => {
      const px = (x - state.tx) / state.scale;
      const py = (y - state.ty) / state.scale;
      let best = -1;
      let bd = 200;
      nodes.forEach((n, i) => {
        const d = (n.x - px) ** 2 + (n.y - py) ** 2;
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };

    const selectNode = (i: number): void => {
      state.sel = i;
      state.settle = Math.max(state.settle, 24);
      if (i < 0) {
        setSelected(null);
        setRelated([]);
        return;
      }
      setSelected(nodes[i]);
      const rel = edges
        .filter((e) => e.a === i || e.b === i)
        .slice(0, 8)
        .map((e) => ({ item: nodes[e.a === i ? e.b : e.a].item, label: e.label }));
      setRelated(rel);
    };

    let lx = 0;
    let ly = 0;
    let moved = false;
    const down = (e: PointerEvent): void => {
      const r = canvas.getBoundingClientRect();
      lx = e.clientX;
      ly = e.clientY;
      moved = false;
      const i = pick(e.clientX - r.left, e.clientY - r.top);
      if (i >= 0) state.drag = nodes[i];
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent): void => {
      if (!e.buttons) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
      if (state.drag) {
        state.drag.x += dx / state.scale;
        state.drag.y += dy / state.scale;
        state.settle = Math.max(state.settle, 20);
      } else {
        state.tx += dx;
        state.ty += dy;
      }
    };
    const up = (e: PointerEvent): void => {
      const r = canvas.getBoundingClientRect();
      if (!moved) selectNode(pick(e.clientX - r.left, e.clientY - r.top));
      state.drag = null;
    };
    const wheel = (e: WheelEvent): void => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const s = Math.exp(-e.deltaY * 0.0015);
      const ns = Math.min(3, Math.max(0.4, state.scale * s));
      state.tx = mx - (mx - state.tx) * (ns / state.scale);
      state.ty = my - (my - state.ty) * (ns / state.scale);
      state.scale = ns;
    };

    const themeObserver = new MutationObserver(readTokens);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    readTokens();
    resize();
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("resize", resize);

    if (reduced) {
      // Settle the layout once, then draw a single still frame.
      for (let i = 0; i < 220; i++) step();
      draw();
    } else {
      raf_start();
    }
    function raf_start(): void {
      state.raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(state.raf);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("wheel", wheel);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, [items, reduced]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border)] p-10 text-center">
        <p className="t-body" style={{ color: "var(--fg-muted)" }}>
          Nothing to map yet — the pipeline publishes after its next run.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
      <div
        ref={wrapRef}
        className="relative h-[480px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]"
      >
        <canvas
          ref={canvasRef}
          aria-label="Signal knowledge graph — nodes are signals, edges are shared topics. Drag to pan, scroll to zoom, click a node to open it. Use the Feed view for a keyboard-accessible list of the same data."
          className="h-full w-full cursor-grab active:cursor-grabbing"
        />
        <p className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
          drag to pan · scroll to zoom · click a node
        </p>
      </div>

      <div
        className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5"
        aria-live="polite"
      >
        {selected ? (
          <>
            <div className="flex items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              <span>{selected.item.category}</span>
              <span>{intelAge(selected.item.published)}</span>
            </div>
            <h3 className="text-[15px] font-semibold leading-snug text-[var(--fg)]">
              {selected.item.title}
            </h3>
            {selected.item.summary && (
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                {selected.item.summary}
              </p>
            )}
            <div className="flex items-center justify-between pt-1">
              <a
                href={selected.item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--fg)]"
              >
                Read on {new URL(selected.item.url).hostname.replace(/^www\./, "")} ↗
              </a>
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--accent)]">
                score {selected.item.score.toFixed(1)}
              </span>
            </div>
            {related.length > 0 && (
              <div className="mt-2 border-t border-[var(--border)] pt-3">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                  Connected
                </p>
                <div className="flex flex-col gap-1.5">
                  {related.map((r, i) => (
                    <a
                      key={i}
                      href={r.item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-[var(--accent-soft)]"
                    >
                      <span className="truncate text-[var(--fg)] group-hover:text-[var(--accent)]">
                        {r.item.title.length > 42 ? `${r.item.title.slice(0, 41)}…` : r.item.title}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] text-[var(--fg-muted)]">
                        {r.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <h3 className="t-body font-semibold text-[var(--fg)]">Knowledge graph</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Every dot is a signal the pipeline kept. Lines connect items that share a topic.
              Click any node to read its brief and jump to the source.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
