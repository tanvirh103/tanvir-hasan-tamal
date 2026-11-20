import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Container } from "./Container";

interface SectionProps {
  id: string;
  /** Short label above the heading, e.g. "Experience". */
  eyebrow: string;
  /** Two-digit section number, shown as a large outlined numeral, e.g. "02". */
  index?: string;
  /** Heading. Emphasise one word with <em className="accent-serif">…</em>. */
  title: ReactNode;
  description?: ReactNode;
  /** Optional content aligned to the right of the heading on wide screens (e.g. a link). */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Standard page section: outlined numeral, mono eyebrow, large display heading tied to the
 * section via aria-labelledby, and a scroll-driven reveal on the header.
 */
export function Section({
  id,
  eyebrow,
  index,
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
      className={cn("relative py-24 sm:py-32", className)}
    >
      <Container>
        <header className="reveal mb-14 grid gap-6 sm:mb-20 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-10">
          {index && (
            <span
              aria-hidden="true"
              className="font-display text-7xl leading-[0.8] font-semibold tracking-tighter text-stroke select-none sm:text-8xl lg:text-[9rem]"
            >
              {index}
            </span>
          )}
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2.5 label-mono text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="text-4xl leading-[1.02] font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {aside && <div className="shrink-0 md:pb-2">{aside}</div>}
        </header>
        {children}
      </Container>
    </section>
  );
}
