import { MailIcon, MapPinIcon, PhoneIcon, SocialIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { profile, socialLinks } from "@/data/profile";
import { cn } from "@/lib/cn";

const linkedin = socialLinks.find((link) => link.platform === "linkedin");

export function Contact() {
  const contactItems = [
    { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: PhoneIcon,
      label: "Phone / WhatsApp",
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    { icon: MapPinIcon, label: "Location", value: `${profile.location} · Remote`, href: undefined },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 sm:py-28">
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-3xl border border-border bg-surface px-5 py-12 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid mask-fade-b" />
            <div className="absolute -top-32 left-1/2 h-80 w-[min(48rem,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="font-display text-3xl tracking-tight text-balance sm:text-5xl"
            >
              Let&apos;s build something <span className="text-gradient">great together</span>
            </h2>
            <p className="mt-4 text-base text-pretty text-muted sm:text-lg">
              Have a project, a role or just want to say hi? My inbox is always open — I&apos;ll get
              back to you as soon as I can.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact/">
                <MailIcon />
                Say hello
              </ButtonLink>
              {linkedin && (
                <ButtonLink href={linkedin.href} variant="secondary" external>
                  <SocialIcon platform="linkedin" />
                  Connect on LinkedIn
                </ButtonLink>
              )}
            </div>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 md:grid-cols-3">
            {contactItems.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block truncate text-sm font-medium">{value}</span>
                  </span>
                </>
              );
              const className =
                "border-border bg-background flex items-center gap-3 rounded-2xl border p-4 transition-colors";
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
        </div>
      </Container>
    </section>
  );
}
