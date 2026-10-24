import type { SVGProps } from "react";
import { siCodeforces, siFacebook, siGithub, siWhatsapp } from "simple-icons";

import type { SocialPlatform } from "@/types";

type IconProps = SVGProps<SVGSVGElement>;

/* ---------- Line icons (24px grid, stroke based) ---------- */

function LineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRightIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </LineIcon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </LineIcon>
);

export const ArrowUpIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </LineIcon>
);

export const DownloadIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </LineIcon>
);

export const MenuIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </LineIcon>
);

export const CloseIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </LineIcon>
);

export const SunIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </LineIcon>
);

export const MoonIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
  </LineIcon>
);

export const MailIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </LineIcon>
);

export const PhoneIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </LineIcon>
);

export const MapPinIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </LineIcon>
);

export const BriefcaseIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
  </LineIcon>
);

export const GraduationCapIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="m2 9 10-5 10 5-10 5L2 9Z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" />
  </LineIcon>
);

export const TrophyIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
    <path d="M17 6h3v2a3 3 0 0 1-3 3M7 6H4v2a3 3 0 0 0 3 3" />
  </LineIcon>
);

export const HeartHandshakeIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.1a5 5 0 1 1 7.5 6.5Z" />
  </LineIcon>
);

export const LayersIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </LineIcon>
);

export const ZapIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </LineIcon>
);

export const CreditCardIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M2.5 10h19M6 15h4" />
  </LineIcon>
);

export const GaugeIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M12 14l4-4" />
    <path d="M3.3 19a10 10 0 1 1 17.4 0" />
  </LineIcon>
);

/* ---------- Brand icons (filled, from simple-icons) ---------- */

function BrandIcon({ path, ...props }: IconProps & { path: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={path} />
    </svg>
  );
}

// LinkedIn was removed from simple-icons; this is its official glyph.
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

export const GithubIcon = (props: IconProps) => <BrandIcon path={siGithub.path} {...props} />;

const socialIcons: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  github: GithubIcon,
  linkedin: (props) => <BrandIcon path={LINKEDIN_PATH} {...props} />,
  email: MailIcon,
  facebook: (props) => <BrandIcon path={siFacebook.path} {...props} />,
  codeforces: (props) => <BrandIcon path={siCodeforces.path} {...props} />,
  whatsapp: (props) => <BrandIcon path={siWhatsapp.path} {...props} />,
};

export function SocialIcon({ platform, ...props }: IconProps & { platform: SocialPlatform }) {
  const Icon = socialIcons[platform];
  return <Icon {...props} />;
}
