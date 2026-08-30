import { useEffect, useState } from "react";
import { getActivePortfolioCategories } from "@/services/portfolioService";
import type { PortfolioCategory } from "@/types";

interface UsePortfolioCategoriesResult {
  categories: PortfolioCategory[];
  loading: boolean;
  error: string | null;
}

export function usePortfolioCategories(): UsePortfolioCategoriesResult {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getActivePortfolioCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Erro ao carregar categorias");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading, error };
}
