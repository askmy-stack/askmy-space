"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION } from "@/lib/constants";

export default function EditorialHero(): JSX.Element {
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
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-[var(--type-display-xl-size)] font-[var(--type-display-xl-weight)] leading-[var(--type-display-xl-line-height)] text-[var(--color-editorial-text)] mb-6">
            ASK.
          </h1>
          <p className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] text-[var(--color-editorial-text-secondary)] mb-10">
            AI Engineering Portfolio & Research Archive
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/explore">
              <Button variant="primary" direction="editorial">
                Explore →
              </Button>
            </Link>
            <Link href="/signals">
              <Button variant="secondary" direction="editorial">
                View Signals
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-[var(--type-display-xl-size)] font-[var(--type-display-xl-weight)] leading-[var(--type-display-xl-line-height)] text-[var(--color-editorial-text)] mb-6"
        >
          ASK.
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] text-[var(--color-editorial-text-secondary)] mb-10 max-w-2xl"
        >
          AI Engineering Portfolio & Research Archive
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 items-start"
        >
          <Link href="/explore">
            <Button variant="primary" direction="editorial">
              Explore →
            </Button>
          </Link>
          <Link href="/signals">
            <Button variant="secondary" direction="editorial">
              View Signals
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
