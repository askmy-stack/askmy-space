"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION } from "@/lib/constants";

interface FeaturedEssayProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author?: string;
}

export default function FeaturedEssay({
  title,
  excerpt,
  date,
  slug,
  author = "Abhinaysai Kamineni",
}: FeaturedEssayProps): JSX.Element {
  const reduced = useReducedMotion();

  const truncatedExcerpt =
    excerpt.length > 150 ? excerpt.substring(0, 150) + "..." : excerpt;

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.timing.editorial.pageTransition / 1000,
        ease: easeOutExpo,
      },
    },
  };

  if (reduced) {
    return (
      <article className="bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-6 sm:p-8 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="t-display-md text-[var(--color-editorial-text)]">
              {title}
            </h3>
            <div className="flex items-center gap-4 t-caption text-[var(--color-editorial-text-secondary)]">
              <span>{author}</span>
              <span className="t-mono">
                {date}
              </span>
            </div>
          </div>
          <p className="t-body text-[var(--color-editorial-text)] mb-6">
            {truncatedExcerpt}
          </p>
          <Link
            href={`/discover/${slug}`}
            className="inline-flex items-center gap-2 text-[var(--color-editorial-accent-1)] font-semibold hover:text-[var(--color-editorial-accent-2)] transition-colors duration-200"
          >
            Read →
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
          <motion.h3
            className="t-display-md text-[var(--color-editorial-text)]"
          >
            {title}
          </motion.h3>
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 t-caption text-[var(--color-editorial-text-secondary)]"
          >
            <span>{author}</span>
            <span className="t-mono hidden sm:inline">
              ·
            </span>
            <span className="t-mono">
              {date}
            </span>
          </motion.div>
        </div>
        <motion.p
          className="t-body text-[var(--color-editorial-text)] mb-6"
        >
          {truncatedExcerpt}
        </motion.p>
        <motion.div>
          <Link
            href={`/discover/${slug}`}
            className="inline-flex items-center gap-2 text-[var(--color-editorial-accent-1)] font-semibold hover:text-[var(--color-editorial-accent-2)] transition-colors duration-200"
          >
            Read →
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
