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
      className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-3 sm:gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="reveal flex flex-col justify-between gap-10 rounded-[1.75rem] bg-foreground p-8 text-background sm:p-12">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium opacity-75">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Contact
            </p>
            <h2
              id="contact-heading"
              className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl"
            >
              Let&apos;s build something <span className="opacity-60">great together.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed opacity-70 sm:text-lg">
              Have a project, a role or just want to say hi? Send a message and I&apos;ll get back
              to you as soon as I can.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact/" variant="inverse">
              Send a message
              <ArrowRightIcon className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </ButtonLink>
            {linkedin && (
              <ButtonLink href={linkedin.href} variant="inverse-outline" external>
                <SocialIcon platform="linkedin" />
                LinkedIn
              </ButtonLink>
            )}
          </div>
        </div>

        <div className="reveal flex flex-col justify-center tile p-6 sm:p-8">
          <p className="mb-4 text-sm font-medium text-muted">Reach me directly</p>
          <ContactDetails />
        </div>
      </div>
    </section>
  );
}
