import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { Tilt } from "@/components/motion/Tilt";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/cn";

/**
 * Rail geometry. Mobile: the rail hugs the left edge and every row is indented past it.
 * md+: the rail sits in the gutter between the period column and the card column.
 */
const RAIL_X =
  "left-[0.6875rem] md:left-[calc(12rem+2.5rem)] lg:left-[calc(15rem+3.5rem)] xl:left-[calc(17rem+3.5rem)]";
const ROW_GRID =
  "pl-10 sm:pl-12 md:grid md:grid-cols-[12rem_minmax(0,1fr)] md:gap-x-20 md:pl-0 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-28 xl:grid-cols-[17rem_minmax(0,1fr)]";

/**
 * Scroll-driven rail fill (progressive enhancement). The fill spans the timeline, so its own
 * view() timeline tracks the list: it starts when the list top reaches mid-viewport and is full
 * when the list bottom gets there. Without support, or with reduced motion, the rail is static
 * and fully drawn.
 */
const railCss = `
@keyframes xp-rail-fill { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .xp-rail-fill {
      animation: xp-rail-fill linear both;
      animation-timeline: view();
      animation-range: cover 50vh cover calc(100% - 50vh);
    }
  }
}
`;

function startYear(period: string) {
  return period.match(/\d{4}/)?.[0] ?? period;
}

/** Rail node: accent ring with the pulsing status dot for the current role, quiet otherwise. */
function RailNode({ current }: { current?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-3 z-10 flex size-[1.375rem] -translate-x-1/2 items-center justify-center rounded-full border bg-background md:top-6",
        RAIL_X,
        current ? "border-accent ring-[6px] ring-accent-ring/40" : "border-border-strong",
      )}
    >
      <span
        className={cn(
          "relative rounded-full",
          current ? "animate-pulse-dot size-2 bg-success" : "size-1.5 bg-accent/70",
        )}
      />
    </span>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title={
        <>
          Where I&apos;ve been <em className="accent-serif">shipping</em>
        </>
      }
      description="Remote engineering roles shipping production features for multi-tenant SaaS platforms and client products."
      className="overflow-x-clip"
    >
      <style href="xp-rail" precedence="default">
        {railCss}
      </style>

      <div className="relative">
        {/* Rail: hairline track plus the gradient fill that draws in as you scroll. */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-3 bottom-0 w-px -translate-x-1/2 bg-border md:top-6",
            RAIL_X,
          )}
        >
          <span className="xp-rail-fill absolute inset-0 origin-top rounded-full bg-linear-to-b from-accent via-accent to-accent-2 will-change-transform" />
          <span className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-background" />
        </span>

        <ol className="relative space-y-20 sm:space-y-28">
          {experiences.map((job) => (
            <li key={`${job.company}-${job.period}`} className={cn("reveal relative", ROW_GRID)}>
              <RailNode current={job.current} />

              {/* Period block */}
              <div className="mb-6 md:sticky md:top-28 md:mb-0 md:self-start md:pt-2">
                <p
                  aria-hidden="true"
                  className={cn(
                    "font-display text-6xl leading-[0.85] font-semibold tracking-tighter select-none sm:text-7xl lg:text-8xl",
                    job.current ? "text-foreground" : "text-stroke",
                  )}
                >
                  {startYear(job.period)}
                </p>
                <dl className="mt-5 space-y-1.5 font-mono text-xs leading-relaxed">
                  <div>
                    <dt className="sr-only">Period</dt>
                    <dd className="font-medium text-foreground">{job.period}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Location and work type</dt>
                    <dd className="text-subtle">
                      {[job.location, job.employmentType].filter(Boolean).join(" · ")}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Role card */}
              <Tilt
                as="article"
                max={4}
                className={cn(
                  "spotlight card p-6 sm:p-9 lg:p-11",
                  job.current && "border-beam shadow-float",
                )}
              >
                <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                  <div className="min-w-0">
                    <h3 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                      {job.role}
                    </h3>
                    <p className="mt-2 text-base font-medium break-words text-accent sm:text-lg">
                      {job.company}
                    </p>
                  </div>
                  {job.current && (
                    <Badge variant="accent">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                      Now
                    </Badge>
                  )}
                </header>

                <ul className="mt-8 max-w-[68ch] space-y-4 text-[0.95rem] leading-relaxed text-muted sm:text-base">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-[0.8em] h-px w-4 shrink-0 bg-linear-to-r from-accent to-accent/0"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ul
                  aria-label={`Tech stack at ${job.company}`}
                  className="mt-9 flex flex-wrap gap-2 border-t border-border pt-6"
                >
                  {job.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </Tilt>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
