"use client";

import type { MouseEvent } from "react";
import type { ButtonKind, IconName } from "@/content/types";
import { Icon } from "@/components/ui/icons";

interface ButtonProps {
  label: string;
  href?: string;
  kind?: ButtonKind;
  icon?: IconName;
  /** Icon placement relative to the label. Defaults to trailing. */
  iconPosition?: "leading" | "trailing";
  onClick?: () => void;
  /** Visual-only placeholder: suppresses navigation and marks aria-disabled. */
  disabledPlaceholder?: boolean;
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-btn px-6 py-3.5 " +
  "text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright";

const variants: Record<ButtonKind, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-bright shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)]",
  secondary:
    "border border-gold/60 text-fg hover:border-gold hover:bg-gold/10",
};

export function Button({
  label,
  href,
  kind = "primary",
  icon,
  iconPosition = "trailing",
  onClick,
  disabledPlaceholder = false,
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variants[kind]} ${
    disabledPlaceholder ? "cursor-default" : ""
  } ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === "leading" && (
        <Icon name={icon} width={16} height={16} className="shrink-0" />
      )}
      <span>{label}</span>
      {icon && iconPosition === "trailing" && (
        <Icon
          name={icon}
          width={16}
          height={16}
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  const handleClick = (e: MouseEvent) => {
    if (disabledPlaceholder) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        aria-disabled={disabledPlaceholder || undefined}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-disabled={disabledPlaceholder || undefined}
      className={classes}
    >
      {content}
    </button>
  );
}
