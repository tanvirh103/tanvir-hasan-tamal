import { GraduationCapIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { education } from "@/data/education";

export function Education() {
  const [primary, ...rest] = education;

  return (
    <Section
      id="education"
      eyebrow="Education"
      title={
        <>
          Academic <span className="serif-accent">foundation</span>
        </>
      }
      description="A computer science degree focused on software engineering, web technologies and blockchain research."
      className="bg-surface-muted/60"
    >
      <div className="grid gap-3 lg:grid-cols-3">
        {primary && (
          <article className="reveal card p-6 sm:p-8 lg:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <GraduationCapIcon className="size-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {primary.degree}
                  </h3>
                  <p className="mt-1 font-medium text-accent">{primary.institution}</p>
                </div>
              </div>
              <Badge variant="outline" className="self-start font-mono">
                {primary.period}
              </Badge>
            </div>

            {primary.details && (
              <dl className="mt-8 grid gap-3">
                {primary.details.map(({ label, value }) => (
                  <div key={label} className="rounded-2xl border border-border bg-background p-5">
                    <dt className="font-mono text-[0.7rem] font-medium tracking-[0.15em] text-muted uppercase">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed sm:text-base">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        )}

        <ul className="grid gap-3">
          {rest.map((item) => (
            <li key={item.degree} className="reveal flex flex-col justify-center card p-6">
              <p className="font-mono text-xs text-muted">{item.period}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{item.degree}</h3>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
