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
                "inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted backdrop-blur transition-[color,border-color,box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent hover:shadow-[0_0_20px_-6px_var(--glow)]",
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
