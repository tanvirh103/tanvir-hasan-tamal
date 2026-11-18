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
      title={
        <>
          Achievements &amp; <span className="serif-accent">leadership</span>
        </>
      }
      description="Competitions won along the way, and years of leadership and service through Bangladesh Scouts."
    >
      <ul className="grid gap-3 md:grid-cols-3">
        {achievements.map(({ title, year, description }) => (
          <li key={title} className="reveal flex card-hover flex-col card p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                <TrophyIcon className="size-5" />
              </span>
              <span className="font-serif text-3xl text-muted italic">{year}</span>
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-20 sm:mt-24">
        <header className="reveal mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <HeartHandshakeIcon className="size-6" />
            </span>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Volunteer experience
              </h3>
              <p className="mt-1 text-sm text-muted sm:text-base">
                Service and leadership beyond the keyboard.
              </p>
            </div>
          </div>
          <Badge variant="outline" className="self-start font-mono sm:self-auto">
            {volunteering.length} activities · {volunteeringRange}
          </Badge>
        </header>

        <ol className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {volunteering.map(({ title, organization, date }, index) => (
            <li
              key={title}
              className="reveal group flex flex-col border-r border-b border-border p-6 transition-colors hover:bg-surface sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-muted">{date}</span>
              </div>
              <h4 className="mt-5 flex-1 leading-snug font-semibold transition-colors group-hover:text-accent">
                {title}
              </h4>
              {organization && <p className="mt-3 text-sm text-muted">{organization}</p>}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
