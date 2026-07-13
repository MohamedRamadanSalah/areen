"use client";

import { useState, type MouseEvent } from "react";
import type { NavItem } from "@/content/types";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/icons";

interface NavbarProps {
  items: NavItem[];
}

export function Navbar({ items }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleItemClick = (item: NavItem) => (e: MouseEvent) => {
    if (item.placeholder) {
      e.preventDefault();
    }
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-soft bg-ink/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-4 px-5 lg:px-8"
      >
        <Logo markHeight={40} />

        {/* Desktop menu */}
        <ul className="hidden items-center gap-x-6 xl:flex">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={handleItemClick(item)}
                aria-current={item.isActive ? "page" : undefined}
                aria-disabled={item.placeholder || undefined}
                className={`relative py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                  item.isActive
                    ? "text-gold after:w-full"
                    : "text-fg/80 hover:text-gold after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Select language, current language English"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
            className="hidden items-center gap-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-fg/80 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright sm:flex"
          >
            <Icon name="globe" width={16} height={16} />
            <span>EN</span>
            <Icon name="chevron" width={14} height={14} />
          </button>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-btn border border-line text-fg transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright xl:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line-soft bg-ink/95 px-5 pb-6 pt-2 xl:hidden"
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={handleItemClick(item)}
                aria-current={item.isActive ? "page" : undefined}
                aria-disabled={item.placeholder || undefined}
                className={`block border-b border-line-soft py-3 text-sm font-medium uppercase tracking-[0.1em] ${
                  item.isActive ? "text-gold" : "text-fg/85 hover:text-gold"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            aria-label="Select language, current language English"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1 rounded-btn border border-line px-3 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-fg/85"
          >
            <Icon name="globe" width={16} height={16} />
            <span>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
}
