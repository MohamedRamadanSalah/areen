# Phase 1 Component Contracts: AREEN Investment Landing Page

**Feature**: `001-areen-landing-page` | **Date**: 2026-07-12

This is a frontend-only application. Its "contracts" are the **UI component interfaces** (props in / rendered output out) plus the page's structural and behavioral contract. Types reference the shapes in [data-model.md](../data-model.md). These contracts are what the unit/e2e tests assert against.

---

## Page contract (`src/app/page.tsx`)

Renders sections in this exact order, each an anchorable landmark:

1. `<Navbar />`
2. `<main id="top">`
   1. `<Hero />` (`id="hero"`)
   2. `<StatsBar />` (`id="stats"`)
   3. `<Opportunities />` (`id="opportunities"`)
   4. `<About />` (`id="about"`)
3. `<Footer />`

**Guarantees**: no horizontal overflow at ≥1280 / ~768 / ~375px (SC-004); single `<h1>` in Hero; each section uses `aria-labelledby` referencing its heading.

---

## `Navbar` — `src/components/layout/Navbar.tsx` (client)

**Props**: `{ items: NavItem[] }`

**Renders**: AREEN logo (links to `#top`); horizontal menu of `items` with the active item visually highlighted (FR-007); "INVESTOR LOGIN" outlined button (non-functional, `aria-disabled`, no auth — FR-006); "EN" language selector (visual only). On viewports < `md`, menu collapses behind an accessible toggle button (`aria-expanded`, `aria-controls`) that keeps logo/login reachable (FR-008).

**Behavior contract**:
- In-page `href="#..."` items scroll smoothly to the target section.
- Off-page/placeholder items do not navigate away or submit.
- Clicking "INVESTOR LOGIN" performs no navigation and starts no auth flow.

---

## `Hero` — `src/components/sections/Hero.tsx` (client)

**Props**: `{ content: HeroContent }`

**Renders**: tagline (FR-009), `<h1>` with two lines where "FUTURE" is wrapped in an accent (gold) span, description paragraph, `primaryCta` + `secondaryCta` `Button`s (FR-010), and the `hero_building.png` via `next/image` with `priority` (FR-011).

**Behavior**: primary CTA scrolls to `#opportunities`; secondary CTA (download) is a placeholder. Entrance animation via `SectionReveal`, disabled under reduced motion.

---

## `StatsBar` — `src/components/sections/StatsBar.tsx` (client)

**Props**: `{ stats: Statistic[] }` (length MUST be 5)

**Renders**: a row (wrapping/stacking on small screens) of `StatItem`s. Each `StatItem` shows icon + value + label (FR-012). Numeric values count up on first in-view; when reduced motion is set, the final value renders immediately (SC-007).

---

## `StatItem` — `src/components/ui/StatItem.tsx`

**Props**: `{ stat: Statistic }`

**Renders**: icon (by `stat.icon`), `stat.value`, `stat.label`. Value element carries the final text for assertions even while animating.

---

## `Opportunities` — `src/components/sections/Opportunities.tsx` (client)

**Props**: `{ opportunities: InvestmentOpportunity[] }` (length MUST be 3)

**Renders**: heading "INVESTMENT OPPORTUNITIES", a "VIEW ALL OPPORTUNITIES" link (placeholder), and a responsive grid of `OpportunityCard`s (3 columns desktop → 1 column mobile) (FR-013/FR-014). Cards reveal with a staggered animation.

---

## `OpportunityCard` — `src/components/ui/OpportunityCard.tsx`

**Props**: `{ opportunity: InvestmentOpportunity }`

**Renders**: project image (`next/image`, graceful fallback on error), `StatusBadge` for `status`, name, location with pin icon, "Expected ROI" + `expectedRoi`, "Investment Period" + `investmentPeriod` (FR-015). Hover/focus elevation state (FR-020).

---

## `StatusBadge` — `src/components/ui/StatusBadge.tsx`

**Props**: `{ status: Status }`

**Contract**: `ACTIVE` → one visual variant, `COMING_SOON` → a distinct variant with the label "COMING SOON" (FR-016). Text is exactly "ACTIVE" / "COMING SOON".

---

## `About` — `src/components/sections/About.tsx` (client)

**Props**: `{ content: AboutContent }`

**Renders**: heading "ABOUT AREEN INVESTMENT", body paragraph, "LEARN MORE ABOUT US" button (FR-017), the hexagon brand SVG, and a contact block with prompt, email (`mailto:`), and "CONTACT US" button (FR-018).

---

## `Footer` — `src/components/layout/Footer.tsx`

**Props**: `{ content: FooterContent }`

**Renders**: AREEN logo, copyright line, Privacy Policy / Terms of Use / Disclaimer links, and four social icon links with `aria-label`s (FR-019). Social/footer links are placeholders.

---

## `Button` — `src/components/ui/Button.tsx`

**Props**: `{ label: string; href?: string; kind: "primary" | "secondary"; icon?: IconName; onClick?: () => void; disabledPlaceholder?: boolean }`

**Contract**: renders as `<a>` when `href` given, else `<button>`. `primary` = gold-filled; `secondary` = outlined. Optional trailing/leading icon. Visible focus ring on the dark theme. When `disabledPlaceholder`, sets `aria-disabled` and suppresses navigation.

---

## `SectionReveal` — `src/components/ui/SectionReveal.tsx` (client)

**Props**: `{ children: ReactNode; delay?: number; stagger?: boolean }`

**Contract**: wraps children in a Framer Motion element animating opacity/translate on `whileInView`. If `useReducedMotion()` is true, renders children in final state with no transition (FR-022 / SC-007). Shared variants imported from `src/lib/motion.ts`.

---

## Behavioral contracts summary (test targets)

| Contract | Requirement | Verified by |
|----------|-------------|-------------|
| All reference content present & exact | SC-002, FR-005/009/012/015/019 | Vitest content assertions |
| No horizontal overflow at 1280/768/375px | SC-004 | Playwright viewport checks |
| All interactive elements keyboard-operable & labeled | FR-023, SC-006 | Playwright + axe-core |
| No critical a11y violations | SC-006 | `@axe-core/playwright` |
| Reduced motion → no non-essential animation, content visible | FR-022, SC-007 | Playwright with `reducedMotion: "reduce"` |
| No auth/login triggered by "Investor Login" | FR-006 | Playwright click assertion (no navigation/flow) |
| Status badges visually distinct | FR-016 | Vitest variant snapshot/class assertion |
