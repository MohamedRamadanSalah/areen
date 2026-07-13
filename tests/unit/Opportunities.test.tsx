import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Opportunities } from "@/components/sections/Opportunities";
import { opportunities } from "@/content/site";

describe("Opportunities", () => {
  it("renders the section heading and a view-all link", () => {
    render(<Opportunities opportunities={opportunities} />);
    expect(
      screen.getByRole("heading", { name: /investment opportunities/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/view all opportunities/i)).toBeInTheDocument();
  });

  it("renders exactly three project cards", () => {
    render(<Opportunities opportunities={opportunities} />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("renders each card's exact content", () => {
    render(<Opportunities opportunities={opportunities} />);
    const cases = [
      {
        name: "RIVERSIDE RESIDENCES",
        location: "New Cairo, Egypt",
        roi: "20.4%",
        period: "3 Years",
        status: "ACTIVE",
      },
      {
        name: "AREEN BUSINESS HUB",
        location: "New Administrative Capital",
        roi: "17.8%",
        period: "5 Years",
        status: "ACTIVE",
      },
      {
        name: "COASTLINE TOWERS",
        location: "North Coast, Egypt",
        roi: "22.1%",
        period: "5 Years",
        status: "COMING SOON",
      },
    ];

    for (const c of cases) {
      const card = screen.getByText(c.name).closest("article")!;
      expect(card).not.toBeNull();
      const scoped = within(card);
      expect(scoped.getByText(c.location)).toBeInTheDocument();
      expect(scoped.getByText(c.roi)).toBeInTheDocument();
      expect(scoped.getByText(c.period)).toBeInTheDocument();
      expect(scoped.getByText(c.status)).toBeInTheDocument();
    }
  });
});
