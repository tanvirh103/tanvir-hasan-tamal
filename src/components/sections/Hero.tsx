import Image from "next/image";

import portrait from "@/assets/tanvir.webp";
import { ArrowRightIcon, ArrowUpRightIcon, MapPinIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { MotionToggle } from "@/components/motion/MotionToggle";
import { RiseText } from "@/components/motion/RiseText";
import { Tilt } from "@/components/motion/Tilt";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile, stats } from "@/data/profile";
import { siteConfig } from "@/lib/site";

import { HeroField } from "./hero/HeroField";
import { HeroOrbit } from "./hero/HeroOrbit";

/** "Tanvir Hasan Tamal" → "Tanvir" / "Hasan *Tamal*" (the last name carries the serif accent). */
const nameParts = profile.name.split(" ");
const firstLine = nameParts[0];
const middle = nameParts.slice(1, -1).join(" ");
const lastName = nameParts.at(-1);

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Background: CSS glows (always present, also the no-WebGL fallback) + WebGL field. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-glow" />
        <div className="absolute bottom-[-20%] left-[-15%] size-[38rem] rounded-full bg-glow-2" />
        <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
        <HeroField />
        {/* Readability scrims: soften the field behind the copy and fade into the next section. */}
        <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-background/80 via-background/30 to-transparent lg:w-2/3" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-background via-background/70 to-transparent" />
      </div>

      <Container className="flex flex-1 flex-col">
        <div className="grid flex-1 items-center gap-16 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          {/* Text column */}
          <div className="relative">
            <p className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted shadow-card backdrop-blur sm:text-sm">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
              {profile.availability}
            </p>

            {/* LCP: text is in the HTML immediately and only rises from behind a mask. */}
            <h1
              id="hero-title"
              className="mt-7 text-[3.5rem] leading-[0.9] font-semibold tracking-[-0.045em] sm:text-[5rem] lg:text-[6rem] xl:text-[7.25rem] 2xl:text-[8rem]"
            >
              <RiseText
                delay={80}
                stagger={120}
                lines={[
                  firstLine,
                  <>
                    {middle} <em className="pr-[0.06em] accent-serif text-accent">{lastName}</em>
                  </>,
                ]}
              />
            </h1>

            <p className="mt-8 max-w-xl animate-fade-up text-base text-pretty text-muted [animation-delay:360ms] sm:text-lg lg:text-xl">
              {profile.headline}
            </p>

            <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:460ms] sm:flex-row sm:items-center">
              <Magnetic strength={0.25}>
                <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
                  Start a project
                  <ArrowRightIcon />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={siteConfig.resume} variant="secondary" size="lg" external>
                View resume
                <ArrowUpRightIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            </div>

            <SocialLinks className="mt-8 animate-fade-up [animation-delay:540ms]" />
          </div>

          {/* Visual column: one preserve-3d stage so orbit chips pass in front of / behind the card. */}
          <div className="group/visual relative mx-auto w-full max-w-[16rem] [perspective:1400px] sm:max-w-[18rem] lg:mr-6 lg:max-w-[19rem]">
            <div className="relative [transform-style:preserve-3d]">
              <div
                aria-hidden="true"
                className="absolute -inset-6 animate-fade-in rounded-[2.75rem] border border-border [animation-delay:600ms]"
              />
              <Tilt
                max={10}
                lift={10}
                className="spotlight rounded-[2rem] border border-border-strong bg-surface/70 p-2 shadow-float"
              >
                <Image
                  src={portrait}
                  alt={`Portrait of ${profile.name}`}
                  placeholder="blur"
                  preload
                  sizes="(min-width: 1024px) 304px, (min-width: 640px) 288px, 256px"
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
                <p className="absolute -bottom-5 -left-5 flex animate-fade-in items-center gap-2.5 rounded-2xl border border-border bg-surface-raised px-3.5 py-2.5 shadow-float [animation-delay:760ms] sm:-left-10">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <MapPinIcon className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{profile.location}</span>
                </p>
              </Tilt>
              <HeroOrbit className="hidden md:block" />
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom band: stats and the site-wide motion toggle. */}
      <div className="relative animate-fade-up pb-10 [animation-delay:640ms]">
        <Container>
          <div className="flex items-end justify-between gap-8 border-t border-border pt-8">
            <dl className="grid flex-1 grid-cols-3 gap-6 sm:max-w-xl sm:gap-10">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse gap-2">
                  <dt className="label-mono text-subtle">{label}</dt>
                  <dd className="text-4xl leading-none font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <MotionToggle className="hidden shrink-0 sm:inline-flex" />
          </div>
        </Container>
      </div>
    </section>
  );
}
