import { useEffect, useState } from "react";
import { getActivePartnerCompanies } from "@/services/partnersService";
import type { PartnerCompany } from "@/types";

interface UsePartnersResult {
  partners: PartnerCompany[];
  loading: boolean;
}

export function usePartners(): UsePartnersResult {
  const [partners, setPartners] = useState<PartnerCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getActivePartnerCompanies()
      .then((data) => {
        if (active) setPartners(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { partners, loading };
}
