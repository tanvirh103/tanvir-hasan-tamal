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
          Complex requirements, <span className="text-muted">turned into reliable products.</span>
        </>
      }
    >
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        <div className="reveal flex flex-col gap-5 tile p-7 text-base leading-relaxed text-muted sm:p-9 sm:text-lg">
          {profile.about.map((paragraph, index) => (
            <p key={paragraph.slice(0, 24)} className={index === 0 ? "text-foreground" : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {profile.focusAreas.map(({ title, description }, index) => {
            const Icon = focusIcons[index % focusIcons.length] ?? LayersIcon;
            return (
              <li key={title} className="reveal flex tile-hover flex-col tile p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
