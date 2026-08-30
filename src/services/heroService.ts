import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedHeroContent } from "@/data/seed";
import type { HeroContent } from "@/types";

export async function getActiveHero(): Promise<HeroContent> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .eq("active", true)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return (data as HeroContent | null) ?? seedHeroContent;
  }, seedHeroContent);
}
