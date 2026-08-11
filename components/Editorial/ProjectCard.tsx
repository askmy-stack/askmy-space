"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({
  project,
  index = 0,
}: ProjectCardProps): JSX.Element {
  const reduced = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.timing.editorial.pageTransition / 1000,
        ease: easeOutExpo,
        delay: (index * MOTION.timing.editorial.reveal) / 1000,
      },
    },
  };

  const animationProps = reduced
    ? {}
    : {
        variants: itemVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <motion.article
      {...animationProps}
      className="flex flex-col bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 ease-[var(--motion-easing-standard)]"
    >
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-[var(--type-mono-size)] font-[var(--type-mono-weight)] text-[var(--color-editorial-text-secondary)]">
          {project.category}
        </p>
        <h3 className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] text-[var(--color-editorial-text)]">
          {project.title}
        </h3>
        <p className="text-[var(--type-body-size)] text-[var(--color-editorial-text)] leading-[var(--type-body-line-height)] line-clamp-3">
          {project.narrative}
        </p>
        <p className="mt-auto pt-3 border-t border-[var(--color-editorial-border)] text-[var(--type-mono-size)] font-[var(--type-mono-weight)] text-[var(--color-editorial-text)]">
          {project.heroMetric}
        </p>
        <Link
          href={`/discover/${project.slug}`}
          className="inline-flex items-center gap-2 self-start text-[var(--color-editorial-accent-1)] font-semibold hover:text-[var(--color-editorial-accent-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
        >
          Read case study →
        </Link>
      </div>
    </motion.article>
  );
}
