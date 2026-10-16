import { useEffect } from "react";

export interface StructuredDataItem {
  id: string;
  data: Record<string, unknown>;
}

interface SeoOptions {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  /** Marca a página como "não indexar" (ex.: 404). */
  noindex?: boolean;
  /** Um ou mais blocos JSON-LD (schema.org) para injetar enquanto a página estiver montada. */
  structuredData?: StructuredDataItem[];
}

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function removeMeta(name: string, attr: "name" | "property" = "name") {
  document.querySelector(`meta[${attr}="${name}"]`)?.remove();
}

function upsertLink(rel: string, href: string) {
  let tag = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

/**
 * Injeta um ou mais blocos JSON-LD (schema.org) no <head> e os remove ao
 * desmontar. Usado tanto pelo `useSeo` (schema por página) quanto
 * diretamente por `PublicLayout` (schema sitewide, que não deve disputar
 * `document.title` com a página filha).
 */
export function useStructuredData(items: StructuredDataItem[] = []): void {
  useEffect(() => {
    const scripts = items.map(({ id, data }) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `ld-json-${id}`;
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      return script;
    });
    return () => {
      scripts.forEach((script) => script.remove());
    };
  }, [items]);
}

/** Atualiza title + meta description/OG/canonical/robots sem depender de libs externas. */
export function useSeo({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  noindex = false,
  structuredData,
}: SeoOptions): void {
  useEffect(() => {
    document.title = title;
    upsertMeta("og:title", ogTitle ?? title, "property");
    upsertMeta("og:type", ogType, "property");
    upsertMeta("og:site_name", "ONNERGY Engenharia Elétrica", "property");

    if (description) {
      upsertMeta("description", description);
      upsertMeta("og:description", ogDescription ?? description, "property");
    }
    if (ogImage) upsertMeta("og:image", ogImage, "property");
    if (ogUrl) upsertMeta("og:url", ogUrl, "property");
    if (canonical) upsertLink("canonical", canonical);

    if (noindex) {
      upsertMeta("robots", "noindex, nofollow");
    } else {
      removeMeta("robots");
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogUrl, ogType, noindex]);

  useStructuredData(structuredData);
}
