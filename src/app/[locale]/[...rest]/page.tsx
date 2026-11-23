import { notFound } from "next/navigation";

/** Toute adresse inconnue sous une langue publiée → 404 localisée ([locale]/not-found.tsx). */
export default function CatchAllPage() {
  notFound();
}
