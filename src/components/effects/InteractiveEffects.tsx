"use client";

import { useEffect } from "react";

const MAX_TILT_DEG = 6;

/**
 * One delegated pointer listener for the whole page:
 * - `.glass-card` elements get `--mx` / `--my` so their spotlight follows the cursor.
 * - `[data-tilt]` elements get `--rx` / `--ry` for a subtle 3D tilt.
 * Skipped on touch devices and for visitors who prefer reduced motion.
 */
export function InteractiveEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches) return;

    let frame = 0;
    let tilted: HTMLElement | null = null;

    const resetTilt = () => {
      if (!tilted) return;
      tilted.style.setProperty("--rx", "0deg");
      tilted.style.setProperty("--ry", "0deg");
      tilted = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = event.target as Element | null;

        const card = target?.closest<HTMLElement>(".glass-card");
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          card.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }

        if (reducedMotion.matches) return;
        const tiltTarget = target?.closest<HTMLElement>("[data-tilt]") ?? null;
        if (tiltTarget !== tilted) resetTilt();
        if (!tiltTarget) return;

        const rect = tiltTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        tiltTarget.style.setProperty("--rx", `${(-y * MAX_TILT_DEG).toFixed(2)}deg`);
        tiltTarget.style.setProperty("--ry", `${(x * MAX_TILT_DEG).toFixed(2)}deg`);
        tilted = tiltTarget;
      });
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", resetTilt);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", resetTilt);
    };
  }, []);

  return null;
}
