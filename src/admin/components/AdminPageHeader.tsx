import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-ink-950">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-950/60">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
