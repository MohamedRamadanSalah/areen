import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/ui/StatusBadge";

describe("StatusBadge", () => {
  it('renders the exact label "ACTIVE" for the active status', () => {
    render(<StatusBadge status="ACTIVE" />);
    const badge = screen.getByText("ACTIVE");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("data-status", "ACTIVE");
  });

  it('renders the exact label "COMING SOON" for the coming-soon status', () => {
    render(<StatusBadge status="COMING_SOON" />);
    const badge = screen.getByText("COMING SOON");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("data-status", "COMING_SOON");
  });

  it("renders visually distinct variants for the two statuses", () => {
    const { container: active } = render(<StatusBadge status="ACTIVE" />);
    const { container: soon } = render(<StatusBadge status="COMING_SOON" />);
    const activeClass = active.querySelector("[data-status]")!.className;
    const soonClass = soon.querySelector("[data-status]")!.className;
    expect(activeClass).not.toEqual(soonClass);
    // Active is solid gold; coming-soon is outlined/muted.
    expect(activeClass).toContain("bg-gold");
    expect(soonClass).toContain("ring-gold");
  });
});
