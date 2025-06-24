"use client"

import { useEffect, useState } from "react"
import { fetchNeoData, NeoData } from "@/lib/api/nasa/neo"
import {
  Card, CardHeader, CardTitle,
  CardContent, CardDescription, CardFooter
} from "@/components/ui/card"

interface NeoCardProps {
  onClose: () => void
}

export default function NeoCard({ onClose }: NeoCardProps) {
  const [neo, setNeo] = useState<NeoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNeoData().then((data) => {
      setNeo(data)
      setLoading(false)
    })
  }, [])

  if (loading || !neo) return null

  return (
    <Card className="absolute top-4 right-4 w-[400px] z-10 shadow-xl backdrop-blur border border-border bg-background/90">
      <CardHeader className="relative">
        <CardTitle>Astéroïde : {neo.name}</CardTitle>
        <CardDescription>
          Diamètre : {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(0)} m — Potentiellement dangereux : {neo.is_potentially_hazardous_asteroid ? "Oui" : "Non"}
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
        <p>Vitesse relative : {parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0)} km/h</p>
        <p>Distance à la Terre : {parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toFixed(0)} km</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Date d'approche : {neo.close_approach_data[0].close_approach_date}</p>
      </CardFooter>
    </Card>
  )
}
