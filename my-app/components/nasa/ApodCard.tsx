// components/nasa/ApodCard.tsx

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApodData, getApodData } from "@/lib/api/nasa/apod";
import { useEffect, useState } from "react";

interface ApodCardProps {
  onClose: () => void;
}

export default function ApodCard({ onClose }: ApodCardProps) {
  const [data, setData] = useState<ApodData | null>(null);

  useEffect(() => {
    getApodData().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

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
          <CardTitle className="text-lg">{data.title}</CardTitle>
          <CardDescription>{data.date}</CardDescription>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground bg-background/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-background transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">
          <img
            src={data.url}
            alt={data.title}
            className="rounded object-cover w-full h-48 mb-4"
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.explanation}
          </p>
        </CardContent>
        {data.hdurl && (
          <CardFooter>
            <Button asChild className="w-full">
              <a href={data.hdurl} target="_blank" rel="noopener noreferrer">
                Voir en HD
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
