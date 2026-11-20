import Link from "next/link";

import { ArrowUpIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navItems, profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-2xl font-semibold tracking-tight">{profile.name}</p>
            <p className="mt-2 text-sm text-muted">{profile.role}</p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href ?? `/#${item.id}`}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-accent"
          >
            Back to top
            <ArrowUpIcon className="size-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
