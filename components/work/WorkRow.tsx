"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { Project } from "@/lib/types";
import { easeOutExpo } from "@/lib/motion";

const MotionLink = motion(Link);

interface Props {
  project: Project;
  index: number;
}

export default function WorkRow({ project, index }: Props): JSX.Element {
  const num = String(index + 1).padStart(2, "0");
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [3, -3]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-3, 3]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
      className="group relative"
    >
      <MotionLink
        ref={ref}
        href={`/work/${project.slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative block py-12 md:py-14 border-t border-[var(--border)] group-hover:border-[var(--accent)] transition-colors"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left: number + title + narrative + tags */}
          <div className="flex items-start gap-6 flex-1">
            <span className="t-label mt-2 w-8 shrink-0 tabular-nums">
              {num}
            </span>
            <div className="flex-1">
              <h3 className="t-headline group-hover:text-[var(--accent)] transition-colors duration-300 mb-3">
                {project.title}
              </h3>
              <p className="t-body max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
                {project.narrative}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {project.pillars.map((p) => (
                  <span
                    key={p}
                    className="t-mono uppercase tracking-[0.15em] px-2.5 py-1 border border-[var(--mono)]/40 text-[var(--mono)]"
                  >
                    {p}
                  </span>
                ))}
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="t-mono uppercase tracking-[0.15em] px-2.5 py-1 border border-[var(--border)] text-[var(--fg-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: metrics + year + arrow */}
          <div className="shrink-0 md:text-right md:min-w-[260px]">
            <div className="flex flex-col gap-1.5 mb-5">
              {project.metrics.map((m) => (
                <span key={m} className="t-mono">
                  {m}
                </span>
              ))}
            </div>
            <div className="flex items-center md:justify-end gap-3">
              <span className="t-caption tabular-nums">
                {project.year}
              </span>
              <span className="text-[var(--accent)] text-lg group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        </div>

        {/* Hover accent hairline at bottom edge */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
          style={{ backgroundColor: project.color }}
        />
      </MotionLink>
    </motion.div>
  );
}
