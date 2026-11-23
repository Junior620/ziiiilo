import { Inter, JetBrains_Mono, Sora } from "next/font/google";

/** Titres et chiffres — Sora SemiBold (§5). */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-sora",
});

/** Texte, libellés, champs — Inter 400 à 700 (§5). */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

/** Effets « code » des animations et mockups — JetBrains Mono 400/500 (§5). */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: false,
});

export const fontVariables = `${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`;
