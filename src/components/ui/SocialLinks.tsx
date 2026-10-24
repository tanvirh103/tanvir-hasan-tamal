import { SocialIcon } from "@/components/icons";
import { socialLinks } from "@/data/profile";
import { cn } from "@/lib/cn";

interface SocialLinksProps {
  className?: string;
  itemClassName?: string;
}

export function SocialLinks({ className, itemClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map(({ platform, label, href }) => {
        const isExternal = href.startsWith("http");
        return (
          <li key={platform}>
            <a
              href={href}
              aria-label={label}
              title={label}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent",
                itemClassName,
              )}
              {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <SocialIcon platform={platform} className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
