import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills & tools"
      title="A modern, end-to-end toolkit"
      description="The languages, frameworks and tools I use to take products from idea to production."
      className="bg-surface-muted/50"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="reveal rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:p-6"
          >
            <h3 className="font-semibold">{group.title}</h3>
            <p className="mt-1 text-sm text-muted">{group.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm transition-colors hover:border-border-strong"
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
