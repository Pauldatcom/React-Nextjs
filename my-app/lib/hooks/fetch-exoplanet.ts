import { Planet } from "@/lib/hooks/celestial";
import { Star } from "@/lib/hooks/celestial";

export async function fetchExoplanetFromAPI(
  name: string
): Promise<{ planet: Planet; star: Star } | null> {
  try {
    const res = await fetch(
      `http://localhost:8000/api/exoplanet?name=${encodeURIComponent(name)}`
    );
    const data = await res.json();
    if (!data || data.error) return null;

    const planet = new Planet({
      id: data.pl_name?.toLowerCase().replace(/\s+/g, "-"),
      name: data.pl_name,
      type: "Exoplanet",
      size: data.pl_rade ?? 1,
      distanceFromSun: data.pl_orbsmax ? data.pl_orbsmax * 100 : 50,
      realDistanceFromSun: data.pl_orbsmax ? data.pl_orbsmax * 149.6 : 149.6,
      textureUrl: "/textures/planets/2k_gas.jpg",
      diameter: data.pl_rade ? data.pl_rade * 12742 : 12742,
      rotationSpeed: 0.01,
      orbitSpeed: 0.002,
      axialTilt: 0,
      dayLength: `${data.pl_orbper ?? "?"} days`,
      yearLength: `${data.pl_orbper ?? "?"} days`,
      description: `Exoplanet orbiting ${data.hostname ?? "?"}`,
      hostStarName: data.hostname,
    });

    const star = new Star({
      id: data.hostname?.toLowerCase() ?? "unknown-star",
      name: data.hostname ?? "Unnamed Star",
      temperature: data.st_teff ?? 5500,
      radius: data.st_rad ?? 1,
      mass: data.st_mass ?? 1,
      textureUrl: "/textures/sun.jpg",
      description: `Star hosting ${data.pl_name ?? "?"}`,
    });

    return { planet, star };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
