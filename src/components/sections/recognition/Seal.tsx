import { GraduationCapIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

interface SealProps {
  /** Text set around the rotating ring (decorative; a separator is appended to close the loop). */
  text: string;
  className?: string;
}

/**
 * Decorative CSS-only 3D "university seal": stacked rings at different depths, a slowly rotating
 * ring of characters placed on a circle, and a raised core with the graduation cap. The ring
 * pauses while the parent `group` is hovered, and all motion stops with reduced motion.
 */
export function Seal({ text, className }: SealProps) {
  const chars = Array.from(`${text.toUpperCase()} · `);
  const step = 360 / chars.length;

  return (
    <div aria-hidden="true" className={cn("relative size-36 sm:size-40", className)}>
      <div className="absolute -inset-6 rounded-full opacity-70 blur-2xl bg-glow" />
      <div
        className="relative size-full [transform-style:preserve-3d]"
        style={{ transform: "perspective(700px) rotateX(18deg) rotateY(-20deg)" }}
      >
        {/* Base disc */}
        <div className="absolute inset-0 rounded-full border border-border-strong bg-surface-muted shadow-card" />

        {/* Rotating text ring */}
        <div
          className="absolute inset-1 rounded-full group-hover:[animation-play-state:paused] motion-safe:animate-spin-slow"
          style={{ translate: "0 0 6px" }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              className="absolute top-0 left-1/2 -ml-1.5 h-1/2 w-3 origin-bottom text-center font-mono text-[0.55rem] leading-none font-medium text-muted sm:text-[0.6rem]"
              style={{ rotate: `${(i * step).toFixed(3)}deg` }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Inner rings */}
        <div
          className="absolute inset-[19%] rounded-full border border-dashed border-accent/50"
          style={{ transform: "translateZ(14px)" }}
        />
        <div
          className="absolute inset-[24%] rounded-full border border-border-strong bg-surface"
          style={{ transform: "translateZ(22px)" }}
        />

        {/* Raised core */}
        <div
          className="absolute inset-[31%] flex items-center justify-center rounded-full bg-accent text-accent-foreground shadow-float"
          style={{ transform: "translateZ(34px)" }}
        >
          <GraduationCapIcon className="size-1/2" />
        </div>
      </div>
    </div>
  );
}
