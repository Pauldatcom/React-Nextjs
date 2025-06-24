// This file is part of the NASA NEO API integration


export interface NeoData {
  name: string
  estimated_diameter: {
    meters: {
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: Array<{
    close_approach_date: string
    relative_velocity: {
      kilometers_per_hour: string
    }
    miss_distance: {
      kilometers: string
    }
  }>
}

export async function fetchNeoData(): Promise<NeoData> {
  const res = await fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-07-01&api_key=DEMO_KEY")
  const data = await res.json()
  const nearEarthObjects = Object.values(data.near_earth_objects)[0] as NeoData[]
  return nearEarthObjects[0]
}
