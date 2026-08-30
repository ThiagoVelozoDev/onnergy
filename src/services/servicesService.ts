import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedServices } from "@/data/seed";
import type { Service } from "@/types";

export async function getActiveServices(): Promise<Service[]> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Service[];
  }, seedServices);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .is("deleted_at", null)
      .maybeSingle();
    if (error) throw error;
    return data as Service | null;
  }, seedServices.find((service) => service.slug === slug) ?? null);
}
