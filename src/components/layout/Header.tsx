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

/** Tracks which section is in the middle of the viewport so its nav link can be highlighted. */
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
  }, [ids, pathname]);

  return active;
}

const sectionIds = ["top", ...navItems.map((item) => item.id)];

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

const navHref = ({ id, href }: NavItem): string => href ?? `/#${id}`;

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2);

/** Floating glass navigation bar that gains a surface once the page scrolls. */
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
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-2xl border border-border bg-surface/70 px-2 shadow-[0_10px_40px_-20px_var(--glow)] backdrop-blur-xl sm:h-16 sm:px-3",
          !isMenuOpen && "header-bar",
        )}
      >
        <Link
          href="/"
          onClick={closeMenu}
          aria-label={`${profile.name}, home`}
          className="group flex items-center gap-2.5 rounded-xl"
        >
          <span className="flex size-10 items-center justify-center rounded-xl border border-accent/40 bg-accent-soft font-mono text-sm font-semibold text-accent shadow-[0_0_18px_-4px_var(--glow)] transition-shadow group-hover:shadow-[0_0_24px_-2px_var(--glow)]">
            {initials}
          </span>
          <span className="hidden font-mono text-sm font-medium sm:block">
            <span className="text-accent">~/</span>
            {profile.firstName.toLowerCase()}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={navHref(item)}
                  aria-current={isActive(item) ? "true" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item)
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:bg-surface-muted hover:text-foreground",
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
            className="hidden h-10 btn-neon items-center gap-2 rounded-xl px-4 text-sm font-semibold sm:inline-flex"
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
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:border-accent/50 lg:hidden"
          >
            {isMenuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="fade-up mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-surface/95 p-2 shadow-[0_20px_50px_-20px_var(--glow)] backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={navHref(item)}
                  onClick={closeMenu}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-surface-muted",
                    isActive(item) ? "text-accent" : "text-foreground",
                  )}
                >
                  <span className="font-mono text-xs text-accent">#</span>
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
          className="mt-2 inline-flex h-12 w-full btn-neon items-center justify-center gap-2 rounded-xl text-sm font-semibold"
        >
          <DownloadIcon className="size-4" />
          Download resume
        </a>
      </div>
    </header>
  );
}
