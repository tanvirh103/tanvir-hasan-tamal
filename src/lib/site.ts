export const siteConfig = {
  name: "Tanvir Hasan Tamal",
  shortName: "Tanvir",
  title: "Tanvir Hasan Tamal – Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building scalable, multi-tenant SaaS platforms with Next.js, NestJS, TypeScript, MongoDB and PostgreSQL. Explore my experience, projects and skills.",
  /** Public URL of the site, without a trailing slash. Set NEXT_PUBLIC_SITE_URL in Vercel. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
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
