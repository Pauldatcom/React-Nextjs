// Call the API to get the Astronomy Picture of the Day (APOD) data

export interface ApodData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
}

export async function getApodData(): Promise<ApodData> {
  const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("APOD fetch failed");
  return await res.json();
  
  
}
