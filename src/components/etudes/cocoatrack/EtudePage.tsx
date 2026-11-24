import { EtudeRenderer } from "@/components/etudes/EtudeRenderer";

/**
 * CocoaTrack — Figma desktop 319:1014, mobile 325:1796 (§7, v2.6).
 * Présentation privée : page et cartes masquées si `site.publication.cocoatrack` vaut false.
 * Aucun lien vers l'application ; les annotations « Statut à confirmer » restent internes.
 */
export default function EtudePage() {
  return <EtudeRenderer slug="cocoatrack" />;
}
