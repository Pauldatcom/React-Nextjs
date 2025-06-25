"use client";

import HeaderTitle from "@/components/HeaderTitle";
import SolarSystem from "@/components/solar-system";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen relative bg-black overflow-hidden">
      <HeaderTitle />
      <SolarSystem />
      <Link
        href="/galaxy-map"
        className="absolute top-4 right-4 z-50 bg-white/10 text-white px-4 py-2 rounded-md backdrop-blur-md hover:bg-white/20 transition"
      >
        🌌 Carte Galactique
      </Link>
      <Link
        href="/"
        className="absolute top-4 left-4 z-50 bg-white/10 text-white px-4 py-2 rounded-md backdrop-blur-md hover:bg-white/20 transition"
      >
        ⬅ Retour
      </Link>
    </main>
  );
}
