import { ArrowRightIcon, SocialIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { socialLinks } from "@/data/profile";

const linkedin = socialLinks.find((link) => link.platform === "linkedin");

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-4 py-24 sm:px-6 sm:py-32 lg:px-10"
    >
      <div className="reveal mx-auto max-w-6xl">
        <div className="neon-frame shadow-[0_30px_90px_-40px_var(--glow)]">
          <div className="relative isolate overflow-hidden rounded-[1.3rem] bg-surface px-6 py-14 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)] opacity-70" />
              <div className="orb absolute -top-24 -right-24 size-80 rounded-full bg-accent/20 blur-[100px]" />
              <div className="orb absolute -bottom-24 -left-16 size-72 rounded-full bg-accent-2/15 blur-[100px] [animation-delay:-7s]" />
            </div>

            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="font-mono text-sm text-accent">
                  <span className="text-muted">$ </span>
                  ./say-hello.sh
                </p>
                <h2
                  id="contact-heading"
                  className="mt-4 text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl"
                >
                  Let&apos;s build something <span className="text-neon">great together</span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Have a project, a role or just want to say hi? Send a message and I&apos;ll get
                  back to you as soon as I can.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/contact/">
                    Send a message
                    <ArrowRightIcon className="transition-transform group-hover/button:translate-x-1" />
                  </ButtonLink>
                  {linkedin && (
                    <ButtonLink href={linkedin.href} variant="secondary" external>
                      <SocialIcon platform="linkedin" />
                      Connect on LinkedIn
                    </ButtonLink>
                  )}
                </div>
              </div>

              <ContactDetails />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
