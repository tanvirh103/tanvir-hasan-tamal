import { HeartHandshakeIcon, TrophyIcon } from "@/components/icons";
import { Tilt } from "@/components/motion/Tilt";
import { Section } from "@/components/ui/Section";
import { achievements, volunteering } from "@/data/achievements";
import { cn } from "@/lib/cn";

export function Achievements() {
  return (
    <Section
      id="achievements"
      index="06"
      eyebrow="Recognition"
      title={
        <>
          Achievements &amp; <em className="accent-serif">leadership</em>
        </>
      }
      description="Competitions won along the way, and years of leadership and service through Bangladesh Scouts."
      className="overflow-clip"
    >
      <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
        {achievements.map(({ title, year, description }, index) => {
          const featured = index === 0;
          return (
            <li key={title} className="reveal-scale relative">
              {featured && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-80 blur-2xl bg-glow"
                />
              )}
              <Tilt
                as="article"
                max={6}
                className={cn(
                  "spotlight flex h-full min-h-[24rem] flex-col card p-6 sm:min-h-[28rem] sm:p-8",
                  featured && "border-beam border-accent/30 shadow-float",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-2xl",
                      featured
                        ? "bg-accent text-accent-foreground shadow-float"
                        : "border border-border bg-accent-soft text-accent",
                    )}
                  >
                    <TrophyIcon className="size-5" />
                  </span>
                  <span className="label-mono text-subtle">
                    <span className="sr-only">Year: </span>
                    {year}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-8 block font-display text-7xl leading-[0.85] font-semibold tracking-tighter text-stroke select-none md:text-6xl lg:text-8xl",
                    featured && "[-webkit-text-stroke-color:var(--accent)]",
                  )}
                >
                  {year}
                </span>

                <div className="mt-auto pt-10">
                  <h3 className="text-lg leading-snug font-semibold tracking-tight text-balance sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
                </div>
              </Tilt>
            </li>
          );
        })}
      </ul>

      <div className="reveal mt-20 grid gap-10 sm:mt-28 lg:grid-cols-[18rem_1fr] lg:gap-16">
        <div>
          <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-accent-soft text-accent">
            <HeartHandshakeIcon className="size-5" />
          </span>
          <h3 className="mt-6 text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Volunteering &amp; <em className="accent-serif">leadership</em>
          </h3>
          <p className="mt-3 label-mono text-subtle">{volunteering.length} engagements</p>
        </div>

        <ul className="grid border-t border-border sm:grid-cols-2 sm:gap-x-10">
          {volunteering.map(({ title, organization, date }) => (
            <li
              key={title}
              className="group grid grid-cols-[6.5rem_1fr] gap-4 border-b border-border py-5"
            >
              <span className="pt-1 font-mono text-xs text-subtle transition-colors group-hover:text-accent">
                {date}
              </span>
              <div className="min-w-0">
                <p className="leading-snug font-medium">{title}</p>
                {organization && <p className="mt-1 text-sm text-muted">{organization}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
