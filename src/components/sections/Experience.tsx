import { BriefcaseIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been building"
      description="Remote roles shipping production features for multi-tenant SaaS platforms and client products."
    >
      <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[1.1875rem] before:w-px before:bg-linear-to-b before:from-accent before:via-border before:to-transparent max-sm:before:hidden sm:space-y-8">
        {experiences.map((job) => (
          <li key={`${job.company}-${job.period}`} className="reveal relative sm:pl-16">
            <span
              aria-hidden="true"
              className="absolute top-6 left-0 hidden size-10 items-center justify-center rounded-full border border-border bg-surface text-accent sm:flex"
            >
              <BriefcaseIcon className="size-[1.125rem]" />
            </span>

            <article className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:p-7">
              <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold sm:text-xl">{job.role}</h3>
                  <p className="mt-1 font-medium break-words text-accent">{job.company}</p>
                  <p className="mt-1 text-sm text-muted">
                    {[job.location, job.employmentType].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {job.current && <Badge variant="accent">Current</Badge>}
                  <Badge>{job.period}</Badge>
                </div>
              </header>

              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted sm:text-base">
                {job.highlights.map((highlight) => (
                  <li key={highlight.slice(0, 32)} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
