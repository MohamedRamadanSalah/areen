# AREEN Investment — Landing Page

A single, pixel-faithful marketing/investor landing page for **AREEN Investment Group**,
reproducing the reference design (`landing_page.png`): a dark, gold-accented luxury layout
with navigation, hero, a five-metric statistics bar, an Investment Opportunities section,
an About + contact block, and a footer.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion**.
All content is authored inline (no CMS/backend). There is no login/auth — the "Investor Login"
button is a visual-only placeholder.

## Prerequisites

- Node.js 20+ (developed on Node 22) and npm
- Brand assets live in `public/` (`logo.png`, `hero_building.png`) and placeholder
  project images in `public/projects/`.

## Setup

```bash
npm install
```

## Run (development)

```bash
npm run dev
# open http://localhost:3000
```

## Build & preview (production)

```bash
npm run build
npm run start   # serves the optimized production build on :3000
```

## Testing

```bash
npm run test        # Vitest + RTL — content/props/badge unit tests
npm run test:e2e    # Playwright — responsive (1280/768/375), keyboard a11y (axe-core),
                    # reduced-motion, and no-auth behaviour
```

The Playwright config builds and starts the app automatically. To install browsers once:

```bash
npx playwright install chromium chromium-headless-shell
```

## Project structure

```text
src/
├── app/            # layout.tsx (fonts, theme, metadata), page.tsx (composes sections), globals.css (theme tokens)
├── components/
│   ├── layout/     # Navbar, Footer, Logo
│   ├── sections/   # Hero, StatsBar, Opportunities, About
│   └── ui/         # Button, StatItem, StatusBadge, OpportunityCard, SectionReveal, icons/
├── content/        # site.ts (all inline content), types.ts (typed content shapes)
└── lib/            # motion.ts (shared Framer Motion variants + reduced-motion helpers)

tests/
├── unit/           # Vitest + React Testing Library
└── e2e/            # Playwright (landing.spec.ts, a11y.spec.ts)
```

## Accessibility & motion

- Dark theme with WCAG AA-verified contrast tokens (see `src/app/globals.css`).
- All interactive controls are keyboard-operable with a visible gold focus ring; icon-only
  controls carry `aria-label`s.
- Entrance/scroll-reveal animations and stat count-ups honor `prefers-reduced-motion`:
  under reduced motion all content renders in its final, fully-legible state with no animation.
