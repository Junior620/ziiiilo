/**
 * Prévisions Cacao & Robusta — résultats réels au 20/11/2026 (docs/DESIGN.md §3, §7).
 * Cacao, MAPE en %, 85 dates de test (janv. 2025 – sept. 2026). Plus bas = meilleur.
 * Le MAPE est une erreur moyenne, jamais une « précision ».
 */
export const mapeCacao = [
  { horizon: "J+1", dernierCours: 2.4, modele: 2.6 },
  { horizon: "J+7", dernierCours: 7.1, modele: 7.9 },
  { horizon: "J+14", dernierCours: 10.3, modele: 12.8 },
  { horizon: "J+30", dernierCours: 16.0, modele: 24.4 },
] as const;

/** Aucun horizon validé : jamais de badge « Validé ». */
export const horizonsValides: string[] = [];

export const dateResultats = "2026-11-20";
