"use client";

import Image from "next/image";
import type { HeroContent } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";

interface HeroProps {
  content: HeroContent;
}

function renderHeadlineLine(line: string, accent: string) {
  if (!line.includes(accent)) return line;
  const [before, after] = line.split(accent);
  return (
    <>
      {before}
      <span className="text-gold">{accent}</span>
      {after}
    </>
  );
}

export function Hero({ content }: HeroProps) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-20 lg:pt-20"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6 lg:px-8">
        {/* Left column: copy */}
        <SectionReveal className="relative z-10 max-w-2xl py-2 lg:py-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-gold sm:text-sm">
            {content.tagline}
          </p>
          <h1
            id="hero-heading"
            className="font-display font-semibold uppercase leading-[1.08] tracking-[0.01em] text-fg text-[clamp(2.75rem,5.2vw,4.5rem)] lg:leading-[1.05]"
          >
            {content.headlineLines.map((line, i) => (
              <span key={i} className="block lg:whitespace-nowrap">
                {renderHeadlineLine(line, content.headlineAccentWord)}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {content.description}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              label={content.primaryCta.label}
              href={content.primaryCta.href}
              kind="primary"
              icon={content.primaryCta.icon}
            />
            <Button
              label={content.secondaryCta.label}
              href={content.secondaryCta.href}
              kind="secondary"
              icon={content.secondaryCta.icon}
              disabledPlaceholder={content.secondaryCta.placeholder}
            />
          </div>
        </SectionReveal>

        {/* Right column: hero building */}
        <div className="relative lg:h-[460px]">
          <div className="relative aspect-[4/3] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="rounded-card object-cover object-left lg:rounded-none"
            />
            {/* Left-edge fade so the image blends into the dark layout. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/25 to-transparent lg:from-ink lg:via-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
