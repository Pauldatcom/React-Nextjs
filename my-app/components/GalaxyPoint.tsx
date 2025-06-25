"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";

export default function GalaxyPoint({ galaxy }: { galaxy: any }) {
  const [open, setOpen] = useState(false);

  return (
    <mesh
      position={galaxy.position}
      onClick={() => setOpen(true)}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      <sphereGeometry args={[1.8, 16, 16]} />
      <meshStandardMaterial
        color="#88f"
        emissive="#22f"
        emissiveIntensity={0.7}
      />

      {open && (
        <Html center>
          <div className="bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold">{galaxy.name}</h2>
            <p className="text-sm italic text-gray-400">{galaxy.type}</p>
            <p className="text-sm mt-1">{galaxy.description}</p>
            <p className="text-xs mt-2 text-gray-500">
              Distance: {galaxy.distance_ly} ly
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
    </mesh>
  );
}
