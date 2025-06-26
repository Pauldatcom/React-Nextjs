"use client";
import { useMemo } from "react";
import * as THREE from "three";
import { useMobile } from "@/lib/hooks/use-mobile";
import { useOptimizedTexture } from "@/lib/hooks/use-optimized-texture";

export default function Galaxy() {
  const isMobile = useMobile();

  // Skybox fond étoilé
  const skyGeometry = useMemo(() => {
    const segments = isMobile ? [20, 15] : [60, 40];
    return new THREE.SphereGeometry(500, segments[0], segments[1]);
  }, [isMobile]);

  const skyTexture = useOptimizedTexture("/textures/2k_stars_milky_way.jpg");

  return (
    <>
      {/* Skybox */}
      <mesh geometry={skyGeometry}>
        <meshBasicMaterial map={skyTexture} side={THREE.BackSide} />
      </mesh>

      {/* Centre lumineux */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial
          color="#ffffcc"
          emissive="#ffffcc"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Halo doux */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#ffccaa" transparent opacity={0.15} />
      </mesh>
    </>
  );
}
