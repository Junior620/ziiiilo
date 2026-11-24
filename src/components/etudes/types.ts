import type { BadgeTone } from "@/components/ui/StatusBadge";

/**
 * Contenu d'une étude de réalisation (content/fr.json → `etudes.<slug>`), décrit par blocs.
 * Les textes viennent de Figma ; les visuels exportés vivent dans public/media/etudes/<slug>/.
 */

export type EtudeImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** Variante recadrée des maquettes mobile (sous 768 px). */
  mobile?: { src: string; width: number; height: number; alt?: string };
  /** Bords fondus dans le fond de la section (visuels exportés sur fond sombre). */
  fade?: boolean;
  /** Logo ou visuel à dimension fixe (px CSS), pas en pleine largeur. */
  display?: { width: number; height: number };
  rounded?: boolean;
  /** Masqué sous 768 px (aperçus réservés au desktop et à la tablette). */
  desktopOnly?: boolean;
};

/** Lien interne (`/realisations/...`), ancre (`#apercu`) ou adresse externe (`https://`). */
export type EtudeLink = { label: string; href: string; ariaLabel?: string };

export type CardItem = {
  icon?: string;
  number?: string;
  label?: string;
  title: string;
  text?: string;
  chips?: string[];
  points?: string[];
  badge?: { label: string; tone: BadgeTone };
  /** Piste ou élément non livré : bordure en pointillés. */
  dashed?: boolean;
  /** Carte mise en avant (étape clé, élément central). */
  highlight?: string;
  /** Lien en pied de carte (autre étude, page interne). */
  link?: EtudeLink;
};

export type Block =
  | {
      type: "cards";
      columns?: 2 | 3 | 4 | 5 | 6;
      style?: "card" | "plain";
      title?: string;
      items: CardItem[];
    }
  | {
      type: "compare";
      columns: {
        label: string;
        title: string;
        positive: boolean;
        items: { title: string; text?: string }[];
      }[];
    }
  | {
      type: "steps";
      items: CardItem[];
      columns?: 3 | 4 | 5 | 6;
      /** Grille de deux colonnes sous 768 px (chaînes courtes : traçabilité, workflow). */
      mobileColumns?: 2;
    }
  | {
      type: "panel";
      label?: string;
      title: string;
      text?: string;
      icon?: string;
      items?: { icon?: string; label: string }[];
      chips?: string[];
    }
  | ({ type: "image" } & EtudeImage)
  | { type: "images"; columns?: 1 | 2 | 3 | 4; items: EtudeImage[]; caption?: string }
  | { type: "checks"; title?: string; items: string[] }
  | { type: "alert"; tone?: "info" | "warning"; title?: string; text: string }
  | { type: "note"; text: string }
  | { type: "quote"; text: string }
  | {
      type: "rows";
      title?: string;
      icon?: string;
      items: { icon?: string; title: string; text?: string; tag?: string }[];
    }
  | { type: "text"; paragraphs: string[] }
  | { type: "chips"; label?: string; items: string[] }
  | { type: "flow"; label?: string; items: string[]; mobileOnly?: boolean }
  | { type: "actions"; items: EtudeLink[] }
  | { type: "split"; left: Block[]; right: Block[] };

export type HeroSection = {
  type: "hero";
  crumb: string;
  logo?: EtudeImage;
  /** Nom affiché à côté du logo (ex. « SCPB » + « Commercial »), texte réel. */
  logoText?: [string, string?];
  badges: { label: string; tone: BadgeTone; pulse?: boolean }[];
  title: string;
  lead: string;
  actions?: EtudeLink[];
  note?: string;
  visual?: EtudeImage;
};

export type ContentSection = {
  type: "section";
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  theme?: "light" | "subtle" | "dark";
  align?: "left" | "center";
  /** En-tête à gauche, blocs à droite en desktop. */
  layout?: "stack" | "split";
  blocks?: Block[];
};

export type MentionsSection = {
  type: "mentions";
  logos: EtudeImage[];
  title: string;
  text: string;
  action?: EtudeLink;
};

export type CtaBlock = {
  type: "cta";
  title: string;
  description?: string;
  primary: EtudeLink;
  secondary?: EtudeLink;
};

export type EtudeSection = HeroSection | ContentSection | MentionsSection | CtaBlock;

export type EtudeContent = { sections: EtudeSection[] };
