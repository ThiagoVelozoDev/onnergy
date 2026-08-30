import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description?: string;
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

/** Atualiza title + meta description/OG sem depender de libs externas. */
export function useSeo({ title, description }: SeoOptions): void {
  useEffect(() => {
    document.title = title;
    upsertMeta("og:title", title, "property");
    if (description) {
      upsertMeta("description", description);
      upsertMeta("og:description", description, "property");
    }
  }, [title, description]);
}
