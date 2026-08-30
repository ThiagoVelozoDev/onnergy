import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { Lead, NewLead } from "@/types";

export async function createLead(lead: NewLead): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.info("[onnergy] Supabase não configurado — lead não foi persistido:", lead);
    return;
  }
  const { error } = await supabase.from("leads").insert({ ...lead, source: lead.source ?? "site" });
  if (error) throw error;
}

export interface LeadStats {
  newCount: number;
  monthCount: number;
}

export async function getLeadStats(): Promise<LeadStats> {
  if (!isSupabaseConfigured()) return { newCount: 0, monthCount: 0 };

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [newResult, monthResult] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString()),
  ]);

  return {
    newCount: newResult.count ?? 0,
    monthCount: monthResult.count ?? 0,
  };
}

export async function getRecentLeads(limit = 5): Promise<Lead[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Lead[];
}
