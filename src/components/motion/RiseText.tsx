import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface RiseTextProps {
  /** Each entry renders as its own masked line that rises into place. */
  lines: ReactNode[];
  /** Delay before the first line, in ms. */
  delay?: number;
  /** Delay between lines, in ms. */
  stagger?: number;
  className?: string;
  lineClassName?: string;
}

/**
 * Display text that rises line by line from behind a mask (CSS only, server rendered).
 * The text is in the HTML from the start, so it is readable by crawlers and assistive tech.
 */
export function RiseText({
  lines,
  delay = 0,
  stagger = 90,
  className,
  lineClassName,
}: RiseTextProps) {
  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        <span key={index} className={cn("line-mask", lineClassName)}>
          <span
            className="block animate-rise"
            style={{ animationDelay: `${delay + index * stagger}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
