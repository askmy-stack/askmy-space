"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  children: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  stagger?: number;
  delay?: number;
}

/**
 * Editorial-style heading that reveals word-by-word on mount.
 * Uses Framer Motion instead of SplitType for SSR-safety + smaller bundle.
 * (Character-level SplitType reveals are deferred to CP2.)
 */
export default function AnimatedHeading({
  children,
  as: Tag = "h2",
  className,
  stagger = 0.08,
  delay = 0,
}: Props): JSX.Element {
  const reduced = useReducedMotion();
  const words = children.split(" ");

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      className={cn("overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pb-[0.15em] mb-[-0.15em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.75, ease: easeOutExpo },
              },
            }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
