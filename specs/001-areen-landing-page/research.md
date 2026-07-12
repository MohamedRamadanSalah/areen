# Phase 0 Research: AREEN Investment Landing Page

**Feature**: `001-areen-landing-page` | **Date**: 2026-07-12

The stack was fixed by the requester (Next.js, React, TypeScript, Tailwind CSS, Framer Motion) and all spec ambiguities were resolved in `/speckit-clarify`. This document records the concrete version/pattern decisions rather than resolving open unknowns.

---

## Decision 1: Framework & rendering mode

- **Decision**: Next.js 15 with the App Router, statically rendered (the landing page is a Server Component that composes Client Components only where interactivity/animation is needed).
- **Rationale**: The page is content-static with no data fetching. App Router gives first-class `next/image`, `next/font`, and metadata support and static generation by default, meeting the < 2.5s first-content goal (SC-005). Server Components ship less JS; only animated/interactive pieces opt into `"use client"`.
- **Alternatives considered**: Plain Vite + React SPA (rejected — loses `next/image`/`next/font` optimizations and SSR-static output the requester's stack implies); Next.js Pages Router (rejected — App Router is the current default and better fits per-component client boundaries).

## Decision 2: Client/Server component boundaries

- **Decision**: `page.tsx` and static sections render as Server Components. Components that use Framer Motion, hover/scroll state, or the mobile menu toggle (`Navbar`, `SectionReveal`, animated CTAs, `StatsBar` counters) are marked `"use client"`.
- **Rationale**: Minimizes client JS while keeping animation and interactivity where needed. Framer Motion requires a client boundary.
- **Alternatives considered**: Whole page as one client component (rejected — unnecessarily ships all markup as JS, hurting performance budget).

## Decision 3: Styling — Tailwind CSS 4 with brand tokens

- **Decision**: Tailwind CSS 4 configured with custom theme tokens for the AREEN palette (near-black background `#0A0A0A`–`#111`, gold/amber accent `~#C9A24B`/`#D4AF37`, light foreground) and font families. Component styling via utility classes; shared patterns extracted with `@apply` or small wrapper components (`Button`, `StatusBadge`).
- **Rationale**: Matches the required stack and the dark, gold-accented design. Centralizing brand colors as tokens keeps fidelity consistent (SC-001) and makes contrast tuning (FR-024) straightforward.
- **Alternatives considered**: CSS Modules / styled-components (rejected — requester specified Tailwind).

## Decision 4: Typography

- **Decision**: Load fonts via `next/font/google`. Use a geometric/condensed sans for headings (e.g., **Oswald** or **Saira Condensed**, matching the tall, wide-tracked logo/headline treatment) and a clean humanist sans for body (e.g., **Inter**). Final choice validated visually against `landing_page.png`.
- **Rationale**: `next/font` self-hosts, eliminates layout shift, and avoids external font-CDN blocking. The reference headline "SMART INVESTMENT STRONG FUTURE" uses a condensed, uppercase, letter-spaced display face.
- **Alternatives considered**: System font stack (rejected — won't match the distinctive display type); external `<link>` to Google Fonts (rejected — CLS + blocking risk).

## Decision 5: Images & assets

- **Decision**: Serve provided `logo.png` and `hero_building.png` from `public/`; render through `next/image` with explicit sizing, `priority` on the hero, and `sizes` for responsive cards. Project card images are placeholders under `public/projects/`. The About-section hexagon is an inline SVG derived from the logo mark. All images carry descriptive `alt` text (FR-023).
- **Rationale**: `next/image` provides lazy loading, responsive `srcset`, and prevents layout shift, supporting the performance and no-layout-shift edge cases. Inline SVG for the hexagon scales crisply and is theme-colorable.
- **Alternatives considered**: Raw `<img>` (rejected — no optimization/lazy-loading); embedding hexagon as PNG (rejected — SVG is sharper and recolorable).

## Decision 6: Animation strategy (Framer Motion)

- **Decision**: A reusable `SectionReveal` wrapper using Framer Motion `whileInView` with staggered children for entrance/scroll-reveal (hero content, stat items, cards, about block). Stat values use a count-up on first in-view. Shared `variants` live in `src/lib/motion.ts`. All motion is gated on `useReducedMotion()` — when reduced motion is requested, elements render in their final state with transitions disabled (FR-022, SC-007).
- **Rationale**: Centralizing variants keeps motion consistent and tasteful (FR-021) and makes the reduced-motion contract enforceable in one place. `whileInView` avoids manual `IntersectionObserver` wiring.
- **Alternatives considered**: CSS-only keyframe animations (rejected — requester specified Framer Motion; harder to orchestrate stagger + reduced-motion uniformly); AOS/third-party scroll libs (rejected — redundant with Framer Motion).

## Decision 7: Navigation & CTA behavior (no backend, no auth)

- **Decision**: In-page nav items and "EXPLORE OPPORTUNITIES" / "VIEW ALL OPPORTUNITIES" use anchor links to section `id`s with smooth scroll. Contact actions ("CONTACT US", email) use `mailto:investment@areeninvestment.com`. "INVESTOR LOGIN", "DOWNLOAD PRESENTATION", "LEARN MORE ABOUT US", and off-page menu items are non-submitting placeholders (`href="#"` with `aria-disabled` or scroll-to-top-suppressed handlers). Mobile nav collapses into a toggle (`useState`) with an accessible disclosure pattern. Language selector is a visual-only control.
- **Rationale**: Directly implements FR-020a and the no-login/no-auth clarification while preserving visual fidelity of every button in the reference image.
- **Alternatives considered**: Building a functional contact form / auth flow (rejected — explicitly out of scope per clarifications).

## Decision 8: Testing approach

- **Decision**: Vitest + React Testing Library assert content presence and exact reference values (five stats, three cards with ROI/period/status, footer text, copyright) and badge variant logic. Playwright covers responsive rendering at 1280/768/375px (no horizontal overflow), keyboard reachability of all interactive elements, and a reduced-motion smoke check. `@axe-core/playwright` runs automated a11y with zero critical violations (SC-002, SC-004, SC-006).
- **Rationale**: Splits fast unit checks (content fidelity) from browser-level guarantees (layout, a11y, motion) that map 1:1 to the measurable success criteria.
- **Alternatives considered**: Jest (rejected — Vitest is faster and simpler with the Vite/TS toolchain); manual-only verification (rejected — success criteria demand automated checks).

## Decision 9: Accessibility & theming

- **Decision**: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`), visible focus rings tuned for the dark theme, `aria-label`s on icon-only controls (social links, menu toggle, language selector), and AA-contrast-verified color tokens. The page is dark-theme by design (matching the reference); no light-mode toggle is required.
- **Rationale**: Satisfies FR-023/FR-024 and SC-006 and keeps the design faithful to the single dark aesthetic of `landing_page.png`.
- **Alternatives considered**: Adding a light/dark theme switch (rejected — not in the reference design or scope).

---

## Resolved unknowns

No `NEEDS CLARIFICATION` markers remained from the spec. Version pins (Next.js 15 / React 19 / Tailwind 4 / Framer Motion 11) are the current stable majors as of the plan date and may be adjusted to the latest stable at scaffold time without changing the design.
