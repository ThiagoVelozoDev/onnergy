import { clsx, type ClassValue } from "clsx";
import { isSupabaseConfigured } from "@/lib/supabase";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Runs a Supabase query and falls back to local seed data whenever
 * credentials are not configured yet, or the query itself fails.
 */
export async function withFallback<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    return await fetcher();
  } catch (error) {
    console.warn("[onnergy] Usando dados de seed (Supabase indisponível):", error);
    return fallback;
  }
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
