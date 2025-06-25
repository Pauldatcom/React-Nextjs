"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SpiralGalaxy from "./SpiralGalaxy";
import Galaxy from "./galaxy";
// import * as THREE from "three";
import HaloArmsLayer from "./HaloArmsLayer";

export default function GalaxyMapScene() {
  return (
    <Canvas camera={{ position: [0, 40, 120], fov: 70 }}>
      {/* Lumière globale */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fff8e1" />

      {/* Fond étoilé et spirale */}
      <Galaxy />
      <SpiralGalaxy />
      <HaloArmsLayer />

      {/* <mesh>
        <sphereGeometry args={[170, 64, 64]} />
        <meshBasicMaterial
          color="#69b3f7"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh> */}

      {/* Centre lumineux */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial
          color="#ffffcc"
          emissive="#ffffcc"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Halo flou */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#ffccaa" transparent opacity={0.15} />
      </mesh>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      {/* Contrôle caméra */}
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
}
