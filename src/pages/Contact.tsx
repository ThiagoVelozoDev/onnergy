import { useMemo } from "react";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { LeadForm } from "@/components/sections/LeadForm";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeo, type StructuredDataItem } from "@/hooks/useSeo";
import { useSeoSettings } from "@/hooks/useSeoSettings";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/structuredData";

export default function Contact() {
  const { siteSettings } = useSiteSettings();
  const { data: seo } = useSeoSettings("contato");

  const structuredData = useMemo<StructuredDataItem[]>(
    () => [
      {
        id: "breadcrumb",
        data: buildBreadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]),
      },
    ],
    [],
  );

  useSeo({
    title: seo?.title ?? "Contato | ONNERGY Engenharia Elétrica",
    description: seo?.description ?? "Fale com a ONNERGY Engenharia Elétrica pelo WhatsApp, e-mail ou telefone.",
    canonical: seo?.canonical_url ?? `${SITE_URL}/contato`,
    ogTitle: seo?.og_title ?? undefined,
    ogDescription: seo?.og_description ?? undefined,
    structuredData,
  });

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar sobre o seu projeto"
        description="Preencha o formulário ou fale diretamente com um de nossos especialistas em Porto Velho."
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <LeadForm source="contato" />

          <Card className="p-6 sm:p-8">
            <h2 className="text-lg font-bold text-ink-950">Informações de contato</h2>
            <ul className="mt-6 space-y-5 text-sm text-ink-950/70">
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-dark" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink-950">WhatsApp</p>
                  <p>{siteSettings.whatsapp}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-orange-dark" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink-950">E-mail</p>
                  <p>{siteSettings.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-dark" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink-950">Endereço</p>
                  <p>{siteSettings.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange-dark" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink-950">Horário de atendimento</p>
                  <p>{siteSettings.business_hours}</p>
                </div>
              </li>
            </ul>
          </Card>
        </Container>
      </section>
    </>
  );
}
