// components/star.tsx
"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface StarProps {
  star: {
    id: string;
    name: string;
    size: number;
    rotationSpeed: number;
    textureUrl: string;
  };
}

export default function Star({ star }: StarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = new THREE.TextureLoader().load(star.textureUrl);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * star.rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[star.size, 32, 32]} />
      <meshStandardMaterial emissive={"#ffff88"} map={texture} />
    </mesh>
  );
}
