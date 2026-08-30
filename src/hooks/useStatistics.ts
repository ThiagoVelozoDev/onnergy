import { useEffect, useState } from "react";
import { getActiveStatistics } from "@/services/statisticsService";
import type { Statistic } from "@/types";

interface UseStatisticsResult {
  statistics: Statistic[];
  loading: boolean;
}

export function useStatistics(): UseStatisticsResult {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getActiveStatistics()
      .then((data) => {
        if (active) setStatistics(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { statistics, loading };
}
