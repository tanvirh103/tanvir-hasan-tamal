import type { ComponentType, SVGProps } from "react";

import { CreditCardIcon, GaugeIcon, LayersIcon, ZapIcon } from "@/components/icons";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";

const focusIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  LayersIcon,
  ZapIcon,
  CreditCardIcon,
  GaugeIcon,
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About me"
      title={
        <>
          Engineering products that are <span className="text-gradient">fast, reliable</span> and
          built to scale.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="reveal space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {profile.focusAreas.map(({ title, description }, index) => {
            const Icon = focusIcons[index % focusIcons.length] ?? LayersIcon;
            return (
              <li
                key={title}
                className="reveal rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
