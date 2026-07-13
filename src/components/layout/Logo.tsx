import Image from "next/image";
import { brand } from "@/content/site";

interface LogoProps {
  className?: string;
  /** Height of the hexagon mark in px; the wordmark scales relative to it. */
  markHeight?: number;
}

/** Horizontal AREEN brand lockup: hexagon mark + wordmark (official assets). */
export function Logo({ className = "", markHeight = 40 }: LogoProps) {
  const markW = Math.round(markHeight * brand.markRatio);
  const wordH = Math.round(markHeight * 0.62);
  const wordW = Math.round(wordH * brand.wordmarkRatio);

  return (
    <a
      href="#top"
      className={`flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright ${className}`}
      aria-label={`${brand.name} ${brand.suffix} — home`}
    >
      <Image
        src={brand.mark}
        alt=""
        width={markW}
        height={markHeight}
        priority
        style={{ height: markHeight, width: markW }}
      />
      <Image
        src={brand.wordmark}
        alt={`${brand.name} ${brand.suffix}`}
        width={wordW}
        height={wordH}
        priority
        style={{ height: wordH, width: wordW }}
      />
    </a>
  );
}
