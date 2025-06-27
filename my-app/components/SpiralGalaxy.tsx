"use client";

import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Exoplanet } from "@/lib/hooks/useExoplanets";

export default function Galaxy({ exoplanets }: { exoplanets: Exoplanet[] }) {
  const ref = useRef<THREE.Points>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Exoplanet | null>(null);

  const arms = 3;
  const starsPerArm = 2500;
  const bulgeCount = 800;
  const barCount = 1000;
  const ringCount = 1200;
  const radius = 130;
  const spin = 2.5;

  const geometry = useMemo(() => {
    const total = arms * starsPerArm + bulgeCount + barCount + ringCount;
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);

    const baseColor = new THREE.Color();
    let index = 0;

    // --- BRAS SPIRAUX ---
    for (let arm = 0; arm < arms; arm++) {
      const angleOffset = (arm / arms) * Math.PI * 2;

      for (let i = 0; i < starsPerArm; i++) {
        const t = i / starsPerArm;
        const r = radius * Math.pow(t, 0.8);
        const angle = angleOffset + r * spin * 0.01;
        const offset = (Math.random() - 0.5) * 1.4;

        const x = Math.cos(angle + offset) * r;
        const y = (Math.random() - 0.5) * 3;
        const z = Math.sin(angle + offset) * r;

        const i3 = index * 3;

        if (index < 500 && exoplanets[index]) {
          positions.set([x, y, z], i3);
          baseColor.setRGB(0.2, 0.6, 1.0);
          colors.set([baseColor.r, baseColor.g, baseColor.b], i3);
        } else {
          positions.set([x, y, z], i3);
          const dist = Math.sqrt(x * x + z * z);
          if (dist < 30) baseColor.setRGB(1.0, 0.9, 0.6);
          else if (dist < 90) baseColor.setRGB(0.4, 0.7, 1.0);
          else baseColor.setRGB(0.8, 0.3, 1.0);
          colors.set([baseColor.r, baseColor.g, baseColor.b], i3);
        }

        index++;
      }
    }

    // --- BULBE CENTRAL ---
    for (let i = 0; i < bulgeCount; i++) {
      const r = Math.sqrt(Math.random()) * 20;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = (Math.random() - 0.5) * 6;
      const z = Math.sin(theta) * r;

      const i3 = index * 3;
      positions.set([x, y, z], i3);
      baseColor.setRGB(1.0, 0.9, 0.6);
      colors.set([baseColor.r, baseColor.g, baseColor.b], i3);
      index++;
    }

    // --- BARRE CENTRALE ---
    for (let i = 0; i < barCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 10;

      const i3 = index * 3;
      positions.set([x, y, z], i3);
      baseColor.setRGB(1.0, 0.8, 0.6);
      colors.set([baseColor.r, baseColor.g, baseColor.b], i3);
      index++;
    }

    // --- ANNEAU EXTERNE ---
    for (let i = 0; i < ringCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 110 + Math.random() * 10;
      const x = Math.cos(theta) * r;
      const y = (Math.random() - 0.5) * 2;
      const z = Math.sin(theta) * r;

      const i3 = index * 3;
      positions.set([x, y, z], i3);
      baseColor.setRGB(0.6, 0.7, 1.0);
      colors.set([baseColor.r, baseColor.g, baseColor.b], i3);
      index++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return geometry;
  }, [exoplanets]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.002;
    }
  });

  function onPointClick(event: ThreeEvent<PointerEvent>) {
    // Cast event to access index property
    const index = (event as any).index as number | undefined;
    if (index === undefined) return;
    if (index < 500 && exoplanets[index]) {
      setSelectedPlanet(exoplanets[index]);
    }
  }

  return (
    <>
      <points
        ref={ref}
        geometry={geometry}
        onPointerDown={onPointClick}
        raycast={THREE.Points.prototype.raycast}
      >
        <pointsMaterial
          size={2.4}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {selectedPlanet && (
        <Html center>
          <div className="bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold">{selectedPlanet.pl_name}</h2>
            <p className="text-sm italic text-gray-400">
              {selectedPlanet.st_spectype || "Type inconnu"}
            </p>
            <p className="text-sm mt-1">
              {selectedPlanet.discoverymethod}, {selectedPlanet.disc_year}
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Distance : {(selectedPlanet.st_dist * 3.26).toFixed(1)} ly
            </p>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="mt-2 text-blue-400 hover:underline"
            >
              Fermer
            </button>
          </div>
        </Html>
      )}
    </>
  );
}
