import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";
import { hero } from "@/content/site";

describe("Hero", () => {
  it("renders the pre-headline tagline", () => {
    render(<Hero content={hero} />);
    expect(screen.getByText("BUILDING VALUE. CREATING FUTURES.")).toBeInTheDocument();
  });

  it("renders a single H1 containing both headline lines", () => {
    render(<Hero content={hero} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("SMART INVESTMENT");
    expect(h1).toHaveTextContent("STRONG FUTURE");
  });

  it('emphasises "FUTURE" in the gold accent colour', () => {
    render(<Hero content={hero} />);
    const accent = screen.getByText("FUTURE");
    expect(accent.tagName).toBe("SPAN");
    expect(accent.className).toContain("text-gold");
  });

  it("renders the company description paragraph", () => {
    render(<Hero content={hero} />);
    expect(
      screen.getByText(/leading real estate development company/i)
    ).toBeInTheDocument();
  });

  it("renders both call-to-action buttons", () => {
    render(<Hero content={hero} />);
    expect(screen.getByText(hero.primaryCta.label)).toBeInTheDocument();
    expect(screen.getByText(hero.secondaryCta.label)).toBeInTheDocument();
  });

  it("links the primary CTA to the opportunities section", () => {
    render(<Hero content={hero} />);
    const cta = screen.getByText("EXPLORE OPPORTUNITIES").closest("a");
    expect(cta).toHaveAttribute("href", "#opportunities");
  });

  it("renders the hero building image with descriptive alt text", () => {
    render(<Hero content={hero} />);
    expect(screen.getByAltText(hero.imageAlt)).toBeInTheDocument();
  });
});
