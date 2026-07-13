"use client";

import Image from "next/image";
import type { AboutContent } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Icon } from "@/components/ui/icons";
import { brand } from "@/content/site";

interface AboutProps {
  content: AboutContent;
}

export function About({ content }: AboutProps) {
  return (
    <>
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative flex min-w-0 flex-col overflow-hidden rounded-card border border-line-soft bg-panel/50 p-7 lg:p-8"
      >
        {/* Decorative brand mark watermark */}
        <Image
          src={brand.mark}
          alt=""
          aria-hidden="true"
          width={Math.round(260 * brand.markRatio)}
          height={260}
          className="pointer-events-none absolute -right-8 top-6 h-52 w-auto opacity-20 lg:h-64"
        />
        <SectionReveal className="relative z-10 max-w-sm">
          <h2
            id="about-heading"
            className="relative font-display text-2xl font-semibold uppercase tracking-[0.08em] text-fg after:mt-3 after:block after:h-0.5 after:w-14 after:bg-gold sm:text-3xl"
          >
            {content.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">{content.body}</p>
          <div className="mt-7">
            <Button
              label={content.learnMoreCta.label}
              href={content.learnMoreCta.href}
              kind="secondary"
              icon={content.learnMoreCta.icon}
              disabledPlaceholder={content.learnMoreCta.placeholder}
            />
          </div>
        </SectionReveal>
      </section>

      {/* Contact call-to-action — spans the full band width below the columns. */}
      <div className="lg:col-span-2">
        <div className="flex flex-col items-start gap-6 rounded-card border border-line-soft bg-panel/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold"
            >
              <Icon name="mail" width={22} height={22} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg">
                {content.contactPrompt}
              </p>
              <a
                href={`mailto:${content.contactEmail}`}
                className="mt-1 inline-block text-sm text-muted transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                {content.contactEmail}
              </a>
            </div>
          </div>
          <Button
            label={content.contactCta.label}
            href={content.contactCta.href}
            kind="secondary"
            icon={content.contactCta.icon}
          />
        </div>
      </div>
    </>
  );
}
