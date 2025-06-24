// Call the NASA Mars Rover API to get a photo from a specific date


export interface MarsPhoto {
  id: number
  img_src: string
  earth_date: string
  camera: { full_name: string }
  rover: { name: string }
}

export async function fetchMarsRoverPhoto(date = "2020-07-01"): Promise<MarsPhoto | null> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=DEMO_KEY`
    )
    const data = await res.json()
    return data.photos?.[0] || null
  } catch (error) {
    console.error("Erreur Mars Rover:", error)
    return null
  }
}
