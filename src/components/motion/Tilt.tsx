"use client";

import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type TiltProps<T extends ElementType> = {
  as?: T;
  /** Maximum rotation in degrees. Set 0 for spotlight only (no tilt). */
  max?: number;
  /** Lift towards the viewer on hover, in px. */
  lift?: number;
} & ComponentPropsWithoutRef<T>;

/**
 * Pointer-driven 3D tilt with a cursor spotlight. It writes CSS variables on the element
 * (--rx, --ry, --mx, --my, --spot) inside requestAnimationFrame, so React never re-renders.
 * Combine with the `spotlight` utility for the glare. Disabled for touch and reduced motion.
 */
export function Tilt<T extends ElementType = "div">({
  as,
  max = 7,
  lift = 0,
  className,
  style,
  ...props
}: TiltProps<T>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    let frame = 0;
    let rect: DOMRect | null = null;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      el.style.setProperty("--spot", "1");
      if (max > 0) el.style.willChange = "transform";
    };
    const onMove = (event: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        if (max > 0 && !reduce.matches) {
          el.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
          el.style.setProperty("--rx", `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
          el.style.setProperty("--lift", `${lift}px`);
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      rect = null;
      el.style.setProperty("--spot", "0");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--lift", "0px");
      el.style.willChange = "";
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max, lift]);

  const Component: ElementType = as ?? "div";
  return (
    <Component
      ref={ref}
      className={cn(
        max > 0 && "transition-transform duration-500 ease-out-expo [transform-style:preserve-3d]",
        className,
      )}
      style={
        max > 0
          ? {
              transform:
                "perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(var(--lift, 0px))",
              ...style,
            }
          : style
      }
      {...props}
    />
  );
}
