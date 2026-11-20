import Link from "next/link";

import { ContactDetailList } from "@/components/contact/ContactDetails";
import { ArrowUpRightIcon, MailIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";

const RING_TEXT = "Start a project · Let's talk · Start a project · Let's talk · ";

/** Circular call to action: a magnetic accent disc inside a slowly rotating text ring. */
function ProjectCta() {
  return (
    <div className="group relative size-60 shrink-0 sm:size-68">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full animate-spin-slow fill-current text-muted group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path id="contact-cta-ring" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
        </defs>
        <text className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase">
          <textPath href="#contact-cta-ring" textLength={536} lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <div
        aria-hidden="true"
        className="absolute inset-10 rounded-full border border-dashed border-border-strong"
      />
      <div className="absolute inset-0 grid place-items-center">
        <Magnetic strength={0.35}>
          <Link
            href="/contact"
            className="group/cta relative flex size-40 flex-col items-center justify-center gap-2 rounded-full bg-accent text-center text-accent-foreground shadow-float transition-[transform,box-shadow] duration-500 ease-out-expo hover:scale-105 hover:shadow-[0_0_0_10px_var(--accent-soft),0_30px_80px_-20px_var(--accent-ring)] focus-visible:rounded-full focus-visible:outline-offset-4 active:scale-95"
          >
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-7 transition-transform duration-500 ease-out-expo group-hover/cta:rotate-45"
            />
            <span className="text-base leading-tight font-semibold tracking-tight">
              Start a
              <br />
              project
            </span>
          </Link>
        </Magnetic>
      </div>
    </div>
  );
}

/** Closing scene on the home page (section 07). */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-clip py-24 sm:py-32 lg:py-40"
    >
      {/* Decorative backdrop: grid, two glows and an oversized outlined numeral. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-radial" />
        <div className="absolute top-1/4 -left-40 size-[36rem] bg-glow" />
        <div className="absolute -right-32 bottom-0 size-[32rem] bg-glow-2" />
        <span className="absolute top-10 right-4 font-display text-[9rem] leading-none font-semibold tracking-tighter text-stroke select-none sm:right-10 sm:text-[14rem] lg:text-[18rem]">
          07
        </span>
      </div>

      <Container>
        <p className="mb-8 inline-flex items-center gap-2.5 label-mono text-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          Contact
        </p>

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="min-w-0">
            <h2
              id="contact-heading"
              className="text-5xl leading-[0.95] font-semibold tracking-tighter sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
            >
              <span className="line-mask">
                <span className="reveal block">Let&apos;s build</span>
              </span>
              <span className="line-mask">
                <span className="reveal block">
                  something <em className="accent-serif text-accent">remarkable</em>
                </span>
              </span>
            </h2>
            <p className="reveal mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Have a product to ship, a system to scale or a role to fill? Tell me about it and the
              message lands straight in my inbox.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group/mail mt-8 inline-flex min-h-12 items-center gap-3 text-xl font-medium tracking-tight text-foreground sm:text-2xl"
            >
              <MailIcon aria-hidden="true" className="size-5 shrink-0 text-accent sm:size-6" />
              <span className="relative break-all after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-out-expo group-hover/mail:after:scale-x-100">
                {profile.email}
              </span>
            </a>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ProjectCta />
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 sm:mt-20">
          <ContactDetailList layout="grid" />
        </div>
      </Container>
    </section>
  );
}
