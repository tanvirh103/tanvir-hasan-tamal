import type { ComponentType, SVGProps } from "react";

import { ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

interface ContactDetail {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href?: string;
}

export const contactDetails: ContactDetail[] = [
  { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: PhoneIcon,
    label: "Phone / WhatsApp",
    value: profile.phone,
    href: `tel:${profile.phone}`,
  },
  { icon: MapPinIcon, label: "Location", value: `${profile.location} · Remote` },
];

interface ContactDetailListProps {
  /** `stack` lists the tiles vertically; `grid` puts them in three columns from `lg`. */
  layout?: "stack" | "grid";
  className?: string;
}

/**
 * Email, phone and location as translucent tiles. Actionable details are links with an arrow
 * that lifts on hover; the location is plain text.
 */
export function ContactDetailList({ layout = "stack", className }: ContactDetailListProps) {
  return (
    <ul
      className={cn("grid gap-3", layout === "grid" ? "lg:grid-cols-3" : "grid-cols-1", className)}
    >
      {contactDetails.map(({ icon: Icon, label, value, href }) => {
        const content = (
          <>
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-accent-soft text-accent transition-transform duration-500 ease-out-expo group-hover/tile:-rotate-6">
              <Icon className="size-[1.125rem]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block label-mono text-subtle">{label}</span>
              <span className="mt-1 block text-[0.9375rem] font-medium break-all text-foreground">
                {value}
              </span>
            </span>
            {href && (
              <ArrowUpRightIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-subtle transition-[color,translate] duration-500 ease-out-expo group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5 group-hover/tile:text-accent"
              />
            )}
          </>
        );
        const base =
          "group/tile flex min-h-[4.5rem] items-center gap-4 rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur-sm";
        return (
          <li key={label}>
            {href ? (
              <a
                href={href}
                className={cn(
                  base,
                  "transition-[border-color,background-color,translate] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface focus-visible:border-accent",
                )}
              >
                {content}
              </a>
            ) : (
              <div className={base}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
