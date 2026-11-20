import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/cn";

import { TechSphere } from "./skills/TechSphere";
import { uniqueTechs } from "./skills/sphere";

const techs = uniqueTechs(skillGroups);

/** The first two groups span both bento columns; the remaining four pair up evenly. */
const wideGroups = new Set(["Languages", "Frontend"]);

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Skills"
      title={
        <>
          A toolkit for the <em className="accent-serif">whole</em> stack
        </>
      }
      description="The languages, frameworks and tools I use to take products from idea to production."
      className="overflow-clip"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <TechSphere techs={techs} className="hidden md:block" />
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 label-mono text-subtle md:mt-6">
            <span>
              <span className="text-foreground">{techs.length}</span> technologies
            </span>
            <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
            <span>
              <span className="text-foreground">{skillGroups.length}</span> disciplines
            </span>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <article
              key={group.title}
              className={cn(
                "reveal flex flex-col card p-5 sm:p-6",
                wideGroups.has(group.title) && "sm:col-span-2",
              )}
            >
              <p className="flex items-center justify-between gap-3 label-mono text-subtle">
                <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  {String(group.items.length).padStart(2, "0")}{" "}
                  {group.items.length === 1 ? "tool" : "tools"}
                </span>
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
                {group.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} technologies`}>
                {group.items.map((tech) => (
                  <li
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[0.72rem] font-medium whitespace-nowrap text-foreground"
                  >
                    <TechIcon tech={tech} className="size-3.5 shrink-0" />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
