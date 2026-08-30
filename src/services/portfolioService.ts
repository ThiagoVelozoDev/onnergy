import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedPortfolioCategories, seedPortfolioItems } from "@/data/seed";
import type { PortfolioCategory, PortfolioItem } from "@/types";

export async function getActivePortfolioCategories(): Promise<PortfolioCategory[]> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("portfolio_categories")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as PortfolioCategory[];
  }, seedPortfolioCategories);
}

export async function getPortfolioItemsByCategory(categoryId: string): Promise<PortfolioItem[]> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("category_id", categoryId)
      .eq("active", true)
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as PortfolioItem[];
  }, seedPortfolioItems.filter((item) => item.category_id === categoryId));
}
