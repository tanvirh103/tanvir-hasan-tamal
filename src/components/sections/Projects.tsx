import { ArrowUpRightIcon, GithubIcon, TrophyIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { socialLinks } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import type { Project, Tech } from "@/types";

const githubProfile = socialLinks.find((link) => link.platform === "github")?.href;

// Logos for stack names that also appear in the skills data, used on featured tiles.
const techByName = new Map<string, Tech>(
  skillGroups.flatMap((group) => group.items).map((tech) => [tech.name, tech]),
);

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {project.links.map(({ label, href }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex h-10 items-center gap-2 rounded-full bg-surface-muted px-4 text-sm font-medium transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          <GithubIcon className="size-4" />
          {label}
          <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}

/** Large tile: a logo strip of the stack sits above the title like a cover. */
function FeaturedTile({ project }: { project: Project }) {
  const logos = project.stack.map((name) => techByName.get(name)).filter(Boolean) as Tech[];

  return (
    <article className="reveal flex tile-hover flex-col overflow-hidden tile">
      <div
        aria-hidden="true"
        className="relative flex h-40 items-center gap-3 overflow-hidden border-b border-border bg-surface-muted px-7 sm:h-48"
      >
        <div className="absolute inset-0 bg-dots opacity-60" />
        {logos.slice(0, 5).map((tech) => (
          <span
            key={tech.name}
            className="relative inline-flex size-14 items-center justify-center rounded-2xl border border-border bg-surface shadow-[var(--tile-shadow)]"
          >
            <TechIcon tech={tech} className="size-7" />
          </span>
        ))}
        {project.badge && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-medium shadow-[var(--tile-shadow)]">
            <TrophyIcon className="size-3.5 text-highlight" />
            {project.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{project.summary}</p>
        <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function SmallTile({ project }: { project: Project }) {
  return (
    <article className="reveal flex tile-hover flex-col tile p-6">
      <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <p className="mt-4 text-xs text-muted">{project.stack.join(" · ")}</p>
      <ProjectLinks project={project} />
    </article>
  );
}

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={
        <>
          Projects I&apos;m proud of,{" "}
          <span className="text-muted">from research to production.</span>
        </>
      }
      aside={
        githubProfile && (
          <ButtonLink
            href={githubProfile}
            variant="secondary"
            external
            className="self-start lg:self-end"
          >
            <GithubIcon />
            More on GitHub
          </ButtonLink>
        )
      }
    >
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        {featured.map((project) => (
          <FeaturedTile key={project.title} project={project} />
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {others.map((project) => (
          <SmallTile key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
