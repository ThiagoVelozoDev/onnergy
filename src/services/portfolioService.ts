import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedPortfolioCategories, seedPortfolioItems } from "@/data/seed";
import { deleteFromSiteMedia, storagePathFromPublicUrl } from "@/services/storageService";
import type { NewPortfolioCategory, NewPortfolioItem, PortfolioCategory, PortfolioItem } from "@/types";

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

// --- Admin: categorias ---

export async function getAllPortfolioCategories(): Promise<PortfolioCategory[]> {
  const { data, error } = await supabase
    .from("portfolio_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as PortfolioCategory[];
}

export async function createPortfolioCategory(input: NewPortfolioCategory): Promise<PortfolioCategory> {
  const { data, error } = await supabase.from("portfolio_categories").insert(input).select().single();
  if (error) throw error;
  return data as PortfolioCategory;
}

export async function updatePortfolioCategory(
  id: string,
  patch: Partial<NewPortfolioCategory>,
): Promise<PortfolioCategory> {
  const { data, error } = await supabase
    .from("portfolio_categories")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PortfolioCategory;
}

export async function deletePortfolioCategory(id: string): Promise<void> {
  const items = await getAllPortfolioItemsByCategory(id, { includeDeleted: true });
  const paths = items
    .map((item) => storagePathFromPublicUrl(item.media_url))
    .filter((path): path is string => path !== null);
  if (paths.length > 0) {
    try {
      await deleteFromSiteMedia(paths);
    } catch (error) {
      console.warn("[onnergy] Falha ao remover arquivos do Storage (categoria excluída mesmo assim):", error);
    }
  }

  const { error } = await supabase.from("portfolio_categories").delete().eq("id", id);
  if (error) throw error;
}

// --- Admin: itens ---

export async function getAllPortfolioItemsByCategory(
  categoryId: string,
  options?: { includeDeleted?: boolean },
): Promise<PortfolioItem[]> {
  let query = supabase.from("portfolio_items").select("*").eq("category_id", categoryId);
  if (!options?.includeDeleted) {
    query = query.is("deleted_at", null);
  }
  const { data, error } = await query.order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as PortfolioItem[];
}

export async function createPortfolioItem(input: NewPortfolioItem): Promise<PortfolioItem> {
  const { data, error } = await supabase.from("portfolio_items").insert(input).select().single();
  if (error) throw error;
  return data as PortfolioItem;
}

export async function updatePortfolioItem(
  id: string,
  patch: Partial<NewPortfolioItem>,
): Promise<PortfolioItem> {
  const { data, error } = await supabase.from("portfolio_items").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data as PortfolioItem;
}

export async function softDeletePortfolioItem(id: string): Promise<void> {
  const { error } = await supabase
    .from("portfolio_items")
    .update({ deleted_at: new Date().toISOString(), active: false })
    .eq("id", id);
  if (error) throw error;
}

export async function swapPortfolioItemsOrder(
  a: Pick<PortfolioItem, "id" | "sort_order">,
  b: Pick<PortfolioItem, "id" | "sort_order">,
): Promise<void> {
  const [resultA, resultB] = await Promise.all([
    supabase.from("portfolio_items").update({ sort_order: b.sort_order }).eq("id", a.id),
    supabase.from("portfolio_items").update({ sort_order: a.sort_order }).eq("id", b.id),
  ]);
  if (resultA.error) throw resultA.error;
  if (resultB.error) throw resultB.error;
}
