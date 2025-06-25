"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchMarsRoverPhoto, MarsPhoto } from "@/lib/api/nasa/mars";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MarsCardProps {
  onClose: () => void;
}

export default function MarsCard({ onClose }: MarsCardProps) {
  const [photo, setPhoto] = useState<MarsPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarsRoverPhoto("2020-07-01").then((data) => {
      setPhoto(data);
      setLoading(false);
    });
  }, []);

  if (loading || !photo) return null;

  return (
    <>
      {/* Overlay sombre */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Card centrée */}
      <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[90vw] max-h-[80vh] z-50 shadow-2xl backdrop-blur border border-border bg-background/95 overflow-hidden transition duration-200 hover:contrast-125 hover:bg-background/80">
        <CardHeader className="relative">
          <CardTitle className="text-lg">Rover: {photo.rover.name}</CardTitle>
          <CardDescription>
            {photo.camera.full_name} — {photo.earth_date}
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
          <Image
            src={photo.img_src}
            alt={`Mars photo from ${photo.camera.full_name}`}
            width={700}
            height={500}
            className="rounded object-cover w-full h-48 mb-4"
          />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Photo envoyée par Curiosity
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
