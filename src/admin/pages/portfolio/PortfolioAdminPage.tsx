import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { CategoryList } from "@/admin/pages/portfolio/CategoryList";
import { ItemsPanel } from "@/admin/pages/portfolio/ItemsPanel";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { useSeo } from "@/hooks/useSeo";
import { getAllPortfolioCategories } from "@/services/portfolioService";
import type { PortfolioCategory } from "@/types";

export default function PortfolioAdminPage() {
  useSeo({ title: "Portfólio | ONNERGY Admin" });

  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const loadCategories = useCallback(() => {
    setLoading(true);
    setError(null);
    getAllPortfolioCategories()
      .then((data) => {
        setCategories(data);
        setSelectedCategoryId((current) => current ?? data[0]?.id ?? null);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Erro ao carregar categorias."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) ?? null;

  return (
    <>
      <AdminPageHeader
        title="Portfólio"
        description="Gerencie categorias e as fotos/vídeos exibidos em /portfolio."
      />

      {loading && <LoadingState message="Carregando categorias..." />}
      {!loading && error && <ErrorState message={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
          <CategoryList
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
            onChanged={loadCategories}
          />

          {selectedCategory ? (
            <ItemsPanel categoryId={selectedCategory.id} categoryTitle={selectedCategory.title} />
          ) : (
            <EmptyState
              title="Nenhuma categoria cadastrada ainda."
              description="Crie uma categoria para começar a enviar fotos."
            />
          )}
        </div>
      )}
    </>
  );
}
