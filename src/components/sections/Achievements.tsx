import { HeartHandshakeIcon, TrophyIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
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
      title="Achievements & leadership"
      description="Competitions won along the way, and years of leadership and service through Bangladesh Scouts."
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {achievements.map(({ title, year, description }) => (
          <li
            key={title}
            className="reveal flex flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <TrophyIcon className="size-5" />
              </span>
              <span className="font-mono text-sm text-muted">{year}</span>
            </div>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16 sm:mt-20">
        <header className="reveal mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <HeartHandshakeIcon className="size-6" />
            </span>
            <div>
              <h3 className="font-display text-2xl tracking-tight sm:text-3xl">
                Volunteer experience
              </h3>
              <p className="mt-1 text-sm text-muted sm:text-base">
                Service and leadership beyond the keyboard.
              </p>
            </div>
          </div>
          <Badge className="self-start sm:self-auto">
            {volunteering.length} activities · {volunteeringRange}
          </Badge>
        </header>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {volunteering.map(({ title, organization, date }, index) => (
            <li
              key={title}
              className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:p-6"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-accent/0 via-accent/60 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Badge>{date}</Badge>
              </div>
              <h4 className="mt-4 flex-1 leading-snug font-semibold">{title}</h4>
              {organization && (
                <p className="mt-3 text-sm font-medium text-accent">{organization}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
