export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint so the correct theme is applied without a flash.
 * Uses the saved preference, falling back to the operating system setting.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

// The theme requested but not yet painted (a View Transition applies it asynchronously),
// so rapid repeated toggles always alternate instead of reading a stale class.
let pendingTheme: Theme | null = null;

export function getTheme(): Theme {
  return pendingTheme ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");
}

/** Swaps the theme class in a single frame, with every CSS transition paused. */
function switchThemeClass(theme: Theme): void {
  const root = document.documentElement;
  if (pendingTheme === theme) pendingTheme = null;
  // Without this, each element's own `transition-colors` would animate separately — hundreds
  // of simultaneous transitions repainting blurred layers is what makes theme switches janky.
  root.classList.add("theme-switching");
  root.classList.toggle("dark", theme === "dark");
  void root.offsetHeight; // Flush styles while transitions are disabled.
  root.classList.remove("theme-switching");
}

export function applyTheme(theme: Theme): void {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // View Transitions snapshot the page once and crossfade it on the compositor (GPU),
  // which stays smooth regardless of page complexity. Older browsers switch instantly.
  if (typeof document.startViewTransition === "function" && !prefersReducedMotion) {
    pendingTheme = theme;
    document.startViewTransition(() => switchThemeClass(theme));
  } else {
    switchThemeClass(theme);
  }
}
