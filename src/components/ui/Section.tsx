import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Container } from "./Container";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-20 sm:py-28", className)}>
      <Container>
        <header className="reveal mb-12 max-w-2xl sm:mb-16">
          <p className="mb-3 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="font-display text-3xl tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base text-pretty text-muted sm:text-lg">{description}</p>
          )}
        </header>
        {children}
      </Container>
    </section>
  );
}
