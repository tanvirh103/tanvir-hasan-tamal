import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

const variants = {
  default: "border-transparent bg-surface-muted text-muted",
  accent: "border-accent/35 bg-accent-soft text-accent shadow-[0_0_14px_-6px_var(--glow)]",
  outline: "border-border bg-surface-muted/50 text-muted",
} as const;

/** Small mono label for tech stacks and status. */
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-xs whitespace-nowrap",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
