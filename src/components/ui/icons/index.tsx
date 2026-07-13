import type { IconName } from "@/content/types";
import type { SVGProps } from "react";

// Inline, currentColor-driven SVG icon set. Decorative by default
// (aria-hidden); pass a `title` for standalone meaningful icons.
type IconProps = SVGProps<SVGSVGElement> & { title?: string };

const paths: Record<IconName, React.ReactNode> = {
  building: (
    <>
      <rect x="4" y="3" width="10" height="18" rx="0.5" />
      <path d="M14 8h6v13h-6" />
      <path d="M7 7h2M7 11h2M7 15h2M17 12h1M17 16h1" />
      <path d="M3 21h18" />
    </>
  ),
  pie: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" />
      <path d="M12 3v9h9" opacity="0.55" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6" />
      <path d="M16.5 14.4A5.5 5.5 0 0 1 20.5 19.6" opacity="0.8" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.8 2.4 4.2 5.6 4.2 9s-1.4 6.6-4.2 9c-2.8-2.4-4.2-5.6-4.2-9S9.2 5.4 12 3Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M4 20h16" />
    </>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" stroke="none" />
      <path
        d="M7 10v7M7 7.2v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"
        stroke="#0a0a0a"
        strokeWidth="1.8"
        fill="none"
      />
    </>
  ),
  twitter: (
    <path
      d="M21 5.6c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.7.4-1.5.7-2.3.9A3.6 3.6 0 0 0 12 8.5c0 .3 0 .6.1.8-3-.1-5.7-1.6-7.5-3.8-.3.6-.5 1.2-.5 1.9 0 1.3.6 2.4 1.6 3-.6 0-1.1-.2-1.6-.4v.05c0 1.8 1.2 3.2 2.9 3.6-.3.1-.6.1-1 .1-.2 0-.4 0-.7-.05.5 1.5 1.8 2.5 3.4 2.6a7.2 7.2 0 0 1-4.5 1.5c-.3 0-.6 0-.9-.05A10.2 10.2 0 0 0 9 19.5c6.6 0 10.2-5.5 10.2-10.2v-.5c.7-.5 1.3-1.1 1.8-1.8Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  facebook: (
    <path
      d="M14 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3h-2.4C12.3 3 11 4.4 11 6.6v1.9H9V11h2v10h3V11h2.2l.4-2.5H14Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({ name, title, ...props }: IconProps & { name: IconName }) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
