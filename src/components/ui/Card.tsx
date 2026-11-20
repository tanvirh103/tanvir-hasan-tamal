import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type CardProps<T extends ElementType> = {
  as?: T;
  /** Lift and accent the border on hover. Use only for cards that are links or contain one. */
  interactive?: boolean;
} & ComponentPropsWithoutRef<T>;

/** Shared card surface (border, background, radius, shadow from design tokens). */
export function Card<T extends ElementType = "div">({
  as,
  interactive = false,
  className,
  ...props
}: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component className={cn("card", interactive && "card-interactive", className)} {...props} />
  );
}
