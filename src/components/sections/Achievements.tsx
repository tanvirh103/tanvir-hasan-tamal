import { HeartHandshakeIcon, TrophyIcon } from "@/components/icons";
import { Section } from "@/components/ui/Section";
import { achievements, volunteering } from "@/data/achievements";

// Years span from the oldest to the newest activity, e.g. "2013 — 2022".
const volunteeringYears = volunteering.flatMap(({ date }) => date.match(/\d{4}/g) ?? []).sort();
const volunteeringRange = [...new Set([volunteeringYears[0], volunteeringYears.at(-1)])].join(
  " — ",
);

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Recognition"
      title={
        <>
          Achievements and leadership, <span className="text-muted">beyond the keyboard.</span>
        </>
      }
    >
      <ul className="grid gap-3 sm:gap-4 md:grid-cols-3">
        {achievements.map(({ title, year, description }) => (
          <li key={title} className="reveal flex tile-hover flex-col tile p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-highlight/15 text-highlight">
                <TrophyIcon className="size-5" />
              </span>
              <span className="rounded-full bg-surface-muted px-3 py-1 text-sm font-medium tabular-nums">
                {year}
              </span>
            </div>
            <h3 className="mt-6 font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
          </li>
        ))}
      </ul>

      <div className="reveal mt-3 tile p-6 sm:mt-4 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <HeartHandshakeIcon className="size-5" />
            </span>
            <h3 className="text-lg font-semibold tracking-tight">Volunteer experience</h3>
          </div>
          <p className="text-sm text-muted tabular-nums">
            {volunteering.length} activities · {volunteeringRange}
          </p>
        </div>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {volunteering.map(({ title, organization, date }) => (
            <li key={title} className="flex flex-col rounded-2xl bg-surface-muted p-4">
              <span className="text-xs text-muted tabular-nums">{date}</span>
              <span className="mt-2 flex-1 text-sm leading-snug font-medium">{title}</span>
              {organization && <span className="mt-2 text-xs text-muted">{organization}</span>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
