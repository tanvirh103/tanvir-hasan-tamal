"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/cn";
import type { SkillGroup, Tech } from "@/types";

const ALL = "All";

interface ToolEntry {
  tech: Tech;
  groups: string[];
}

/**
 * Every tool is always on the board. Picking a category keeps its tools bright and gently dims
 * the rest, so the layout never jumps. A single highlight slides between the filter chips.
 */
export function SkillsBoard({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState(ALL);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const tools = useMemo<ToolEntry[]>(() => {
    const byName = new Map<string, ToolEntry>();
    for (const group of groups) {
      for (const tech of group.items) {
        const entry = byName.get(tech.name) ?? { tech, groups: [] };
        entry.groups.push(group.title);
        byName.set(tech.name, entry);
      }
    }
    return [...byName.values()];
  }, [groups]);

  const filters = [ALL, ...groups.map((group) => group.title)];
  const activeGroup = groups.find((group) => group.title === active);
  const matchCount = activeGroup ? activeGroup.items.length : tools.length;

  useLayoutEffect(() => {
    const measure = () => {
      const chip = chipsRef.current?.querySelector<HTMLElement>(`[data-filter="${active}"]`);
      setIndicator(chip ? { left: chip.offsetLeft, width: chip.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <div className="flex flex-col gap-4">
      <div className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div
          ref={chipsRef}
          role="group"
          aria-label="Filter skills by category"
          className="relative inline-flex gap-1 rounded-full border border-border bg-surface p-1.5 shadow-[var(--tile-shadow)]"
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 bottom-1.5 rounded-full bg-foreground transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              indicator ? "opacity-100" : "opacity-0",
            )}
            style={indicator ? { left: indicator.left, width: indicator.width } : undefined}
          />
          {filters.map((filter) => {
            const selected = filter === active;
            const count =
              filter === ALL
                ? tools.length
                : groups.find((group) => group.title === filter)?.items.length;
            return (
              <button
                key={filter}
                type="button"
                data-filter={filter}
                aria-pressed={selected}
                onClick={() => setActive(filter)}
                className={cn(
                  "relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                  selected ? "text-background" : "text-muted hover:text-foreground",
                )}
              >
                {filter}
                <span
                  className={cn(
                    "text-xs tabular-nums transition-colors duration-300",
                    selected ? "text-background/70" : "text-muted/70",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="tile p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <p className="font-semibold">{activeGroup?.title ?? "Everything I work with"}</p>
          <p className="text-sm text-muted" aria-live="polite">
            {activeGroup?.description ?? "Languages, frameworks, data and tooling."}{" "}
            <span className="tabular-nums">· {matchCount} tools</span>
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {tools.map(({ tech, groups: memberOf }) => {
            const match = active === ALL || memberOf.includes(active);
            return (
              <li
                key={tech.name}
                aria-hidden={match ? undefined : true}
                className={cn(
                  "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-[opacity,scale,filter,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  match
                    ? "border-border bg-surface-muted"
                    : "scale-95 border-transparent bg-transparent opacity-25 grayscale",
                )}
              >
                <TechIcon tech={tech} className="size-[1.15rem] shrink-0" />
                {tech.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
