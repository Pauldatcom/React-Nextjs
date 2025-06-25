// "use client";

// import { useMemo, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function SpiralGalaxy() {
//   const ref = useRef<THREE.Points>(null);

//   const arms = 3;
//   const starsPerArm = 2000;
//   const radius = 150;
//   const spin = 4.0; // plus grand = bras plus enroulés
//   const spread = 1; // plus petit = bras plus fins

//   const { geometry, material } = useMemo(() => {
//     const totalStars = arms * starsPerArm;
//     const positions = new Float32Array(totalStars * 3);
//     const colors = new Float32Array(totalStars * 3);
//     const centerColor = new THREE.Color("#ffffff");
//     const edgeColor = new THREE.Color("#6ec1e4");

//     let i = 0;
//     for (let arm = 0; arm < arms; arm++) {
//       const armAngle = (arm / arms) * Math.PI * 2;

//       for (let j = 0; j < starsPerArm; j++) {
//         const radiusFactor = Math.random() ** 0.6;
//         const r = radius * radiusFactor;

//         // Spirale logarithmique
//         const angle = armAngle + r * spin * 0.01;

//         // Contrôle de l'écartement du bras
//         const offsetAngle = (Math.random() - 0.5) * spread;
//         const finalAngle = angle + offsetAngle;

//         const x = Math.cos(finalAngle) * r;
//         const y = (Math.random() - 0.5) * 2.5;
//         const z = Math.sin(finalAngle) * r;

//         const i3 = i * 3;
//         positions.set([x, y, z], i3);

//         const color = centerColor.clone().lerp(edgeColor, radiusFactor);
//         colors.set([color.r, color.g, color.b], i3);

//         i++;
//       }
//     }

//     const geo = new THREE.BufferGeometry();
//     geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//     geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//     const mat = new THREE.PointsMaterial({
//       size: 1.5,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.9,
//       depthWrite: false,
//       blending: THREE.AdditiveBlending,
//     });

//     return { geometry: geo, material: mat };
//   }, []);

//   useFrame((_, delta) => {
//     if (ref.current) ref.current.rotation.y += delta * 0.005;
//   });

//   return <points ref={ref} geometry={geometry} material={material} />;
// }

"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SpiralGalaxy() {
  const ref = useRef<THREE.Points>(null);

  const arms = 2;
  const starsPerArm = 3000;
  const radius = 170;
  const spin = 2.5;
  const spread = 1; // plus petit = bras plus fins

  const geometry = useMemo(() => {
    const total = arms * starsPerArm + 3000; // bras + barre + bulbe + anneau
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
        const randomOffset = (Math.random() - 0.5) * 1.4;

        const x = Math.cos(angle + randomOffset) * r;
        const y = (Math.random() - 0.5) * 3;
        const z = Math.sin(angle + randomOffset) * r;

        const i3 = index * 3;
        positions.set([x, y, z], i3);

        baseColor.setHSL(0.6 + Math.random() * 0.1, 0.7, 0.8);
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
      colors.set([1, 0.9, 0.6], i3);
      index++;
    }

    // --- BARRE CENTRALE ---
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 10;

      const i3 = index * 3;
      positions.set([x, y, z], i3);
      colors.set([1, 0.8, 0.6], i3);
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
      colors.set([0.6, 0.8, 1], i3);
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
