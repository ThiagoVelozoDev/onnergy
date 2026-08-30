import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function isPlaceholder(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

/**
 * True only when real Supabase credentials were provided via env vars.
 * Services use this to skip network calls and serve local seed data instead.
 */
export function isSupabaseConfigured(): boolean {
  return !isPlaceholder(rawUrl) && !isPlaceholder(rawAnonKey);
}

export const supabase = createClient(
  isPlaceholder(rawUrl) ? "https://placeholder.supabase.co" : (rawUrl as string),
  isPlaceholder(rawAnonKey) ? "placeholder-anon-key" : (rawAnonKey as string),
);
