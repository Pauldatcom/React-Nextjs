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
    <main className="w-full h-screen">
      <GalaxyMapScene />
    </main>
  );
}
