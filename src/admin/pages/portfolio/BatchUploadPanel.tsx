import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { createPortfolioItem } from "@/services/portfolioService";
import {
  buildGalleryStoragePath,
  titleFromFileName,
  uploadToSiteMedia,
  validatePhotoFile,
} from "@/services/storageService";

type QueueStatus = "pending" | "uploading" | "done" | "error";

interface QueueEntry {
  id: string;
  file: File;
  status: QueueStatus;
  errorMessage?: string;
}

const STATUS_LABEL: Record<QueueStatus, string> = {
  pending: "Aguardando",
  uploading: "Enviando",
  done: "Concluído",
  error: "Erro",
};

const STATUS_VARIANT: Record<QueueStatus, BadgeVariant> = {
  pending: "neutral",
  uploading: "orange",
  done: "success",
  error: "danger",
};

const CONCURRENCY = 3;

async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<void>,
): Promise<void> {
  let cursor = 0;
  async function next(): Promise<void> {
    const index = cursor;
    cursor += 1;
    if (index >= items.length) return;
    await worker(items[index], index);
    await next();
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => next()));
}

interface BatchUploadPanelProps {
  categoryId: string;
  nextSortOrder: number;
  onUploaded: () => void;
}

export function BatchUploadPanel({ categoryId, nextSortOrder, onUploaded }: BatchUploadPanelProps) {
  const { showToast } = useToast();
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [uploading, setUploading] = useState(false);

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const entries: QueueEntry[] = Array.from(fileList).map((file) => {
      const validationError = validatePhotoFile(file);
      return {
        id: crypto.randomUUID(),
        file,
        status: validationError ? "error" : "pending",
        errorMessage: validationError ?? undefined,
      };
    });
    setQueue(entries);
  }

  function updateEntry(id: string, patch: Partial<QueueEntry>) {
    setQueue((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }

  async function handleStartUpload() {
    const pendingEntries = queue.filter((entry) => entry.status === "pending");
    if (pendingEntries.length === 0) return;

    setUploading(true);
    const plannedOrder = new Map(pendingEntries.map((entry, index) => [entry.id, nextSortOrder + index]));
    let doneCount = 0;

    await runWithConcurrency(pendingEntries, CONCURRENCY, async (entry) => {
      updateEntry(entry.id, { status: "uploading" });
      try {
        const path = buildGalleryStoragePath(categoryId, entry.file);
        const publicUrl = await uploadToSiteMedia(path, entry.file);
        await createPortfolioItem({
          category_id: categoryId,
          title: titleFromFileName(entry.file.name),
          media_type: "photo",
          media_url: publicUrl,
          thumbnail_url: null,
          sort_order: plannedOrder.get(entry.id) ?? nextSortOrder,
          active: true,
        });
        updateEntry(entry.id, { status: "done" });
        doneCount += 1;
      } catch (error) {
        updateEntry(entry.id, {
          status: "error",
          errorMessage: error instanceof Error ? error.message : "Erro ao enviar.",
        });
      }
    });

    setUploading(false);
    onUploaded();
    showToast(
      `${doneCount}/${pendingEntries.length} fotos enviadas.`,
      doneCount === pendingEntries.length ? "success" : "error",
    );
  }

  const pendingCount = queue.filter((entry) => entry.status === "pending").length;

  return (
    <div className="rounded-2xl border border-dashed border-ink-950/20 bg-white/60 p-5">
      <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-ink-950">
        <UploadCloud className="h-5 w-5 shrink-0 text-orange-dark" aria-hidden="true" />
        Selecionar fotos (JPG, PNG ou WEBP, até 8MB cada)
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFilesSelected(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {queue.length > 0 && (
        <>
          <ul className="mt-4 max-h-60 space-y-1.5 overflow-y-auto text-xs">
            {queue.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-2">
                <span className="truncate text-ink-950/70">{entry.file.name}</span>
                <div className="flex shrink-0 items-center gap-2">
                  {entry.errorMessage && <span className="text-red-600">{entry.errorMessage}</span>}
                  <Badge variant={STATUS_VARIANT[entry.status]}>{STATUS_LABEL[entry.status]}</Badge>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleStartUpload}
            disabled={uploading || pendingCount === 0}
            className="mt-4 rounded-md bg-orange px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink-950 transition-colors hover:bg-orange-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Enviando..." : `Enviar ${pendingCount} foto(s)`}
          </button>
        </>
      )}
    </div>
  );
}
