import { useEffect, useState } from "react";
import { getActiveCourses } from "@/services/coursesService";
import type { Course } from "@/types";

interface UseCoursesResult {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getActiveCourses()
      .then((data) => {
        if (active) setCourses(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Erro ao carregar cursos");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { courses, loading, error };
}
