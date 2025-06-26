"use client";

import { useState, useRef } from "react";
import { Html, Text } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useOptimizedTexture } from "@/lib/hooks/use-optimized-texture";

export interface GalaxyPlanetProps {
  planet: {
    name: string;
    radius: number;
    position: [number, number, number];
    textureUrl: string;
    description?: string;
    type?: string;
    distance_ly?: string;
  };
}

export default function GalaxyPlanet({ planet }: GalaxyPlanetProps) {
  const [open, setOpen] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const texture = useOptimizedTexture(planet.textureUrl);

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.1;
    if (open && textRef.current) textRef.current.lookAt(state.camera.position);
  });

  return (
    <group position={planet.position}>
      <mesh
        ref={meshRef}
        onClick={() => setOpen(true)}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {open && (
        <Html center>
          <div className="bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold">{planet.name}</h2>
            <p className="text-sm italic text-gray-400">{planet.type}</p>
            <p className="text-sm mt-1">{planet.description}</p>
            <p className="text-xs mt-2 text-gray-500">
              Distance: {planet.distance_ly} ly
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 text-blue-400 hover:underline"
            >
              Fermer
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}
