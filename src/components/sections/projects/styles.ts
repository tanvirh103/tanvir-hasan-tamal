/**
 * Local CSS for the Projects section (rendered once through a hoisted React <style>).
 *
 * - Sticky stacking panels: on large, tall-enough viewports each featured panel sticks with an
 *   increasing top offset, so the next one slides over it. A covered panel scales down and is
 *   shaded via the stack's view timeline (transform/opacity only). Without scroll-driven
 *   animation support, or with reduced motion, it stays a flat sticky stack.
 * - Product visuals: small looping UI animations (block confirmations, mint progress) that
 *   pause on hover/focus and are removed entirely for reduced motion.
 */
export const projectsCss = `
@keyframes pj-cover { to { transform: scale(0.93) translateY(-1.25rem); } }
@keyframes pj-shade { to { opacity: 0.6; } }
@keyframes pj-fill { 0% { transform: scaleX(0); } 70%, 100% { transform: scaleX(1); } }
@keyframes pj-block-in {
  0% { opacity: 0; transform: translateY(-10px) scale(0.97); }
  12%, 100% { opacity: 1; transform: none; }
}
@keyframes pj-blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes pj-spin { to { transform: rotate(360deg); } }
@keyframes pj-sheen { 0% { transform: translateX(-120%); } 60%, 100% { transform: translateX(220%); } }

.pj-shade { opacity: 0; }

@media (min-width: 64rem) and (min-height: 44rem) {
  .pj-item { position: sticky; top: var(--pj-top); }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .pj-stack { view-timeline-name: --pj-stack; }
      .pj-item[data-covered] .pj-panel,
      .pj-item[data-covered] .pj-shade {
        animation-timing-function: linear;
        animation-fill-mode: both;
        animation-timeline: --pj-stack;
        animation-range: exit-crossing var(--pj-from) exit-crossing var(--pj-to);
      }
      .pj-item[data-covered] .pj-panel { animation-name: pj-cover; transform-origin: 50% 0; }
      .pj-item[data-covered] .pj-shade { animation-name: pj-shade; }
    }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .pj-fill { transform-origin: 0 50%; animation: pj-fill 4s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
  .pj-block-in { animation: pj-block-in 4s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
  .pj-blink { animation: pj-blink 1.6s ease-in-out infinite; }
  .pj-spin { animation: pj-spin 1.1s linear infinite; }
  .pj-sheen { animation: pj-sheen 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite; }

  .pj-visual:hover *,
  .pj-panel:focus-within .pj-visual * { animation-play-state: paused; }
}
`;
