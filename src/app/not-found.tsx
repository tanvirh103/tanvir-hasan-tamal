import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center pt-16">
      <Container className="text-center">
        <p className="text-gradient font-display text-7xl sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl">This page doesn&apos;t exist</h1>
        <p className="mt-3 text-muted">The link may be broken, or the page may have moved.</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Back to home
          <ArrowRightIcon className="size-4" />
        </Link>
      </Container>
    </section>
  );
}
