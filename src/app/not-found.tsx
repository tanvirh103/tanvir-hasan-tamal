import type { Metadata } from "next";

import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[85dvh] items-center overflow-hidden pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-radial"
      />
      <Container className="text-center">
        <p className="serif-accent text-[8rem] leading-none sm:text-[12rem]">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-muted">The link may be broken, or the page may have moved.</p>
        <ButtonLink href="/" className="mt-10">
          Back to home
          <ArrowRightIcon />
        </ButtonLink>
      </Container>
    </section>
  );
}
