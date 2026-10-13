import type { Transition, Variants } from "framer-motion";

/** Shared ease from the Signal Black system (matches reference cubic-bezier). */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export const riseInTransition = (delay = 0): Transition => ({
  duration: 0.95,
  delay,
  ease: easeOutExpo,
});

export const revealTransition = (delay = 0): Transition => ({
  duration: 0.85,
  delay,
  ease: easeOutExpo,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/** Scroll reveal: soft rise like the motion reference, tuned for our type scale. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutQuart },
  },
};

export const stagger = (staggerChildren = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerChildren, delayChildren: delay },
  },
});

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const viewportOnce = { once: true, margin: "-80px 0px" as const };
