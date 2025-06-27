"use client";

import { Button } from "@/components/ui/button";

interface SideMenuProps {
  onOpenApod: () => void;
  onOpenMars: () => void;
  onOpenNeo: () => void;
  onOpenDonki: () => void;
}

export default function SideMenu({
  onOpenApod,
  onOpenMars,
  onOpenNeo,
  onOpenDonki,
}: SideMenuProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 space-y-3">
      <Button
        onClick={onOpenApod}
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center text-white border-0 p-0 hover:bg-gray-200/40"
        title="Image du jour"
      >
        <span className="text-2xl">📸</span>
      </Button>

      <Button
        onClick={onOpenMars}
        className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center text-white border-0 p-0 hover:bg-gray-200/40"
        title="Photo Mars"
      >
        <span className="text-2xl">🚀</span>
      </Button>

      <Button
        onClick={onOpenNeo}
        className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center text-white border-0 p-0 hover:bg-gray-200/40"
        title="Données astéroïdes"
      >
        <span className="text-2xl">☄️</span>
      </Button>

      <Button
        onClick={onOpenDonki}
        className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center text-white border-0 p-0 hover:bg-gray-200/40"
        title="Événements solaires"
      >
        <span className="text-2xl">🌞</span>
      </Button>
    </div>
  );
}
