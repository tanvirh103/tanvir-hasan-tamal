import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { experiences } from "@/data/experience";
import { profile, socialLinks } from "@/data/profile";
import { siteConfig } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: `${siteConfig.url}/`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  worksFor: experiences
    .filter((job) => job.current)
    .map((job) => ({ "@type": "Organization", name: job.company })),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "American International University-Bangladesh",
  },
  sameAs: socialLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero/>
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Achievements />
      <Contact />
    </>
  );
}
