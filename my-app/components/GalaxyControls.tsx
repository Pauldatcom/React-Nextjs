"use client";

import { Dispatch, SetStateAction } from "react";

interface GalaxyControlsProps {
  speedMultiplier: number;
  setSpeedMultiplier: Dispatch<SetStateAction<number>>;
  isTopView: boolean;
  setIsTopView: Dispatch<SetStateAction<boolean>>;
  onZoomToPlanet: () => void;
}

export default function GalaxyControls({
  speedMultiplier,
  setSpeedMultiplier,
  isTopView,
  setIsTopView,
  onZoomToPlanet,
}: GalaxyControlsProps) {
  return (
    <div className="absolute top-4 left-4 space-y-3 z-50 p-4 bg-black/40 backdrop-blur-md rounded-xl shadow-md border border-white/10 text-white">
      <button
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
        onClick={() => setSpeedMultiplier((prev) => (prev >= 7 ? 1 : prev * 2))}
      >
        🔁 Vitesse x{speedMultiplier}
      </button>

      <button
        className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition"
        onClick={() => setIsTopView(!isTopView)}
      >
        🔄 Vue : {isTopView ? "Dessus" : "3D"}
      </button>

      <button
        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md transition"
        onClick={onZoomToPlanet}
      >
        🔍 Zoom Planète
      </button>
    </div>
  );
}
