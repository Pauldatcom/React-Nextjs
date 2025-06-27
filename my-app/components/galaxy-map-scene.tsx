"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SpiralGalaxy from "./SpiralGalaxy";
import Galaxy from "./galaxy";
import HaloArmsLayer from "./HaloArmsLayer";
import { useExoplanets } from "@/lib/hooks/useExoplanets";
import GalaxyPlanet from "./GalaxyPlanet";

export default function GalaxyMapScene() {
  const { data: exoplanets, loading } = useExoplanets();

  const exoPlanetsToGalaxyPlanets = (data: any[]) => {
    return data.slice(0, 4).map((exo, i) => ({
      name: exo.pl_name || `Exo-${i + 1}`,
      radius: 1.5,
      position: [
        Math.cos(i * Math.PI / 2) * 80,
        Math.sin(i * Math.PI / 2) * 40,
        Math.sin(i * 2) * 30,
      ] as [number, number, number],
      textureUrl: i % 2 === 0
        ? "/textures/planets/2k_mars.jpg"
        : "/textures/planets/2k_saturn.jpg",
      description: `Découverte en ${exo.disc_year || "année inconnue"}`,
      type: exo.pl_type || "Exoplanète",
      distance_ly: exo.sy_dist?.toFixed(2) || "??",
    }));
  };

  return (
    <Canvas camera={{ position: [0, 0, 250], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fff8e1" />

      <Galaxy />

      {/* SpiralGalaxy gère les exoplanètes et leurs points */}
      <SpiralGalaxy exoplanets={exoplanets} />

      {/* ✅ Ajout des 4 planètes visuelles */}
      {!loading &&
        exoPlanetsToGalaxyPlanets(exoplanets || []).map((planet, i) => (
          <GalaxyPlanet key={i} planet={planet} />
        ))}

      <HaloArmsLayer />

      {/* Centre lumineux */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial
          color="#ffffcc"
          emissive="#ffffcc"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Halo */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#ffccaa" transparent opacity={0.15} />
      </mesh>

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
}
