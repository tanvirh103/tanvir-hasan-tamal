import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills & tools"
      title={
        <>
          A modern, <span className="serif-accent">end-to-end</span> toolkit
        </>
      }
      description="The languages, frameworks and tools I use to take products from idea to production."
      className="bg-surface-muted/60"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title} className="reveal card-hover card p-6 sm:p-7">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
              <span className="font-mono text-xs text-muted">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-muted">{group.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-border-strong"
                >
                  <TechIcon tech={tech} className="size-4" />
                  {tech.name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
