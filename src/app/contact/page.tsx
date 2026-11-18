import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}. Send a message about a project, role or collaboration.`,
  alternates: { canonical: `${siteConfig.url}/contact/` },
};

export default function ContactPage() {
  return (
    <section
      id="top"
      aria-labelledby="contact-page-heading"
      className="relative isolate overflow-hidden px-4 pt-32 pb-24 sm:px-6 sm:pt-40 lg:px-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-y" />
        <div className="orb absolute -top-32 -left-24 size-[26rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="orb absolute top-40 -right-32 size-[26rem] rounded-full bg-accent-2/15 blur-[120px] [animation-delay:-9s]" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="fade-up">
          <p className="font-mono text-sm text-accent">
            <span className="text-muted">{"// "}</span>contact
          </p>
          <h1
            id="contact-page-heading"
            className="mt-4 text-5xl font-bold tracking-[-0.04em] sm:text-6xl"
          >
            Let&apos;s build something <span className="text-neon">great together</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Have a project, a role or just want to say hi? Send a message and it lands straight in
            my inbox. I&apos;ll reply as soon as I can.
          </p>

          <ContactDetails className="mt-10" />
          <SocialLinks className="mt-8" />
        </div>

        <div className="fade-up [--delay:150ms]">
          <div className="neon-frame shadow-[0_30px_80px_-35px_var(--glow)]">
            <div className="rounded-[1.3rem] bg-surface p-6 sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight">Send a message</h2>
              <p className="mt-1 mb-8 text-sm text-muted">
                All fields except the subject are required.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
