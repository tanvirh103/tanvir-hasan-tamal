import {
  siBootstrap,
  siCplusplus,
  siDocker,
  siDotnet,
  siExpress,
  siGit,
  siGithub,
  siHeroui,
  siJavascript,
  siLinux,
  siMongodb,
  siMongoose,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPostman,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siRedux,
  siShadcnui,
  siSocketdotio,
  siSolana,
  siSolidity,
  siStripe,
  siSwagger,
  siTailwindcss,
  siTypeorm,
  siTypescript,
  siVercel,
} from "simple-icons";

import type { SimpleIcon } from "simple-icons";

import type { SkillGroup, Tech } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    description: "Typed, pragmatic and fluent across paradigms.",
    items: [
      { name: "TypeScript", icon: siTypescript },
      { name: "JavaScript", icon: siJavascript },
      { name: "C#", icon: siDotnet },
      { name: "C++", icon: siCplusplus },
      { name: "Java", icon: siOpenjdk },
      { name: "Python", icon: siPython },
      { name: "PHP", icon: siPhp },
      { name: "SQL" },
    ],
  },
  {
    title: "Frontend",
    description: "Accessible, responsive and fast user interfaces.",
    items: [
      { name: "Next.js", icon: siNextdotjs },
      { name: "React", icon: siReact },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "shadcn/ui", icon: siShadcnui },
      { name: "HeroUI", icon: siHeroui },
      { name: "Bootstrap", icon: siBootstrap },
      { name: "Zustand" },
      { name: "Redux", icon: siRedux },
    ],
  },
  {
    title: "Backend",
    description: "Robust APIs and services that scale.",
    items: [
      { name: "NestJS", icon: siNestjs },
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express.js", icon: siExpress },
      { name: "Prisma", icon: siPrisma },
      { name: "TypeORM", icon: siTypeorm },
      { name: "Mongoose", icon: siMongoose },
      { name: "Swagger", icon: siSwagger },
      { name: "WebSockets", icon: siSocketdotio },
    ],
  },
  {
    title: "Data & Performance",
    description: "Reliable storage, caching and payments.",
    items: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "MongoDB", icon: siMongodb },
      { name: "MySQL", icon: siMysql },
      { name: "MSSQL" },
      { name: "Redis", icon: siRedis },
      { name: "Stripe", icon: siStripe },
    ],
  },
  {
    title: "Tools & DevOps",
    description: "Shipping with confidence, end to end.",
    items: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
      { name: "Docker", icon: siDocker },
      { name: "Postman", icon: siPostman },
      { name: "Vercel", icon: siVercel },
      { name: "Linux", icon: siLinux },
    ],
  },
  {
    title: "Web3",
    description: "Blockchain research and decentralized apps.",
    items: [
      { name: "Solana", icon: siSolana },
      { name: "Solidity", icon: siSolidity },
    ],
  },
];

/** A compact list of the core stack, shown in the hero marquee. */
export const coreStack: Tech[] = [
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "TypeScript", icon: siTypescript },
  { name: "NestJS", icon: siNestjs },
  { name: "Node.js", icon: siNodedotjs },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MongoDB", icon: siMongodb },
  { name: "Prisma", icon: siPrisma },
  { name: "Redis", icon: siRedis },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Docker", icon: siDocker },
  { name: "Stripe", icon: siStripe },
];

/** Every unique logo used on the site, used to build the icon sprite. */
export const spriteIcons: SimpleIcon[] = [
  ...new Map(
    [...skillGroups.flatMap((group) => group.items), ...coreStack]
      .flatMap((tech) => (tech.icon ? [tech.icon] : []))
      .map((icon) => [icon.slug, icon]),
  ).values(),
];
