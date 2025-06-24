"use client";

import HeaderTitle from "@/components/HeaderTitle";
import SolarSystem from "@/components/solar-system";

export default function Home() {
  return (
    <main className="w-full h-screen relative bg-black overflow-hidden">
      <HeaderTitle />
      <SolarSystem />
    </main>
  );
}
