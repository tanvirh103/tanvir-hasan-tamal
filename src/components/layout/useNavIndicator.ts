import { useLayoutEffect, useRef } from "react";

/**
 * Positions a sliding pill behind the active nav link using transforms only.
 *
 * The indicator is three layers (left cap, stretchable middle, right cap) so the rounded ends
 * never distort: the wrapper translates to the link's offset, the 1px middle scales to the
 * link's width and the right cap translates to its far edge. Values are written as CSS custom
 * properties (`--x`, `--w`, `--wn`) that feed those transforms, so React never re-renders.
 *
 * Re-measures when the active link changes and whenever the list or a link resizes
 * (viewport changes, web-font swap). Returns refs for the list and the indicator.
 */
export function useNavIndicator(activeId: string | null) {
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const shownRef = useRef(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const place = () => {
      const link = activeId ? list.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`) : null;

      // Hidden (no active link, or the desktop nav is display:none below `lg`).
      if (!link || link.offsetWidth === 0) {
        indicator.style.opacity = "0";
        shownRef.current = false;
        return;
      }

      const x = link.offsetLeft;
      const w = link.offsetWidth;
      const appearing = !shownRef.current;

      // When it first appears, jump into place instead of sliding in from the last position.
      const parts = [...indicator.children] as HTMLElement[];
      if (appearing) for (const part of parts) part.style.transition = "none";
      indicator.style.setProperty("--x", `${x}px`);
      indicator.style.setProperty("--w", `${w}px`);
      indicator.style.setProperty("--wn", String(w));
      if (appearing) {
        void indicator.offsetWidth; // Commit the jump before re-enabling transitions.
        for (const part of parts) part.style.transition = "";
      }
      indicator.style.opacity = "1";
      shownRef.current = true;
    };

    place();

    const observer = new ResizeObserver(place);
    observer.observe(list);
    for (const link of list.querySelectorAll("[data-nav-id]")) observer.observe(link);
    return () => observer.disconnect();
  }, [activeId]);

  return { listRef, indicatorRef };
}
