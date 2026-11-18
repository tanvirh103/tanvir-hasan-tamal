import { ArrowUpIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pt-8 pb-32 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {year} {profile.name}.
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full font-medium text-foreground transition-colors hover:text-accent"
        >
          Back to top
          <ArrowUpIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
