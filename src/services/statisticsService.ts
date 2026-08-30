import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedStatistics } from "@/data/seed";
import type { Statistic } from "@/types";

export async function getActiveStatistics(): Promise<Statistic[]> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("statistics")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Statistic[];
  }, seedStatistics);
}
