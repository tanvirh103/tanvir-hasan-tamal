import Image from "next/image";

import portrait from "@/assets/tanvir.webp";
import { ArrowRightIcon, DownloadIcon, MapPinIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RotatingGreeting } from "@/components/ui/RotatingGreeting";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TechIcon } from "@/components/ui/TechIcon";
import { profile, stats } from "@/data/profile";
import { coreStack } from "@/data/skills";
import { siteConfig, withBasePath } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-40"
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b" />
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[min(64rem,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="animate-fade-up text-center lg:text-left">
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur sm:text-sm">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="truncate">{profile.availability}</span>
            </p>

            <p className="mt-6 text-xl font-medium text-muted sm:text-2xl">
              <RotatingGreeting />
              <span className="sr-only">Hello</span>, I&apos;m
            </p>
            <h1 className="mt-2 font-display text-[2.6rem] leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              <span className="text-gradient">{profile.name}</span>
            </h1>
            <p className="mt-4 text-lg font-medium sm:text-xl">{profile.role}</p>
            <p className="mx-auto mt-4 max-w-xl text-base text-pretty text-muted sm:text-lg lg:mx-0">
              {profile.headline}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <ButtonLink href="#projects">
                View my work
                <ArrowRightIcon />
              </ButtonLink>
              <ButtonLink href={withBasePath(siteConfig.resume)} variant="secondary" external>
                <DownloadIcon />
                Download Resume
              </ButtonLink>
            </div>

            <SocialLinks className="mt-8 justify-center lg:justify-start" />
          </div>

          <div className="relative mx-auto w-full max-w-[19rem] animate-fade-up [animation-delay:120ms] sm:max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-br from-accent/50 to-accent-2/50 opacity-40 blur-2xl"
            />
            <div className="rounded-[2rem] bg-linear-to-br from-accent/60 via-border to-accent-2/60 p-px">
              <div className="overflow-hidden rounded-[calc(2rem-1px)] bg-surface p-2">
                <Image
                  src={portrait}
                  alt={`Portrait of ${profile.name}`}
                  placeholder="blur"
                  preload
                  sizes="(min-width: 640px) 384px, 304px"
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-2xl border border-border bg-surface/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:-left-8 sm:text-sm">
              <MapPinIcon className="size-4 text-accent" />
              {profile.location}
            </div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col-reverse gap-1 bg-surface px-4 py-5 text-center sm:py-6"
            >
              <dt className="text-xs text-muted sm:text-sm">{label}</dt>
              <dd className="font-display text-2xl sm:text-3xl">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <div className="mt-14 overflow-hidden mask-fade-x">
        <ul
          aria-label="Core tech stack"
          className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {[...coreStack, ...coreStack].map((tech, index) => (
            <li
              key={`${tech.name}-${index}`}
              aria-hidden={index >= coreStack.length ? true : undefined}
              className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium whitespace-nowrap"
            >
              <TechIcon tech={tech} className="size-4" />
              {tech.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
