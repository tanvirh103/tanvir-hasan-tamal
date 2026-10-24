import type { Metadata, Viewport } from "next";
import { Cal_Sans, Inter } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { basePath, siteConfig, withBasePath } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const calSans = Cal_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-cal-sans",
  // Cal Sans ships no metric overrides, so rely on the CSS fallback stack instead.
  adjustFontFallback: false,
});

const ogImageUrl = `${siteConfig.url}${siteConfig.ogImage}`;

/**
 * GitHub Pages can't send security headers, so the policy is delivered as a <meta> tag.
 * Inline scripts stay allowed because a static export inlines Next.js's hydration data and
 * the theme script, but external scripts, connections and form posts are limited to this
 * site and the contact form service. Skipped in development, where HMR needs eval and WebSockets.
 */
const contactOrigin = new URL(siteConfig.contactForm.endpoint).origin;
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${contactOrigin}`,
  `form-action 'self' ${contactOrigin}`,
  "object-src 'none'",
  "base-uri 'self'",
  "upgrade-insecure-requests",
].join("; ");

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.url}/`),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: `${siteConfig.url}/` },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImageUrl],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#07090c" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The theme script mutates the class before hydration, hence the warning suppression.
    <html lang="en" className={`${inter.variable} ${calSans.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        )}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Next.js omits favicon.ico when a basePath is set; Safari needs it (no SVG favicons). */}
        {basePath && <link rel="icon" href={withBasePath("/favicon.ico")} sizes="48x48" />}
      </head>
      <body>
        {/* Site-wide grid backdrop; every section's content sits on top of it. */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-grid" />
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
