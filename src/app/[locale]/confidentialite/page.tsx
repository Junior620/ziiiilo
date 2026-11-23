import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy.meta");
  return buildMetadata({ title: t("title"), description: t("description"), href: "/confidentialite" });
}

export default function Page() {
  return <LegalPage ns="privacy" />;
}
