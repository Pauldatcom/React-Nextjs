import { useEffect, useState } from "react";

export type Exoplanet = {
  pl_name: string;
  pl_rade: number;
  pl_bmassj: number;
  pl_dens: number;
  pl_eqt: number;
  pl_orbper: number;
  st_spectype: string;
  st_teff: number;
  st_rad: number;
  st_dist: number;
  discoverymethod: string;
  disc_year: number;
};

let exoplanetCache: Exoplanet[] | null = null;

export function useExoplanets() {
  const [data, setData] = useState<Exoplanet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (exoplanetCache) {
      console.log("✅ Données chargées depuis le cache");
      setData(exoplanetCache);
      setLoading(false);
      return;
    }

    console.log("🔥 useEffect déclenché — appel API");
    fetch("http://localhost:8000/api/exoplanets")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log("📦 Données reçues :", res);
        if (Array.isArray(res)) {
          exoplanetCache = res;
          setData(res);
        } else {
          console.error("❌ Format inattendu reçu :", res);
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Erreur API :", err);
        setLoading(false);
        setData([]);
      });
  }, []);

  return { data, loading };
}
