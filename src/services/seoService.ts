import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedSeoSettings } from "@/data/seed";
import type { SeoSettings } from "@/types";

export async function getSeoSettingsByPage(page: string): Promise<SeoSettings | null> {
  const fallback = seedSeoSettings.find((item) => item.page === page) ?? null;
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("seo_settings")
      .select("*")
      .eq("page", page)
      .maybeSingle();
    if (error) throw error;
    return (data as SeoSettings | null) ?? fallback;
  }, fallback);
}
