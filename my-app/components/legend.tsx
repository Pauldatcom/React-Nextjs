"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMobile } from "@/lib/hooks/use-mobile";
import { Info } from "lucide-react";
import { useState } from "react";

interface LegendProps {
  className?: string;
}

export default function Legend({
  className = "absolute bottom-4 left-4",
}: LegendProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-gray-200/90 hover:bg-gray-300/90 border-2 border-gray-400/70 ring-2 ring-gray-400/30 hover:ring-gray-400/50 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Info className="h-6 w-6 text-gray-800" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-16 left-0 w-80 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              How to use
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-white space-y-2">
            <p>- Click on a planet to view details</p>
            <p>- Use mouse to orbit, scroll to zoom</p>
            {isMobile ? (
              <p>- Use audio button to toggle music</p>
            ) : (
              <p>
                - Press{" "}
                <code className="bg-gray-500/50 px-1 rounded-md">space</code> to
                toggle music,{" "}
                <code className="bg-gray-500/50 px-1 rounded-md">Ctrl</code> +{" "}
                <code className="bg-gray-500/50 px-1 rounded-md">↑/↓</code> to
                adjust volume
              </p>
            )}
            <p className="text-sm mt-6">
              Music by{" "}
              <a
                className="underline text-blue-400 hover:text-blue-300"
                href="https://pixabay.com/users/clavier-music-16027823/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=310690"
              >
                Clavier Clavier
              </a>{" "}
              from{" "}
              <a
                className="underline text-blue-400 hover:text-blue-300"
                href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=310690"
              >
                Pixabay
              </a>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
