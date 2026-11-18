import { ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

const contactDetails = [
  { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: PhoneIcon,
    label: "Phone / WhatsApp",
    value: profile.phone,
    href: `tel:${profile.phone}`,
  },
  { icon: MapPinIcon, label: "Location", value: `${profile.location} · Remote`, href: undefined },
];

/** Email, phone and location as glass tiles, shared by the home page and the contact page. */
export function ContactDetails({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-3", className)}>
      {contactDetails.map(({ icon: Icon, label, value, href }) => {
        const content = (
          <>
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block font-mono text-xs text-muted">{label}</span>
              <span className="block truncate text-sm font-medium">{value}</span>
            </span>
            {href && (
              <ArrowUpRightIcon className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            )}
          </>
        );
        const rowClass = "glass-card group flex items-center gap-3 p-4";
        return (
          <li key={label}>
            {href ? (
              <a href={href} className={rowClass}>
                {content}
              </a>
            ) : (
              <div className={rowClass}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
