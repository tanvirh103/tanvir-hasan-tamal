import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Where I&apos;ve been <span className="serif-accent">building</span>
        </>
      }
      description="Remote roles shipping production features for multi-tenant SaaS platforms and client products."
    >
      <ol className="border-t border-border">
        {experiences.map((job) => (
          <li
            key={`${job.company}-${job.period}`}
            className="reveal grid gap-6 border-b border-border py-10 sm:py-12 lg:grid-cols-[18rem_1fr] lg:gap-16"
          >
            <div className="flex flex-wrap items-start gap-2 lg:flex-col lg:gap-3">
              <p className="font-mono text-sm text-muted">{job.period}</p>
              {job.current && (
                <Badge variant="accent">
                  <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                  Current
                </Badge>
              )}
            </div>

            <article>
              <header>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{job.role}</h3>
                <p className="mt-2 text-base">
                  <span className="font-medium text-accent">{job.company}</span>
                  <span className="text-muted">
                    {" · "}
                    {[job.location, job.employmentType].filter(Boolean).join(" · ")}
                  </span>
                </p>
              </header>

              <ul className="mt-6 grid gap-3 text-[0.95rem] leading-relaxed text-muted sm:text-base">
                {job.highlights.map((highlight) => (
                  <li key={highlight.slice(0, 32)} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
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
    </Section>
  );
}
