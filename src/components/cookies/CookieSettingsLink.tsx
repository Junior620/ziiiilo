"use client";

import type { ReactNode } from "react";
import { useConsent } from "./Consent";

/** Lien « Gestion des cookies » du pied de page : ouvre la modale, pas une page (§9 bis). */
export function CookieSettingsLink({ children, className }: { children: ReactNode; className?: string }) {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className={className} aria-haspopup="dialog">
      {children}
    </button>
  );
}
