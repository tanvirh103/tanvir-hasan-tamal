import { ArrowUpIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-lg">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">© {year} · Built with Next.js & Tailwind CSS</p>
        </div>
        <SocialLinks className="justify-center" />
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          Back to top
          <ArrowUpIcon className="size-4" />
        </a>
      </Container>
    </footer>
  );
}
