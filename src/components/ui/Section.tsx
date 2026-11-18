import type { ReactNode } from "react";

import { navItems } from "@/data/profile";
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
  const position = navItems.findIndex((item) => item.id === id);
  const number = position >= 0 ? String(position + 1).padStart(2, "0") : null;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-24 sm:py-32", className)}>
      <Container>
        <header className="reveal mb-12 grid gap-6 sm:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
              {number && <span className="text-accent">{number}</span>}
              <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              {title}
            </h2>
          </div>
          {description && (
            <p className="max-w-sm text-base text-muted lg:text-right">{description}</p>
          )}
        </header>
        {children}
      </Container>
    </section>
  );
}
