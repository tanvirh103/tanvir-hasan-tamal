"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";

import {
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
  LayersIcon,
  MailIcon,
  TrophyIcon,
  UserIcon,
} from "@/components/icons";
import { navItems } from "@/data/profile";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/types";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  skills: LayersIcon,
  about: UserIcon,
  experience: BriefcaseIcon,
  projects: CodeIcon,
  education: GraduationCapIcon,
  achievements: TrophyIcon,
  contact: MailIcon,
};

const sectionIds = ["top", ...navItems.map((item) => item.id)];
const normalize = (path: string) => path.replace(/\/+$/, "") || "/";
const navHref = ({ id, href }: NavItem): string => href ?? `/#${id}`;

/** Tracks which section is in the middle of the viewport. */
function useActiveSection(pathname: string): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return active;
}

/**
 * A floating dock at the bottom of the screen. A single highlight glides between items as the
 * visitor scrolls or clicks. Labels show on wide screens; small screens show icons only.
 */
export function Dock() {
  const pathname = normalize(usePathname());
  const activeSection = useActiveSection(pathname);
  const isHome = pathname === "/";
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
    visible: boolean;
  } | null>(null);

  const activeId =
    navItems.find((item) => item.href !== undefined && normalize(item.href) === pathname)?.id ??
    (isHome ? activeSection : null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // Measure against the dock itself. `offsetLeft` would be relative to each link's own <li>,
    // which pinned the highlight to the first item.
    const measure = () => {
      const link = list.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
      if (!link) {
        // Keep the last position so the highlight fades out in place instead of jumping.
        setIndicator((previous) => (previous ? { ...previous, visible: false } : null));
        return;
      }
      const listRect = list.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - listRect.left - list.clientLeft,
        width: linkRect.width,
        visible: true,
      });
    };

    measure();
    // Re-measure when the dock changes size: labels appearing at the `lg` breakpoint, the web
    // font finishing loading, or the window resizing.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [activeId]);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 z-50 flex justify-center px-3"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <ul
        ref={listRef}
        className="relative flex items-center gap-0.5 rounded-full border border-border bg-surface/80 p-1.5 shadow-[var(--tile-shadow-hover)] backdrop-blur-xl"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1.5 bottom-1.5 rounded-full bg-foreground transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            indicator?.visible ? "opacity-100" : "opacity-0",
          )}
          style={indicator ? { left: indicator.left, width: indicator.width } : { width: 0 }}
        />
        {navItems.map((item) => {
          const Icon = icons[item.id] ?? LayersIcon;
          const active = item.id === activeId;
          return (
            // `relative` lifts each item above the absolutely positioned highlight, so the active
            // icon (text-background) shows white on the dark highlight and black on the light one.
            <li key={item.id} className="relative">
              <Link
                href={navHref(item)}
                data-id={item.id}
                aria-current={active ? "true" : undefined}
                title={item.label}
                className={cn(
                  "flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors duration-300",
                  active ? "text-background" : "text-muted hover:text-foreground",
                )}
              >
                <Icon className="size-[1.1rem] shrink-0" />
                <span className="sr-only lg:not-sr-only">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
