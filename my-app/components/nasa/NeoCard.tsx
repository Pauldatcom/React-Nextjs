"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchNeoData, NeoData } from "@/lib/api/nasa/neo";
import { useEffect, useState } from "react";

interface NeoCardProps {
  onClose: () => void;
}

export default function NeoCard({ onClose }: NeoCardProps) {
  const [neo, setNeo] = useState<NeoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNeoData().then((data) => {
      setNeo(data);
      setLoading(false);
    });
  }, []);

  if (loading || !neo) return null;

  return (
    <>
      {/* Overlay sombre */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Card centrée */}
      <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[90vw] max-h-[80vh] z-50 shadow-2xl backdrop-blur border border-border bg-background/95 overflow-hidden">
        <CardHeader className="relative">
          <CardTitle className="text-lg">Astéroïde : {neo.name}</CardTitle>
          <CardDescription>
            Diamètre :{" "}
            {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(0)} m
            — Potentiellement dangereux :{" "}
            {neo.is_potentially_hazardous_asteroid ? "Oui" : "Non"}
          </CardDescription>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground bg-background/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-background transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">
          <div className="space-y-3">
            <p className="text-sm">
              <span className="font-medium">Vitesse relative :</span>{" "}
              {parseFloat(
                neo.close_approach_data[0].relative_velocity.kilometers_per_hour
              ).toFixed(0)}{" "}
              km/h
            </p>
            <p className="text-sm">
              <span className="font-medium">Distance à la Terre :</span>{" "}
              {parseFloat(
                neo.close_approach_data[0].miss_distance.kilometers
              ).toFixed(0)}{" "}
              km
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Date d'approche : {neo.close_approach_data[0].close_approach_date}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
