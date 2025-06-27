"use client";

import dynamic from "next/dynamic";

const GalaxyMapScene = dynamic(
  () => import("../../components/galaxy-map-scene"),
  {
    ssr: false,
  }
);

export default function GalaxyMapPage() {
  return (
    <main className="w-full h-screen relative">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 text-3xl font-bold text-white bg-black/70 px-6 py-3 rounded-xl shadow-lg">
        Vous êtes arrivé sur la galaxie d&apos;Andromède
      </div>
      <GalaxyMapScene />
    </main>
  );
}
