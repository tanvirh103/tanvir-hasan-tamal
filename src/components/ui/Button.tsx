import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background hover:bg-accent hover:text-accent-foreground shadow-sm",
  secondary: "border border-border-strong bg-surface hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-foreground hover:bg-surface-muted",
};

/** Shared button styles for links and form buttons. */
export function buttonClassName(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
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
