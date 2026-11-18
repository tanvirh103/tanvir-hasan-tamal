import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "btn-neon",
  secondary:
    "border border-border-strong bg-surface/60 text-foreground backdrop-blur hover:border-accent/60 hover:text-accent hover:shadow-[0_0_24px_-8px_var(--glow)]",
  ghost: "text-muted hover:bg-surface-muted hover:text-foreground",
};

/** Shared button styles for links and form buttons. */
export function buttonClassName(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "group/button inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-[background-color,color,border-color,box-shadow,translate,filter] duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
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
