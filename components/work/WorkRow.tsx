"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { Project } from "@/lib/types";
import { easeOutExpo } from "@/lib/motion";
import ProjectGithubLink from "@/components/work/ProjectGithubLink";

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
  const rotateX = useSpring(useTransform(y, [-100, 100], [0.35, -0.35]), {
    stiffness: 180,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-0.35, 0.35]), {
    stiffness: 180,
    damping: 28,
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay: index * 0.07, ease: easeOutExpo }}
      className="group relative"
    >
      <MotionLink
        ref={ref}
        href={`/work/${project.slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="relative block py-11 md:py-12 border-t border-[var(--border)] group-hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex items-start gap-6 flex-1">
            <span className="t-label mt-2 w-8 shrink-0 tabular-nums">
              {num}
            </span>
            <div className="flex-1">
              <h3 className="t-headline group-hover:text-[var(--accent)] transition-colors duration-300 mb-2">
                {project.title}
              </h3>
              <p className="t-caption text-[var(--accent)] mb-3 max-w-xl">
                {project.heroMetric}
              </p>
              <p className="t-body max-w-xl">
                {project.narrative}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {project.pillars.map((p) => (
                  <span
                    key={p}
                    className="t-label px-2.5 py-1 border border-[var(--border)] text-[var(--accent)]"
                  >
                    {p}
                  </span>
                ))}
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="t-mono px-2.5 py-1 border border-[var(--border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 md:text-right md:min-w-[220px]">
            <div className="flex flex-col gap-1.5 mb-5">
              {project.metrics.slice(0, 3).map((m) => (
                <span key={m} className="t-caption">
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
      {project.github ? (
        <div className="pb-6 -mt-2 md:text-right">
          <ProjectGithubLink
            href={project.github}
            slug={project.slug}
            className="t-caption hover:text-[var(--accent)] transition-colors"
          >
            GitHub ↗
          </ProjectGithubLink>
        </div>
      ) : null}
    </motion.div>
  );
}
