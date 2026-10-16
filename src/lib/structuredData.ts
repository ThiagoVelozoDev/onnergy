/**
 * Builders de dados estruturados (schema.org / JSON-LD) usados pelo `useSeo`
 * (ver `src/hooks/useSeo.ts`, hook `useStructuredData`). Mantidos aqui para
 * não misturar a lógica de montagem do schema com a de injeção no DOM.
 *
 * Guards importantes: nunca expor um placeholder (`[INSERIR ...]`) num campo
 * público do JSON-LD — nesse caso o campo é omitido em vez de inventado.
 */
import type { Course, Service, SiteSettings } from "@/types";

export const SITE_URL = "https://onnergy.com.br";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

/** "5569992076644" -> "+5569992076644" (E.164). */
function toE164(whatsapp: string | null): string | undefined {
  if (isPlaceholder(whatsapp)) return undefined;
  const digits = (whatsapp as string).replace(/\D/g, "");
  return digits ? `+${digits}` : undefined;
}

/** Extrai o CEP de uma string de endereço livre (best-effort). */
function extractPostalCode(address: string | null): string | undefined {
  if (!address) return undefined;
  const match = address.match(/CEP\s*(\d{5}-?\d{3})/i);
  return match?.[1];
}

/** Retorna a parte "rua/número/bairro" do endereço, antes do "CEP" (best-effort). */
function extractStreetAddress(address: string | null): string | undefined {
  if (!address) return undefined;
  const street = address.split(/,?\s*CEP\s*\d/i)[0]?.trim();
  return street || undefined;
}

/** Parser best-effort só para o formato atual ("Segunda a Sexta, 08h às 18h").
 *  Se o texto não bater com esse padrão, omite o campo em vez de inventar horário. */
function buildOpeningHours(businessHours: string | null): Record<string, unknown> {
  if (!businessHours) return {};
  const match = businessHours.match(/segunda a sexta,?\s*(\d{2})h\s*às\s*(\d{2})h/i);
  if (!match) return {};
  return {
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: `${match[1]}:00`,
        closes: `${match[2]}:00`,
      },
    ],
  };
}

/**
 * JSON-LD sitewide da empresa. `Electrician` é um subtipo válido de
 * `LocalBusiness` no vocabulário schema.org (o tipo `ElectricalContractor`
 * não existe e não deve ser usado).
 */
export function buildLocalBusinessJsonLd(siteSettings: SiteSettings): Record<string, unknown> {
  const telephone = toE164(siteSettings.whatsapp);
  const streetAddress = extractStreetAddress(siteSettings.address);
  const postalCode = extractPostalCode(siteSettings.address);

  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": ORGANIZATION_ID,
    name: siteSettings.company_name,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/logo-onnergy-white.png`,
    ...(telephone ? { telephone } : {}),
    ...(!isPlaceholder(siteSettings.email) ? { email: siteSettings.email } : {}),
    address: {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      ...(postalCode ? { postalCode } : {}),
      addressLocality: "Porto Velho",
      addressRegion: "RO",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Porto Velho" },
      { "@type": "State", name: "Rondônia" },
    ],
    ...buildOpeningHours(siteSettings.business_hours),
    // sameAs omitido de propósito: social_links (seedSocialLinks) ainda são
    // todos "#" — adicionar aqui quando os perfis reais existirem.
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildServiceListJsonLd(services: Service[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.short_description ?? undefined,
        areaServed: "Porto Velho, RO",
        provider: { "@id": ORGANIZATION_ID },
      },
    })),
  };
}

export function buildCourseListJsonLd(courses: Course[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": courses.map((course) => ({
      "@type": "Course",
      name: course.title,
      description: course.short_description ?? undefined,
      provider: {
        "@type": "Organization",
        name: "ONNERGY Engenharia Elétrica",
        sameAs: `${SITE_URL}/`,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: course.modality ?? undefined,
        // course.location ainda é "[INSERIR ENDEREÇO]" no seed — nunca expor placeholder.
        location: { "@type": "Place", address: "Porto Velho, RO" },
      },
    })),
  };
}
