import { useEffect, useState } from "react";
import { getSiteSettings } from "@/services/siteService";
import { seedSiteSettings } from "@/data/seed";
import type { SiteSettings } from "@/types";

interface UseSiteSettingsResult {
  siteSettings: SiteSettings;
  loading: boolean;
}

export function useSiteSettings(): UseSiteSettingsResult {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(seedSiteSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSiteSettings()
      .then((data) => {
        if (active) setSiteSettings(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { siteSettings, loading };
}
