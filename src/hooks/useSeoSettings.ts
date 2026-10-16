import { useEffect, useState } from "react";
import { getSeoSettingsByPage } from "@/services/seoService";
import { seedSeoSettings } from "@/data/seed";
import type { SeoSettings } from "@/types";

interface UseSeoSettingsResult {
  data: SeoSettings | null;
  loading: boolean;
}

/** Busca o title/description/OG/canonical de uma página em `seo_settings` (com fallback pro seed). */
export function useSeoSettings(page: string): UseSeoSettingsResult {
  const [data, setData] = useState<SeoSettings | null>(
    () => seedSeoSettings.find((item) => item.page === page) ?? null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getSeoSettingsByPage(page)
      .then((result) => {
        if (active) setData(result);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page]);

  return { data, loading };
}
