import Link from "next/link";

import { DownloadIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { siteConfig, withBasePath } from "@/lib/site";

import { ThemeToggle } from "./ThemeToggle";

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2);

/**
 * A light top bar with identity and utilities. Section navigation lives in the floating dock
 * at the bottom of the screen, so this bar can stay out of the way and scroll with the page.
 */
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="flex items-center gap-3 rounded-xl"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-foreground text-sm font-semibold text-background">
            {initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold">{profile.name}</span>
            <span className="block text-xs text-muted">{profile.role}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle className="border border-border bg-surface" />
          <a
            href={withBasePath(siteConfig.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            <DownloadIcon className="size-4" />
            <span className="hidden sm:inline">Resume</span>
            <span className="sr-only sm:hidden">Download resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}
