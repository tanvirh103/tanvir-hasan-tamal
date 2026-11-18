import { ArrowUpIcon } from "@/components/icons";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border px-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-start gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-mono">
            <span className="text-accent">©</span> {year} {profile.name}
            <span className="text-muted/70"> · built with Next.js</span>
          </p>
          <SocialLinks />
        </div>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          Back to top
          <ArrowUpIcon className="size-4 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
