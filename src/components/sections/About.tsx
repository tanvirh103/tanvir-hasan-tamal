import { Fragment } from "react";
import type { ComponentType, CSSProperties, ReactNode, SVGProps } from "react";

import { CreditCardIcon, GaugeIcon, LayersIcon, ZapIcon } from "@/components/icons";
import { Tilt } from "@/components/motion/Tilt";
import { Section } from "@/components/ui/Section";
import { education } from "@/data/education";
import { profile } from "@/data/profile";

const focusIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  LayersIcon,
  ZapIcon,
  CreditCardIcon,
  GaugeIcon,
];

const degree = education[0];
const major = degree?.details?.find((detail) => detail.label === "Major")?.value;

const quickFacts: { label: string; value: ReactNode }[] = [
  { label: "Location", value: profile.location },
  { label: "Role", value: "Full-Stack Engineer" },
  ...(degree
    ? [
        {
          label: "Education",
          value: (
            <>
              {degree.degree}
              {major && <span className="block text-muted">{major}</span>}
            </>
          ),
        },
      ]
    : []),
  {
    label: "Email",
    value: (
      <a
        href={`mailto:${profile.email}`}
        className="break-all text-accent underline-offset-4 transition-colors hover:underline focus-visible:underline"
      >
        {profile.email}
      </a>
    ),
  },
];

/*
 * Scroll-scrubbed "ink" effect for the manifesto. The paragraph exposes a named view timeline;
 * each word animates its opacity over a slightly later slice of it, so the text brightens word
 * by word as it travels up the viewport. Progressive enhancement only: without scroll-driven
 * animation support, or with reduced motion, the words are simply fully visible.
 */
const manifestoCss = `
@keyframes about-ink { from { opacity: 0.35; } to { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .about-manifesto { view-timeline-name: --about-manifesto; }
    .about-manifesto .about-word {
      animation: about-ink linear both;
      animation-timeline: --about-manifesto;
      animation-range: cover var(--ink-start) cover var(--ink-end);
    }
  }
}
`;

const manifestoWords = profile.about[0].split(/\s+/);

function Manifesto() {
  const total = manifestoWords.length;
  return (
    <>
      <style href="about-manifesto" precedence="default">
        {manifestoCss}
      </style>
      <p className="about-manifesto text-2xl leading-[1.18] font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
        {manifestoWords.map((word, index) => {
          // Sweep the words across ~35% of the paragraph's cover range, each over a 10% window.
          const start = 4 + (index / total) * 25;
          const style = {
            "--ink-start": `${start.toFixed(2)}%`,
            "--ink-end": `${(start + 10).toFixed(2)}%`,
          } as CSSProperties;
          return (
            <Fragment key={`${word}-${index}`}>
              <span className="about-word" style={style}>
                {word}
              </span>
              {index < total - 1 && " "}
            </Fragment>
          );
        })}
      </p>
    </>
  );
}

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          From interface to <em className="accent-serif">infrastructure</em>
        </>
      }
      className="overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 size-[28rem] opacity-60 bg-glow-2"
      />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky quick facts */}
        <aside aria-label="Quick facts" className="lg:col-span-4">
          <div className="reveal card p-6 sm:p-7 lg:sticky lg:top-28">
            <p className="flex items-center justify-between label-mono text-subtle">
              <span>Quick facts</span>
              <span aria-hidden="true">{String(quickFacts.length).padStart(2, "0")}</span>
            </p>
            <dl className="mt-5 divide-y divide-border border-t border-border">
              {quickFacts.map(({ label, value }) => (
                <div key={label} className="grid gap-1.5 py-4">
                  <dt className="label-mono text-subtle">{label}</dt>
                  <dd className="text-sm leading-relaxed text-foreground sm:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* Manifesto + focus areas */}
        <div className="lg:col-span-8">
          <Manifesto />
          {profile.about[1] && (
            <p className="reveal mt-8 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
              {profile.about[1]}
            </p>
          )}

          <div className="mt-16 flex items-center gap-4">
            <p className="label-mono text-muted">Focus areas</p>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>

          {/* Reveal sits on the list: on the Tilt items it would override their inline transform. */}
          <ul className="reveal mt-6 grid gap-4 sm:grid-cols-2">
            {profile.focusAreas.map(({ title, description }, index) => {
              const Icon = focusIcons[index] ?? LayersIcon;
              return (
                <Tilt
                  as="li"
                  key={title}
                  max={6}
                  className="spotlight relative card p-6 hover:border-border-strong sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-4 right-5 font-display text-6xl leading-none font-semibold tracking-tighter text-stroke select-none sm:text-7xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-10 text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                </Tilt>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
