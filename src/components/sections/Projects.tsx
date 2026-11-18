import { ArrowUpRightIcon, GithubIcon, TrophyIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { socialLinks } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { Project } from "@/types";

const githubProfile = socialLinks.find((link) => link.platform === "github")?.href;

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5">
      {project.links.map(({ label, href }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
        >
          <GithubIcon className="size-4" />
          {label}
          <ArrowUpRightIcon className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li key={tech}>
          <Badge variant="outline">{tech}</Badge>
        </li>
      ))}
    </ul>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="reveal group flex h-full card-hover flex-col overflow-hidden card">
      {/* Decorative cover: a soft gradient mesh with the project number. */}
      <div
        aria-hidden="true"
        className={cn(
          "relative h-44 overflow-hidden border-b border-border sm:h-56",
          index % 2 === 0
            ? "bg-[radial-gradient(120%_120%_at_0%_0%,var(--accent-soft),transparent_60%),radial-gradient(80%_100%_at_100%_100%,color-mix(in_oklch,var(--accent-2)_18%,transparent),transparent_70%)]"
            : "bg-[radial-gradient(120%_120%_at_100%_0%,var(--accent-soft),transparent_60%),radial-gradient(80%_100%_at_0%_100%,color-mix(in_oklch,var(--accent-2)_18%,transparent),transparent_70%)]",
        )}
      >
        <div className="absolute inset-0 bg-dots mask-fade-b opacity-70" />
        <span className="absolute right-6 bottom-2 font-serif text-[7rem] leading-none text-foreground/10 italic transition-transform duration-500 group-hover:-translate-y-1 sm:text-[9rem]">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.badge && (
          <Badge variant="accent" className="absolute top-5 left-5 bg-surface/80 backdrop-blur">
            <TrophyIcon className="size-3.5" />
            {project.badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{project.summary}</p>
        <StackList stack={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="reveal flex h-full card-hover flex-col card p-6">
      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <StackList stack={project.stack} />
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
          Projects I&apos;m <span className="serif-accent">proud</span> of
        </>
      }
      description="From award-winning blockchain research to full-stack web platforms."
    >
      <ul className="grid gap-3 lg:grid-cols-2">
        {featured.map((project, index) => (
          <li key={project.title}>
            <FeaturedCard project={project} index={index} />
          </li>
        ))}
      </ul>

      <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {others.map((project, index) => (
          <li key={project.title}>
            <ProjectCard project={project} index={featured.length + index} />
          </li>
        ))}
      </ul>

      {githubProfile && (
        <div className="reveal mt-12 flex justify-center">
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
