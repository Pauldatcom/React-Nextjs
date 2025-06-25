"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import HyperspaceTransition from "@/components/HyperspaceTransition";

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
  const [showTransition, setShowTransition] = useState(false);
  const router = useRouter();

  const handleGalaxyView = () => {
    setShowTransition(true);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-row gap-8 z-50 p-4 bg-black/40 backdrop-blur-md rounded-xl shadow-md border border-white/10 text-white">
        <button
          className="w-48 h-16 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center justify-center"
          onClick={() =>
            setSpeedMultiplier((prev) => (prev >= 7 ? 1 : prev * 2))
          }
        >
          🔁 Vitesse x{speedMultiplier}
        </button>

        <button
          className="w-48 h-16 text-lg font-semibold bg-pink-600 hover:bg-pink-700 rounded-xl transition flex items-center justify-center"
          onClick={() => setIsTopView(!isTopView)}
        >
          🔄 Vue : {isTopView ? "Dessus" : "3D"}
        </button>

        <button
          className="w-48 h-16 text-lg font-semibold bg-yellow-600 hover:bg-yellow-700 rounded-xl transition flex items-center justify-center"
          onClick={onZoomToPlanet}
        >
          🔍 Zoom Planète
        </button>

        <button
          className="w-48 h-16 text-lg font-semibold bg-blue-700 hover:bg-blue-800 rounded-xl transition flex items-center justify-center"
          onClick={handleGalaxyView}
        >
          🌌 Vue Galaxie
        </button>
      </div>

      {showTransition && (
        <HyperspaceTransition onComplete={() => router.push("/galaxy-map")} />
      )}
    </>
  );
}
