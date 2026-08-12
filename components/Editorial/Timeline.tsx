"use client";

import { motion } from "framer-motion";
import TimelineItem from "./TimelineItem";
import { career } from "@/content/career";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION } from "@/lib/constants";

export default function Timeline(): JSX.Element {
  const reduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: MOTION.timing.editorial.stagger / 1000,
        delayChildren: 0,
      },
    },
  };

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
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 space-y-2">
            <h2 className="text-[var(--type-display-lg-size)] font-[var(--type-display-lg-weight)] text-[var(--color-editorial-text)]">
              Professional Journey
            </h2>
            <p className="text-[var(--type-body-size)] text-[var(--color-editorial-text-secondary)]">
              Experience and roles that shaped my expertise
            </p>
          </div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {career.map((item, index) => (
              <TimelineItem
                key={`${item.title}-${item.duration}`}
                item={item}
                index={index}
                isLast={index === career.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="mb-12 space-y-2" variants={itemVariants}>
          <h2 className="text-[var(--type-display-lg-size)] font-[var(--type-display-lg-weight)] text-[var(--color-editorial-text)]">
            Professional Journey
          </h2>
          <p className="text-[var(--type-body-size)] text-[var(--color-editorial-text-secondary)]">
            Experience and roles that shaped my expertise
          </p>
        </motion.div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {career.map((item, index) => (
            <TimelineItem
              key={`${item.title}-${item.duration}`}
              item={item}
              index={index}
              isLast={index === career.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
