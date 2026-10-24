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
      title="Academic foundation"
      description="A computer science degree focused on software engineering, web technologies and blockchain research."
      className="bg-surface-muted/50"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {primary && (
          <article className="reveal rounded-2xl border border-border bg-surface p-5 sm:p-7 lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <GraduationCapIcon className="size-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold sm:text-xl">{primary.degree}</h3>
                  <p className="mt-1 font-medium text-accent">{primary.institution}</p>
                </div>
              </div>
              <Badge className="self-start">{primary.period}</Badge>
            </div>

            {primary.details && (
              <dl className="mt-6 grid gap-4">
                {primary.details.map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-border bg-background p-4">
                    <dt className="text-xs font-medium tracking-wider text-muted uppercase">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed sm:text-base">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        )}

        <ul className="grid gap-4">
          {rest.map((item) => (
            <li
              key={item.degree}
              className="reveal flex flex-col justify-center rounded-2xl border border-border bg-surface p-5 sm:p-6"
            >
              <Badge className="self-start">{item.period}</Badge>
              <h3 className="mt-3 font-semibold">{item.degree}</h3>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
