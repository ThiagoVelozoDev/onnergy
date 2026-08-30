import { useEffect, useState } from "react";
import { getActiveHero } from "@/services/heroService";
import { seedHeroContent } from "@/data/seed";
import type { HeroContent } from "@/types";

interface UseHeroResult {
  hero: HeroContent;
  loading: boolean;
}

export function useHero(): UseHeroResult {
  const [hero, setHero] = useState<HeroContent>(seedHeroContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getActiveHero()
      .then((data) => {
        if (active) setHero(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { hero, loading };
}
