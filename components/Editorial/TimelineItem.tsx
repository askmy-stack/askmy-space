"use client";

import { motion } from "framer-motion";
import type { Role } from "@/lib/types";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION } from "@/lib/constants";

interface TimelineItemProps {
  item: Role;
  isLast: boolean;
  index: number;
}

export default function TimelineItem({
  item,
  isLast,
  index,
}: TimelineItemProps): JSX.Element {
  const reduced = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.timing.editorial.pageTransition / 1000,
        ease: easeOutExpo,
        delay: (index * MOTION.timing.editorial.stagger) / 1000,
      },
    },
  };

  const content = (
    <div className="space-y-2">
      {/* Title/Role */}
      <h3 className="t-display-md font-display text-[var(--color-editorial-text)]">
        {item.title}
      </h3>

      {/* Company */}
      {item.company && (
        <p className="t-body text-[var(--color-editorial-text)]">
          {item.company}
        </p>
      )}

      {/* Duration */}
      <p className="t-mono text-[var(--color-editorial-text-secondary)]">
        {item.duration}, {item.timezone}
      </p>

      {/* Description */}
      <p className="t-body text-[var(--color-editorial-text-secondary)] max-w-prose">
        {item.description}
      </p>
    </div>
  );

  if (reduced) {
    return (
      <div className="relative flex gap-6">
        {/* Left side with dot */}
        <div className="flex flex-col items-center">
          {/* Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-editorial-accent-1)] flex-shrink-0 mt-2" />
          {/* Vertical line */}
          {!isLast && (
            <div className="w-0.5 bg-[var(--color-editorial-border)] flex-grow" style={{ minHeight: "4rem" }} />
          )}
        </div>

        {/* Content */}
        <div className="pb-8 flex-1">{content}</div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative flex gap-6"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Left side with dot */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-editorial-accent-1)] flex-shrink-0 mt-2" />
        {/* Vertical line */}
        {!isLast && (
          <div className="w-0.5 bg-[var(--color-editorial-border)] flex-grow" style={{ minHeight: "4rem" }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 flex-1">{content}</div>
    </motion.div>
  );
}
