# Feature Specification: AREEN Investment Landing Page

**Feature Branch**: `001-areen-landing-page`

**Created**: 2026-07-12

**Status**: Draft

**Input**: User description: "Create the AREEN Investment landing page exactly as shown in the reference image (`landing_page.png`), reproducing every element in it with high accuracy, using the AREEN brand assets (`logo.png`, `hero_building.png`) and the business context in `bussines.md`."

## Clarifications

### Session 2026-07-12

- Q: How should the page's data-driven content (statistics, opportunity cards) be stored? → A: Hardcode content directly inline in the components (no separate data files, CMS, or backend).
- Q: How should the CTAs and the "INVESTOR LOGIN" action behave, given there is no backend? → A: No login or authentication of any kind. The "INVESTOR LOGIN" button is shown for visual fidelity only as a non-functional placeholder; internal actions scroll to on-page sections; contact/email actions use `mailto:`; all other off-page links are non-submitting placeholders.

## Overview

A single-page marketing and investor-facing landing page for **AREEN Investment Group**, a real estate development and multi-sector investment group with regional presence across KSA, MENA, GCC, and Europe. The page must faithfully reproduce the provided reference design (`landing_page.png`) — a dark, gold-accented luxury layout — including its navigation, hero, key statistics, investment-opportunity cards, "About" block, and footer. The design reproduction must be pixel-faithful in layout, content, hierarchy, and brand styling.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Prospective Investor Explores the Company (Priority: P1)

A prospective investor lands on the homepage and, within seconds, understands who AREEN Investment is, the scale of its track record (projects, assets under management, ROI, investor base, countries), and the value proposition ("Smart Investment, Strong Future"). They can immediately act by exploring opportunities or downloading the presentation.

**Why this priority**: This is the core purpose of the page — communicating credibility and the value proposition to convert visitor interest into engagement. Without it, the page delivers no value.

**Independent Test**: Load the page and verify the hero section (tagline, headline, description, both call-to-action buttons, and hero building image) and the key-statistics bar render with the correct content and are visually consistent with the reference image. Delivers value by presenting the company's positioning and credentials at a glance.

**Acceptance Scenarios**:

1. **Given** a visitor opens the landing page, **When** the page loads, **Then** the hero displays the tagline "BUILDING VALUE. CREATING FUTURES.", the headline "SMART INVESTMENT STRONG FUTURE" (with "FUTURE" emphasized in gold), the company description paragraph, and two buttons ("EXPLORE OPPORTUNITIES" and "DOWNLOAD PRESENTATION").
2. **Given** the page has loaded, **When** the visitor views the statistics bar, **Then** it shows five metrics: "25+ Projects Delivered", "$2.4B Total Assets Under Management", "18.7% Average ROI Since 2018", "1,250+ Investors & Partners", and "5 Countries of Operation", each with an accompanying icon.
3. **Given** the visitor is on the hero, **When** they click "EXPLORE OPPORTUNITIES", **Then** they are taken to / scrolled to the Investment Opportunities section.

---

### User Story 2 - Investor Reviews Available Opportunities (Priority: P2)

An investor scrolls to the Investment Opportunities section to review current and upcoming projects, each presented as a card with a project image, status badge, name, location, expected ROI, and investment period, so they can compare options and decide which to pursue.

**Why this priority**: The opportunity cards are the primary conversion content beyond the hero — they turn general interest into interest in a specific project.

**Independent Test**: Verify the Investment Opportunities section renders three project cards with correct content, status badges, and a "VIEW ALL OPPORTUNITIES" link, matching the reference image.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the Investment Opportunities section, **When** it renders, **Then** it shows a section heading "INVESTMENT OPPORTUNITIES", a "VIEW ALL OPPORTUNITIES" link, and three project cards.
2. **Given** the opportunity cards render, **When** the visitor reads them, **Then** they display: (a) "RIVERSIDE RESIDENCES" — New Cairo, Egypt — status "ACTIVE" — Expected ROI 20.4% — Investment Period 3 Years; (b) "AREEN BUSINESS HUB" — New Administrative Capital — status "ACTIVE" — Expected ROI 17.8% — Investment Period 5 Years; (c) "COASTLINE TOWERS" — North Coast, Egypt — status "COMING SOON" — Expected ROI 22.1% — Investment Period 5 Years.
3. **Given** a card has a status badge, **When** it renders, **Then** "ACTIVE" and "COMING SOON" badges are visually distinguished consistent with the reference image.

---

### User Story 3 - Visitor Learns About the Company and Makes Contact (Priority: P3)

A visitor reads the "About AREEN Investment" block, sees the brand hexagon graphic, and uses the contact call-to-action (email and "CONTACT US" button) to reach the investment team. They can also navigate via the top menu and footer links.

**Why this priority**: Supports deeper engagement and conversion for visitors who want to learn more or make contact, but is secondary to the hero and opportunities in driving the primary goal.

**Independent Test**: Verify the "About AREEN Investment" block, the contact call-to-action box, the top navigation bar, and the footer all render with correct content and links matching the reference image.

**Acceptance Scenarios**:

1. **Given** the visitor reaches the About section, **When** it renders, **Then** it shows the heading "ABOUT AREEN INVESTMENT", the descriptive paragraph, a "LEARN MORE ABOUT US" button, and the AREEN hexagon brand graphic.
2. **Given** the About section renders, **When** the visitor views the contact block, **Then** it shows "GET IN TOUCH WITH OUR INVESTMENT TEAM", the email "investment@areeninvestment.com", and a "CONTACT US" button.
3. **Given** the page is loaded, **When** the visitor views the top navigation, **Then** it shows the AREEN logo and menu items: HOME, ABOUT US, INVESTMENT OPPORTUNITIES, PROJECTS, FINANCIALS, INVESTOR RELATIONS, NEWS, CONTACT, plus an "INVESTOR LOGIN" button and an "EN" language selector.
4. **Given** the page is loaded, **When** the visitor views the footer, **Then** it shows the AREEN logo, the copyright "© 2024 Areen Investment. All Rights Reserved.", the links Privacy Policy / Terms of Use / Disclaimer, and social media icons (LinkedIn, Twitter/X, Facebook, Instagram).

---

### Edge Cases

- **Small / mobile screens**: The multi-column layout (navigation menu, five-metric stats bar, three opportunity cards, two-column About block) must reflow gracefully into stacked, readable layouts without horizontal scrolling or clipped content.
- **Slow connections / large hero image**: The hero building image and card images must not block first meaningful paint; placeholder/loading behavior must avoid layout shift.
- **Long content / translation growth**: Text elements (headline, stat labels, card names) must not overflow their containers if content length varies slightly.
- **Missing image asset**: If a project image fails to load, the card must degrade gracefully (fallback background/placeholder) rather than break the layout.
- **Keyboard & screen-reader navigation**: All interactive elements (nav links, buttons, language selector, social icons) must be reachable and operable via keyboard and expose accessible labels.
- **Reduced-motion preference**: Visitors who request reduced motion must see a static, fully legible page with animations disabled or minimized.

## Requirements *(mandatory)*

### Functional Requirements

#### Global / Layout

- **FR-001**: The page MUST reproduce the reference design (`landing_page.png`) with high fidelity in layout, content, visual hierarchy, spacing, and brand styling (dark background with gold/amber accents and light text).
- **FR-002**: The page MUST use the provided brand assets: `logo.png` (AREEN Investment logo, in navigation and footer) and `hero_building.png` (hero background/feature image).
- **FR-003**: The page MUST be a single scrollable landing page composed of, in order: top navigation, hero, statistics bar, investment opportunities, about + contact block, and footer.
- **FR-004**: The page MUST be responsive across desktop, tablet, and mobile breakpoints, reflowing multi-column content into stacked layouts without horizontal overflow.

#### Navigation

- **FR-005**: The top navigation MUST display the AREEN logo and the menu items: HOME, ABOUT US, INVESTMENT OPPORTUNITIES, PROJECTS, FINANCIALS, INVESTOR RELATIONS, NEWS, CONTACT.
- **FR-006**: The navigation MUST include an "INVESTOR LOGIN" button styled as an outlined/secondary action and an "EN" language selector control. The "INVESTOR LOGIN" button is present for visual fidelity only and MUST NOT trigger any authentication; no login or auth system is implemented.
- **FR-007**: The active/current menu item (HOME) MUST be visually highlighted consistent with the reference image.
- **FR-008**: On mobile, the navigation MUST collapse into a compact/menu-toggle presentation while keeping the logo, login, and language controls accessible.

#### Hero

- **FR-009**: The hero MUST display the pre-headline tagline "BUILDING VALUE. CREATING FUTURES.", the headline "SMART INVESTMENT STRONG FUTURE" with "FUTURE" emphasized in the gold accent color, and the company description paragraph.
- **FR-010**: The hero MUST display two call-to-action buttons: "EXPLORE OPPORTUNITIES" (primary, gold-filled) and "DOWNLOAD PRESENTATION" (secondary, outlined, with a download indicator).
- **FR-011**: The hero MUST feature the building image (`hero_building.png`) positioned to the right/background consistent with the reference image.

#### Statistics Bar

- **FR-012**: The page MUST display a statistics bar with five metrics, each with an icon, value, and label: "25+ / Projects Delivered", "$2.4B / Total Assets Under Management", "18.7% / Average ROI Since 2018", "1,250+ / Investors & Partners", "5 / Countries of Operation".

#### Investment Opportunities

- **FR-013**: The page MUST display an "INVESTMENT OPPORTUNITIES" section with a section heading and a "VIEW ALL OPPORTUNITIES" link.
- **FR-014**: The section MUST display three project cards, each containing a project image, a status badge, a project name, a location (with a location marker), an "Expected ROI" value, and an "Investment Period" value.
- **FR-015**: The three cards MUST present the exact content: Riverside Residences (New Cairo, Egypt / ACTIVE / 20.4% / 3 Years), Areen Business Hub (New Administrative Capital / ACTIVE / 17.8% / 5 Years), Coastline Towers (North Coast, Egypt / COMING SOON / 22.1% / 5 Years).
- **FR-016**: Status badges MUST visually distinguish "ACTIVE" from "COMING SOON".

#### About & Contact

- **FR-017**: The page MUST display an "ABOUT AREEN INVESTMENT" block with a descriptive paragraph, a "LEARN MORE ABOUT US" button, and the AREEN hexagon brand graphic.
- **FR-018**: The About area MUST include a contact call-to-action showing "GET IN TOUCH WITH OUR INVESTMENT TEAM", the email address "investment@areeninvestment.com", and a "CONTACT US" button.

#### Footer

- **FR-019**: The footer MUST display the AREEN logo, the copyright line "© 2024 Areen Investment. All Rights Reserved.", the links Privacy Policy / Terms of Use / Disclaimer, and social media icons (LinkedIn, Twitter/X, Facebook, Instagram).

#### Interaction & Motion

- **FR-020**: Interactive elements (menu links, buttons, cards, social icons) MUST provide clear hover, focus, and active visual states.
- **FR-020a**: Call-to-action behavior MUST be: internal actions ("EXPLORE OPPORTUNITIES", "VIEW ALL OPPORTUNITIES", on-page nav items) scroll to the corresponding on-page section; contact actions ("CONTACT US", the investment email) open a `mailto:` link; all remaining off-page links (other nav items, "INVESTOR LOGIN", "DOWNLOAD PRESENTATION", "LEARN MORE ABOUT US" where no on-page target exists) are non-submitting placeholders. No server-side backend, form submission endpoint, or authentication is implemented.
- **FR-021**: The page MUST include tasteful entrance/scroll-reveal animations (e.g., hero content, stat counters, cards fading/sliding into view) that enhance the premium feel without harming usability.
- **FR-022**: When the visitor's system requests reduced motion, animations MUST be disabled or minimized while all content remains fully legible.

#### Accessibility & Content

- **FR-023**: All interactive elements MUST be keyboard-operable and expose accessible names/labels; images MUST have appropriate alternative text.
- **FR-024**: Text and interactive elements MUST meet accessible color-contrast expectations against the dark background.
- **FR-025**: All page content (statistics, opportunity cards, contact email, and other copy) MUST be authored directly inline within the page components — no separate content/data files, headless CMS, or backend content service — using the reference values as the initial content.

### Key Entities *(include if feature involves data)*

- **Navigation Item**: A menu entry with a label and a target destination; one item may be marked as the active/current page.
- **Statistic**: A headline metric with an icon, a value (e.g., "25+", "$2.4B", "18.7%"), and a descriptive label.
- **Investment Opportunity**: A project offering with a name, location, image, status (Active / Coming Soon), expected ROI, and investment period.
- **Brand Assets**: The AREEN logo and hero building image used across the page.
- **Contact Details**: The investment-team email address and associated call-to-action.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A side-by-side comparison of the delivered page against the reference image (`landing_page.png`) at desktop width shows all sections, text content, and elements present and correctly positioned, with reviewers rating layout fidelity at 95% or higher.
- **SC-002**: 100% of the content items enumerated in the functional requirements (navigation items, five statistics, three opportunity cards with all fields, About/contact text, footer links, and copyright) are present and match the reference values exactly.
- **SC-003**: A first-time visitor can identify what AREEN Investment does and locate the "Explore Opportunities" action within 10 seconds of the page loading.
- **SC-004**: The page renders without horizontal scrolling or broken/overlapping layout on common desktop (≥1280px), tablet (~768px), and mobile (~375px) widths.
- **SC-005**: The page reaches first meaningful content display in under 2.5 seconds on a typical broadband connection, and animations run smoothly without visible jank.
- **SC-006**: All interactive elements are reachable and operable by keyboard alone, and the page passes an automated accessibility check with no critical violations.
- **SC-007**: When the operating system requests reduced motion, no non-essential animation plays, and all content remains fully visible and legible.

## Assumptions

- The reference image (`landing_page.png`) is the authoritative source for layout, content, and styling; the provided values (statistics, opportunity details, contact email, copyright year 2024) are treated as the initial content to reproduce exactly.
- This feature covers the single landing (home) page only. Menu items pointing to other pages (About Us, Projects, Financials, Investor Relations, News, Contact) link to placeholder destinations or anchors; building those separate pages/flows is out of scope for this feature.
- There is no login, authentication, or investor portal. The "INVESTOR LOGIN" button is a visual-only placeholder retained for design fidelity to the reference image; any backend, account system, or secured area is explicitly out of scope.
- Navigation links that target on-page sections (e.g., Home, Investment Opportunities) scroll to the corresponding section; links without an on-page target resolve to placeholder routes.
- The "DOWNLOAD PRESENTATION", "EXPLORE OPPORTUNITIES", "VIEW ALL OPPORTUNITIES", "LEARN MORE ABOUT US", and "CONTACT US" actions wire to sensible placeholder targets (a downloadable file placeholder, on-page anchors, or the contact email) pending real content.
- Content is presented in English with an "EN" language selector shown; multi-language content and functional language switching are out of scope for this feature.
- The company/business context in `bussines.md` (AREEN Investment Group, its sectors and brands) informs supporting copy where the reference image does not dictate exact text, but the image's visible text takes precedence wherever the two differ.
- The hexagon brand graphic in the About section is derived from the AREEN logo mark.
- Sample project card images are placeholders representing the referenced projects; final imagery may be supplied later without layout changes.

## Implementation Constraints *(explicitly requested by the requester)*

> These are recorded because the requester explicitly named them. Detailed technical design belongs in the `/speckit-plan` phase.

- The implementation is to use **Next.js**, **React**, and **TypeScript**.
- Styling is to use **Tailwind CSS**.
- Animations/motion are to use **Framer Motion**.
