import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Content-Security-Policy. Notes:
 * - `'unsafe-inline'` on style-src is required for Tailwind v4 inline styles.
 * - `'unsafe-inline'` on script-src is required for Next.js inline scripts
 *   (RSC + structured-data JSON-LD). A future migration to nonce-based CSP
 *   is possible once all inline-script sources are accounted for.
 * - `connect-src` allows the dev WebSocket for HMR; production builds only
 *   actually use 'self'.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' mailto:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
  "font-src 'self' data: fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "connect-src 'self' ws: wss:",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // No external image domains in active use; keep the array empty until needed.
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/partners", destination: "/for-stores", permanent: true },
      { source: "/partners/:path*", destination: "/for-stores/:path*", permanent: true },
      { source: "/case-studies", destination: "/stories", permanent: true },
      { source: "/case-studies/:path*", destination: "/stories/:path*", permanent: true },
      { source: "/:locale(am|ru)/partners", destination: "/:locale/for-stores", permanent: true },
      { source: "/:locale(am|ru)/partners/:path*", destination: "/:locale/for-stores/:path*", permanent: true },
      { source: "/:locale(am|ru)/case-studies", destination: "/:locale/stories", permanent: true },
      { source: "/:locale(am|ru)/case-studies/:path*", destination: "/:locale/stories/:path*", permanent: true },
      { source: "/resources/phygital-retail-explained", destination: "/resources/in-store-online-retail-explained", permanent: true },
      { source: "/:locale(am|ru)/resources/phygital-retail-explained", destination: "/:locale/resources/in-store-online-retail-explained", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
