import {
  ChartColumn,
  Compass,
  Globe,
  Layers,
  PenTool,
  RefreshCw,
  Smartphone,
  Sparkles,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Icône de la pastille de chaque service (accordéon mobile 66:798, accès rapide). */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "sites-web": Globe,
  "applications-mobiles": Smartphone,
  "logiciels-sur-mesure": Layers,
  "transformation-digitale": RefreshCw,
  "ui-ux-design": PenTool,
  "automatisation-integration": Workflow,
  "conseil-architecture": Compass,
  "maintenance-evolution": Wrench,
  "data-science-ia": Sparkles,
  "tableaux-de-bord-bi": ChartColumn,
};

/** Visuels des blocs desktop (Figma 10:470 / 10:562, exportés en WebP 1040 × 800). */
export const SERVICE_VISUAL = (slug: string) => `/media/services/${slug}.webp`;

/**
 * Exemple de réalisation affiché sous certains services (Figma 248:1113, 285:617, 332:561,
 * 302:10456, 268:5561). Masqué de lui-même si la réalisation n'est pas publiée.
 */
export const SERVICE_EXAMPLES: Record<string, { realisation: string; image: string; ratio: string }> = {
  "sites-web": { realisation: "ste-scpb", image: "/media/services/exemples/ste-scpb.webp", ratio: "300/162" },
  "applications-mobiles": {
    realisation: "ninety-one-foot-academy",
    image: "/media/services/exemples/ninety-one-foot-academy.webp",
    ratio: "300/162",
  },
  "logiciels-sur-mesure": {
    realisation: "cocoatrack",
    image: "/media/services/exemples/cocoatrack.webp",
    ratio: "300/206",
  },
  "ui-ux-design": {
    realisation: "agora-film-invest",
    image: "/media/services/exemples/agora-film-invest.webp",
    ratio: "300/162",
  },
  "automatisation-integration": {
    realisation: "golden-beans",
    image: "/media/services/exemples/golden-beans.webp",
    ratio: "300/162",
  },
};
