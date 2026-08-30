import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { LeadForm } from "@/components/sections/LeadForm";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeo } from "@/hooks/useSeo";

export default function Contact() {
  useSeo({
    title: "Contato | ONNERGY Engenharia Elétrica",
    description: "Fale com a ONNERGY Engenharia Elétrica pelo WhatsApp, e-mail ou telefone.",
  });

  const { siteSettings } = useSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar sobre o seu projeto"
        description="Preencha o formulário ou fale diretamente com um de nossos especialistas."
      />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <LeadForm source="contato" />

          <Card className="p-6 sm:p-8">
            <h2 className="text-lg font-bold text-paper">Informações de contato</h2>
            <ul className="mt-6 space-y-5 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-paper">WhatsApp</p>
                  <p>{siteSettings.whatsapp}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-paper">E-mail</p>
                  <p>{siteSettings.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-paper">Endereço</p>
                  <p>{siteSettings.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-paper">Horário de atendimento</p>
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
