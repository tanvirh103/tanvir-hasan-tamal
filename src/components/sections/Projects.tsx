import { ArrowUpRightIcon, GithubIcon, TrophyIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { socialLinks } from "@/data/profile";
import { cn } from "@/lib/cn";
import type { Project } from "@/types";

const githubProfile = socialLinks.find((link) => link.platform === "github")?.href;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { title, summary, stack, links, featured, badge } = project;

  return (
    <article
      className={cn(
        "reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:p-7",
        featured && "lg:p-8",
      )}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
        {badge && (
          <Badge variant="accent">
            <TrophyIcon className="size-3.5" />
            {badge}
          </Badge>
        )}
      </div>

      <h3
        className={cn(
          "mt-4 font-display tracking-tight",
          featured ? "text-2xl sm:text-3xl" : "text-xl",
        )}
      >
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">{summary}</p>

      <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5">
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
          >
            <GithubIcon className="size-4" />
            {label}
            <ArrowUpRightIcon className="size-3.5" />
            <span className="sr-only">for {title} (opens in a new tab)</span>
          </a>
        ))}
      </div>
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
      title="Projects I'm proud of"
      description="From award-winning blockchain research to full-stack web platforms."
    >
      <ul className="grid gap-4 lg:grid-cols-2">
        {featured.map((project, index) => (
          <li key={project.title}>
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {others.map((project, index) => (
          <li key={project.title}>
            <ProjectCard project={project} index={featured.length + index} />
          </li>
        ))}
      </ul>

      {githubProfile && (
        <div className="reveal mt-10 flex justify-center">
          <ButtonLink href={githubProfile} variant="secondary" external>
            <GithubIcon />
            More on GitHub
            <ArrowUpRightIcon />
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}
