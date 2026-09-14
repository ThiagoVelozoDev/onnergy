import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedPartnerCompanies } from "@/data/seed";
import type { PartnerCompany } from "@/types";

export async function getActivePartnerCompanies(): Promise<PartnerCompany[]> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("partner_companies")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as PartnerCompany[];
  }, seedPartnerCompanies);
}
