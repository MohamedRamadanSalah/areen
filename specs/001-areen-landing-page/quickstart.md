# Quickstart & Validation Guide: AREEN Investment Landing Page

**Feature**: `001-areen-landing-page` | **Date**: 2026-07-12

This guide explains how to set up, run, and validate the landing page end-to-end. Implementation details (component bodies, test bodies) live in `tasks.md` / the implementation phase; this is a run/verify guide only. See [plan.md](./plan.md), [data-model.md](./data-model.md), and [contracts/components.md](./contracts/components.md) for details referenced below.

## Prerequisites

- Node.js 20 LTS and a package manager (npm / pnpm)
- Provided brand assets copied into `public/`: `logo.png`, `hero_building.png`
- Placeholder project images in `public/projects/` (see data-model for the three names)

## Setup

```bash
# Install dependencies (Next.js, React, TypeScript, Tailwind, Framer Motion, test tooling)
npm install

# Start the dev server
npm run dev
# open http://localhost:3000
```

## Build & preview (production)

```bash
npm run build
npm run start   # serves the production build
```

## Validation scenarios

Each scenario maps to acceptance scenarios / success criteria in [spec.md](./spec.md).

### 1. Visual fidelity vs. reference (SC-001, User Story 1–3)

- Open `http://localhost:3000` at 1440px width.
- Compare side-by-side with `landing_page.png`.
- **Expected**: navigation, hero (tagline / headline with gold "FUTURE" / description / two CTAs / building image), five-metric stats bar, three opportunity cards, About + contact block, and footer all present and positioned as in the reference; dark background with gold accents.

### 2. Content correctness (SC-002)

- **Expected**: the five statistics (`25+`, `$2.4B`, `18.7%`, `1,250+`, `5`) with correct labels; three cards exactly — Riverside Residences / New Cairo, Egypt / ACTIVE / 20.4% / 3 Years; Areen Business Hub / New Administrative Capital / ACTIVE / 17.8% / 5 Years; Coastline Towers / North Coast, Egypt / COMING SOON / 22.1% / 5 Years; email `investment@areeninvestment.com`; footer copyright "© 2024 Areen Investment. All Rights Reserved." and links Privacy Policy / Terms of Use / Disclaimer.

### 3. Responsiveness (SC-004)

- Resize / emulate at 1280px, 768px, and 375px.
- **Expected**: no horizontal scrollbar; nav collapses to a toggle on mobile; stats and cards stack; all text legible and unclipped.

### 4. CTA & no-auth behavior (FR-020a, FR-006)

- Click "EXPLORE OPPORTUNITIES" → page scrolls to Investment Opportunities.
- Click the email / "CONTACT US" → opens `mailto:` composer.
- Click "INVESTOR LOGIN" → **nothing navigates, no login/auth appears** (visual placeholder only).
- Click placeholder links (Projects, Download Presentation, social icons) → no navigation away, no errors.

### 5. Accessibility & keyboard (SC-006, FR-023/024)

- Tab through the page.
- **Expected**: every interactive element is focusable in logical order with a visible focus ring; icon-only controls (social, menu toggle, language) announce accessible names; automated axe check reports **zero critical violations**.

### 6. Reduced motion (SC-007, FR-022)

- Enable OS "reduce motion" (or run the e2e suite with reduced motion).
- **Expected**: no entrance/scroll animations or count-up play; all content is immediately visible and legible.

### 7. Performance (SC-005)

- Run Lighthouse (desktop) on the production preview.
- **Expected**: first meaningful content < 2.5s on broadband; Performance score ≥ 90; no significant layout shift.

## Automated test commands

```bash
npm run test        # Vitest unit/component tests (content, badges, props)
npm run test:e2e    # Playwright: responsive, keyboard nav, reduced-motion, a11y (axe-core)
```

**Expected**: all unit and e2e suites pass; axe-core reports no critical violations. Test-to-requirement mapping is in [contracts/components.md](./contracts/components.md#behavioral-contracts-summary-test-targets).
