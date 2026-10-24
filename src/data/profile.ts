import type { NavItem, SocialLink, Stat } from "@/types";

export const profile = {
  name: "Tanvir Hasan Tamal",
  firstName: "Tanvir",
  role: "Full-Stack Software Engineer",
  location: "Dhaka, Bangladesh",
  availability: "Full-Stack Engineer at EraVend GmbH & Co. KG",
  email: "tanvirh103@gmail.com",
  phone: "+8801534103985",
  headline:
    "I build scalable, multi-tenant SaaS platforms — from real-time systems and payment integrations to complex data workflows.",
  about: [
    "I'm a full-stack software engineer who enjoys turning complex business requirements into fast, reliable products. My day-to-day lives across the stack: Next.js and React on the frontend, NestJS and Express on the backend, with MongoDB and PostgreSQL underneath.",
    "Over the past few years I've shipped production features for multi-tenant SaaS products used by multiple companies — chat, notifications, payroll, sales, finance and more — while caring deeply about clean architecture, performance and developer experience.",
  ],
  focusAreas: [
    {
      title: "Multi-tenant SaaS",
      description: "Module architecture for platforms serving many companies from one codebase.",
    },
    {
      title: "Real-time systems",
      description: "WebSocket-driven chat, notifications and live data flows across services.",
    },
    {
      title: "Payments & integrations",
      description: "Secure Stripe Checkout, REST APIs and automated email workflows.",
    },
    {
      title: "Performance & quality",
      description: "Caching, rate limiting, SEO and fixing high-priority production issues.",
    },
  ],
} as const;

export const stats: Stat[] = [
  { value: "3", label: "Companies" },
  { value: "30+", label: "Modules shipped" },
  { value: "10+", label: "Projects built" },
  { value: "1st", label: "AIUB CS Fest 2024" },
];

export const socialLinks: SocialLink[] = [
  { platform: "github", label: "GitHub", href: "https://github.com/tanvirh103" },
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/tanvirh103/" },
  { platform: "email", label: "Email", href: `mailto:${profile.email}` },
  { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/tanvirh103/" },
  {
    platform: "codeforces",
    label: "Codeforces",
    href: "https://codeforces.com/profile/tanvirh103",
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${profile.phone.replace("+", "")}`,
  },
];

export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact", href: "/contact/" },
];
