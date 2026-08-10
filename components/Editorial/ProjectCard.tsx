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

  if (reduced) {
    return (
      <article className="bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-6 sm:p-8 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] text-[var(--color-editorial-text)]">
              {project.title}
            </h3>
          </div>
          <p className="text-[var(--type-body-size)] text-[var(--color-editorial-text)] leading-[var(--type-body-line-height)] line-clamp-2">
            {project.excerpt}
          </p>
          {project.systems.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[var(--color-editorial-border)]">
              <p className="text-[var(--type-caption-size)] text-[var(--color-editorial-text-secondary)] font-semibold">
                Systems
              </p>
              <p className="text-[var(--type-mono-size)] font-[var(--type-mono-weight)] text-[var(--color-editorial-text)] break-words">
                {project.systems.join(", ")}
              </p>
            </div>
          )}
          <Link
            href={`/discover/${project.slug}`}
            className="inline-flex items-center gap-2 text-[var(--color-editorial-accent-1)] font-semibold hover:text-[var(--color-editorial-accent-2)] transition-colors duration-200"
          >
            Read case study →
          </Link>
        </div>
      </article>
    );
  }

  return (
    <motion.article
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 ease-[var(--motion-easing-standard)]"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <motion.h3 className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] text-[var(--color-editorial-text)]">
            {project.title}
          </motion.h3>
        </div>
        <motion.p className="text-[var(--type-body-size)] text-[var(--color-editorial-text)] leading-[var(--type-body-line-height)] line-clamp-2">
          {project.excerpt}
        </motion.p>
        {project.systems.length > 0 && (
          <motion.div className="space-y-2 pt-2 border-t border-[var(--color-editorial-border)]">
            <p className="text-[var(--type-caption-size)] text-[var(--color-editorial-text-secondary)] font-semibold">
              Systems
            </p>
            <p className="text-[var(--type-mono-size)] font-[var(--type-mono-weight)] text-[var(--color-editorial-text)] break-words">
              {project.systems.join(", ")}
            </p>
          </motion.div>
        )}
        <motion.div>
          <Link
            href={`/discover/${project.slug}`}
            className="inline-flex items-center gap-2 text-[var(--color-editorial-accent-1)] font-semibold hover:text-[var(--color-editorial-accent-2)] transition-colors duration-200"
          >
            Read case study →
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
