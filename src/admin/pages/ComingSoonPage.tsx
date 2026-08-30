import { Construction } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { useSeo } from "@/hooks/useSeo";

export function ComingSoonPage({ title }: { title: string }) {
  useSeo({ title: `${title} | ONNERGY Admin` });

  return (
    <>
      <AdminPageHeader title={title} description="Este módulo do CMS chega na próxima fase do projeto." />
      <EmptyState
        icon={Construction}
        title="Em construção"
        description="O CRUD completo desta seção será implementado na Fase 2 do CMS."
      />
    </>
  );
}
