"use client";

// Component to create a hyperspace transition effect with stars moving towards the viewer

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function StarField({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>(new Float32Array(1000 * 3));

  // Init positions
  useEffect(() => {
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      positions.current[i3 + 0] = (Math.random() - 0.5) * 10;
      positions.current[i3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i3 + 2] = Math.random() * -50;
    }

    const timeout = setTimeout(onComplete, 3000);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  // Animate
  useFrame(() => {
    const arr = positions.current;
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      arr[i3 + 2] += 1.5;
      if (arr[i3 + 2] > 0) {
        arr[i3 + 2] = -50;
        arr[i3 + 0] = (Math.random() - 0.5) * 10;
        arr[i3 + 1] = (Math.random() - 0.5) * 10;
      }
    }
    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions.current} frustumCulled={false}>
      <PointMaterial
        color="#ffffff"
        size={0.1}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function HyperspaceTransition({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Canvas>
        <StarField onComplete={onComplete} />
      </Canvas>
    </div>
  );
}
