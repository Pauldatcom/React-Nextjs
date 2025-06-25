"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

interface ReverseAsteroidProps {
  visible: boolean;
  delay?: number;
  speed?: number;
}

export default function ReverseAsteroid({
  visible,
  delay = 2,
  speed = 0.5,
}: ReverseAsteroidProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [angle, setAngle] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Textures réalistes
  const [colorMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    "/textures/seaside_rock_diff_1k.jpg",
    "/textures/seaside_rock_nor_dx_1k.jpg",
    "/textures/seaside_rock_rough_1k.jpg",
  ]);

  // ℹ️ Orbite elliptique (personnalisée)
  const ellipseA = 35; // demi-grand axe
  const ellipseB = 12; // demi-petit axe

  const ellipseGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const x = ellipseA * Math.cos(t);
      const z = ellipseB * Math.sin(t);
      points.push(new THREE.Vector3(x, 0, z));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // ⏱️ Animation elliptique
  useFrame((_, delta) => {
    if (!visible || !meshRef.current) return;

    const newElapsed = elapsedTime + delta;
    setElapsedTime(newElapsed);
    if (newElapsed < delay) return;

    const newAngle = angle + delta * speed;
    setAngle(newAngle);

    const x = ellipseA * Math.cos(newAngle);
    const z = ellipseB * Math.sin(newAngle);

    meshRef.current.position.set(x, 0, z);
  });

  if (!visible) return null;

  return (
    <group ref={orbitRef}>
      {/* 🔵 Orbite visible */}
      <primitive
        object={
          new THREE.Line(
            ellipseGeometry,
            new THREE.LineBasicMaterial({
              color: "#00ffff",
              transparent: true,
              opacity: 0.2,
            })
          )
        }
      />

      {/* 🌑 Astéroïde */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          roughness={1}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
