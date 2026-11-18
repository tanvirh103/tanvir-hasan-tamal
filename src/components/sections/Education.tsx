import { GraduationCapIcon } from "@/components/icons";
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
          Academic foundation, <span className="text-muted">rooted in software engineering.</span>
        </>
      }
    >
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        {primary && (
          <article className="reveal tile p-7 sm:p-9 lg:col-span-2">
            <div className="flex items-start gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <GraduationCapIcon className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-muted tabular-nums">{primary.period}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                  {primary.degree}
                </h3>
                <p className="mt-1 text-muted">{primary.institution}</p>
              </div>
            </div>

            {primary.details && (
              <dl className="mt-8 grid gap-2">
                {primary.details.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-surface-muted p-4 sm:grid sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="text-sm font-medium">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted sm:mt-0">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        )}

        <ul className="grid gap-3 sm:gap-4">
          {rest.map((item) => (
            <li key={item.degree} className="reveal flex flex-col justify-center tile p-6">
              <p className="text-sm text-muted tabular-nums">{item.period}</p>
              <h3 className="mt-2 font-semibold tracking-tight">{item.degree}</h3>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
