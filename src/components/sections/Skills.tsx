import { SkillsBoard } from "@/components/skills/SkillsBoard";
import { Section } from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";

/** Placed directly under the hero, so visitors see the toolkit first. */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills & tools"
      title={
        <>
          My toolkit, <span className="text-muted">end to end.</span>
        </>
      }
      description="Pick a category to see where each tool fits."
      className="pt-6 sm:pt-10"
    >
      <SkillsBoard groups={skillGroups} />
    </Section>
  );
}
