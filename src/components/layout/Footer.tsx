"use client";

import type { FooterContent } from "@/content/types";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/icons";

interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-line-soft">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-5 py-8 lg:flex-row lg:justify-between lg:px-8">
        <Logo markHeight={30} />

        <p className="order-3 text-center text-xs text-muted lg:order-none lg:text-left">
          {content.copyright}
        </p>

        <nav aria-label="Footer" className="order-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 lg:order-none">
          {content.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.placeholder ? (e) => e.preventDefault() : undefined}
              aria-disabled={link.placeholder || undefined}
              className="text-xs text-muted transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ul className="flex items-center gap-4">
          {content.socials.map((social) => (
            <li key={social.network}>
              <a
                href={social.href}
                onClick={social.placeholder ? (e) => e.preventDefault() : undefined}
                aria-disabled={social.placeholder || undefined}
                aria-label={social.ariaLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-gold/10 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              >
                <Icon name={social.network} width={18} height={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
