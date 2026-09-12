import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { ICON_KEYS } from "@/components/icon-map";
import { slugify } from "@/lib/utils";
import { createPortfolioCategory, updatePortfolioCategory } from "@/services/portfolioService";
import type { PortfolioCategory } from "@/types";

const categorySchema = z.object({
  title: z.string().trim().min(2, "Informe um título."),
  slug: z
    .string()
    .trim()
    .min(2, "Informe um slug.")
    .regex(/^[a-z0-9-]+$/, "Use letras minúsculas, números e hífen."),
  description: z.string().trim(),
  icon: z.string().min(1, "Selecione um ícone."),
  sort_order: z.coerce.number().int().min(0, "Use um número positivo."),
  active: z.enum(["true", "false"]),
});

interface CategoryFormProps {
  initialValue?: PortfolioCategory;
  onCancel: () => void;
  onSaved: () => void;
}

const iconOptions = ICON_KEYS.map((key) => ({ value: key, label: key }));
const activeOptions = [
  { value: "true", label: "Ativa" },
  { value: "false", label: "Inativa" },
];

export function CategoryForm({ initialValue, onCancel, onSaved }: CategoryFormProps) {
  const { showToast } = useToast();
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [slug, setSlug] = useState(initialValue?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initialValue);
  const [description, setDescription] = useState(initialValue?.description ?? "");
  const [icon, setIcon] = useState(initialValue?.icon ?? ICON_KEYS[0]);
  const [sortOrder, setSortOrder] = useState(String(initialValue?.sort_order ?? 0));
  const [active, setActive] = useState(String(initialValue?.active ?? true));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = categorySchema.safeParse({ title, slug, description, icon, sort_order: sortOrder, active });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      const payload = {
        title: result.data.title,
        slug: result.data.slug,
        description: result.data.description.length > 0 ? result.data.description : null,
        icon: result.data.icon,
        sort_order: result.data.sort_order,
        active: result.data.active === "true",
      };
      if (initialValue) {
        await updatePortfolioCategory(initialValue.id, payload);
        showToast("Categoria atualizada.");
      } else {
        await createPortfolioCategory(payload);
        showToast("Categoria criada.");
      }
      onSaved();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Erro ao salvar categoria.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-2xl border border-ink-950/10 bg-white/90 p-5 sm:grid-cols-2"
    >
      <Input label="Título" value={title} onChange={(e) => handleTitleChange(e.target.value)} error={errors.title} />
      <Input
        label="Slug"
        value={slug}
        onChange={(e) => {
          setSlugTouched(true);
          setSlug(e.target.value);
        }}
        error={errors.slug}
      />
      <div className="sm:col-span-2">
        <Textarea
          label="Descrição (opcional)"
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Select
        label="Ícone"
        options={iconOptions}
        value={icon ?? ""}
        onChange={(e) => setIcon(e.target.value)}
        error={errors.icon}
      />
      <Input
        label="Ordem"
        type="number"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        error={errors.sort_order}
      />
      <Select label="Status" options={activeOptions} value={active} onChange={(e) => setActive(e.target.value)} />
      <div className="flex items-end gap-3 sm:col-span-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
