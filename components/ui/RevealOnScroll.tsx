"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
}: Props): JSX.Element {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
