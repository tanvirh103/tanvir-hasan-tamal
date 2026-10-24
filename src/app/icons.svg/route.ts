import { spriteIcons } from "@/data/skills";

export const dynamic = "force-static";

/** Builds a static SVG sprite of all technology logos at build time. */
export function GET(): Response {
  const symbols = spriteIcons
    .map(
      ({ slug, path }) => `<symbol id="${slug}" viewBox="0 0 24 24"><path d="${path}"/></symbol>`,
    )
    .join("");

  return new Response(`<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
