"use client";

// Add Transition style Star Wars

import HeaderTitle from "@/components/HeaderTitle";
import SolarSystem from "@/components/solar-system";
import HyperspaceTransition from "@/components/HyperspaceTransition";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showTransition, setShowTransition] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setShowTransition(true);
  };

  return (
    <main className="w-full h-screen relative bg-black overflow-hidden">
      <HeaderTitle />
      <SolarSystem />

      {!showTransition && (
        <button
          onClick={handleClick}
          className="absolute top-4 right-4 z-50 bg-white/10 text-white px-4 py-2 rounded-md backdrop-blur-md hover:bg-white/20 transition"
        >
          🌌 Carte Galactique
        </button>
      )}

      <a
        href="/"
        className="absolute top-4 left-4 z-50 bg-white/10 text-white px-4 py-2 rounded-md backdrop-blur-md hover:bg-white/20 transition"
      >
        ⬅ Retour
      </a>

      {showTransition && (
        <HyperspaceTransition onComplete={() => router.push("/galaxy-map")} />
      )}
    </main>
  );
}
