"use client";

import { useEffect, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

const STORAGE_KEY = "motion";

const isPaused = () => document.documentElement.dataset.motion === "off";

/** Subscribes to changes of `data-motion` on <html>. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => observer.disconnect();
}

function setPaused(paused: boolean) {
  if (paused) document.documentElement.dataset.motion = "off";
  else delete document.documentElement.dataset.motion;
}

/**
 * A visible control that pauses every decorative animation on the site (WCAG 2.2.2).
 * It sets `data-motion="off"` on <html>; globals.css pauses CSS animations and the WebGL
 * hero field stops its loop. The choice is remembered for the visitor.
 */
export function MotionToggle({ className }: { className?: string }) {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  // Restore the visitor's earlier choice once, after hydration.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "off") setPaused(true);
    } catch {
      // Storage unavailable (private mode): motion stays on.
    }
  }, []);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "off" : "on");
    } catch {
      // The setting still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className={cn(
        "inline-flex h-10 items-center gap-2.5 rounded-full border border-border bg-surface px-4 label-mono text-muted transition-colors hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-current">
        {paused ? <path d="M3 1.5v9l7.5-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
      </svg>
      {paused ? "Play motion" : "Pause motion"}
    </button>
  );
}
