import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { EtudeStub } from "@/components/etudes/EtudeStub";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("realisations.items.fleetrent");
  return buildMetadata({ title: t("title"), description: t("mobile.text"), href: "/solutions/fleetrent" });
}

/** Page produit fleetrent — bouchon du socle, remplacé par la session B1 (maquette Figma). */
export default function Page() {
  return <EtudeStub slug="fleetrent" parent="solutions" />;
}
