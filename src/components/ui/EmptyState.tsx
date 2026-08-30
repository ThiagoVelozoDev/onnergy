import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export function EmptyState({ title, description, icon: Icon = Inbox }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-center">
      <Icon className="h-8 w-8 text-white/30" aria-hidden="true" />
      <p className="text-sm font-medium text-white/70">{title}</p>
      {description && <p className="max-w-sm text-xs text-white/40">{description}</p>}
    </div>
  );
}
