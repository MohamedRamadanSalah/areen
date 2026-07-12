# Phase 1 Data Model: AREEN Investment Landing Page

**Feature**: `001-areen-landing-page` | **Date**: 2026-07-12

There is no database or backend. These "entities" are **typed content shapes** authored inline in `src/content/site.ts` and passed as props to components. They exist to lock the reference values and give components type-safe inputs. All values below are the initial content to reproduce exactly from `landing_page.png`.

---

## Entity: NavItem

Represents one top-navigation menu entry.

| Field | Type | Rules |
|-------|------|-------|
| `label` | `string` | Non-empty; uppercase display text |
| `href` | `string` | Anchor (`#opportunities`) for in-page targets, or `"#"` placeholder for off-page |
| `isActive` | `boolean` | Exactly one nav item is `true` (HOME) |

**Initial data**: HOME (active, `#top`), ABOUT US, INVESTMENT OPPORTUNITIES (`#opportunities`), PROJECTS, FINANCIALS, INVESTOR RELATIONS, NEWS, CONTACT (`mailto:`).

---

## Entity: Statistic

A headline metric in the statistics bar.

| Field | Type | Rules |
|-------|------|-------|
| `icon` | `IconName` | One of the defined stat icons (building, pie, trend, users, globe) |
| `value` | `string` | Display value, e.g. `"25+"`, `"$2.4B"`, `"18.7%"`, `"1,250+"`, `"5"` |
| `label` | `string` | Non-empty descriptive label |
| `countUpTo` | `number \| null` | Numeric target for count-up animation; `null` when not animated |

**Initial data** (order preserved):
1. building — `25+` — "Projects Delivered"
2. pie — `$2.4B` — "Total Assets Under Management"
3. trend — `18.7%` — "Average ROI Since 2018"
4. users — `1,250+` — "Investors & Partners"
5. globe — `5` — "Countries of Operation"

---

## Entity: InvestmentOpportunity

A project offering card.

| Field | Type | Rules |
|-------|------|-------|
| `name` | `string` | Non-empty, uppercase display |
| `location` | `string` | Non-empty; rendered with a pin icon |
| `image` | `string` | Path under `public/projects/`; fallback background if it fails to load |
| `imageAlt` | `string` | Non-empty descriptive alt text |
| `status` | `"ACTIVE" \| "COMING_SOON"` | Enum; drives `StatusBadge` variant/styling |
| `expectedRoi` | `string` | Percentage display, e.g. `"20.4%"` |
| `investmentPeriod` | `string` | e.g. `"3 Years"`, `"5 Years"` |

**Initial data** (order preserved):
1. RIVERSIDE RESIDENCES — New Cairo, Egypt — ACTIVE — ROI 20.4% — 3 Years
2. AREEN BUSINESS HUB — New Administrative Capital — ACTIVE — ROI 17.8% — 5 Years
3. COASTLINE TOWERS — North Coast, Egypt — COMING_SOON — ROI 22.1% — 5 Years

**State**: `status` is fixed content (no runtime transitions). `ACTIVE` and `COMING_SOON` badges are visually distinct (FR-016).

---

## Entity: HeroContent

Singleton content for the hero section.

| Field | Type | Rules |
|-------|------|-------|
| `tagline` | `string` | "BUILDING VALUE. CREATING FUTURES." |
| `headlineLines` | `string[]` | ["SMART INVESTMENT", "STRONG FUTURE"] |
| `headlineAccentWord` | `string` | "FUTURE" — rendered in gold |
| `description` | `string` | Company description paragraph |
| `primaryCta` | `Cta` | "EXPLORE OPPORTUNITIES" → `#opportunities` |
| `secondaryCta` | `Cta` | "DOWNLOAD PRESENTATION" → placeholder, with download icon |
| `image` | `string` | `/hero_building.png` |

---

## Entity: AboutContent

Singleton content for the About + contact block.

| Field | Type | Rules |
|-------|------|-------|
| `heading` | `string` | "ABOUT AREEN INVESTMENT" |
| `body` | `string` | Descriptive paragraph |
| `learnMoreCta` | `Cta` | "LEARN MORE ABOUT US" → placeholder |
| `contactPrompt` | `string` | "GET IN TOUCH WITH OUR INVESTMENT TEAM" |
| `contactEmail` | `string` | "investment@areeninvestment.com" → `mailto:` |
| `contactCta` | `Cta` | "CONTACT US" → `mailto:` |

---

## Entity: FooterContent

| Field | Type | Rules |
|-------|------|-------|
| `copyright` | `string` | "© 2024 Areen Investment. All Rights Reserved." |
| `links` | `FooterLink[]` | Privacy Policy, Terms of Use, Disclaimer (placeholder hrefs) |
| `socials` | `SocialLink[]` | LinkedIn, Twitter/X, Facebook, Instagram — each `{ network, href, ariaLabel }` |

---

## Shared value types

| Type | Definition |
|------|------------|
| `Cta` | `{ label: string; href: string; kind: "primary" \| "secondary"; icon?: IconName }` |
| `IconName` | Union of used icon keys: `"building" \| "pie" \| "trend" \| "users" \| "globe" \| "pin" \| "download" \| "chevron" \| "arrow" \| "mail" \| "linkedin" \| "twitter" \| "facebook" \| "instagram"` |
| `Status` | `"ACTIVE" \| "COMING_SOON"` |

## Validation rules (cross-cutting)

- Every list-rendered entity uses a stable unique key (e.g., `name`/`label`).
- Exactly one `NavItem.isActive === true`.
- All `image`/icon-only elements provide non-empty accessible text (FR-023).
- Enumerated content counts are fixed: exactly 5 statistics, exactly 3 opportunities, exactly 8 primary nav items, exactly 4 social links (SC-002).
