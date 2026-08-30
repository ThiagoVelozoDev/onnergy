import { supabase } from "@/lib/supabase";
import { withFallback } from "@/lib/utils";
import { seedCourses } from "@/data/seed";
import type { Course } from "@/types";

export async function getActiveCourses(): Promise<Course[]> {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("active", true)
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Course[];
  }, seedCourses);
}
