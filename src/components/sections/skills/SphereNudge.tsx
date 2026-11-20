"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SphereNudgeProps {
  children: ReactNode;
  /** Maximum extra rotation in degrees. */
  max?: number;
  className?: string;
}

/**
 * Lets a fine pointer nudge the 3D scene a few degrees. Writes `transform` once per frame
 * while the pointer moves (CSS transition does the easing), so there is no idle loop.
 * Disabled for touch and reduced motion.
 */
export function SphereNudge({ children, max = 14, className }: SphereNudgeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.parentElement;
    if (!el || !area) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let frame = 0;
    let rect: DOMRect | null = null;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!rect) rect = area.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${(-y * 2 * max).toFixed(2)}deg) rotateY(${(x * 2 * max).toFixed(2)}deg)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      rect = null;
      el.style.transform = "";
    };

    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-700 ease-out-expo [transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}
