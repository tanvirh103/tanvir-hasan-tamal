import type { Tech } from "@/types";

import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/site";

/** Relative luminance (0–1) of a 6-digit hex colour. */
function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

interface TechIconProps {
  tech: Tech;
  className?: string;
}

/**
 * Renders a technology logo in its brand colour. Near-black logos (Next.js, Express…)
 * use `currentColor` so they stay visible in both light and dark themes.
 * Technologies without a logo fall back to a monogram.
 */
export function TechIcon({ tech, className }: TechIconProps) {
  if (!tech.icon) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center rounded-md bg-surface-muted font-mono text-[0.6rem] leading-none font-bold text-foreground",
          className,
        )}
      >
        {tech.name.slice(0, 3)}
      </span>
    );
  }

  const { hex, slug } = tech.icon;
  const isDark = luminance(hex) < 0.08;

  // Paths live in a cached sprite (see app/icons.svg/route.ts) instead of being inlined
  // into the HTML and the React payload for every occurrence.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn(isDark && "text-foreground", className)}
      fill={isDark ? "currentColor" : `#${hex}`}
    >
      <use href={withBasePath(`/icons.svg#${slug}`)} />
    </svg>
  );
}
