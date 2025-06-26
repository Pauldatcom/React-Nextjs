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

    // Ici, on mappe chaque élément en Planet et Star (en supposant que star info n'est pas dans l'API,
    // tu peux adapter ou ajouter une autre API plus tard)
    const planets: Planet[] = data.map((item: any) => {
      // Définition de texture et rotationSpeed comme avant, par exemple
      let planetRotationSpeed = 0.01;
      let planetTexture = "/textures/planets/2k_earth_daymap.jpg";

      const type = item.pl_type ?? "Default";

      switch (type) {
        case "Gas Giant":
          planetTexture = "/textures/planets/2k_jupiter.jpg";
          planetRotationSpeed = 0.03;
          break;
        case "Rocky":
          planetTexture = "/textures/planets/2k_mars.jpg";
          planetRotationSpeed = 0.01;
          break;
        default:
          planetTexture = "/textures/planets/2k_earth_daymap.jpg";
          planetRotationSpeed = 0.01;
      }

      return new Planet({
        id:
          item.pl_name?.toLowerCase().replace(/\s+/g, "-") ??
          `planet-${Math.random()}`,
        name: item.pl_name,
        type: "Exoplanet",
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

    // Si tu n'as pas de stars dans l'API, tu peux retourner un tableau vide ou générer des stars
    const stars: Star[] = []; // ou une map similaire si tu as des données stars

    return { planets, stars };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
