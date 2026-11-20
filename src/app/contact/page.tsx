import type { Metadata } from "next";

import { ContactDetailList } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { RiseText } from "@/components/motion/RiseText";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — send a message about a project, role or collaboration.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <section
      aria-labelledby="contact-page-heading"
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Decorative backdrop. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-grid mask-fade-b" />
        <div className="absolute -top-40 right-[-10rem] size-[40rem] bg-glow" />
        <div className="absolute top-[30rem] -left-48 size-[34rem] bg-glow-2" />
      </div>

      <Container>
        <header className="max-w-4xl">
          <p className="mb-6 inline-flex animate-fade-up items-center gap-2.5 label-mono text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Contact
          </p>
          <h1
            id="contact-page-heading"
            className="text-5xl leading-[0.98] font-semibold tracking-tighter sm:text-7xl lg:text-8xl"
          >
            <RiseText
              lines={[
                "Let's build something",
                <em key="together" className="accent-serif text-accent">
                  together
                </em>,
              ]}
              delay={80}
              stagger={110}
            />
          </h1>
          <p
            className="mt-7 max-w-xl animate-fade-up text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Have a project, a role or just want to say hi? Send a message and it lands straight in
            my inbox.
          </p>
        </header>

        <div className="mt-14 grid gap-8 sm:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <aside aria-label="Contact details" className="flex flex-col gap-4">
            <ContactDetailList />

            <Card className="relative overflow-hidden p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 size-48 bg-glow"
              />
              <p className="flex items-center gap-2.5 label-mono text-muted">
                <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                Role
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">{profile.availability}</p>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">
                Messages from this form are delivered straight to my inbox, and my reply goes to the
                email address you provide.
              </p>
            </Card>

            <div className="pt-2">
              <p className="mb-3 label-mono text-subtle">Elsewhere</p>
              <SocialLinks />
            </div>
          </aside>

          <div className="border-beam rounded-3xl p-5 shadow-float glass sm:p-8 lg:p-10">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Send a <em className="accent-serif text-accent">message</em>
            </h2>
            <p className="mt-2 mb-8 text-sm text-muted">
              All fields except the subject are required.
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
