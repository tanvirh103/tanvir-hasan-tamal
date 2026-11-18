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

/** Email, phone and location as rows, shared by the home page and the contact page. */
export function ContactDetails({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-2", className)}>
      {contactDetails.map(({ icon: Icon, label, value, href }) => {
        const content = (
          <>
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-xs text-muted">{label}</span>
              <span className="block truncate text-sm font-medium">{value}</span>
            </span>
            {href && (
              <ArrowUpRightIcon className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            )}
          </>
        );
        const rowClass =
          "group flex items-center gap-3 rounded-2xl bg-surface-muted p-3 pr-4 transition-colors duration-300";
        return (
          <li key={label}>
            {href ? (
              <a href={href} className={cn(rowClass, "hover:bg-border")}>
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
