// Typed content shapes for the AREEN Investment landing page.
// There is no backend/CMS — these describe the inline content in `site.ts`
// and give components type-safe props (see data-model.md).

export type IconName =
  | "building"
  | "pie"
  | "trend"
  | "users"
  | "globe"
  | "pin"
  | "download"
  | "chevron"
  | "arrow"
  | "mail"
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram";

export type Status = "ACTIVE" | "COMING_SOON";

export type ButtonKind = "primary" | "secondary";

export interface Cta {
  label: string;
  href: string;
  kind: ButtonKind;
  icon?: IconName;
  /** Non-navigating placeholder (e.g. Download Presentation). */
  placeholder?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  /** Off-page placeholder link — must not navigate away. */
  placeholder?: boolean;
}

export interface Statistic {
  icon: IconName;
  value: string;
  label: string;
  /** Numeric target for the count-up animation; null when not animated. */
  countUpTo: number | null;
  /** Suffix appended after the animated number, e.g. "+", "%", "B". */
  suffix?: string;
  /** Prefix rendered before the animated number, e.g. "$". */
  prefix?: string;
}

export interface InvestmentOpportunity {
  name: string;
  location: string;
  image: string;
  imageAlt: string;
  status: Status;
  expectedRoi: string;
  investmentPeriod: string;
}

export interface HeroContent {
  tagline: string;
  headlineLines: string[];
  headlineAccentWord: string;
  /** Words cycled in place of headlineAccentWord; first entry should match it. */
  rotatingWords?: string[];
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  image: string;
  imageAlt: string;
}

export interface AboutContent {
  heading: string;
  body: string;
  learnMoreCta: Cta;
  contactPrompt: string;
  contactEmail: string;
  contactCta: Cta;
}

export interface FooterLink {
  label: string;
  href: string;
  placeholder?: boolean;
}

export interface SocialLink {
  network: IconName;
  href: string;
  ariaLabel: string;
  placeholder?: boolean;
}

export interface FooterContent {
  copyright: string;
  links: FooterLink[];
  socials: SocialLink[];
}

export interface BrandContent {
  name: string;
  suffix: string;
  /** Hexagon brand mark (transparent PNG). */
  mark: string;
  /** "AREEN INVESTMENT" wordmark lockup (transparent PNG). */
  wordmark: string;
  markRatio: number;
  wordmarkRatio: number;
}
