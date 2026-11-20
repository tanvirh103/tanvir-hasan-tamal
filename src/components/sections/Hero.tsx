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
import { siteConfig } from "@/lib/site";

const nameParts = profile.name.split(" ");
const lastName = nameParts.pop();
const leadingName = nameParts.join(" ");

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44"
    >
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dots mask-radial" />
        <div className="absolute -top-48 left-1/2 h-[40rem] w-[min(72rem,160vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div className="animate-fade-up text-center lg:text-left">
            <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pr-4 pl-2 text-xs font-medium text-muted shadow-card backdrop-blur sm:text-sm">
              <span className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="truncate">{profile.availability}</span>
            </p>

            <p className="mt-8 text-lg font-medium text-muted sm:text-xl">
              <RotatingGreeting />
              <span className="sr-only">Hello</span>, I&apos;m
            </p>
            <h1 className="mt-3 text-[3.1rem] leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-[5.5rem]">
              {leadingName} <span className="serif-accent">{lastName}</span>
            </h1>
            <p className="mt-6 text-lg font-medium sm:text-xl">{profile.role}</p>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted sm:text-lg lg:mx-0">
              {profile.headline}
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <ButtonLink href="#projects">
                View my work
                <ArrowRightIcon className="transition-transform group-hover/button:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href={siteConfig.resume} variant="secondary" external>
                <DownloadIcon />
                Download Resume
              </ButtonLink>
            </div>

            <SocialLinks className="mt-8 justify-center lg:justify-start" />
          </div>

          <div className="relative mx-auto w-full max-w-[18rem] animate-fade-up [animation-delay:150ms] sm:max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-br from-accent/45 to-accent-2/45 opacity-50 blur-3xl"
            />
            <div className="rotate-2 rounded-[2.25rem] border border-border bg-surface p-2.5 shadow-card transition-transform duration-500 hover:rotate-0">
              <Image
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                placeholder="blur"
                preload
                fetchPriority="high"
                sizes="(min-width: 640px) 384px, 288px"
                className="aspect-[4/5] w-full rounded-[1.75rem] object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-4 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2.5 text-xs font-medium shadow-card backdrop-blur sm:-left-10 sm:text-sm">
              <MapPinIcon className="size-4 text-accent" />
              {profile.location}
            </div>
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-3 gap-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse gap-1 card px-5 py-6 sm:px-6 sm:py-7">
              <dt className="text-xs text-muted sm:text-sm">{label}</dt>
              <dd className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <div className="mt-16 overflow-hidden mask-fade-x">
        <ul
          aria-label="Core tech stack"
          className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {[...coreStack, ...coreStack].map((tech, index) => (
            <li
              key={`${tech.name}-${index}`}
              aria-hidden={index >= coreStack.length ? true : undefined}
              className="flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-sm font-medium whitespace-nowrap text-muted"
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
