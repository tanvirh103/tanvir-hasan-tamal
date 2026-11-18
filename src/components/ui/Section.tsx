import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionProps {
  id: string;
  eyebrow: string;
  /** Two-tone headings read well here: wrap the quieter half in `<span className="text-muted">`. */
  title: ReactNode;
  description?: string;
  /** Optional element placed opposite the heading on wide screens (filters, links). */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  aside,
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("px-4 py-16 sm:px-6 sm:py-24 lg:px-8", className)}
    >
      <div className="mx-auto max-w-6xl">
        <header className="reveal mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-3 text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {aside}
        </header>
        {children}
      </div>
    </section>
  );
}
