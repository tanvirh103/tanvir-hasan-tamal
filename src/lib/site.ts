export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a file in `public/` with the deployment base path. */
export function withBasePath(path: `/${string}`): string {
  return `${basePath}${path}`;
}

export const siteConfig = {
  name: "Tanvir Hasan Tamal",
  shortName: "Tanvir",
  title: "Tanvir Hasan Tamal – Full-Stack Software Engineer",
  description:
    "Full-stack software engineer building scalable, multi-tenant SaaS platforms with Next.js, NestJS, TypeScript, MongoDB and PostgreSQL. Explore my experience, projects and skills.",
  url: "https://tanvirh103.github.io/tanvir-hasan-tamal",
  ogImage: "/og-image.png",
  resume: "/Resume_of_Tanvir_Hasan_Tamal.pdf",
  /**
   * Contact form submissions are delivered by Web3Forms (https://web3forms.com) to the inbox
   * the access key was created for. The key is public by design and safe to commit.
   */
  contactForm: {
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "",
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
