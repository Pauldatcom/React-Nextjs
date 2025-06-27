import { Planet } from "@/lib/hooks/celestial";
import { Star } from "@/lib/hooks/celestial";

export async function fetchExoplanetFromAPI(): Promise<{
  planets: Planet[];
  stars: Star[];
} | null> {
  try {
    const res = await fetch(`https://glorious-eagerness-production.up.railway.app/api/exoplanets`);
    const data = await res.json();
    if (!data || data.error) return null;

    const safeData = data.filter((item: any) => item.pl_name?.toLowerCase() !== "sun");

    const planets: Planet[] = safeData.map((item: any) => {
      let planetRotationSpeed = 0.01;
      let planetTexture = "/textures/planets/2k_earth_daymap.jpg";

      const type = item.pl_type ?? "Default";
      let planetType: "Gas Giant" | "Terrestrial" = "Terrestrial";

      switch (type) {
        case "Gas Giant":
          planetTexture = "/textures/planets/2k_jupiter.jpg";
          planetRotationSpeed = 0.03;
          planetType = "Gas Giant";
          break;
        case "Rocky":
          planetTexture = "/textures/planets/2k_mars.jpg";
          planetRotationSpeed = 0.01;
          planetType = "Terrestrial";
          break;
        default:
          planetTexture = "/textures/planets/2k_earth_daymap.jpg";
          planetRotationSpeed = 0.01;
          planetType = "Terrestrial";
      }

      return new Planet({
        id: item.pl_name?.toLowerCase().replace(/\s+/g, "-") ?? `planet-${Math.random()}`,
        name: item.pl_name,
        type: planetType,
        size: item.pl_rade ?? 1,
        distanceFromSun: item.pl_orbsmax ? item.pl_orbsmax * 100 : 50,
        realDistanceFromSun: item.pl_orbsmax ? item.pl_orbsmax * 149.6 : 149.6,
        textureUrl: planetTexture,
        diameter: item.pl_rade ? item.pl_rade * 12742 : 12742,
        rotationSpeed: planetRotationSpeed,
        orbitSpeed: 0.002,
        axialTilt: 0,
        dayLength: `${item.pl_orbper ?? "?"} days`,
        yearLength: `${item.pl_orbper ?? "?"} days`,
        description: `Exoplanet orbiting ${item.hostname ?? "?"}`,
        hostStarName: item.hostname,
      });
    });

    const stars: Star[] = [];

    return { planets, stars };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}