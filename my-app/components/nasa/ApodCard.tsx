// components/nasa/ApodCard.tsx

"use client"
import { useEffect, useState } from "react"
import { getApodData } from "@/lib/api/nasa/apod"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle, CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ApodCardProps {
  onClose: () => void
}

export default function ApodCard({ onClose }: ApodCardProps) {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getApodData().then(setData).catch(console.error)
  }, [])

  if (!data) return null

  return (
    <Card className="absolute bottom-4 right-4 w-[400px] z-10 shadow-xl backdrop-blur border border-border bg-background/90">
      <CardHeader className="relative">
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.date}</CardDescription>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Fermer"
        >
          ✕
        </button>
      </CardHeader>
      <CardContent>
        <img
          src={data.url}
          alt={data.title}
          className="rounded object-cover max-h-60 w-full"
        />
        <p className="mt-4 text-sm text-muted-foreground">{data.explanation}</p>
      </CardContent>
      {data.hdurl && (
        <CardFooter>
          <Button asChild>
            <a href={data.hdurl} target="_blank" rel="noopener noreferrer">
              Voir en HD
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
