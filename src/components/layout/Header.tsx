"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { navItems, profile } from "@/data/profile";
import type { NavItem } from "@/types";
import { cn } from "@/lib/cn";
import { siteConfig, withBasePath } from "@/lib/site";

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

function navHref({ id, href }: NavItem): string {
  return href ?? `/#${id}`;
}

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const pathname = normalize(usePathname());
  const activeSection = useActiveSection(sectionIds, pathname);
  const isHome = pathname === "/";

  const isActive = (item: NavItem) =>
    (item.href !== undefined && normalize(item.href) === pathname) ||
    (isHome && activeSection === item.id);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled || isMenuOpen
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — home`}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accent-2 font-display text-sm text-accent-foreground shadow-sm">
            TH
          </span>
          <span className="hidden font-display text-lg tracking-tight sm:block">
            {profile.name}
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
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item)
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
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
      </Container>

      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
      >
        <Container className="flex flex-col gap-6 py-6">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.id} className="border-b border-border">
                  <Link
                    href={navHref(item)}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center justify-between py-4 text-lg font-medium",
                      isActive(item) ? "text-accent" : "text-foreground",
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={withBasePath(siteConfig.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background"
          >
            <DownloadIcon className="size-4" />
            Download Resume
          </a>
        </Container>
      </div>
    </header>
  );
}
