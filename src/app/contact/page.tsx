import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — send a message about a project, role or collaboration.`,
  alternates: { canonical: `${siteConfig.url}/contact/` },
};

export default function ContactPage() {
  return (
    <section
      id="top"
      aria-labelledby="contact-page-heading"
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-44 sm:pb-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dots mask-radial" />
        <div className="absolute -top-48 left-1/2 h-[40rem] w-[min(72rem,160vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="animate-fade-up">
            <p className="mb-5 font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
              Contact
            </p>
            <h1
              id="contact-page-heading"
              className="text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
            >
              Let&apos;s build something <span className="serif-accent">great together.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted sm:text-lg">
              Have a project, a role or just want to say hi? Send me a message and it will land
              straight in my inbox — I&apos;ll reply as soon as I can.
            </p>

            <ContactDetails className="mt-10" />
            <SocialLinks className="mt-8" />
          </div>

          <div className="animate-fade-up card p-6 [animation-delay:150ms] sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">Send a message</h2>
            <p className="mt-1 mb-8 text-sm text-muted">
              All fields except the subject are required.
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
