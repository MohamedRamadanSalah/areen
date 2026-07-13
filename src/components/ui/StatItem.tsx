"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import type { Statistic } from "@/content/types";
import { Icon } from "@/components/ui/icons";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface StatItemProps {
  stat: Statistic;
}

function format(current: number, stat: Statistic): string {
  const isDecimal = stat.countUpTo != null && !Number.isInteger(stat.countUpTo);
  const num = isDecimal
    ? current.toFixed(1)
    : Math.round(current).toLocaleString("en-US");
  return `${stat.prefix ?? ""}${num}${stat.suffix ?? ""}`;
}

export function StatItem({ stat }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  // Initialise to the exact final value so SSR and reduced-motion render it
  // immediately, and so it is always present for assertions.
  const [display, setDisplay] = useState(stat.value);

  useEffect(() => {
    if (!inView || prefersReducedMotion() || stat.countUpTo == null) {
      setDisplay(stat.value);
      return;
    }
    const target = stat.countUpTo;
    const duration = 1400;
    let raf = 0;
    let startTs = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (t < 1) {
        setDisplay(format(target * eased, stat));
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(stat.value); // settle to the exact reference string
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat]);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <Icon
        name={stat.icon}
        width={38}
        height={38}
        strokeWidth={1.3}
        className="shrink-0 text-gold"
      />
      <div className="flex flex-col">
        <span
          className="font-display text-3xl font-semibold leading-none text-fg tabular-nums sm:text-[2rem]"
          aria-label={stat.value}
        >
          {display}
        </span>
        <span className="mt-1.5 text-[0.66rem] font-medium uppercase leading-tight tracking-[0.1em] text-muted">
          {stat.label}
        </span>
      </div>
    </div>
  );
}
