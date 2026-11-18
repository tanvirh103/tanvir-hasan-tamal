import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { experiences } from "@/data/experience";

/**
 * A vertical timeline. Its neon spine fills as the list scrolls through the viewport, and each
 * role sits in a glass card with a cursor spotlight.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="experience"
      title={
        <>
          Where I&apos;ve been <span className="text-neon">building</span>
        </>
      }
      description="Remote roles shipping production features for multi-tenant SaaS platforms and client products."
    >
      <div className="timeline relative">
        {/* Spine: a faint track with a glowing fill on top. */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[11px]"
        >
          <div className="timeline-fill absolute inset-0 origin-top bg-linear-to-b from-accent via-accent-2 to-accent shadow-[0_0_12px_var(--glow)]" />
        </div>

        <ol className="flex flex-col gap-8">
          {experiences.map((job) => (
            <li key={`${job.company}-${job.period}`} className="reveal relative pl-8 sm:pl-12">
              <span
                aria-hidden="true"
                className="absolute top-7 left-0 flex size-[15px] items-center justify-center rounded-full border border-accent/60 bg-background shadow-[0_0_14px_var(--glow)] sm:size-[23px]"
              >
                <span className="size-1.5 rounded-full bg-accent sm:size-2" />
              </span>

              <article className="glass-card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-sm text-accent">{job.period}</p>
                  {job.current && (
                    <Badge variant="accent">
                      <span
                        className="pulse-dot relative size-1.5 rounded-full bg-current"
                        aria-hidden="true"
                      />
                      Current
                    </Badge>
                  )}
                </div>

                <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{job.role}</h3>
                <p className="mt-1.5 text-base">
                  <span className="font-semibold text-accent-2">{job.company}</span>
                  <span className="text-muted">
                    {" · "}
                    {[job.location, job.employmentType].filter(Boolean).join(" · ")}
                  </span>
                </p>

                <ul className="mt-6 grid gap-3 text-[0.95rem] leading-relaxed text-muted sm:text-base">
                  {job.highlights.map((highlight) => (
                    <li key={highlight.slice(0, 32)} className="flex gap-3">
                      <span aria-hidden="true" className="mt-0.5 font-mono text-accent">
                        ▹
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
