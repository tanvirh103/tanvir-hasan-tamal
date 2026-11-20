import type { CSSProperties } from "react";

import { TechIcon } from "@/components/ui/TechIcon";
import { coreStack } from "@/data/skills";
import { cn } from "@/lib/cn";

const orbitItems = coreStack.slice(0, 8);

/** Ring tilt; each chip undoes it so the logos always face the viewer. */
const TILT = 72;
const SPIN = "48s";

const preserve = "[transform-style:preserve-3d]";

/**
 * Decorative CSS 3D orbit of core-stack logos around the portrait. It must live inside a
 * `preserve-3d` stage that also holds the portrait, so chips pass in front of and behind it.
 * The spin pauses on hover and stops entirely with reduced motion (global CSS rule).
 */
export function HeroOrbit({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-[58%] left-1/2 size-0 [--r:13rem] lg:[--r:14.5rem]",
        preserve,
        className,
      )}
    >
      <div className={preserve} style={{ transform: `rotateX(${TILT}deg)` }}>
        {/* Hairline track */}
        <div
          className="absolute size-[calc(var(--r)*2)] animate-fade-in rounded-full border border-border-strong [animation-delay:700ms]"
          style={{ transform: "translate(-50%, -50%)" }}
        />
        <div
          className="absolute size-[calc(var(--r)*2+3rem)] animate-fade-in rounded-full border border-dashed border-border [animation-delay:800ms]"
          style={{ transform: "translate(-50%, -50%)" }}
        />

        <div
          className={cn(
            "animate-spin-slow group-hover/visual:[animation-play-state:paused]",
            preserve,
          )}
          style={{ animationDuration: SPIN }}
        >
          {orbitItems.map((tech, index) => {
            const angle = (360 / orbitItems.length) * index;
            const style: CSSProperties = {
              transform: `rotate(${angle}deg) translateX(var(--r)) rotate(${-angle}deg)`,
            };
            return (
              <div key={tech.name} className={cn("absolute", preserve)} style={style}>
                <div
                  className={cn(
                    "animate-spin-slow group-hover/visual:[animation-play-state:paused]",
                    preserve,
                  )}
                  style={{ animationDuration: SPIN, animationDirection: "reverse" }}
                >
                  <div className={preserve} style={{ transform: `rotateX(${-TILT}deg)` }}>
                    <span
                      className="flex size-12 animate-fade-in items-center justify-center rounded-2xl border border-border bg-surface-raised shadow-card lg:size-14"
                      style={{
                        transform: "translate(-50%, -50%)",
                        animationDelay: `${720 + index * 70}ms`,
                      }}
                    >
                      <TechIcon tech={tech} className="size-5 lg:size-6" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
