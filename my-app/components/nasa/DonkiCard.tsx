// components/nasa/DonkiCard.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DonkiData, fetchDonkiData } from "@/lib/api/nasa/donki";
import { useEffect, useState } from "react";

interface DonkiCardProps {
  onClose: () => void;
}

export default function DonkiCard({ onClose }: DonkiCardProps) {
  const [event, setEvent] = useState<DonkiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonkiData().then((data) => {
      setEvent(data);
      setLoading(false);
    });
  }, []);

  if (loading || !event) return null;

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
          <CardTitle className="text-lg">
            Événement Solaire : {event.title}
          </CardTitle>
          <CardDescription>
            {event.event_type} — {event.start_time}
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
              <span className="font-medium">Source :</span> {event.source}
            </p>
            <p className="text-sm leading-relaxed">
              <span className="font-medium">Détails :</span> {event.description}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {event.last_update}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
