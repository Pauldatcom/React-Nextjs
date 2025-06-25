"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchMarsRoverPhoto, MarsPhoto } from "@/lib/api/nasa/mars";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

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
    <Card className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[400px] z-10 shadow-xl backdrop-blur border border-border bg-background/90">
      <CardHeader className="relative">
        <CardTitle>Rover: {photo.rover.name}</CardTitle>
        <CardDescription>
          {photo.camera.full_name} — {photo.earth_date}
        </CardDescription>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Fermer"
        >
          ✕
        </button>
      </CardHeader>
      <CardContent>
        <Image
          src={photo.img_src}
          alt={`Mars photo from ${photo.camera.full_name}`}
          width={600}
          height={400}
          className="rounded object-cover max-h-60 w-full"
          priority
        />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Photo envoyée par Curiosity
        </p>
      </CardFooter>
    </Card>
  );
}
