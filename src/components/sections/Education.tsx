import { Tilt } from "@/components/motion/Tilt";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { education } from "@/data/education";

import { Seal } from "./recognition/Seal";

/** Splits "A (x, y), B, C" on top-level commas only, keeping parenthesised groups intact. */
function splitTopLevel(value: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of value) {
    if (char === "(") depth += 1;
    if (char === ")") depth = Math.max(0, depth - 1);
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/** "Higher Secondary Certificate (HSC)" → "HSC"; falls back to undefined. */
function abbreviation(value: string): string | undefined {
  return value.match(/\(([^)]+)\)/)?.[1];
}

export function Education() {
  const [primary, ...rest] = education;
  if (!primary) return null;

  const details = primary.details ?? [];
  const thesis = details.find((d) => d.label.toLowerCase() === "thesis");
  const listDetails = details.filter((d) => d !== thesis);
  const major = details.find((d) => d.label.toLowerCase() === "major")?.value;
  const sealText = [abbreviation(primary.institution), primary.period, major]
    .filter(Boolean)
    .join(" · ");

  return (
    <Section
      id="education"
      index="05"
      eyebrow="Education"
      title={
        <>
          Academic <em className="accent-serif">foundation</em>
        </>
      }
      description="A computer science degree focused on software engineering, web technologies and blockchain research."
      className="overflow-clip"
    >
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        {/* University */}
        <div className="reveal-scale lg:col-span-8 lg:row-span-2">
          <Tilt
            as="article"
            max={5}
            className="group spotlight flex h-full flex-col card p-6 sm:p-9"
          >
            <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 sm:pt-2">
                <p className="label-mono text-accent">Undergraduate</p>
                <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl">
                  {primary.degree}
                </h3>
                <p className="mt-3 text-base text-muted sm:text-lg">{primary.institution}</p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                  <span className="sr-only">Period: </span>
                  {primary.period}
                </p>
              </div>
              <Seal
                text={sealText || primary.institution}
                className="shrink-0 self-center sm:self-start"
              />
            </div>

            {listDetails.length > 0 && (
              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-auto">
                {listDetails.map(({ label, value }) => {
                  const items = splitTopLevel(value);
                  return (
                    <div
                      key={label}
                      className="grid gap-2 bg-surface p-5 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:p-6"
                    >
                      <dt className="pt-0.5 label-mono text-subtle">{label}</dt>
                      <dd className="text-sm leading-relaxed text-foreground sm:text-base">
                        {items.length > 1 ? (
                          <ul className="flex flex-col gap-2">
                            {items.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span
                                  aria-hidden="true"
                                  className="mt-2.5 h-px w-3 shrink-0 bg-accent"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </Tilt>
        </div>

        {/* Earlier schooling */}
        {rest.map((item) => {
          const short = abbreviation(item.degree);
          return (
            <div key={item.degree} className="reveal lg:col-span-4">
              <Card
                as="article"
                className="relative flex h-full min-h-48 flex-col justify-end overflow-hidden p-6 sm:p-7"
              >
                {short && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-3 right-3 font-display text-8xl leading-none font-semibold tracking-tighter text-stroke select-none"
                  >
                    {short}
                  </span>
                )}
                <p className="relative font-mono text-xs text-subtle">
                  <span className="sr-only">Period: </span>
                  {item.period}
                </p>
                <h3 className="relative mt-2 text-lg leading-snug font-semibold tracking-tight">
                  {item.degree}
                </h3>
                <p className="relative mt-1 text-sm text-muted">{item.institution}</p>
              </Card>
            </div>
          );
        })}

        {/* Thesis */}
        {thesis && (
          <div className="reveal lg:col-span-12">
            <Card
              as="article"
              aria-labelledby="education-thesis-label"
              className="relative overflow-hidden p-6 sm:p-10 lg:p-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-dots mask-radial opacity-60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-glow-2"
              />
              <div className="relative grid gap-6 lg:grid-cols-[12rem_1fr] lg:gap-10">
                <h3 id="education-thesis-label" className="label-mono text-accent lg:pt-4">
                  {thesis.label}
                </h3>
                <p className="max-w-4xl text-3xl leading-[1.1] text-balance sm:text-4xl lg:text-5xl">
                  <span className="accent-serif">{thesis.value}</span>
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Section>
  );
}
