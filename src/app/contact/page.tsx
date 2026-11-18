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
      className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-3 sm:gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="fade-up flex flex-col justify-between gap-10 tile p-7 sm:p-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Contact
            </p>
            <h1
              id="contact-page-heading"
              className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              Let&apos;s build something <span className="text-muted">great together.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Send a message and it lands straight in my inbox. I&apos;ll reply as soon as I can.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <ContactDetails />
            <SocialLinks />
          </div>
        </div>

        <div className="fade-up tile p-7 [--delay:100ms] sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">Send a message</h2>
          <p className="mt-1 mb-8 text-sm text-muted">
            All fields except the subject are required.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
