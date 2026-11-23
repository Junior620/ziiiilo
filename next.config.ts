import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Fichiers lus par les images de partage (/og/…), embarqués dans la fonction Vercel
  // au cas où une image serait rendue à la demande et non au build.
  outputFileTracingIncludes: {
    "/og/[lang]/[image]": [
      "./src/assets/og-fonts/*.ttf",
      "./src/styles/tokens.css",
      "./public/brand/*.svg",
      "./public/media/**/*.webp",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // En-têtes de sécurité sur toutes les réponses (Vercel derrière Cloudflare).
  // Pas de CSP pour l'instant : le script de démarrage et le JSON-LD sont en ligne (nonce à prévoir).
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  experimental: {
    // 404 des adresses hors [locale] (ex. fichiers inexistants).
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
