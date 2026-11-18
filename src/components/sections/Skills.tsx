import type { CSSProperties } from "react";

import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillGroups } from "@/data/skills";
import type { Tech } from "@/types";


function brandStyle(tech: Tech): CSSProperties | undefined {
  const hex = tech.icon?.hex;
  if (!hex) return undefined;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ];
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 70 ? undefined : ({ "--brand": `#${hex}` } as CSSProperties);
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="skills"
      title={
        <>
          A full <span className="text-neon">end-to-end</span> toolkit
        </>
      }
      description="The languages, frameworks and tools I use to take products from idea to production."
    >
      <div className="flex flex-col gap-14">
        {skillGroups.map((group) => (
          <div key={group.title} className="reveal">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-3">
              <h3 className="font-mono text-lg font-semibold">
                <span className="text-accent-2">{"<"}</span>
                {group.title}
                <span className="text-accent-2">{" />"}</span>
              </h3>
              <p className="text-sm text-muted">{group.description}</p>
            </div>

            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  style={brandStyle(tech)}
                  className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface/60 p-3 text-center backdrop-blur transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-[color-mix(in_oklch,var(--brand,var(--accent))_60%,transparent)] hover:shadow-[0_0_32px_-8px_var(--brand,var(--accent))]"
                >
                  <TechIcon
                    tech={tech}
                    className="size-8 transition-transform duration-300 group-hover:scale-110 sm:size-9"
                  />
                  <span className="font-mono text-[0.7rem] leading-tight text-muted transition-colors group-hover:text-foreground sm:text-xs">
                    {tech.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
