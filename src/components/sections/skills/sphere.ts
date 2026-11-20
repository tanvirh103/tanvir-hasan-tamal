import type { SkillGroup, Tech } from "@/types";

/** One technology placed on the sphere (angles in degrees). */
export interface SpherePoint {
  tech: Tech;
  /** Longitude: rotation around the vertical axis. */
  theta: number;
  /** Latitude: rotation around the horizontal axis (-90 bottom … 90 top). */
  phi: number;
  /** Opacity when the item faces the viewer / sits at the back. */
  hi: number;
  lo: number;
  /** Opacity at rotation 0, used when motion is off. */
  rest: number;
}

const GOLDEN_ANGLE = 180 * (3 - Math.sqrt(5)); // ≈ 137.5°

/** Unique technologies across all groups, in the order they first appear. */
export function uniqueTechs(groups: SkillGroup[]): Tech[] {
  return [
    ...new Map(groups.flatMap((group) => group.items).map((tech) => [tech.name, tech])).values(),
  ];
}

/**
 * Even Fibonacci distribution on a unit sphere. Depth opacity follows the item's distance
 * from the viewer: items near the poles barely change depth, so their range is narrower.
 */
export function fibonacciSphere(techs: Tech[]): SpherePoint[] {
  const count = techs.length;
  return techs.map((tech, i) => {
    const y = 1 - (2 * (i + 0.5)) / count;
    const phi = (Math.asin(y) * 180) / Math.PI;
    const theta = (i * GOLDEN_ANGLE) % 360;
    const spread = Math.cos((phi * Math.PI) / 180); // 1 at the equator, 0 at the poles
    const hi = round(0.78 + 0.22 * spread);
    const lo = round(0.78 - 0.6 * spread);
    const rest = round(lo + ((hi - lo) * (1 + Math.cos((theta * Math.PI) / 180))) / 2);
    return { tech, theta: round(theta), phi: round(phi), hi, lo, rest };
  });
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}
