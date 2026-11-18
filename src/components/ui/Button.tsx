import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background hover:opacity-85",
  secondary: "border border-border-strong bg-surface text-foreground hover:bg-surface-muted",
  ghost: "text-muted hover:bg-surface-muted hover:text-foreground",
  // For use on an inverted (bg-foreground) surface.
  inverse: "bg-background text-foreground hover:opacity-90",
  "inverse-outline": "border border-background/25 text-background hover:bg-background/10",
};

/** Shared button styles for links and form buttons. */
export function buttonClassName(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "group/button inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-[background-color,color,border-color,opacity,scale] duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
    variants[variant],
    className,
  );
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
}

/**
 * A link styled as a button. Internal routes (starting with "/") use Next.js `Link`
 * for client-side navigation; everything else renders a plain anchor.
 */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClassName(variant, className);

  if (href.startsWith("/") && !external) {
    return <Link href={href} className={classes} {...props} />;
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  );
}
