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
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
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

  // Icons are swapped with CSS, so server and client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      <SunIcon className="hidden size-[1.125rem] dark:block" />
      <MoonIcon className="size-[1.125rem] dark:hidden" />
    </button>
  );
}
