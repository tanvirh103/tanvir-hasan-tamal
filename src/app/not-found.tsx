import type { Metadata } from "next";

import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center px-4 pt-24 sm:px-6">
      <div className="mx-auto w-full max-w-xl tile p-10 text-center sm:p-14">
        <p className="text-7xl font-semibold tracking-[-0.05em] text-muted sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-muted">The link may be broken, or the page may have moved.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home
          <ArrowRightIcon />
        </ButtonLink>
      </div>
    </section>
  );
}
