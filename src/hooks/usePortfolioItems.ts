import { useEffect, useState } from "react";
import { getPortfolioItemsByCategory } from "@/services/portfolioService";
import type { PortfolioItem } from "@/types";

interface UsePortfolioItemsResult {
  items: PortfolioItem[];
  loading: boolean;
  error: string | null;
}

export function usePortfolioItems(categoryId: string | null): UsePortfolioItemsResult {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setItems([]);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    getPortfolioItemsByCategory(categoryId)
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Erro ao carregar mídia");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [categoryId]);

  return { items, loading, error };
}
