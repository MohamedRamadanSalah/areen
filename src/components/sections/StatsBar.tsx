"use client";

import type { Statistic } from "@/content/types";
import { StatItem } from "@/components/ui/StatItem";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface StatsBarProps {
  stats: Statistic[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section id="stats" aria-label="Key company statistics" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <div className="rounded-card border border-line bg-panel/70 px-6 py-8 sm:px-10">
          <SectionReveal
            stagger
            className="grid grid-cols-1 gap-8 divide-y divide-line-soft sm:grid-cols-2 sm:gap-y-8 sm:divide-y-0 lg:grid-cols-5 lg:divide-x"
          >
            {stats.map((stat) => (
              <SectionReveal.Item
                key={stat.label}
                className="pt-6 first:pt-0 sm:pt-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <StatItem stat={stat} />
              </SectionReveal.Item>
            ))}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
