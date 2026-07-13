---

description: "Task list for AREEN Investment Landing Page implementation"
---

# Tasks: AREEN Investment Landing Page

**Input**: Design documents from `/specs/001-areen-landing-page/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/components.md, quickstart.md

**Tests**: INCLUDED — the spec's success criteria (SC-002, SC-004, SC-006, SC-007) require automated verification, and plan.md defines a Vitest + RTL + Playwright + axe-core suite.

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story the task belongs to (US1, US2, US3)
- All paths are relative to the repository root

## Path Conventions

Frontend-only Next.js App Router project at repo root: `src/`, `public/`, `tests/` (per plan.md Structure Decision).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling

- [X] T001 Scaffold Next.js 15 App Router project with TypeScript and React 19 at repo root (create `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/`)
- [X] T002 [P] Install and configure Tailwind CSS 4 (`postcss.config.mjs`, `tailwind.config.ts`, Tailwind directives in `src/app/globals.css`)
- [X] T003 [P] Install Framer Motion (`motion`) and confirm client-component support
- [X] T004 [P] Configure Vitest + React Testing Library (`vitest.config.ts`, jsdom env, test setup file)
- [X] T005 [P] Configure Playwright + `@axe-core/playwright` (`playwright.config.ts` with desktop/tablet/mobile projects)
- [X] T006 [P] Configure ESLint + Prettier and add `dev`/`build`/`start`/`test`/`test:e2e` scripts to `package.json`
- [X] T007 [P] Place provided brand assets in `public/` (`logo.png`, `hero_building.png`) and add three placeholder images in `public/projects/` (riverside-residences, areen-business-hub, coastline-towers)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared theme, content, primitives, and page shell that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 Define content types (NavItem, Statistic, InvestmentOpportunity, HeroContent, AboutContent, FooterContent, Cta, IconName, Status) in `src/content/types.ts` per data-model.md
- [X] T009 Author all inline content constants (5 stats, 3 opportunities, hero, about, footer, nav — exact reference values) in `src/content/site.ts`
- [X] T010 Define AREEN brand theme tokens (near-black backgrounds, gold/amber accent, light foreground, radii) in `tailwind.config.ts` + `src/app/globals.css`, verifying AA contrast
- [X] T011 [P] Configure fonts via `next/font/google` (condensed display face for headings, humanist sans for body) in `src/app/layout.tsx`
- [X] T012 [P] Create inline SVG icon set (building, pie, trend, users, globe, pin, download, chevron, arrow, mail, linkedin, twitter, facebook, instagram) in `src/components/ui/icons/`
- [X] T013 [P] Create shared Framer Motion variants + `prefers-reduced-motion` helpers in `src/lib/motion.ts`
- [X] T014 Create `SectionReveal` client wrapper (whileInView, stagger, reduced-motion-aware) in `src/components/ui/SectionReveal.tsx`
- [X] T015 [P] Create `Button` component (primary/secondary variants, optional icon, `disabledPlaceholder` support, focus ring) in `src/components/ui/Button.tsx`
- [X] T016 Create root layout (`<html>` dark theme, `<body>`, metadata, fonts) in `src/app/layout.tsx` and page shell composing section placeholders with ids (`#top`, `#hero`, `#stats`, `#opportunities`, `#about`) in `src/app/page.tsx`

**Checkpoint**: Theme, content, primitives, and page shell ready — user stories can now proceed.

---

## Phase 3: User Story 1 - Prospective Investor Explores the Company (Priority: P1) 🎯 MVP

**Goal**: Deliver the top navigation, hero (tagline, headline with gold "FUTURE", description, two CTAs, building image), and the five-metric statistics bar — the credibility-at-a-glance experience.

**Independent Test**: Load the page and verify the hero and stats bar render with correct content matching `landing_page.png`; "EXPLORE OPPORTUNITIES" scrolls toward the opportunities section.

### Tests for User Story 1

- [X] T017 [P] [US1] Vitest test asserting Hero content (tagline, headline lines, gold "FUTURE", description, both CTAs, hero image alt) in `tests/unit/Hero.test.tsx`
- [X] T018 [P] [US1] Vitest test asserting StatsBar renders all 5 stats with exact values/labels in `tests/unit/StatsBar.test.tsx`

### Implementation for User Story 1

- [X] T019 [P] [US1] Implement `Navbar` (logo, 8 menu items with HOME active, non-functional INVESTOR LOGIN, EN selector, mobile toggle) in `src/components/layout/Navbar.tsx`
- [X] T020 [P] [US1] Implement `StatItem` (icon + value + label, assertable final value) in `src/components/ui/StatItem.tsx`
- [X] T021 [US1] Implement `StatsBar` section rendering 5 `StatItem`s with count-up (reduced-motion aware) in `src/components/sections/StatsBar.tsx`
- [X] T022 [US1] Implement `Hero` section (tagline, `<h1>`, description, CTAs, `next/image` priority hero) in `src/components/sections/Hero.tsx`
- [X] T023 [US1] Wire `Navbar`, `Hero`, `StatsBar` into `src/app/page.tsx` and enable smooth scroll from "EXPLORE OPPORTUNITIES" to `#opportunities`

**Checkpoint**: Navigation + hero + stats render faithfully and are independently testable — MVP ready.

---

## Phase 4: User Story 2 - Investor Reviews Available Opportunities (Priority: P2)

**Goal**: Deliver the "INVESTMENT OPPORTUNITIES" section with heading, "VIEW ALL OPPORTUNITIES" link, and three project cards (image, status badge, name, location, ROI, period).

**Independent Test**: Verify the three cards render with exact content and distinct ACTIVE / COMING SOON badges matching the reference.

### Tests for User Story 2

- [X] T024 [P] [US2] Vitest test asserting all 3 opportunity cards' content (name, location, ROI, period, status) in `tests/unit/Opportunities.test.tsx`
- [X] T025 [P] [US2] Vitest test asserting `StatusBadge` renders distinct ACTIVE vs COMING SOON variants in `tests/unit/StatusBadge.test.tsx`

### Implementation for User Story 2

- [X] T026 [P] [US2] Implement `StatusBadge` (ACTIVE / COMING_SOON variants, exact labels) in `src/components/ui/StatusBadge.tsx`
- [X] T027 [P] [US2] Implement `OpportunityCard` (image with fallback, badge, name, location+pin, Expected ROI, Investment Period, hover state) in `src/components/ui/OpportunityCard.tsx`
- [X] T028 [US2] Implement `Opportunities` section (heading, "VIEW ALL OPPORTUNITIES" placeholder link, responsive 3→1 grid, staggered reveal) in `src/components/sections/Opportunities.tsx`
- [X] T029 [US2] Wire `Opportunities` into `src/app/page.tsx` at `#opportunities`

**Checkpoint**: US1 and US2 both render independently and faithfully.

---

## Phase 5: User Story 3 - Visitor Learns About the Company and Makes Contact (Priority: P3)

**Goal**: Deliver the "ABOUT AREEN INVESTMENT" block (paragraph, LEARN MORE button, hexagon graphic), the contact CTA (prompt, email, CONTACT US), the footer, and working nav/scroll + mobile-menu interactions.

**Independent Test**: Verify the About block, contact block, top nav, and footer render with correct content/links; nav anchors scroll to sections; `mailto:` opens for contact; INVESTOR LOGIN triggers no auth.

### Tests for User Story 3

- [X] T030 [P] [US3] Vitest test asserting Footer content (logo, copyright "© 2024...", 3 links, 4 social labels) in `tests/unit/Footer.test.tsx`

### Implementation for User Story 3

- [X] T031 [P] [US3] Create hexagon brand SVG (derived from logo mark) in `src/components/ui/icons/Hexagon.tsx`
- [X] T032 [US3] Implement `About` section (heading, body, LEARN MORE button, hexagon, contact prompt + `mailto:` email + CONTACT US) in `src/components/sections/About.tsx`
- [X] T033 [P] [US3] Implement `Footer` (logo, copyright, Privacy/Terms/Disclaimer placeholder links, 4 social icon links with aria-labels) in `src/components/layout/Footer.tsx`
- [X] T034 [US3] Wire `About` and `Footer` into `src/app/page.tsx` and finalize nav smooth-scroll + accessible mobile menu toggle behavior in `src/components/layout/Navbar.tsx`

**Checkpoint**: All three stories render independently; full page matches the reference.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Whole-page verification against success criteria

- [X] T035 [P] Playwright e2e: no horizontal overflow and correct reflow at 1280 / 768 / 375px in `tests/e2e/landing.spec.ts` (SC-004)
- [X] T036 [P] Playwright + axe-core: keyboard reachability, visible focus, labeled icon controls, zero critical violations in `tests/e2e/a11y.spec.ts` (SC-006)
- [X] T037 [P] Playwright: reduced-motion run shows no non-essential animation with content visible, and clicking INVESTOR LOGIN performs no navigation/auth in `tests/e2e/landing.spec.ts` (SC-007, FR-006)
- [X] T038 Optimize hero/card images and run Lighthouse desktop to confirm first content < 2.5s and Performance ≥ 90 (SC-005)
- [X] T039 [P] Add run/verify instructions to `README.md`
- [X] T040 Execute `quickstart.md` validation scenarios 1–7 and confirm all pass; do a side-by-side fidelity check against `landing_page.png` (SC-001)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phase 3–5)**: All depend on Foundational; can then proceed in parallel or in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all targeted user stories being complete

### User Story Dependencies

- **US1 (P1)**: After Foundational — no dependency on other stories (MVP)
- **US2 (P2)**: After Foundational — independent of US1 (shares only foundational primitives)
- **US3 (P3)**: After Foundational — independent; nav wiring in T034 finalizes scroll targets that exist once other sections are present but degrades gracefully

### Within Each User Story

- Tests written first and expected to fail before implementation
- UI primitives (StatItem, StatusBadge, OpportunityCard) before their parent section
- Section components before wiring into `page.tsx`

### Parallel Opportunities

- Setup: T002–T007 run in parallel after T001
- Foundational: T011, T012, T013, T015 in parallel; T014/T016 depend on primitives/content
- US1: T017/T018 (tests) in parallel; T019/T020 in parallel before T021/T022
- US2: T024/T025 (tests) in parallel; T026/T027 in parallel before T028
- US3: T030 test + T031/T033 in parallel before T032/T034
- Polish: T035/T036/T037/T039 in parallel

---

## Parallel Example: User Story 1

```bash
# Tests together:
Task: "Vitest Hero content test in tests/unit/Hero.test.tsx"
Task: "Vitest StatsBar content test in tests/unit/StatsBar.test.tsx"

# Then primitives/components together:
Task: "Implement Navbar in src/components/layout/Navbar.tsx"
Task: "Implement StatItem in src/components/ui/StatItem.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational)
2. Complete Phase 3 (US1) — navigation + hero + stats
3. **STOP and VALIDATE**: verify hero/stats fidelity and the explore-opportunities scroll
4. Demo the MVP

### Incremental Delivery

1. Setup + Foundational → shell ready
2. US1 → hero + stats (MVP) → validate → demo
3. US2 → opportunity cards → validate → demo
4. US3 → about + contact + footer + nav → validate → demo
5. Polish → responsive/a11y/reduced-motion/perf verification against success criteria

---

## Notes

- [P] = different files, no dependency on incomplete tasks
- All page content is authored inline in `src/content/site.ts` (no CMS/backend) per clarifications
- No login/auth anywhere — INVESTOR LOGIN is a visual placeholder
- Commit after each task or logical group; stop at any checkpoint to validate a story independently
