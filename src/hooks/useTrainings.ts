import { useEffect, useState } from "react";
import { getActiveTrainings } from "@/services/trainingsService";
import type { Training } from "@/types";

interface UseTrainingsResult {
  trainings: Training[];
  loading: boolean;
  error: string | null;
}

export function useTrainings(): UseTrainingsResult {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getActiveTrainings()
      .then((data) => {
        if (active) setTrainings(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Erro ao carregar treinamentos");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { trainings, loading, error };
}
