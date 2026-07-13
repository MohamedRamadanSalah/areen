"use client";

import Image from "next/image";
import { useState } from "react";
import type { InvestmentOpportunity } from "@/content/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Icon } from "@/components/ui/icons";

interface OpportunityCardProps {
  opportunity: InvestmentOpportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line-soft bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_60px_-30px_rgba(201,162,75,0.55)]">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-panel to-card">
        {!imgError ? (
          <Image
            src={opportunity.image}
            alt={opportunity.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-panel via-card to-ink"
          >
            <Icon name="building" width={40} height={40} className="text-gold/40" />
          </div>
        )}
        <div className="absolute left-3 top-3 z-10">
          <StatusBadge status={opportunity.status} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold uppercase tracking-[0.06em] text-fg">
          {opportunity.name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <Icon name="pin" width={15} height={15} className="shrink-0 text-gold" />
          {opportunity.location}
        </p>

        <hr className="my-4 border-line-soft" />

        <dl className="mt-auto space-y-2.5 text-sm">
          <div className="flex items-baseline justify-between">
            <dt className="text-muted">Expected ROI</dt>
            <dd className="font-display text-xl font-semibold text-gold">
              {opportunity.expectedRoi}
            </dd>
          </div>
          <div className="flex items-baseline justify-between">
            <dt className="text-muted">Investment Period</dt>
            <dd className="font-medium text-fg">{opportunity.investmentPeriod}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
