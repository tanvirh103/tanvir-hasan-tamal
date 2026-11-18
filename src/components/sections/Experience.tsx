import { ChevronDownIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { experiences } from "@/data/experience";

/**
 * An accordion of roles built on native <details>, so it works with the keyboard and without
 * JavaScript. The current role starts open; opening one closes the others (shared `name`),
 * and the height animates smoothly in browsers that support it.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Where I&apos;ve worked, <span className="text-muted">and what I shipped.</span>
        </>
      }
      description="Remote roles shipping production features for multi-tenant SaaS platforms and client products."
    >
      <div className="flex flex-col gap-3">
        {experiences.map((job, index) => (
          <details
            key={`${job.company}-${job.period}`}
            name="experience"
            open={index === 0}
            className="reveal group accordion overflow-hidden tile"
          >
            <summary className="flex items-center gap-4 p-5 transition-colors duration-300 hover:bg-surface-muted/60 sm:gap-6 sm:p-7">
              <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-surface-muted text-sm font-semibold sm:inline-flex">
                {job.company.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-semibold tracking-tight sm:text-xl">
                    {job.role}
                  </span>
                  {job.current && <Badge variant="accent">Current</Badge>}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {job.company}
                  {" · "}
                  {[job.location, job.employmentType].filter(Boolean).join(" · ")}
                </span>
              </span>
              <span className="hidden text-sm whitespace-nowrap text-muted tabular-nums md:block">
                {job.period}
              </span>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-muted transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180">
                <ChevronDownIcon className="size-4" />
              </span>
            </summary>

            <div className="border-t border-border px-5 pt-5 pb-6 sm:px-7 sm:pb-8 sm:pl-[6.5rem]">
              <p className="text-sm text-muted md:hidden">{job.period}</p>
              <ul className="mt-3 grid gap-3 text-[0.95rem] leading-relaxed text-muted md:mt-0">
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
              <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
