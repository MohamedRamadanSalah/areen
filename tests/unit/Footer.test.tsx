import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";
import { footer } from "@/content/site";

describe("Footer", () => {
  it("renders the brand logo home link", () => {
    render(<Footer content={footer} />);
    expect(
      screen.getByRole("link", { name: /areen investment — home/i })
    ).toBeInTheDocument();
  });

  it("renders the exact copyright line", () => {
    render(<Footer content={footer} />);
    expect(
      screen.getByText("© 2024 Areen Investment. All Rights Reserved.")
    ).toBeInTheDocument();
  });

  it("renders the three footer links", () => {
    render(<Footer content={footer} />);
    for (const label of ["Privacy Policy", "Terms of Use", "Disclaimer"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("renders four accessibly-labelled social links", () => {
    render(<Footer content={footer} />);
    const labels = [/linkedin/i, /twitter/i, /facebook/i, /instagram/i];
    for (const label of labels) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
});
