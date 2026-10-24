import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        variant === "accent"
          ? "border-accent/30 bg-accent-soft text-accent"
          : "border-border bg-surface-muted text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
