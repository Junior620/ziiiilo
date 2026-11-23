"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function snapshot() {
  const c = document.documentElement.classList;
  return !c.contains("splash-pending") && !c.contains("splash-active");
}

/**
 * Vrai quand aucun splash ne couvre la page (pas de splash, ou ouverture lancée).
 * Faux au rendu serveur : les animations « au montage » du hero partent après l'hydratation.
 */
export function useSplashDone() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
