import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — send a message about a project, role or collaboration.`,
  alternates: { canonical: `${siteConfig.url}/contact/` },
};

const contactDetails = [
  { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: PhoneIcon,
    label: "Phone / WhatsApp",
    value: profile.phone,
    href: `tel:${profile.phone}`,
  },
  { icon: MapPinIcon, label: "Location", value: `${profile.location} · Remote` },
];

export default function ContactPage() {
  return (
    <section
      id="top"
      aria-labelledby="contact-page-heading"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[min(64rem,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="mb-3 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
              Contact
            </p>
            <h1
              id="contact-page-heading"
              className="font-display text-4xl tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Let&apos;s build something <span className="text-gradient">great together</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-pretty text-muted sm:text-lg">
              Have a project, a role or just want to say hi? Send me a message and it will land
              straight in my inbox — I&apos;ll reply as soon as I can.
            </p>

            <ul className="mt-10 flex flex-col gap-3">
              {contactDetails.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted">{label}</span>
                      <span className="block truncate text-sm font-medium">{value}</span>
                    </span>
                  </>
                );
                const className =
                  "flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors";
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className={cn(className, "hover:border-accent/50")}>
                        {content}
                      </a>
                    ) : (
                      <div className={className}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <SocialLinks className="mt-8" />
          </div>

          <div className="animate-fade-up rounded-3xl border border-border bg-surface p-5 shadow-sm [animation-delay:120ms] sm:p-8">
            <h2 className="font-display text-2xl tracking-tight">Send a message</h2>
            <p className="mt-1 mb-6 text-sm text-muted">
              All fields except the subject are required.
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
