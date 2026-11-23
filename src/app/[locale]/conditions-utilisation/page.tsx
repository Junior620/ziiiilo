import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("terms.meta");
  return buildMetadata({ title: t("title"), description: t("description"), href: "/conditions-utilisation" });
}

export default function Page() {
  return <LegalPage ns="terms" />;
}
