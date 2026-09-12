import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Pencil, Trash2, Video, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { PortfolioItem } from "@/types";

interface ItemCardProps {
  item: PortfolioItem;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleActive: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
}

export function ItemCard({
  item,
  disableMoveUp,
  disableMoveDown,
  onMoveUp,
  onMoveDown,
  onToggleActive,
  onRename,
  onDelete,
}: ItemCardProps) {
  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState(item.title);

  function handleSaveRename() {
    const trimmed = title.trim();
    if (trimmed.length > 0 && trimmed !== item.title) onRename(trimmed);
    else setTitle(item.title);
    setRenaming(false);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink-950/10 bg-white/90">
      <div className="relative">
        {item.media_type === "photo" ? (
          <img src={item.media_url} alt={item.title} className="h-32 w-full object-cover" loading="lazy" />
        ) : (
          <video
            src={item.media_url}
            poster={item.thumbnail_url ?? undefined}
            className="h-32 w-full bg-ink-950 object-cover"
          />
        )}
        {item.media_type === "video" && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-ink-950/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            <Video className="h-3 w-3" aria-hidden="true" />
            Vídeo
          </span>
        )}
        <button
          type="button"
          onClick={onToggleActive}
          className="absolute right-2 top-2"
          aria-label={item.active ? "Desativar item" : "Ativar item"}
        >
          <Badge variant={item.active ? "success" : "neutral"}>{item.active ? "Ativo" : "Inativo"}</Badge>
        </button>
      </div>

      <div className="space-y-2 p-3">
        {renaming ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Título do item"
              autoFocus
              className="w-full rounded border border-ink-950/10 bg-white px-2 py-1 text-xs text-ink-950 focus:border-orange-dark focus:outline-none focus:ring-1 focus:ring-orange-dark"
            />
            <button type="button" onClick={handleSaveRename} aria-label="Salvar título" className="shrink-0 text-emerald-600">
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle(item.title);
                setRenaming(false);
              }}
              aria-label="Cancelar edição"
              className="shrink-0 text-ink-950/50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setRenaming(true)}
            className="flex w-full items-center gap-1.5 text-left text-xs font-medium text-ink-950"
          >
            <span className="line-clamp-1 flex-1">{item.title}</span>
            <Pencil className="h-3 w-3 shrink-0 text-ink-950/40" aria-hidden="true" />
          </button>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={disableMoveUp}
              aria-label="Mover para cima"
              className="rounded p-1 text-ink-950/60 hover:text-orange-dark disabled:opacity-30"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={disableMoveDown}
              aria-label="Mover para baixo"
              className="rounded p-1 text-ink-950/60 hover:text-orange-dark disabled:opacity-30"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Excluir item"
            className="rounded p-1 text-ink-950/50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
