import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedFooterSettings, seedSiteSettings, seedSocialLinks } from "@/data/seed";
import type { FooterSettings, SiteSettings, SocialLink } from "@/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return (data as SiteSettings | null) ?? seedSiteSettings;
  }, seedSiteSettings);
}

export async function getFooterSettings(): Promise<FooterSettings> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("footer_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return (data as FooterSettings | null) ?? seedFooterSettings;
  }, seedFooterSettings);
}

export async function getActiveSocialLinks(): Promise<SocialLink[]> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as SocialLink[];
  }, seedSocialLinks);
}
