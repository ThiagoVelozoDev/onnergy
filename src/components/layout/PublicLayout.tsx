import { Outlet } from "react-router-dom";
import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useStructuredData, type StructuredDataItem } from "@/hooks/useSeo";
import { buildLocalBusinessJsonLd } from "@/lib/structuredData";

export function PublicLayout() {
  const { siteSettings } = useSiteSettings();

  // JSON-LD sitewide (Electrician/LocalBusiness) — presente em todas as
  // rotas públicas de uma vez só, sem duplicar por página.
  const structuredData = useMemo<StructuredDataItem[]>(
    () => [{ id: "organization", data: buildLocalBusinessJsonLd(siteSettings) }],
    [siteSettings],
  );
  useStructuredData(structuredData);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
