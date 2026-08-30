import type { LeadStatus } from "@/types";
import type { BadgeVariant } from "@/components/ui/Badge";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Novo",
  contacted: "Em contato",
  qualified: "Qualificado",
  converted: "Convertido",
  lost: "Perdido",
};

export const LEAD_STATUS_VARIANTS: Record<LeadStatus, BadgeVariant> = {
  new: "warning",
  contacted: "neutral",
  qualified: "orange",
  converted: "success",
  lost: "danger",
};
