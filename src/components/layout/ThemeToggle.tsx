"use client";

import { useEffect } from "react";

import { MoonIcon, SunIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY, applyTheme, getTheme } from "@/lib/theme";

export function ThemeToggle({ className }: { className?: string }) {
  // Follow OS changes until the visitor picks a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {
        // Storage unavailable: keep following the OS.
      }
      applyTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the theme still applies for this visit.
    }
  };

  // Icons are swapped with CSS, so server and client markup always match (no flash or mismatch).
  return (
    <button
      type="button"
      onClick={toggle}
      title="Switch theme"
      className={cn(
        "group inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-muted hover:text-foreground focus-visible:text-foreground",
        className,
      )}
    >
      {/* Decorative hover flourish: the sun turns, the moon tilts (transform only). */}
      <SunIcon
        aria-hidden="true"
        className="hidden size-[1.125rem] transition-transform duration-700 ease-out-expo group-hover:rotate-90 dark:block"
      />
      <MoonIcon
        aria-hidden="true"
        className="size-[1.125rem] transition-transform duration-500 ease-out-expo group-hover:-rotate-12 dark:hidden"
      />
      {/* The accessible name states the action; swapped with CSS like the icons (no hydration risk). */}
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
