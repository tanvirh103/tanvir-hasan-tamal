import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the middle band of the viewport,
 * using a single IntersectionObserver (no per-frame scroll work).
 * Re-observes when `key` changes, e.g. after client-side navigation.
 */
export function useActiveSection(ids: readonly string[], key: string): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band just above the centre of the viewport decides the active section.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids, key]);

  return active;
}
