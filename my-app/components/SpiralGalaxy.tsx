"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SpiralGalaxy() {
  const ref = useRef<THREE.Points>(null);

  const arms = 2;
  const starsPerArm = 3000;
  const radius = 130;
  const spin = 2.5;

  const geometry = useMemo(() => {
    const total =
      arms * starsPerArm +
      800 + // bulbe
      1000 + // barre
      1200; // anneau
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
        positions.set([x, y, z], i3);

        const distance = Math.sqrt(x * x + z * z);
        if (distance < 30) {
          baseColor.setRGB(1.0, 0.9, 0.6); // Jaune clair centre
        } else if (distance < 90) {
          baseColor.setRGB(0.4, 0.7, 1.0); // Bleu galaxie
        } else {
          baseColor.setRGB(0.8, 0.3, 1.0); // Violet externe
        }
        colors.set([baseColor.r, baseColor.g, baseColor.b], i3);
        index++;
      }
    }

    // --- BULBE CENTRAL ---
    for (let i = 0; i < 800; i++) {
      const r = Math.random() ** 0.5 * 20;
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
    for (let i = 0; i < 1000; i++) {
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
    for (let i = 0; i < 1200; i++) {
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
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.002;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={2.4}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
