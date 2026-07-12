# Implementation Plan: AREEN Investment Landing Page

**Branch**: `001-areen-landing-page` | **Date**: 2026-07-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-areen-landing-page/spec.md`

## Summary

Build a single, pixel-faithful marketing/investor landing page for AREEN Investment Group that reproduces the reference design (`landing_page.png`) exactly: dark, gold-accented luxury layout with a top navigation, hero (tagline + headline + description + two CTAs + building image), a five-metric statistics bar, an "Investment Opportunities" section with three project cards, an "About AREEN Investment" block with contact CTA, and a footer.

Technical approach: a **Next.js (App Router) + React + TypeScript** static site, styled with **Tailwind CSS**, with entrance/scroll-reveal animations via **Framer Motion**. All content is authored inline in components (no data files, CMS, or backend). There is no login/authentication — the "Investor Login" button is a visual-only placeholder. Internal CTAs scroll to on-page sections; contact actions use `mailto:`; other off-page links are non-submitting placeholders. The page is fully responsive, accessible (keyboard + labels + contrast), and honors `prefers-reduced-motion`.

## Technical Context

**Language/Version**: TypeScript 5.x; React 19; Node.js 20 LTS (build/runtime)

**Primary Dependencies**: Next.js 15 (App Router), Tailwind CSS 4, Framer Motion (`motion`) 11, `next/font` (Google Fonts), `next/image`

**Storage**: N/A — all content hardcoded inline in components; brand images served as static assets from `public/`

**Testing**: Vitest + React Testing Library (component/content assertions); Playwright (responsive layout, keyboard nav, reduced-motion smoke checks); `@axe-core/playwright` for automated accessibility checks

**Target Platform**: Modern evergreen browsers (Chrome, Edge, Firefox, Safari) on desktop, tablet, and mobile; static export deployable to any static host / Vercel

**Project Type**: Web application (frontend-only, statically rendered single page)

**Performance Goals**: First meaningful content < 2.5s on typical broadband (SC-005); smooth 60fps animations without jank; Lighthouse Performance ≥ 90 on desktop

**Constraints**: No backend, no auth, no external content service (FR-025, FR-020a); must honor `prefers-reduced-motion` (FR-022); no horizontal overflow at ≥1280px / ~768px / ~375px (SC-004); WCAG AA color contrast on dark theme (FR-024)

**Scale/Scope**: 1 page, ~7 top-level sections, ~10–14 components; static content only; single locale (English, "EN" selector shown but non-functional)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is an unratified template with only placeholder principles — it defines no concrete, enforceable gates. Therefore:

- **Initial gate**: PASS (no ratified principles to violate).
- **Guiding defaults applied in absence of a ratified constitution**: keep it simple (single frontend project, no unnecessary abstraction), colocate content with components as clarified, prefer platform primitives (`next/image`, `next/font`, native anchors) over custom machinery, and ensure the feature is testable (component + e2e + a11y).
- **Post-Design re-check**: PASS (see end of Phase 1 — no complexity violations introduced; Complexity Tracking table left empty).

## Project Structure

### Documentation (this feature)

```text
specs/001-areen-landing-page/
├── plan.md              # This file (/speckit-plan command output)
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI component prop contracts)
│   └── components.md
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
public/
├── logo.png                     # AREEN logo (provided asset)
├── hero_building.png            # Hero building image (provided asset)
└── projects/                    # Placeholder project card images
    ├── riverside-residences.jpg
    ├── areen-business-hub.jpg
    └── coastline-towers.jpg

src/
├── app/
│   ├── layout.tsx               # Root layout: fonts, <html> theme, metadata
│   ├── page.tsx                 # Landing page: composes all sections in order
│   └── globals.css              # Tailwind directives + theme tokens (colors, fonts)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Top navigation (logo, menu, login, EN selector, mobile toggle)
│   │   └── Footer.tsx           # Footer (logo, copyright, links, social icons)
│   ├── sections/
│   │   ├── Hero.tsx             # Tagline, headline, description, CTAs, hero image
│   │   ├── StatsBar.tsx         # Five-metric statistics bar
│   │   ├── Opportunities.tsx    # Section heading + "View all" + 3 cards
│   │   └── About.tsx            # About block + hexagon graphic + contact CTA
│   └── ui/
│       ├── Button.tsx           # Primary/secondary button variants
│       ├── OpportunityCard.tsx  # Single project card (image, badge, name, location, ROI, period)
│       ├── StatItem.tsx         # Single statistic (icon, value, label)
│       ├── StatusBadge.tsx      # ACTIVE / COMING SOON badge
│       ├── SectionReveal.tsx    # Framer Motion scroll-reveal wrapper (reduced-motion aware)
│       └── icons/               # Inline SVG icons (stats, social, chevrons, download, pin)
├── content/
│   └── site.ts                  # Inline content constants co-located for the single page
└── lib/
    └── motion.ts                # Shared Framer Motion variants + reduced-motion helpers

tests/
├── unit/                        # Vitest + RTL: content presence, badge variants, props
│   ├── Hero.test.tsx
│   ├── StatsBar.test.tsx
│   ├── Opportunities.test.tsx
│   └── Footer.test.tsx
└── e2e/                         # Playwright: responsive, keyboard nav, a11y, reduced-motion
    ├── landing.spec.ts
    └── a11y.spec.ts

# Tooling config at repo root:
# next.config.ts, tailwind.config.ts, tsconfig.json, postcss.config.mjs,
# vitest.config.ts, playwright.config.ts, package.json
```

**Structure Decision**: Frontend-only Next.js App Router project at the repository root (no `backend/`), since the feature has no server, database, or authentication. Sections are split into focused, independently testable components under `src/components/`, composed in order by `src/app/page.tsx`. Content is centralized in `src/content/site.ts` as typed constants imported by the components — this satisfies the "author content inline in components" clarification (content lives in the app source, not an external CMS/backend) while keeping the reference values in one editable place and giving components type-safe props. Provided brand assets go in `public/`.

## Complexity Tracking

> No constitution violations. No entries required.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
