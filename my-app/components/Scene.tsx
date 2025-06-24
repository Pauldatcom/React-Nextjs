"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useSpring } from "@react-spring/three";

import Planet from "@/components/Planet";
import { planets } from "@/lib/planet-data";
import type { PlanetData } from "@/lib/planet-data";

const GalaxyBackground = () => (
  <Stars
    radius={100}
    depth={60}
    count={10000}
    factor={4}
    saturation={0}
    fade
    speed={1}
  />
);

const FloatingRock = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.001;
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="#888" roughness={1} />
    </mesh>
  );
};

function CameraAnimator({ target }: { target: THREE.Vector3 | null }) {
  const { camera } = useThree();
  const spring = useSpring({
    position: target ? [target.x, target.y + 2, target.z + 6] : [0, 5, 15],
    config: { mass: 1, tension: 170, friction: 26 },
    onChange: ({ value }) => {
      if (value.position) {
        camera.position.set(...(value.position as [number, number, number]));
        camera.lookAt(0, 0, 0);
      }
    },
  });

  return null;
}

export default function Scene() {
  const [orbitSpeed, setOrbitSpeed] = useState(1);
  const [topView, setTopView] = useState(false);
  const [zoomTarget, setZoomTarget] = useState<THREE.Vector3 | null>(null);

  const planetRefs = useRef<Record<string, THREE.Mesh>>({});

  return (
    <div className="relative w-full h-full">
      {/* 🌌 Boutons galactiques stylés */}
      <div className="absolute top-5 right-5 z-50 flex flex-col gap-2 text-sm">
        <button
          onClick={() => setOrbitSpeed((v) => (v === 1 ? 4 : 1))}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full shadow-md hover:scale-105 transition"
        >
          🔄 Vitesse
        </button>
        <button
          onClick={() => setTopView((v) => !v)}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full shadow-md hover:scale-105 transition"
        >
          🧭 Angle
        </button>
        <button
          onClick={() => setZoomTarget(null)}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full shadow-md hover:scale-105 transition"
        >
          🔍 Reset Zoom
        </button>
      </div>

      <Canvas
        camera={{ position: topView ? [0, 20, 0.1] : [0, 5, 15], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <GalaxyBackground />

        {/* ☄️ Fragments de roche */}
        <FloatingRock position={[3, 1, -5]} />
        <FloatingRock position={[-4, 2, 4]} />
        <FloatingRock position={[1, -1.5, -3]} />

        {/* ☀️ Soleil */}
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshStandardMaterial
            color="orange"
            emissive="yellow"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* 🌍 Planètes cliquables */}
        {planets.map((planet: PlanetData) => (
          <Planet
            key={planet.id}
            ref={(el) => {
              if (el) planetRefs.current[planet.id] = el;
            }}
            planet={planet}
            onClick={() => {
              const ref = planetRefs.current[planet.id];
              if (ref) {
                const pos = new THREE.Vector3();
                ref.getWorldPosition(pos);
                setZoomTarget(pos);
              }
            }}
            speedMultiplier={orbitSpeed}
          />
        ))}

        <OrbitControls enablePan={false} />
        <CameraAnimator target={zoomTarget} />
      </Canvas>
    </div>
  );
}
