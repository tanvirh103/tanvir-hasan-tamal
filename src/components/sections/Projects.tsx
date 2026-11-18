import { ArrowUpRightIcon, GithubIcon, TrophyIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { socialLinks } from "@/data/profile";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

const githubProfile = socialLinks.find((link) => link.platform === "github")?.href;

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
      {project.links.map(({ label, href }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 rounded-sm font-mono text-sm text-foreground transition-colors hover:text-accent"
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

/** Featured project: rotating neon border, 3D tilt and a terminal-style path header. */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <div data-tilt className="reveal h-full tilt">
      <div className="neon-frame h-full shadow-[0_24px_70px_-30px_var(--glow)]">
        <article className="flex h-full flex-col rounded-[1.3rem] bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs text-muted">
              <span className="text-accent">~/projects/</span>
              {slug(project.title)}
            </p>
            {project.badge && (
              <Badge variant="accent">
                <TrophyIcon className="size-3.5" />
                {project.badge}
              </Badge>
            )}
          </div>

          <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-3 flex-1 leading-relaxed text-muted">{project.summary}</p>
          <StackList stack={project.stack} />
          <ProjectLinks project={project} />
        </article>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="reveal glass-card flex h-full flex-col p-6 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span
          aria-hidden="true"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-accent-2/30 bg-accent-2/10 font-mono text-sm font-semibold text-accent-2"
        >
          {"</>"}
        </span>
        <span className="font-mono text-xs text-muted">{slug(project.title)}</span>
      </div>
      <h3 className="mt-5 text-xl font-bold tracking-tight">{project.title}</h3>
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
      eyebrow="projects"
      title={
        <>
          Projects I&apos;m <span className="text-neon">proud</span> of
        </>
      }
      description="From award-winning blockchain research to full-stack web platforms."
    >
      <ul className="grid gap-6 lg:grid-cols-2">
        {featured.map((project) => (
          <li key={project.title}>
            <FeaturedCard project={project} />
          </li>
        ))}
      </ul>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
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
