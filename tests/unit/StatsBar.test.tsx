import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsBar } from "@/components/sections/StatsBar";
import { statistics } from "@/content/site";

describe("StatsBar", () => {
  it("renders exactly five statistics", () => {
    expect(statistics).toHaveLength(5);
  });

  it("renders every statistic's exact value and label", () => {
    render(<StatsBar stats={statistics} />);
    const expected: Array<[string, string]> = [
      ["25+", "Projects Delivered"],
      ["$2.4B", "Total Assets Under Management"],
      ["18.7%", "Average ROI Since 2018"],
      ["1,250+", "Investors & Partners"],
      ["5", "Countries of Operation"],
    ];
    for (const [value, label] of expected) {
      expect(screen.getByText(value)).toBeInTheDocument();
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
