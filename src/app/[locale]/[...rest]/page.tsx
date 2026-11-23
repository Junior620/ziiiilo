import { notFound } from "next/navigation";

/** Toute adresse inconnue sous une langue publiée → 404 localisée ([locale]/not-found.tsx). */
/** Rend toujours une 404 : rien à valider pour la navigation instantanée. */
export const instant = false;

export default function CatchAllPage() {
  notFound();
}
