import type { Metadata } from "next";

import { ArrowRightIcon, MailIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative isolate flex min-h-[90dvh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Decorative backdrop. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-radial" />
        <div className="absolute top-1/2 left-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 bg-glow" />
      </div>

      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p
            aria-hidden="true"
            className="animate-float font-display text-[clamp(8rem,34vw,22rem)] leading-[0.8] font-semibold tracking-tighter text-stroke select-none hover:[animation-play-state:paused]"
          >
            404
          </p>
          <p className="mt-6 inline-flex animate-fade-up items-center gap-2.5 label-mono text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Error 404
          </p>
          <h1
            id="not-found-heading"
            className="mt-5 animate-fade-up text-4xl leading-[1.02] font-semibold tracking-tight sm:text-6xl"
          >
            This page is <em className="accent-serif text-accent">lost</em>
          </h1>
          <p className="mt-5 max-w-md animate-fade-up text-base text-pretty text-muted sm:text-lg">
            The link may be broken, or the page may have moved.
          </p>
          <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink href="/" size="lg">
              Back to home
              <ArrowRightIcon />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              <MailIcon />
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
