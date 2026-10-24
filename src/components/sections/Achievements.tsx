import { HeartHandshakeIcon, TrophyIcon } from "@/components/icons";
import { Section } from "@/components/ui/Section";
import { achievements, volunteering } from "@/data/achievements";

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

      <div className="reveal mt-4 rounded-2xl border border-border bg-surface p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
            <HeartHandshakeIcon className="size-5" />
          </span>
          <h3 className="font-semibold">Volunteer experience</h3>
        </div>
        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
          {volunteering.map(({ title, date }) => (
            <li
              key={title}
              className="flex items-baseline justify-between gap-4 border-b border-border py-3 text-sm last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
            >
              <span>{title}</span>
              <span className="shrink-0 font-mono text-xs text-muted">{date}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
