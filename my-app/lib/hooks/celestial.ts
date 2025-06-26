export class Planet {
  id: string;
  name: string;
  size: number;
  type: string;
  textureUrl: string;
  distanceFromSun: number;
  realDistanceFromSun: number;
  diameter: number;
  rotationSpeed: number;
  orbitSpeed: number;
  axialTilt: number;
  dayLength: string;
  yearLength: string;
  description: string;
  hostStarName: string;

  constructor(data: Partial<Planet>) {
    this.id = data.id ?? "unknown";
    this.name = data.name ?? "Unnamed Planet";
    this.size = data.size ?? 1;
    this.type = data.type ?? "Exoplanet";
    this.textureUrl = data.textureUrl ?? "/textures/planets/2k_gas.jpg";
    this.distanceFromSun = data.distanceFromSun ?? 50;
    this.realDistanceFromSun = data.realDistanceFromSun ?? 150;
    this.diameter = data.diameter ?? 12742;
    this.rotationSpeed = data.rotationSpeed ?? 0.01;
    this.orbitSpeed = data.orbitSpeed ?? 0.002;
    this.axialTilt = data.axialTilt ?? 0;
    this.dayLength = data.dayLength ?? "?";
    this.yearLength = data.yearLength ?? "?";
    this.description = data.description ?? "Exoplanet";
    this.hostStarName = data.hostStarName ?? "unknown";
  }
}

export class Star {
  id: string;
  name: string;
  temperature: number;
  radius: number;
  mass: number;
  textureUrl: string;
  description: string;

  constructor(data: Partial<Star>) {
    this.id = data.id ?? "unknown-star";
    this.name = data.name ?? "Unnamed Star";
    this.temperature = data.temperature ?? 5500;
    this.radius = data.radius ?? 1;
    this.mass = data.mass ?? 1;
    this.textureUrl = data.textureUrl ?? "/textures/sun.jpg";
    this.description = data.description ?? "Host star of exoplanet.";
  }
}
