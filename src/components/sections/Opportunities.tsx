"use client";

import type { InvestmentOpportunity } from "@/content/types";
import { OpportunityCard } from "@/components/ui/OpportunityCard";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Icon } from "@/components/ui/icons";

interface OpportunitiesProps {
  opportunities: InvestmentOpportunity[];
}

export function Opportunities({ opportunities }: OpportunitiesProps) {
  return (
    <section id="opportunities" aria-labelledby="opportunities-heading" className="min-w-0">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2
          id="opportunities-heading"
          className="relative font-display text-2xl font-semibold uppercase tracking-[0.08em] text-fg after:mt-3 after:block after:h-0.5 after:w-14 after:bg-gold sm:text-3xl"
        >
          Investment Opportunities
        </h2>
        <a
          href="#opportunities"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:text-gold-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
        >
          View All Opportunities
          <Icon
            name="arrow"
            width={16}
            height={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <SectionReveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity) => (
          <SectionReveal.Item key={opportunity.name} className="min-w-0">
            <OpportunityCard opportunity={opportunity} />
          </SectionReveal.Item>
        ))}
      </SectionReveal>
    </section>
  );
}
