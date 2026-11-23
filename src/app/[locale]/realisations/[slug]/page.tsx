import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ETUDES } from "@/components/etudes/registry";
import { getEtudes } from "@/data/realisations";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/** Slugs prérendus ; `params` lu hors <Suspense> pour un vrai 404 (Cache Components). */
export const instant = false;

export function generateStaticParams() {
  return getEtudes().map(({ slug }) => ({ slug }));
}

const isEtude = (slug: string) => slug in ETUDES && getEtudes().some((r) => r.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isEtude(slug)) return {};
  const t = await getTranslations("realisations");
  return buildMetadata({
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.mobile.text`),
    href: { pathname: "/realisations/[slug]", params: { slug } },
  });
}

/** Étude de réalisation — une page par slug (registre `components/etudes`), 404 sinon. */
export default async function EtudeRoute({ params }: Props) {
  const { slug } = await params;
  if (!isEtude(slug)) notFound();
  const { default: EtudePage } = await ETUDES[slug]();
  return <EtudePage />;
}
