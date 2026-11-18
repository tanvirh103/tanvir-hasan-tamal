import { ArrowRightIcon, SocialIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { Container } from "@/components/ui/Container";
import { socialLinks } from "@/data/profile";

const linkedin = socialLinks.find((link) => link.platform === "linkedin");

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 sm:py-32">
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-16 text-background sm:px-14 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 -right-20 size-[32rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_45%,transparent),transparent)]" />
            <div className="absolute -bottom-48 -left-24 size-[28rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent-2)_30%,transparent),transparent)]" />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-5 font-mono text-xs font-medium tracking-[0.18em] uppercase opacity-60">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl"
              >
                Let&apos;s build something{" "}
                <span className="font-serif font-normal tracking-normal italic">
                  great together.
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-base opacity-70 sm:text-lg">
                Have a project, a role or just want to say hi? My inbox is always open — I&apos;ll
                get back to you as soon as I can.
              </p>

              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/contact/" variant="inverse">
                  Say hello
                  <ArrowRightIcon className="transition-transform group-hover/button:translate-x-0.5" />
                </ButtonLink>
                {linkedin && (
                  <ButtonLink href={linkedin.href} variant="inverse-outline" external>
                    <SocialIcon platform="linkedin" />
                    Connect on LinkedIn
                  </ButtonLink>
                )}
              </div>
            </div>

            <ContactDetails className="text-foreground" />
          </div>
        </div>
      </Container>
    </section>
  );
}
