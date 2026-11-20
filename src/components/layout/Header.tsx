"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { ArrowRightIcon, ArrowUpRightIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navItems, profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import type { NavItem } from "@/types";

import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./useActiveSection";
import { useNavIndicator } from "./useNavIndicator";

// The hero ("top") is observed too, so no link is highlighted while it is in view.
// Every nav item is tracked as a home-page section, including Contact, which links to its own
// page but also has a closing section (#contact) on the home page.
const sectionIds = ["top", ...navItems.map((item) => item.id)];

const monogram = profile.name
  .split(/\s+/)
  .slice(0, 2)
  .map((part) => part[0])
  .join("")
  .toUpperCase();

const CONTACT_HREF = "/contact";

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Focusable, rendered (not display:none) and not inside an inert subtree. */
const isTabbable = (element: HTMLElement) =>
  element.getClientRects().length > 0 && !element.closest("[inert]");

function NewTabNote() {
  return <span className="sr-only">(opens in a new tab)</span>;
}

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const pathname = normalize(usePathname());
  const isHome = pathname === "/";
  const activeSection = useActiveSection(sectionIds, pathname);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const hrefFor = (item: NavItem) => item.href ?? (isHome ? `#${item.id}` : `/#${item.id}`);

  const currentFor = (item: NavItem): "page" | "location" | undefined => {
    if (item.href && normalize(item.href) === pathname) return "page";
    return isHome && activeSection === item.id ? "location" : undefined;
  };

  const activeId = navItems.find((item) => currentFor(item))?.id ?? null;
  const { listRef, indicatorRef } = useNavIndicator(activeId);

  /** Closes the menu; `restoreFocus` returns focus to the menu button (Escape / toggle). */
  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Cheap passive listener: React bails out when the boolean does not change.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes (state adjusted during render, no effect).
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const behind = [document.getElementById("main"), document.querySelector("body > footer")];
    for (const element of behind) element?.setAttribute("inert", "");
    root.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;

      // Trap focus inside the header (pill controls + overlay) while the menu is open.
      const focusables = [...headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        isTabbable,
      );
      const first = focusables[0];
      const last = focusables.at(-1);
      if (!first || !last) return;
      const current = document.activeElement as HTMLElement | null;
      if (!current || !focusables.includes(current)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.style.overflow = previousOverflow;
      for (const element of behind) element?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [isMenuOpen, closeMenu]);

  const isContactPage = pathname === CONTACT_HREF;

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
    >
      {/* Full-screen menu (below lg). Rendered first so the pill stays on top of it. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        inert={!isMenuOpen}
        className={cn(
          "fixed inset-0 overflow-x-hidden overflow-y-auto overscroll-contain bg-background transition-opacity duration-500 ease-out-expo lg:hidden",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 size-[28rem] opacity-70 bg-glow-2"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-40 size-[30rem] opacity-60 bg-glow"
        />

        <Container className="relative flex min-h-full flex-col gap-10 pt-28 pb-10">
          <nav aria-label="Mobile">
            <p aria-hidden="true" className="mb-4 label-mono text-subtle">
              Index
            </p>
            <ul className="flex flex-col">
              {navItems.map((item, index) => {
                const current = currentFor(item);
                return (
                  <li
                    key={item.id}
                    style={{ transitionDelay: isMenuOpen ? `${90 + index * 45}ms` : "0ms" }}
                    className={cn(
                      "border-b border-border transition-[opacity,transform] duration-700 ease-out-expo",
                      isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                    )}
                  >
                    <Link
                      href={hrefFor(item)}
                      onClick={() => closeMenu(true)}
                      aria-current={current}
                      className={cn(
                        "group flex min-h-16 items-baseline gap-4 py-3 font-display text-4xl leading-none font-semibold tracking-tight transition-colors duration-300 sm:min-h-20 sm:text-6xl",
                        current ? "text-accent" : "text-foreground hover:text-accent",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="w-7 shrink-0 font-mono text-xs font-normal tracking-normal text-subtle"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 break-words transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            style={{ transitionDelay: isMenuOpen ? `${90 + navItems.length * 45}ms` : "0ms" }}
            className={cn(
              "mt-auto flex flex-col gap-8 transition-[opacity,transform] duration-700 ease-out-expo",
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <ButtonLink
                href={CONTACT_HREF}
                onClick={() => closeMenu()}
                aria-current={isContactPage ? "page" : undefined}
                className="w-full"
              >
                Let&rsquo;s talk
                <ArrowRightIcon aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href={siteConfig.resume}
                external
                variant="secondary"
                onClick={() => closeMenu()}
                className="w-full"
              >
                View resume
                <ArrowUpRightIcon aria-hidden="true" />
                <NewTabNote />
              </ButtonLink>
            </div>
            <div className="flex flex-col gap-3">
              <p className="label-mono text-subtle">Elsewhere</p>
              <SocialLinks />
            </div>
          </div>
        </Container>
      </div>

      {/* Floating glass pill. Scrolling swaps classes only: lift, slimmer padding, shadow. */}
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full glass transition-[transform,padding,box-shadow] duration-500 ease-out-expo",
          isScrolled || isMenuOpen
            ? "-translate-y-1 py-1 pr-1 pl-1.5 shadow-float"
            : "translate-y-0 py-1.5 pr-1.5 pl-2 shadow-none",
        )}
      >
        <Link
          href="/"
          onClick={() => closeMenu()}
          aria-label={`${profile.name}, home`}
          aria-current={isHome ? "page" : undefined}
          className="group flex shrink-0 items-center gap-3 rounded-full pr-1"
        >
          <span aria-hidden="true" className="relative grid size-10 place-items-center">
            <span className="absolute inset-0 rounded-full border border-dashed border-accent/70 transition-transform duration-700 ease-out-expo group-hover:rotate-90 group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]" />
            <span className="grid size-8 place-items-center rounded-full bg-foreground font-mono text-[0.6875rem] font-semibold tracking-wider text-background transition-transform duration-500 ease-out-expo group-hover:scale-110">
              {monogram}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="hidden text-sm font-semibold tracking-tight whitespace-nowrap text-foreground xl:block"
          >
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 flex-1 justify-center lg:flex">
          <div ref={listRef} className="relative">
            {/* Sliding active pill: caps + stretchable middle, all transform-driven. */}
            <span
              ref={indicatorRef}
              aria-hidden="true"
              style={{ "--x": "0px", "--w": "40px", "--wn": "40" } as CSSProperties}
              className="pointer-events-none absolute inset-y-0 left-0 opacity-0 transition-opacity duration-300"
            >
              <span
                className="absolute top-0 left-0 h-full w-5 rounded-l-full bg-foreground transition-transform duration-500 ease-out-expo"
                style={{ transform: "translateX(var(--x))" }}
              />
              <span
                className="absolute top-0 left-0 h-full w-px origin-left bg-foreground transition-transform duration-500 ease-out-expo"
                style={{
                  transform: "translateX(calc(var(--x) + 19.5px)) scaleX(calc(var(--wn) - 39))",
                }}
              />
              <span
                className="absolute top-0 left-0 h-full w-5 rounded-r-full bg-foreground transition-transform duration-500 ease-out-expo"
                style={{ transform: "translateX(calc(var(--x) + var(--w) - 20px))" }}
              />
            </span>

            <ul className="flex items-center">
              {navItems.map((item) => {
                const current = currentFor(item);
                return (
                  <li key={item.id}>
                    <Link
                      href={hrefFor(item)}
                      data-nav-id={item.id}
                      aria-current={current}
                      className={cn(
                        "relative inline-flex h-10 items-center rounded-full px-3 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-300",
                        current ? "text-background" : "text-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <ButtonLink
            href={siteConfig.resume}
            external
            variant="ghost"
            size="sm"
            className="hidden px-3 lg:inline-flex"
          >
            Resume
            <ArrowUpRightIcon aria-hidden="true" />
            <NewTabNote />
          </ButtonLink>
          <Magnetic strength={0.25}>
            <ButtonLink
              href={CONTACT_HREF}
              size="sm"
              onClick={() => closeMenu()}
              aria-current={isContactPage ? "page" : undefined}
            >
              Let&rsquo;s talk
              <ArrowRightIcon aria-hidden="true" />
            </ButtonLink>
          </Magnetic>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => (isMenuOpen ? closeMenu(true) : setMenuOpen(true))}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full bg-surface-muted text-foreground transition-colors duration-200 hover:bg-surface-raised lg:hidden"
          >
            {isMenuOpen ? (
              <CloseIcon aria-hidden="true" className="size-5" />
            ) : (
              <MenuIcon aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
