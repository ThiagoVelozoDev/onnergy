import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export function EmptyState({ title, description, icon: Icon = Inbox }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-950/10 py-16 text-center">
      <Icon className="h-8 w-8 text-ink-950/30" aria-hidden="true" />
      <p className="text-sm font-medium text-ink-950/70">{title}</p>
      {description && <p className="max-w-sm text-xs text-ink-950/50">{description}</p>}
    </div>
  );
}
