import type { NextConfig } from "next";

/**
 * Full-stack deployment (Vercel): pages are rendered by Next.js and the contact form is served by
 * the route handler in src/app/api/contact. Security headers are sent by Next.js itself, so no
 * <meta>-based policy is needed.
 */
const isDev = process.env.NODE_ENV !== "production";

// Development needs eval (React debugging) and a WebSocket for hot reload; production allows neither.
const devScriptSources = isDev ? " 'unsafe-eval'" : "";
const devConnectSources = isDev ? " ws: wss:" : "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inlines hydration data and the theme script; a nonce-based policy would need middleware.
      `script-src 'self' 'unsafe-inline'${devScriptSources}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      `connect-src 'self'${devConnectSources}`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
