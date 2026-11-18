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
      eyebrow="about"
      title={
        <>
          Turning complex requirements into <span className="text-neon">fast, reliable</span>{" "}
          products
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="reveal space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {profile.about.map((paragraph, index) => (
            <p key={paragraph.slice(0, 24)} className={index === 0 ? "text-foreground" : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {profile.focusAreas.map(({ title, description }, index) => {
            const Icon = focusIcons[index % focusIcons.length] ?? LayersIcon;
            return (
              <li key={title} className="reveal glass-card p-6 hover:-translate-y-1">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent shadow-[0_0_20px_-8px_var(--glow)]">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
