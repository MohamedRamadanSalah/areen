// All landing-page content authored inline (FR-025). Reference values are
// reproduced exactly from `landing_page.png`. Edit here to update the page.

import type {
  AboutContent,
  BrandContent,
  FooterContent,
  HeroContent,
  InvestmentOpportunity,
  NavItem,
  Statistic,
} from "./types";

export const brand: BrandContent = {
  name: "AREEN",
  suffix: "INVESTMENT",
  mark: "/logo-mark.png",
  wordmark: "/logo-wordmark.png",
  markRatio: 810 / 941, // intrinsic width / height
  wordmarkRatio: 1634 / 499,
};

export const navItems: NavItem[] = [
  { label: "HOME", href: "#top", isActive: true },
  { label: "ABOUT US", href: "#about", placeholder: false },
  { label: "INVESTMENT OPPORTUNITIES", href: "#opportunities" },
  { label: "PROJECTS", href: "#", placeholder: true },
  { label: "LEADERSHIP", href: "#", placeholder: true },
  { label: "BRANDS", href: "#", placeholder: true },
  { label: "NEWS", href: "#", placeholder: true },
  { label: "DATA ROOM", href: "#", placeholder: true },
  { label: "CONTACT", href: "mailto:investment@areeninvestment.com" },
];

export const hero: HeroContent = {
  tagline: "BUILDING VALUE. CREATING FUTURES.",
  headlineLines: ["SMART INVESTMENT", "STRONG FUTURE"],
  headlineAccentWord: "FUTURE",
  description:
    "Areen Investment is a leading real estate development company delivering high-quality projects and sustainable returns for our investors and partners.",
  primaryCta: {
    label: "EXPLORE OPPORTUNITIES",
    href: "#opportunities",
    kind: "primary",
    icon: "arrow",
  },
  secondaryCta: {
    label: "LEARN MORE",
    href: "#about",
    kind: "secondary",
    icon: "arrow",
  },
  image: "/hero_building.png",
  imageAlt: "Illuminated AREEN Investment residential towers at dusk",
};

export const statistics: Statistic[] = [
  { icon: "building", value: "25+", label: "Projects Delivered", countUpTo: 25, suffix: "+" },
  {
    icon: "pie",
    value: "$2.4B",
    label: "Total Assets Under Management",
    countUpTo: 2.4,
    prefix: "$",
    suffix: "B",
  },
  {
    icon: "trend",
    value: "18.7%",
    label: "Average ROI Since 2018",
    countUpTo: 18.7,
    suffix: "%",
  },
  {
    icon: "users",
    value: "1,250+",
    label: "Investors & Partners",
    countUpTo: 1250,
    suffix: "+",
  },
  { icon: "globe", value: "5", label: "Countries of Operation", countUpTo: 5 },
];

export const opportunities: InvestmentOpportunity[] = [
  {
    name: "RIVERSIDE RESIDENCES",
    location: "New Cairo, Egypt",
    image: "/projects/riverside-residences.jpg",
    imageAlt: "Riverside Residences — waterfront residential development",
    status: "ACTIVE",
    expectedRoi: "20.4%",
    investmentPeriod: "3 Years",
  },
  {
    name: "AREEN BUSINESS HUB",
    location: "New Administrative Capital",
    image: "/projects/areen-business-hub.jpg",
    imageAlt: "AREEN Business Hub — commercial office development",
    status: "ACTIVE",
    expectedRoi: "17.8%",
    investmentPeriod: "5 Years",
  },
  {
    name: "COASTLINE TOWERS",
    location: "North Coast, Egypt",
    image: "/projects/coastline-towers.jpg",
    imageAlt: "Coastline Towers — seaside high-rise development",
    status: "COMING_SOON",
    expectedRoi: "22.1%",
    investmentPeriod: "5 Years",
  },
];

export const about: AboutContent = {
  heading: "ABOUT AREEN INVESTMENT",
  body: "We create premium real estate developments that enhance communities and generate sustainable value for our investors.",
  learnMoreCta: {
    label: "LEARN MORE ABOUT US",
    href: "#",
    kind: "secondary",
    icon: "arrow",
    placeholder: true,
  },
  contactPrompt: "GET IN TOUCH WITH OUR INVESTMENT TEAM",
  contactEmail: "investment@areeninvestment.com",
  contactCta: {
    label: "CONTACT US",
    href: "mailto:investment@areeninvestment.com",
    kind: "secondary",
    icon: "arrow",
  },
};

export const footer: FooterContent = {
  copyright: "© 2024 Areen Investment. All Rights Reserved.",
  links: [
    { label: "Privacy Policy", href: "#", placeholder: true },
    { label: "Terms of Use", href: "#", placeholder: true },
    { label: "Disclaimer", href: "#", placeholder: true },
  ],
  socials: [
    { network: "linkedin", href: "#", ariaLabel: "AREEN Investment on LinkedIn", placeholder: true },
    { network: "twitter", href: "#", ariaLabel: "AREEN Investment on Twitter / X", placeholder: true },
    { network: "facebook", href: "#", ariaLabel: "AREEN Investment on Facebook", placeholder: true },
    { network: "instagram", href: "#", ariaLabel: "AREEN Investment on Instagram", placeholder: true },
  ],
};
