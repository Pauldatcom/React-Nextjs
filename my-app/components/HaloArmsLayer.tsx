"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HaloArmsLayer() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const arms = 2;
  const starsPerArm = 3000;
  const radius = 130;
  const spin = 4.0;
  const spread = 3.5;

  const geometry = useMemo(() => {
    const total = arms * starsPerArm;
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    // const baseColor = new THREE.Color("#9acaff");

    let i = 0;
    for (let arm = 0; arm < arms; arm++) {
      const baseAngle = (arm / arms) * Math.PI * 2;

      for (let j = 0; j < starsPerArm; j++) {
        const t = j / starsPerArm;
        const r = radius * Math.pow(t, 0.7);
        const angle = baseAngle + r * spin * 0.01;
        const offset = (Math.random() - 0.5) * spread;

        const x = Math.cos(angle + offset) * r;
        const y = (Math.random() - 0.5) * 3;
        const z = Math.sin(angle + offset) * r;

        // 🟣 Couleur par distance (r)
        const color = new THREE.Color();
        if (r < 40) {
          color.setRGB(1.0, 0.6, 0.3); // orange
        } else if (r < 80) {
          color.setRGB(0.3, 0.8, 1.0); // bleu
        } else {
          color.setRGB(0.8, 0.3, 1.0); // violet
        }

        const i3 = i * 3;
        positions.set([x, y, z], i3);
        colors.set([color.r, color.g, color.b], i3);
        i++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005;

    if (materialRef.current) {
      const t = state.clock.getElapsedTime();
      materialRef.current.opacity = 0.035 + Math.sin(t * 2) * 0.015;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        size={5.5}
        transparent
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.05}
      />
    </points>
  );
}
