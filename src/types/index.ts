import type { SimpleIcon } from "simple-icons";

export type SocialPlatform =
  "github" | "linkedin" | "email" | "facebook" | "codeforces" | "whatsapp";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  /** A separate page; when omitted the item links to the home page section `#id`. */
  href?: string;
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  employmentType: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: { label: string; value: string }[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  featured?: boolean;
  badge?: string;
}

export interface Tech {
  name: string;
  icon?: SimpleIcon;
}

export interface SkillGroup {
  title: string;
  description: string;
  items: Tech[];
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
}

export interface VolunteerActivity {
  title: string;
  organization?: string;
  date: string;
}

export interface Stat {
  value: string;
  label: string;
}
