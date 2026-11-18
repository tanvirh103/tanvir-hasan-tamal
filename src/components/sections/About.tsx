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
          Engineering products that are fast, <span className="serif-accent">reliable</span> and
          built to scale.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal space-y-6 text-lg leading-relaxed text-muted sm:text-xl">
          {profile.about.map((paragraph, index) => (
            <p key={paragraph.slice(0, 24)} className={index === 0 ? "text-foreground" : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {profile.focusAreas.map(({ title, description }, index) => {
            const Icon = focusIcons[index % focusIcons.length] ?? LayersIcon;
            return (
              <li key={title} className="reveal card-hover card p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
