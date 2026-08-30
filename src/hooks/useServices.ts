import { useEffect, useState } from "react";
import { getActiveServices } from "@/services/servicesService";
import type { Service } from "@/types";

interface UseServicesResult {
  services: Service[];
  loading: boolean;
  error: string | null;
}

export function useServices(): UseServicesResult {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getActiveServices()
      .then((data) => {
        if (active) setServices(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Erro ao carregar serviços");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { services, loading, error };
}
