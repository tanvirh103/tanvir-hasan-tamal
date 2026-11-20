import { ArrowUpRightIcon } from "@/components/icons";
import { Tilt } from "@/components/motion/Tilt";
import type { Project } from "@/types";

function RowTitle({ title }: { title: string }) {
  return (
    <span className="relative inline-block transition-transform duration-500 ease-out-expo md:group-hover/row:translate-x-2">
      {title}
      <span
        aria-hidden="true"
        className="absolute -bottom-2 left-0 hidden h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-focus-within/row:scale-x-100 group-hover/row:scale-x-100 md:block"
      />
    </span>
  );
}

/**
 * Large typographic row for a non-featured project. The title link is stretched over the whole
 * row; any extra links sit above it. Stacked cards below md, hairline rows from md up.
 */
export function ProjectRow({ project, number }: { project: Project; number: string }) {
  const { title, summary, stack, links } = project;
  const [primary, ...secondary] = links;

  return (
    <li className="reveal">
      <Tilt
        max={0}
        className="group/row spotlight rounded-3xl border border-border bg-surface p-6 md:grid md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:rounded-none md:border-x-0 md:border-t-0 md:bg-transparent md:px-4 md:py-10 lg:grid-cols-[5rem_minmax(0,1fr)_17rem_3.5rem]"
      >
        <span className="font-mono text-xs text-subtle md:text-sm">{number}</span>

        <div className="mt-3 md:mt-0">
          {/* The h3 stays unpositioned and untransformed so the link's ::after stretches over
              the whole row (the Tilt wrapper is the positioned ancestor). */}
          <h3 className="text-3xl leading-none font-semibold sm:text-4xl lg:text-5xl">
            {primary ? (
              <a
                href={primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-none after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent md:after:rounded-none"
              >
                <RowTitle title={title} />
                <span className="sr-only"> ({primary.label}, opens in a new tab)</span>
              </a>
            ) : (
              <RowTitle title={title} />
            )}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:mt-5">{summary}</p>
          {secondary.length > 0 && (
            <p className="relative z-10 mt-3 flex flex-wrap gap-x-5">
              {secondary.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                  <span className="sr-only"> for {title} (opens in a new tab)</span>
                  <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
                </a>
              ))}
            </p>
          )}
        </div>

        <p className="mt-5 font-mono text-[0.7rem] leading-relaxed tracking-wide text-subtle md:mt-0 md:hidden lg:block">
          <span className="sr-only">Stack: </span>
          {stack.join(" / ")}
        </p>

        <span
          aria-hidden="true"
          className="mt-6 hidden size-12 place-items-center rounded-full border border-border-strong text-foreground transition-[transform,background-color,color,border-color] duration-500 ease-out-expo group-hover/row:rotate-45 group-hover/row:border-accent group-hover/row:bg-accent group-hover/row:text-accent-foreground md:mt-0 md:grid md:justify-self-end"
        >
          <ArrowUpRightIcon className="size-5" />
        </span>
      </Tilt>
    </li>
  );
}
