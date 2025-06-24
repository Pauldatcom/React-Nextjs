"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMobile } from "@/lib/hooks/use-mobile";
import { useOptimizedTexture } from "@/lib/hooks/use-optimized-texture";

export default function Galaxy() {
  const isMobile = useMobile();
  const starsRef = useRef<THREE.Points>(null);
  const asteroidGroup = useRef<THREE.Group>(null);

  // Skybox de la galaxie
  const skyGeometry = useMemo(() => {
    const segments = isMobile ? [20, 15] : [60, 40];
    return new THREE.SphereGeometry(500, segments[0], segments[1]);
  }, [isMobile]);

  const skyTexture = useOptimizedTexture("/textures/2k_stars_milky_way.jpg");

  // Petites étoiles
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const starMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.4,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
    });
  }, []);

  // Roches / fragments spatiaux
  const asteroids = useMemo(() => {
    const count = 40;
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 120,
          (Math.random() - 0.5) * 120,
          (Math.random() - 0.5) * 120,
        ],
        scale: Math.random() * 0.6 + 0.2,
      });
    }
    return data;
  }, []);

  // Animation lente
  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.002;
    }
    if (asteroidGroup.current) {
      asteroidGroup.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <>
      {/* Fond étoilé via texture (skybox) */}
      <mesh geometry={skyGeometry}>
        <meshBasicMaterial map={skyTexture} side={THREE.BackSide} />
      </mesh>

      {/* Petites étoiles 3D */}
      <points ref={starsRef} geometry={starsGeometry} material={starMaterial} />

      {/* Roches flottantes */}
      <group ref={asteroidGroup}>
        {asteroids.map((a, index) => (
          <mesh
            key={index}
            position={a.position as [number, number, number]}
            scale={a.scale}
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#444"
              metalness={0.3}
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
