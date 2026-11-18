"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/icons";
import { navItems, profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { siteConfig, withBasePath } from "@/lib/site";
import type { NavItem } from "@/types";

import { ThemeToggle } from "./ThemeToggle";

/** Tracks which section is currently in view to highlight its nav link. */
function useActiveSection(ids: string[], pathname: string): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
    // Re-observe after client-side navigation, since the sections change per page.
  }, [ids, pathname]);

  return active;
}

// The hero ("top") is observed too, so no link is highlighted while it is in view.
const sectionIds = ["top", ...navItems.map((item) => item.id)];

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

const navHref = ({ id, href }: NavItem): string => href ?? `/#${id}`;

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = normalize(usePathname());
  const activeSection = useActiveSection(sectionIds, pathname);
  const isHome = pathname === "/";

  const isActive = (item: NavItem) =>
    (item.href !== undefined && normalize(item.href) === pathname) ||
    (isHome && activeSection === item.id);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => desktop.matches && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border header-glass pr-2 pl-2 shadow-card sm:h-16 sm:pl-3",
          !isMenuOpen && "header-scroll",
        )}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 rounded-full"
          aria-label={`${profile.name} — home`}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-semibold tracking-tight text-background">
            TH
          </span>
          <span className="hidden text-[0.95rem] font-semibold tracking-tight sm:block">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={navHref(item)}
                  aria-current={isActive(item) ? "true" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(item)
                      ? "bg-foreground/[0.06] text-foreground dark:bg-white/10"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={withBasePath(siteConfig.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
          >
            <DownloadIcon className="size-4" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
          >
            {isMenuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-6xl animate-fade-up overflow-y-auto rounded-3xl border header-glass p-3 shadow-card [animation-duration:0.35s] lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={navHref(item)}
                  onClick={closeMenu}
                  className={cn(
                    "flex items-center rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-surface-muted",
                    isActive(item) ? "text-accent" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={withBasePath(siteConfig.resume)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background"
        >
          <DownloadIcon className="size-4" />
          Download Resume
        </a>
      </div>
    </header>
  );
}
