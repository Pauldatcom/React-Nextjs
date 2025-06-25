//  This file is part of integration with NASA's DONKI API for solar events

export interface DonkiData {
  title: string;
  event_type: string;
  start_time: string;
  description: string;
  source: string;
  last_update: string;
}

export async function fetchDonkiData(): Promise<DonkiData> {
  const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const url = `https://api.nasa.gov/DONKI/GST?startDate=2024-01-01&endDate=2024-12-31&api_key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const event = data[0]; // tu peux améliorer pour en afficher plusieurs plus tard

  return {
    title: event?.gstID || "Événement inconnu",
    event_type: event?.eventType || "Non spécifié",
    start_time: event?.startTime || "N/A",
    description: event?.note || "Pas de description",
    source: event?.source || "Inconnu",
    last_update: new Date().toISOString().split("T")[0],
  };
}
