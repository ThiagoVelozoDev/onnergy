import { useCallback, useEffect, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { useToast } from "@/components/ui/Toast";
import {
  getAllPortfolioItemsByCategory,
  softDeletePortfolioItem,
  swapPortfolioItemsOrder,
  updatePortfolioItem,
} from "@/services/portfolioService";
import { BatchUploadPanel } from "@/admin/pages/portfolio/BatchUploadPanel";
import { ItemCard } from "@/admin/pages/portfolio/ItemCard";
import type { PortfolioItem } from "@/types";

interface ItemsPanelProps {
  categoryId: string;
  categoryTitle: string;
}

export function ItemsPanel({ categoryId, categoryTitle }: ItemsPanelProps) {
  const { showToast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(() => {
    setLoading(true);
    setError(null);
    getAllPortfolioItemsByCategory(categoryId)
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "Erro ao carregar itens."))
      .finally(() => setLoading(false));
  }, [categoryId]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const nextSortOrder = items.length > 0 ? Math.max(...items.map((item) => item.sort_order)) + 1 : 1;

  async function handleMove(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    try {
      await swapPortfolioItemsOrder(items[index], items[targetIndex]);
      loadItems();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Erro ao reordenar.", "error");
    }
  }

  async function handleToggleActive(item: PortfolioItem) {
    try {
      await updatePortfolioItem(item.id, { active: !item.active });
      loadItems();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Erro ao atualizar item.", "error");
    }
  }

  async function handleRename(item: PortfolioItem, title: string) {
    try {
      await updatePortfolioItem(item.id, { title });
      loadItems();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Erro ao renomear item.", "error");
    }
  }

  async function handleDelete(item: PortfolioItem) {
    const confirmed = window.confirm(`Excluir "${item.title}"?`);
    if (!confirmed) return;
    try {
      await softDeletePortfolioItem(item.id);
      showToast("Item excluído.");
      loadItems();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Erro ao excluir item.", "error");
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-bold uppercase tracking-wide text-ink-950/60">Fotos — {categoryTitle}</h2>

      <BatchUploadPanel categoryId={categoryId} nextSortOrder={nextSortOrder} onUploaded={loadItems} />

      {loading && <LoadingState message="Carregando fotos..." />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && items.length === 0 && (
        <EmptyState
          title="Nenhuma foto cadastrada nesta categoria ainda."
          description="Use o upload acima para adicionar."
        />
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((item, index) => (
            <ItemCard
              key={item.id}
              item={item}
              disableMoveUp={index === 0}
              disableMoveDown={index === items.length - 1}
              onMoveUp={() => handleMove(index, -1)}
              onMoveDown={() => handleMove(index, 1)}
              onToggleActive={() => handleToggleActive(item)}
              onRename={(title) => handleRename(item, title)}
              onDelete={() => handleDelete(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
