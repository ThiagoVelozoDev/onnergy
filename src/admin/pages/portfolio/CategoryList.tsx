import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { getIcon } from "@/components/icon-map";
import { cn } from "@/lib/utils";
import { deletePortfolioCategory, updatePortfolioCategory } from "@/services/portfolioService";
import { CategoryForm } from "@/admin/pages/portfolio/CategoryForm";
import type { PortfolioCategory } from "@/types";

interface CategoryListProps {
  categories: PortfolioCategory[];
  selectedCategoryId: string | null;
  onSelect: (id: string) => void;
  onChanged: () => void;
}

export function CategoryList({ categories, selectedCategoryId, onSelect, onChanged }: CategoryListProps) {
  const { showToast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function handleToggleActive(category: PortfolioCategory) {
    try {
      await updatePortfolioCategory(category.id, { active: !category.active });
      onChanged();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Erro ao atualizar categoria.", "error");
    }
  }

  async function handleDelete(category: PortfolioCategory) {
    const confirmed = window.confirm(
      `Excluir "${category.title}"? Todas as fotos e vídeos desta categoria serão apagados permanentemente.`,
    );
    if (!confirmed) return;
    try {
      await deletePortfolioCategory(category.id);
      showToast("Categoria excluída.");
      onChanged();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Erro ao excluir categoria.", "error");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-950/60">Categorias</h2>
        {!creating && (
          <Button type="button" size="sm" variant="outline" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Nova
          </Button>
        )}
      </div>

      {creating && (
        <CategoryForm
          onCancel={() => setCreating(false)}
          onSaved={() => {
            setCreating(false);
            onChanged();
          }}
        />
      )}

      <div className="space-y-2">
        {categories.map((category) => {
          if (editingId === category.id) {
            return (
              <CategoryForm
                key={category.id}
                initialValue={category}
                onCancel={() => setEditingId(null)}
                onSaved={() => {
                  setEditingId(null);
                  onChanged();
                }}
              />
            );
          }

          const Icon = getIcon(category.icon);
          return (
            <div
              key={category.id}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors",
                category.id === selectedCategoryId ? "border-orange bg-orange/5" : "border-ink-950/10 bg-white/90",
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
              >
                <Icon className="h-4 w-4 shrink-0 text-orange-dark" aria-hidden="true" />
                <span className="truncate text-sm font-medium text-ink-950">{category.title}</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleActive(category)}
                aria-label={category.active ? "Desativar categoria" : "Ativar categoria"}
              >
                <Badge variant={category.active ? "success" : "neutral"}>
                  {category.active ? "Ativa" : "Inativa"}
                </Badge>
              </button>
              <button
                type="button"
                onClick={() => setEditingId(category.id)}
                aria-label="Editar categoria"
                className="shrink-0 text-ink-950/50 hover:text-orange-dark"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(category)}
                aria-label="Excluir categoria"
                className="shrink-0 text-ink-950/50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
