import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "./fonts";
import "./globals.css";

/** 404 des adresses qui ne passent pas par [locale] (ex. /fichier-inexistant.pdf). */
export const metadata: Metadata = {
  title: "Page introuvable — ZIIIILO",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <main className="container flex min-h-dvh flex-col items-start justify-center gap-24 py-64">
          <p className="font-mono text-stat text-primary-default">404</p>
          <h1 className="text-h1">Cette page s’est perdue en route.</h1>
          <Link href="/" className="text-text-link underline underline-offset-4 text-label-l">
            Accueil
          </Link>
        </main>
      </body>
    </html>
  );
}
