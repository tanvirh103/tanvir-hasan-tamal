import type { Metadata } from "next";

import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[85dvh] items-center overflow-hidden px-4 pt-24 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-y" />
        <div className="orb absolute top-1/4 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[130px]" />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-neon font-mono text-[7rem] leading-none font-bold sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 font-mono text-sm text-muted">
          <span className="text-accent-2">Error:</span> the link may be broken, or the page may have
          moved.
        </p>
        <ButtonLink href="/" className="mt-10">
          Back to home
          <ArrowRightIcon />
        </ButtonLink>
      </div>
    </section>
  );
}
