import type { CSSProperties } from "react";
import Image from "next/image";

import portrait from "@/assets/tanvir.webp";
import { ArrowRightIcon, BriefcaseIcon, MapPinIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { LocalTime } from "@/components/ui/LocalTime";
import { RotatingGreeting } from "@/components/ui/RotatingGreeting";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { experiences } from "@/data/experience";
import { profile, stats } from "@/data/profile";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const currentJob = experiences.find((job) => job.current);
const [firstName, ...restOfName] = profile.name.split(" ");

/** Small uppercase label used at the top of the secondary tiles. */
function TileLabel({ children }: { children: string }) {
  return <p className="text-xs font-medium tracking-wide text-muted uppercase">{children}</p>;
}

/**
 * The hero is a bento board: a large introduction tile, a portrait tile and a row of small
 * fact tiles. Tiles fade up in a short stagger on load.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="px-4 pt-24 pb-6 sm:px-6 sm:pt-28 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Introduction */}
        <div
          className="fade-up col-span-2 flex flex-col justify-between gap-10 tile p-7 sm:p-10 lg:col-span-3"
          style={delay(0)}
        >
          <p className="inline-flex w-fit items-center gap-2.5 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-medium">
            <span
              className="pulse-dot relative inline-flex size-2 rounded-full bg-emerald-500 text-emerald-500"
              aria-hidden="true"
            />
            {profile.availability}
          </p>

          <div>
            <p className="text-lg text-muted">
              <RotatingGreeting />
              <span className="sr-only">Hello</span>, I&apos;m
            </p>
            <h1 className="mt-2 text-5xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {firstName} <span className="text-muted">{restOfName.join(" ")}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              <span className="font-medium text-foreground">{profile.role}.</span>{" "}
              {profile.headline}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#projects">
              View my work
              <ArrowRightIcon className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/contact/" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
        </div>

        {/* Portrait */}
        <figure
          className="fade-up relative col-span-2 m-0 overflow-hidden tile lg:col-span-1"
          style={delay(80)}
        >
          <Image
            src={portrait}
            alt={`Portrait of ${profile.name}`}
            placeholder="blur"
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
            className="h-full max-h-[26rem] min-h-80 w-full object-cover object-[50%_25%] lg:max-h-none"
          />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-surface/85 px-4 py-3 backdrop-blur-md">
            <span className="block text-sm font-semibold">{profile.name}</span>
            <span className="block text-xs text-muted">{profile.role}</span>
          </figcaption>
        </figure>

        {/* Location and local time */}
        <div
          className="fade-up col-span-2 flex flex-col justify-between gap-6 tile p-6 sm:col-span-1"
          style={delay(160)}
        >
          <TileLabel>Based in</TileLabel>
          <div>
            <p className="flex items-center gap-2 font-semibold">
              <MapPinIcon className="size-4 text-accent" />
              {profile.location}
            </p>
            <p className="mt-1 text-sm">
              <LocalTime />
            </p>
          </div>
        </div>

        {/* Current role */}
        {currentJob && (
          <div
            className="fade-up col-span-2 flex flex-col justify-between gap-6 tile p-6 sm:col-span-1"
            style={delay(220)}
          >
            <TileLabel>Currently</TileLabel>
            <div>
              <p className="flex items-center gap-2 font-semibold">
                <BriefcaseIcon className="size-4 text-accent" />
                {currentJob.role}
              </p>
              <p className="mt-1 text-sm text-muted">{currentJob.company}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <dl
          className="fade-up col-span-2 grid grid-cols-3 gap-2 tile p-6 sm:col-span-1"
          style={delay(280)}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse gap-1">
              <dt className="text-[0.7rem] leading-tight text-muted">{label}</dt>
              <dd className="text-2xl font-semibold tracking-tight tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Socials */}
        <div
          className="fade-up col-span-2 flex flex-col justify-between gap-5 tile p-6 sm:col-span-1"
          style={delay(340)}
        >
          <TileLabel>Find me on</TileLabel>
          <SocialLinks className="gap-1.5" itemClassName="size-10" />
        </div>
      </div>
    </section>
  );
}
