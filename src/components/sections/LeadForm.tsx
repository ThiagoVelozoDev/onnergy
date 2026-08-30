import { useState, type FormEvent } from "react";
import { Lock, MessageCircle } from "lucide-react";
import { z } from "zod";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useServices } from "@/hooks/useServices";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { createLead } from "@/services/leadsService";
import { generateWhatsAppMessage, openWhatsApp } from "@/services/whatsappService";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo."),
  whatsapp: z.string().trim().min(10, "Informe um WhatsApp válido com DDD."),
  email: z.string().trim().email("Informe um e-mail válido."),
  serviceId: z.string().min(1, "Selecione um serviço."),
  message: z.string().trim().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;
type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

const initialValues: LeadFormValues = { name: "", whatsapp: "", email: "", serviceId: "", message: "" };

interface LeadFormProps {
  source?: string;
}

export function LeadForm({ source = "site" }: LeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const { services } = useServices();
  const { siteSettings } = useSiteSettings();
  const { showToast } = useToast();

  function updateField<K extends keyof LeadFormValues>(field: K, value: LeadFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = leadSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: LeadFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LeadFormValues;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const selectedService = services.find((service) => service.id === values.serviceId);

    try {
      await createLead({
        name: result.data.name,
        whatsapp: result.data.whatsapp,
        email: result.data.email,
        service_id: result.data.serviceId,
        message: result.data.message || null,
        source,
      });
    } catch (error) {
      console.warn("[onnergy] Falha ao registrar lead:", error);
    } finally {
      setSubmitting(false);
    }

    showToast("Recebemos sua solicitação! Você será direcionado para o WhatsApp.");

    if (siteSettings.whatsapp) {
      openWhatsApp(
        siteSettings.whatsapp,
        generateWhatsAppMessage({
          name: result.data.name,
          serviceName: selectedService?.title,
          message: result.data.message,
        }),
      );
    }

    setValues(initialValues);
  }

  return (
    <Card className="w-full p-6 sm:p-8">
      <h3 className="text-lg font-bold text-paper">
        Solicite um <span className="text-gold">orçamento</span>
        <br />
        ou mais informações
      </h3>

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          label="Nome"
          placeholder="Seu nome"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          label="WhatsApp"
          placeholder="(00) 00000-0000"
          value={values.whatsapp}
          onChange={(event) => updateField("whatsapp", event.target.value)}
          error={errors.whatsapp}
          autoComplete="tel"
          inputMode="tel"
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <Select
          label="Serviço"
          placeholder="Qual serviço você deseja?"
          value={values.serviceId}
          onChange={(event) => updateField("serviceId", event.target.value)}
          error={errors.serviceId}
          options={services.map((service) => ({ value: service.id, label: service.title }))}
        />
        <Textarea
          label="Mensagem (opcional)"
          placeholder="Conte um pouco mais sobre o que você precisa"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          error={errors.message}
        />

        <Button type="submit" size="lg" className="mt-2 w-full" disabled={submitting}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {submitting ? "Enviando..." : "Quero Falar Agora"}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-white/40">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Seus dados estão seguros. Não enviamos spam.
        </p>
      </form>
    </Card>
  );
}
