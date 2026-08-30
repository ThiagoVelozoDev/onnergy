import { useEffect, useState } from "react";
import { GraduationCap, Inbox, TrendingUp, Users, Wrench } from "lucide-react";
import { AdminPageHeader } from "@/admin/components/AdminPageHeader";
import { LEAD_STATUS_LABELS, LEAD_STATUS_VARIANTS } from "@/admin/leadStatus";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { useServices } from "@/hooks/useServices";
import { useCourses } from "@/hooks/useCourses";
import { useTrainings } from "@/hooks/useTrainings";
import { useSeo } from "@/hooks/useSeo";
import { getLeadStats, getRecentLeads, type LeadStats } from "@/services/leadsService";
import { formatDateTime } from "@/lib/utils";
import type { Lead } from "@/types";

export default function DashboardPage() {
  useSeo({ title: "Dashboard | ONNERGY Admin" });

  const { services } = useServices();
  const { courses } = useCourses();
  const { trainings } = useTrainings();

  const [leadStats, setLeadStats] = useState<LeadStats>({ newCount: 0, monthCount: 0 });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([getLeadStats(), getRecentLeads()])
      .then(([stats, leads]) => {
        if (!active) return;
        setLeadStats(stats);
        setRecentLeads(leads);
      })
      .finally(() => {
        if (active) setLeadsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const metrics = [
    { label: "Serviços ativos", value: services.length, icon: Wrench },
    { label: "Cursos ativos", value: courses.length, icon: GraduationCap },
    { label: "Treinamentos ativos", value: trainings.length, icon: Users },
    { label: "Leads novos", value: leadStats.newCount, icon: Inbox },
    { label: "Leads este mês", value: leadStats.monthCount, icon: TrendingUp },
  ];

  function serviceTitle(serviceId: string | null) {
    return services.find((service) => service.id === serviceId)?.title ?? "—";
  }

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Visão geral do site e dos leads recebidos." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-white/10 bg-ink-900/60 p-5">
            <metric.icon className="h-5 w-5 text-gold" aria-hidden="true" />
            <p className="mt-4 text-2xl font-extrabold text-paper">{metric.value}</p>
            <p className="mt-1 text-xs text-white/50">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-ink-900/60 p-6">
        <h2 className="text-base font-bold text-paper">Últimos leads</h2>

        {!leadsLoading && recentLeads.length === 0 && (
          <div className="mt-6">
            <EmptyState
              icon={Inbox}
              title="Nenhum lead recebido ainda."
              description="Assim que alguém enviar o formulário do site, os leads aparecerão aqui."
            />
          </div>
        )}

        {recentLeads.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
                  <th className="py-3 pr-4">Nome</th>
                  <th className="py-3 pr-4">Serviço</th>
                  <th className="py-3 pr-4">Data</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 text-white/70">
                    <td className="py-3 pr-4 font-medium text-paper">{lead.name}</td>
                    <td className="py-3 pr-4">{serviceTitle(lead.service_id)}</td>
                    <td className="py-3 pr-4">{formatDateTime(lead.created_at)}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={LEAD_STATUS_VARIANTS[lead.status]}>
                        {LEAD_STATUS_LABELS[lead.status]}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
