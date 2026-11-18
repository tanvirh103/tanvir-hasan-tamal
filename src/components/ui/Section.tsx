import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionProps {
  id: string;
  /** Short label rendered as a code comment, e.g. "about" becomes `// about`. */
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("relative px-4 py-24 sm:px-6 sm:py-32 lg:px-10", className)}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 max-w-3xl sm:mb-16">
          <p className="reveal font-mono text-sm text-accent">
            <span className="text-muted">{"// "}</span>
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="reveal mt-4 text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl"
          >
            {title}
          </h2>
          {description && (
            <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
