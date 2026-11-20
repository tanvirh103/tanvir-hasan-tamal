import { ArrowUpRightIcon } from "@/components/icons";
import { Section } from "@/components/ui/Section";
import { socialLinks } from "@/data/profile";
import { projects } from "@/data/projects";

import { FeaturedPanel } from "./projects/FeaturedPanel";
import { ProjectRow } from "./projects/ProjectRow";
import { projectsCss } from "./projects/styles";

const githubProfile = socialLinks.find((link) => link.platform === "github")?.href;

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Selected work"
      title={
        <>
          Things I&apos;ve <em className="accent-serif">built</em>
        </>
      }
      description="From an award-winning Layer-1 blockchain to full-stack web platforms, a selection of personal and team projects."
      className="overflow-x-clip"
      aside={
        githubProfile && (
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            All projects on GitHub
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )
      }
    >
      <style href="projects-section" precedence="medium">
        {projectsCss}
      </style>

      {/* Featured projects: sticky panels that stack over each other on large screens. */}
      <ol aria-label="Featured projects" className="pj-stack flex flex-col gap-6 lg:gap-[6vh]">
        {featured.map((project, index) => (
          <FeaturedPanel
            key={project.title}
            project={project}
            index={index}
            count={featured.length}
          />
        ))}
      </ol>

      {others.length > 0 && (
        <div className="mt-24 sm:mt-32">
          <p className="mb-8 flex items-center gap-4 label-mono text-muted md:mb-0 md:border-b md:border-border md:pb-6">
            More projects
            <span aria-hidden="true" className="h-px flex-1 bg-border md:hidden" />
          </p>
          <ul aria-label="More projects" className="grid gap-4 md:gap-0">
            {others.map((project, index) => (
              <ProjectRow
                key={project.title}
                project={project}
                number={String(featured.length + index + 1).padStart(2, "0")}
              />
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
