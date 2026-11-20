import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  /** `default` for tech/meta chips, `accent` for highlights, `outline` for quiet labels. */
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] font-medium tracking-wide whitespace-nowrap",
        variant === "accent" && "border-accent/30 bg-accent-soft text-accent",
        variant === "default" && "border-border bg-surface-muted text-muted",
        variant === "outline" && "border-border-strong text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
