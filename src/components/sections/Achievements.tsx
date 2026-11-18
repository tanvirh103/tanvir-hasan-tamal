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
      eyebrow="achievements"
      title={
        <>
          Achievements &amp; <span className="text-neon">leadership</span>
        </>
      }
      description="Competitions won along the way, and years of leadership and service through Bangladesh Scouts."
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {achievements.map(({ title, year, description }) => (
          <li
            key={title}
            className="reveal glass-card flex flex-col p-6 hover:-translate-y-1 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-highlight/40 bg-highlight/10 text-highlight shadow-[0_0_20px_-8px_var(--highlight)]">
                <TrophyIcon className="size-5" />
              </span>
              <span className="text-neon font-mono text-2xl font-bold">{year}</span>
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-20">
        <div className="reveal mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-accent-2/30 bg-accent-2/10 text-accent-2">
              <HeartHandshakeIcon className="size-6" />
            </span>
            <div>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Volunteer experience
              </h3>
              <p className="mt-1 text-sm text-muted sm:text-base">
                Service and leadership beyond the keyboard.
              </p>
            </div>
          </div>
          <Badge variant="outline" className="self-start sm:self-auto">
            {volunteering.length} activities · {volunteeringRange}
          </Badge>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {volunteering.map(({ title, organization, date }) => (
            <li key={title} className="reveal glass-card flex flex-col p-5">
              <span className="font-mono text-xs text-accent">{date}</span>
              <h4 className="mt-3 flex-1 leading-snug font-semibold">{title}</h4>
              {organization && <p className="mt-2 text-sm text-muted">{organization}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
