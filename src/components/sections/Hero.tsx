import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import portrait from "@/assets/tanvir.webp";
import { ArrowRightIcon, DownloadIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { RotatingGreeting } from "@/components/ui/RotatingGreeting";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TypingText } from "@/components/ui/TypingText";
import { profile, stats } from "@/data/profile";
import { coreStack } from "@/data/skills";
import { siteConfig } from "@/lib/site";

const nameParts = profile.name.split(" ");
const lastName = nameParts.pop() ?? "";
const leadingName = nameParts.join(" ");

const typingPhrases = [profile.role, ...profile.focusAreas.map((area) => area.title)];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Syntax-coloured pieces for the code card. */
const Key = ({ children }: { children: ReactNode }) => (
  <span className="text-syn-key">{children}</span>
);
const Str = ({ children }: { children: ReactNode }) => (
  <span className="text-syn-string">&quot;{children}&quot;</span>
);

function CodeCard() {
  const stack = coreStack.slice(0, 4).map((tech) => tech.name);

  return (
    <div className="neon-frame shadow-[0_30px_80px_-30px_var(--glow)]">
      <div className="overflow-hidden rounded-[1.3rem] bg-code">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-3 font-mono text-xs text-muted">engineer.ts</span>
        </div>
        <pre className="p-5 font-mono text-[0.8rem] leading-7 break-words whitespace-pre-wrap sm:p-6 sm:text-sm">
          <code>
            <span className="text-syn-comment">{"// building things that scale"}</span>
            {"\n"}
            <span className="text-syn-keyword">const</span> <Key>engineer</Key> = {"{"}
            {"\n  "}
            <Key>name</Key>: <Str>{profile.name}</Str>,{"\n  "}
            <Key>role</Key>: <Str>{profile.role}</Str>,{"\n  "}
            <Key>location</Key>: <Str>{profile.location}</Str>,{"\n  "}
            <Key>stack</Key>: [
            {stack.map((name, index) => (
              <span key={name}>
                <Str>{name}</Str>
                {index < stack.length - 1 ? ", " : ""}
              </span>
            ))}
            ],{"\n  "}
            <Key>companies</Key>: <span className="text-syn-number">{stats[0]?.value ?? "3"}</span>,
            {"\n"}
            {"};"}
          </code>
        </pre>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-10"
    >
      {/* Background: blueprint grid, two drifting neon orbs and a 3D grid floor. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-y" />
        <div className="orb absolute -top-32 -left-24 size-[28rem] rounded-full bg-accent/25 blur-[120px] dark:bg-accent/20" />
        <div className="orb absolute top-20 -right-32 size-[30rem] rounded-full bg-accent-2/20 blur-[130px] [animation-delay:-9s] dark:bg-accent-2/20" />
        <div className="absolute inset-x-0 bottom-0 h-64 [perspective:600px]">
          <div className="grid-floor absolute inset-x-[-50%] bottom-0 h-[200%] origin-bottom [transform:rotateX(62deg)] bg-grid [mask-image:linear-gradient(to_top,#000_10%,transparent_70%)]" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <div className="min-w-0">
            <p
              className="fade-up inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 font-mono text-xs text-accent"
              style={delay(0)}
            >
              <span
                className="pulse-dot relative inline-flex size-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              {profile.availability}
            </p>

            <p
              className="fade-up mt-8 font-mono text-base text-muted sm:text-lg"
              style={delay(100)}
            >
              <RotatingGreeting />
              <span className="sr-only">Hello</span>, I&apos;m
            </p>

            <h1
              className="fade-up mt-2 text-5xl leading-[1.02] font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl"
              style={delay(200)}
            >
              {leadingName} <span className="text-neon">{lastName}</span>
            </h1>

            <p className="fade-up mt-6 font-mono text-lg sm:text-xl" style={delay(300)}>
              <span className="text-accent-2">{">"} </span>
              <TypingText phrases={typingPhrases} />
            </p>

            <p
              className="fade-up mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              style={delay(400)}
            >
              {profile.headline}
            </p>

            <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={delay(500)}>
              <ButtonLink href="#projects">
                View my work
                <ArrowRightIcon className="transition-transform group-hover/button:translate-x-1" />
              </ButtonLink>
              <ButtonLink href={siteConfig.resume} variant="secondary" external>
                <DownloadIcon />
                Download resume
              </ButtonLink>
            </div>

            <SocialLinks className="fade-up mt-8" />
          </div>

          <div className="fade-up relative" style={delay(350)}>
            <div data-tilt className="tilt">
              <CodeCard />
            </div>

            {/* Portrait with a rotating neon ring, floating over the card's corner. */}
            <div className="float absolute -top-14 right-4 sm:-top-16 sm:right-8">
              <div className="neon-frame p-[3px]" style={{ borderRadius: "9999px" }}>
                <Image
                  src={portrait}
                  alt={`Portrait of ${profile.name}`}
                  placeholder="blur"
                  preload
                  fetchPriority="high"
                  sizes="112px"
                  className="size-24 rounded-full border-4 border-background object-cover sm:size-28"
                />
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map(({ value, label }, index) => (
            <div
              key={label}
              className="fade-up glass-card flex flex-col-reverse gap-1 px-4 py-6 sm:px-6"
              style={delay(600 + index * 100)}
            >
              <dt className="font-mono text-xs text-muted sm:text-sm">{label}</dt>
              <dd className="text-neon text-3xl font-bold tracking-tight sm:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
