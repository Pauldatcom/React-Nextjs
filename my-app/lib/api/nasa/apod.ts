// Call the API to get the Astronomy Picture of the Day (APOD) data

export async function getApodData() {
  const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("APOD fetch failed");
  return await res.json();
  
  
}
