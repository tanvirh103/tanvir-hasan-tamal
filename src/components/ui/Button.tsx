import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:shadow-[0_0_0_6px_var(--accent-soft),0_12px_32px_-10px_var(--accent-ring)]",
  secondary:
    "border border-border-strong bg-surface/60 text-foreground backdrop-blur hover:border-foreground/40 hover:bg-surface",
  ghost: "text-muted hover:bg-surface-muted hover:text-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

/**
 * Shared button styles for links and form buttons. Icons placed after the label slide
 * slightly on hover (the button is a `group/btn`).
 */
export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
  size: ButtonSize = "md",
): string {
  return cn(
    "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:last-child]:transition-transform [&_svg:last-child]:duration-300 hover:[&_svg:last-child]:translate-x-0.5",
    sizes[size],
    variants[variant],
    className,
  );
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
}

/**
 * A link styled as a button. Internal routes (starting with "/") use Next.js `Link`
 * for client-side navigation; everything else renders a plain anchor.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClassName(variant, className, size);

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
