/** Returns a valid absolute origin such as https://example.com, never an empty or invalid value. */
function resolveSiteUrl(...candidates: (string | undefined)[]): string {
  for (const candidate of candidates) {
    const value = candidate?.trim().replace(/\/+$/, "");
    if (!value) continue;
    const absolute = /^https?:\/\//.test(value) ? value : `https://${value}`;
    try {
      return new URL(absolute).origin;
    } catch {
      // Ignore malformed values and try the next candidate.
    }
  }
  return "http://localhost:3000";
}
export const siteConfig = {
  name: "Tanvir Hasan Tamal",
  shortName: "Tanvir",
  title: "Tanvir Hasan Tamal – Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building scalable, multi-tenant SaaS platforms with Next.js, NestJS, TypeScript, MongoDB and PostgreSQL. Explore my experience, projects and skills.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL),
  ogImage: "/og-image.png",
  resume: "/Resume_of_Tanvir_Hasan_Tamal.pdf",
  /** Contact form submissions go to the route handler in src/app/api/contact (Gmail SMTP). */
  contactForm: {
    endpoint: "/api/contact",
  },
  locale: "en_US",
  keywords: [
    "Tanvir Hasan Tamal",
    "Tanvir Hasan",
    "tanvirh103",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "NestJS Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Backend Developer",
    "Frontend Developer",
    "Bangladeshi Software Engineer",
    "Portfolio",
  ],
} as const;
