import type { Variants } from "motion/react";

// Shared Framer Motion variants. All entrance motion is gated on
// useReducedMotion() at the call site (see SectionReveal) so that reduced-motion
// visitors get the final state with no transition (FR-022 / SC-007).

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
};

// Parent container that staggers its children's entrance.
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// Shared viewport config so reveals trigger once, slightly before fully in view.
export const viewportOnce = { once: true, amount: 0.2 } as const;
