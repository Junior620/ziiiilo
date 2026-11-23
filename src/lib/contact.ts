import { z } from "zod";
import { site } from "@/config/site";

/**
 * Schéma du formulaire de contact (docs/DESIGN.md §9), partagé par le formulaire (client)
 * et `/api/contact` (serveur). Les messages sont des codes, traduits par `contact.form.errors`.
 */
export const PROJECT_TYPES = [
  "web",
  "mobile",
  "software",
  "transformation",
  "automation",
  "consulting",
  "other",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

/** Budget et délai : listes à valider par ZIIIILO (`site.form`). Vides = champs masqués. */
export const hasBudgets = site.form.budgets.length > 0;
export const hasTimelines = site.form.timelines.length > 0;

const phonePattern = /^\+?[0-9 ().-]{6,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name"),
  company: z.string().trim().max(160).optional(),
  email: z.string().trim().pipe(z.email("email")),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || phonePattern.test(v), "phone")
    .optional(),
  projectTypes: z.array(z.enum(PROJECT_TYPES)).min(1, "projectTypes"),
  budget: z.string().optional(),
  timeline: hasTimelines ? z.string().min(1, "timeline") : z.string().optional(),
  message: z.string().trim().min(20, "message").max(5000),
  consent: z.literal(true, "consent"),
  /** Champ piège : invisible pour les visiteurs, rempli par les robots. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** Type de projet présélectionné depuis « Demander un devis » (`/contact?service=<slug>`). */
export const SERVICE_TO_PROJECT_TYPE: Record<string, ProjectType> = {
  "sites-web": "web",
  "applications-mobiles": "mobile",
  "logiciels-sur-mesure": "software",
  "transformation-digitale": "transformation",
  "automatisation-integration": "automation",
  "conseil-architecture": "consulting",
  "ui-ux-design": "other",
  "maintenance-evolution": "other",
  "data-science-ia": "other",
  "tableaux-de-bord-bi": "other",
};
