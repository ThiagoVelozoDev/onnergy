import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedTrainings } from "@/data/seed";
import type { Training } from "@/types";

export async function getActiveTrainings(): Promise<Training[]> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("trainings")
      .select("*")
      .eq("active", true)
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Training[];
  }, seedTrainings);
}
