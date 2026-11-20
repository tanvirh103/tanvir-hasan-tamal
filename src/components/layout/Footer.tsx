import { ArrowUpIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

export function Footer() {
  // Rendered on the server, so the year is never computed in the browser.
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-64 w-[min(60rem,140vw)] -translate-x-1/2 translate-y-1/2 bg-glow"
      />

      {/* Oversized outlined wordmark sitting behind the bar, cropped by the footer edge. */}
      <p
        aria-hidden="true"
        className="mask-fade-b pt-6 text-center font-display text-[clamp(1.75rem,9.5vw,10rem)] leading-[0.85] font-semibold tracking-tighter whitespace-nowrap text-stroke select-none sm:pt-10"
      >
        {profile.name}
      </p>

      <Container className="relative z-10 -mt-[clamp(1rem,3vw,3rem)] pb-6 sm:pb-8">
        <div className="flex flex-col gap-5 rounded-3xl px-5 py-5 glass sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight text-foreground">{profile.name}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-xs text-subtle">
              <span>{profile.availability}</span>
              <span aria-hidden="true">·</span>
              <span>© {year}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end md:gap-6">
            <SocialLinks />
            <a
              href="#main"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-border bg-surface/60 px-4 label-mono text-muted transition-colors hover:border-accent hover:text-accent"
            >
              Back to top
              <ArrowUpIcon
                aria-hidden="true"
                className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
