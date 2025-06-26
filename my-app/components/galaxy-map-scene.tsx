"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SpiralGalaxy from "./SpiralGalaxy";
import Galaxy from "./galaxy";
import HaloArmsLayer from "./HaloArmsLayer";
import { useExoplanets } from "@/lib/hooks/useExoplanets";

export default function GalaxyMapScene() {
  const { data: exoplanets, loading } = useExoplanets();

  return (
    <Canvas camera={{ position: [0, 0, 250], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fff8e1" />

      <Galaxy />

      {/* SpiralGalaxy gère les exoplanètes et leurs points */}
      <SpiralGalaxy exoplanets={exoplanets} />

      {/* Halo conservé */}
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
