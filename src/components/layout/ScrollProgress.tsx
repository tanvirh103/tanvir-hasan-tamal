/** A neon line at the very top of the page that fills as the visitor scrolls. Pure CSS. */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-accent to-accent-2 shadow-[0_0_12px_var(--glow)]"
    />
  );
}
