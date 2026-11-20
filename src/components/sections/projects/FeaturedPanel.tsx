import type { CSSProperties } from "react";

import { ArrowUpRightIcon, TrophyIcon } from "@/components/icons";
import { Tilt } from "@/components/motion/Tilt";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import type { Project } from "@/types";

import { ProjectVisual } from "./visuals";

/*
 * Approximate geometry (in vh) used to line the "covered" animation up with the moment the
 * next panel slides over this one. The stack's view timeline runs across the whole list.
 */
const PANEL = 78;
const GAP = 6;
const topAt = (index: number) => 10 + 2.5 * index;

function coverRange(index: number, count: number) {
  const total = count * PANEL + (count - 1) * GAP;
  const from = Math.max(0, (index * (PANEL + GAP) + GAP - topAt(index)) / total);
  const to = ((index + 1) * (PANEL + GAP) - topAt(index + 1)) / total;
  return { from: `${(from * 100).toFixed(1)}%`, to: `${(to * 100).toFixed(1)}%` };
}

export function FeaturedPanel({
  project,
  index,
  count,
}: {
  project: Project;
  index: number;
  count: number;
}) {
  const { title, summary, stack, links, badge } = project;
  const isLast = index === count - 1;
  const range = coverRange(index, count);

  return (
    <li
      className="pj-item"
      data-covered={isLast ? undefined : ""}
      style={
        {
          "--pj-top": `calc(6rem + ${index * 1.75}rem)`,
          "--pj-from": range.from,
          "--pj-to": range.to,
        } as CSSProperties
      }
    >
      <article className="pj-panel relative grid overflow-clip card lg:min-h-[70vh] lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col p-6 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-accent">
              {String(index + 1).padStart(2, "0")}
              <span className="text-subtle"> / {String(count).padStart(2, "0")}</span>
            </span>
            {badge && (
              <Badge variant="accent">
                <TrophyIcon className="size-3.5" />
                {badge}
              </Badge>
            )}
          </div>

          <h3 className="mt-8 text-4xl leading-[0.95] font-semibold sm:text-5xl lg:mt-auto lg:text-6xl">
            {title}
          </h3>
          <p className="mt-5 max-w-xl leading-relaxed text-muted sm:text-lg">{summary}</p>

          <ul aria-label={`${title} tech stack`} className="mt-7 flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((link, linkIndex) => (
              <ButtonLink
                key={link.href}
                href={link.href}
                external
                size="sm"
                variant={linkIndex === 0 ? "primary" : "secondary"}
              >
                {link.label}
                <span className="sr-only"> for {title} (opens in a new tab)</span>
                <ArrowUpRightIcon aria-hidden="true" />
              </ButtonLink>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pj-visual relative flex items-center justify-center overflow-clip border-t border-border bg-surface-muted px-4 py-10 sm:px-10 lg:border-t-0 lg:border-l lg:py-12"
        >
          <div className="absolute inset-0 bg-dots mask-radial" />
          <div className="absolute -top-24 -right-24 size-96 bg-glow" />
          <div className="absolute -bottom-24 -left-20 size-80 bg-glow-2" />
          <div className="reveal-scale relative w-full max-w-md">
            <Tilt
              max={8}
              className="spotlight rounded-2xl border border-border-strong bg-background/85 shadow-float"
            >
              <ProjectVisual project={project} />
            </Tilt>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pj-shade pointer-events-none absolute inset-0 z-20 bg-background"
        />
      </article>
    </li>
  );
}
