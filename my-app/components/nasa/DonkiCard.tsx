// components/nasa/DonkiCard.tsx
"use client"

import { useEffect, useState } from "react"
import { fetchDonkiData, DonkiData } from "@/lib/api/nasa/donki"
import {
  Card, CardHeader, CardTitle,
  CardContent, CardDescription, CardFooter
} from "@/components/ui/card"

interface DonkiCardProps {
  onClose: () => void
}

export default function DonkiCard({ onClose }: DonkiCardProps) {
  const [event, setEvent] = useState<DonkiData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDonkiData().then((data) => {
      setEvent(data)
      setLoading(false)
    })
  }, [])

  if (loading || !event) return null

  return (
    <Card className="absolute top-24 left-4 w-[400px] z-10 shadow-xl backdrop-blur border border-border bg-background/90">
      <CardHeader className="relative">
        <CardTitle>Événement Solaire : {event.title}</CardTitle>
        <CardDescription>{event.event_type} — {event.start_time}</CardDescription>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Fermer"
        >
          ✕
        </button>
      </CardHeader>
      <CardContent>
        <p>Source : {event.source}</p>
        <p>Détails : {event.description}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Dernière mise à jour : {event.last_update}</p>
      </CardFooter>
    </Card>
  )
}
