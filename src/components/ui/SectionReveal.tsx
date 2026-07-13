"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** When true, children wrapped in <SectionReveal.Item> animate in sequence. */
  stagger?: boolean;
  as?: "div" | "section" | "ul" | "li";
}

/**
 * Framer Motion scroll-reveal wrapper. Animates opacity/translate on whileInView.
 * Under prefers-reduced-motion, the `[data-reveal]` CSS override in globals.css
 * forces the element to its final state with no visible animation (FR-022 / SC-007).
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  stagger = false,
  as = "div",
}: SectionRevealProps) {
  const MotionTag = motion[as];
  const variants = stagger ? staggerContainer : fadeUp;

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </MotionTag>
  );
}

interface ItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}

/** A single staggered child. Forced visible under reduced motion via CSS. */
function Item({ children, className, as = "div" }: ItemProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag data-reveal className={className} variants={staggerItem}>
      {children}
    </MotionTag>
  );
}

SectionReveal.Item = Item;
