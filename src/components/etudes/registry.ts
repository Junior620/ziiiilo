import type { ComponentType } from "react";

/**
 * Registre des études de réalisation (/realisations/[slug]) : une entrée par slug, chargée
 * à la demande. Chaque session de la phase B ne modifie que son dossier `<slug>/`.
 */
export const ETUDES: Record<string, () => Promise<{ default: ComponentType }>> = {
  cocoatrack: () => import("./cocoatrack/EtudePage"),
  "ste-scpb": () => import("./ste-scpb/EtudePage"),
  "ninety-one-foot-academy": () => import("./ninety-one-foot-academy/EtudePage"),
  "scpb-commercial": () => import("./scpb-commercial/EtudePage"),
  staftrack: () => import("./staftrack/EtudePage"),
  "previsions-cacao-robusta": () => import("./previsions-cacao-robusta/EtudePage"),
  "scpb-survey": () => import("./scpb-survey/EtudePage"),
  "golden-beans": () => import("./golden-beans/EtudePage"),
  "agora-film-invest": () => import("./agora-film-invest/EtudePage"),
};
