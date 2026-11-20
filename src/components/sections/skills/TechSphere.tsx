import type { CSSProperties } from "react";

import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/cn";
import type { Tech } from "@/types";

import { SphereNudge } from "./SphereNudge";
import { fibonacciSphere } from "./sphere";

/** Full turn duration; spin, counter-spin and depth fade share it so they stay in sync. */
const DURATION = 40;
/** Static tilt of the whole scene so the sphere reads as a sphere, not a carousel. */
const TILT = -14;

/*
 * Scoped keyframes (globals.css is shared, so they live here). The scene spins around Y,
 * every chip counter-spins so it always faces the viewer, and each chip's opacity follows
 * its depth with a phase offset (negative delay). Hovering the stage pauses everything;
 * reduced motion removes the animations and leaves each chip at its resting opacity.
 */
const css = `
@keyframes ts-spin { to { transform: rotateY(360deg); } }
@keyframes ts-counter { to { transform: rotateY(-360deg); } }
@keyframes ts-depth {
  0%, 100% { opacity: var(--hi); }
  50% { opacity: var(--lo); }
}
.ts-spin { animation: ts-spin ${DURATION}s linear infinite; }
.ts-counter { animation: ts-counter ${DURATION}s linear infinite; }
.ts-depth { animation: ts-depth ${DURATION}s ease-in-out infinite; }
.ts-stage:hover .ts-anim { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .ts-anim { animation: none !important; }
}
`;

interface TechSphereProps {
  techs: Tech[];
  className?: string;
}

/**
 * Decorative 3D sphere of technology chips, laid out with a Fibonacci distribution on the
 * server and animated purely with CSS transforms and opacity.
 */
export function TechSphere({ techs, className }: TechSphereProps) {
  const points = fibonacciSphere(techs);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "ts-stage relative mx-auto aspect-square w-full max-w-[26rem] select-none [--r:9.5rem] [perspective:1100px] lg:max-w-[30rem] lg:[--r:11.5rem]",
        className,
      )}
    >
      <style href="skills-sphere" precedence="default">
        {css}
      </style>

      {/* Glow and hairline halo behind the sphere. */}
      <div className="absolute inset-0 rounded-full mask-radial bg-glow" />
      <div className="absolute inset-[6%] rounded-full mask-radial opacity-70 bg-glow-2" />
      <div className="absolute inset-[9%] rounded-full border border-border" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-border/70" />

      <SphereNudge className="absolute inset-0">
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: `rotateX(${TILT}deg)` }}
        >
          <div className="ts-spin ts-anim absolute inset-0 [transform-style:preserve-3d]">
            {/* Equator and one meridian give the sphere a visible wireframe. */}
            <span
              className="absolute top-1/2 left-1/2 size-[calc(var(--r)*2)] rounded-full border border-accent/25"
              style={{ transform: "translate(-50%, -50%) rotateX(90deg)" }}
            />
            <span
              className="absolute top-1/2 left-1/2 size-[calc(var(--r)*2)] rounded-full border border-border"
              style={{ transform: "translate(-50%, -50%)" }}
            />

            {points.map(({ tech, theta, phi, hi, lo, rest }) => (
              <div
                key={tech.name}
                className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
                style={{
                  transform: `rotateY(${theta}deg) rotateX(${phi}deg) translateZ(var(--r)) rotateX(${-phi}deg) rotateY(${-theta}deg)`,
                }}
              >
                <div className="ts-counter ts-anim [transform-style:preserve-3d]">
                  <span
                    className="ts-depth ts-anim absolute inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/85 px-2.5 py-1 font-mono text-[0.68rem] font-medium whitespace-nowrap text-foreground shadow-card"
                    style={
                      {
                        "--hi": hi,
                        "--lo": lo,
                        opacity: rest,
                        transform: `translate(-50%, -50%) rotateX(${-TILT}deg)`,
                        animationDelay: `${(-(theta / 360) * DURATION).toFixed(2)}s`,
                      } as CSSProperties
                    }
                  >
                    <TechIcon tech={tech} className="size-3.5 shrink-0" />
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SphereNudge>
    </div>
  );
}
