"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SpiralGalaxy() {
  const ref = useRef<THREE.Points>(null);

  const arms = 3;
  const starsPerArm = 2000;
  const radius = 150;
  const spin = 4.0; // plus grand = bras plus enroulés
  const spread = 1; // plus petit = bras plus fins

  const { geometry, material } = useMemo(() => {
    const totalStars = arms * starsPerArm;
    const positions = new Float32Array(totalStars * 3);
    const colors = new Float32Array(totalStars * 3);
    const centerColor = new THREE.Color("#ffffff");
    const edgeColor = new THREE.Color("#6ec1e4");

    let i = 0;
    for (let arm = 0; arm < arms; arm++) {
      const armAngle = (arm / arms) * Math.PI * 2;

      for (let j = 0; j < starsPerArm; j++) {
        const radiusFactor = Math.random() ** 0.6;
        const r = radius * radiusFactor;

        // Spirale logarithmique
        const angle = armAngle + r * spin * 0.01;

        // Contrôle de l'écartement du bras
        const offsetAngle = (Math.random() - 0.5) * spread;
        const finalAngle = angle + offsetAngle;

        const x = Math.cos(finalAngle) * r;
        const y = (Math.random() - 0.5) * 2.5;
        const z = Math.sin(finalAngle) * r;

        const i3 = i * 3;
        positions.set([x, y, z], i3);

        const color = centerColor.clone().lerp(edgeColor, radiusFactor);
        colors.set([color.r, color.g, color.b], i3);

        i++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}
