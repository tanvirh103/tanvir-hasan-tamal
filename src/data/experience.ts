import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "EraVend GmbH & Co. KG",
    role: "Full-Stack Developer",
    location: "Königsbrunn, Germany",
    employmentType: "Remote",
    period: "Jan 2026 — Present",
    current: true,
    highlights: [
      "Engineering and maintaining features for a multi-tenant Employee Management System (EMS) serving multiple companies from a unified platform.",
      "Architected and delivered core modules — Chat, Notifications, Email, Sales and Finance — across both the Next.js frontend and NestJS backend.",
      "Built real-time communication with WebSockets and automated email workflows, integrating sales and finance data flows across microservices.",
      "Improved system stability through targeted UI enhancements and extensive bug resolution across critical modules.",
    ],
    stack: ["Next.js", "NestJS", "TypeScript", "WebSockets", "Microservices"],
  },
  {
    company: "Techy's UK",
    role: "Junior Full-Stack Developer",
    employmentType: "Remote",
    period: "Jul 2025 — Dec 2025",
    highlights: [
      "Developed and maintained full-stack features across multiple client platforms using Next.js, NestJS, Express.js, Prisma and PostgreSQL.",
      "Engineered mobile-responsive UI components, integrated scalable REST APIs and optimized key application workflows for performance.",
      "Deployed secure Stripe payment integrations, resolved build issues and remediated post-deployment problems on VPS environments.",
      "Enhanced client-site SEO and OpenGraph metadata, improving search and social visibility.",
    ],
    stack: ["Next.js", "NestJS", "Express.js", "Prisma", "PostgreSQL", "Stripe"],
  },
  {
    company: "Deepchain Labs",
    role: "Software Engineer Trainee",
    employmentType: "Remote",
    period: "Oct 2024 — Feb 2025",
    highlights: [
      "Contributed to Kazentic, a multi-tenant SaaS remote office suite with CRM, HRM, Payroll, Billing, Team and Projects modules.",
      "Developed backend features for the Calendar and Teams modules using NestJS, Mongoose and MongoDB.",
      "Built and integrated APIs for 10+ modules including Calendar, Forms, Organization Settings and Payroll.",
      "Implemented secure REST APIs, improved module performance and fixed high-priority production issues.",
    ],
    stack: ["NestJS", "MongoDB", "Mongoose", "Next.js", "REST API"],
  },
];
