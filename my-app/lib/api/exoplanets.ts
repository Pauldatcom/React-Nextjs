// lib/api/exoplanets.ts
export interface Exoplanet {
  pl_name: string;
  hostname: string;
  ra: number;
  dec: number;
  pl_orbper: number;
  pl_rade: number;
  pl_bmasse: number;
  disc_facility: string;
}

export async function fetchSystemByHost(host: string) {
  const query = `
    SELECT pl_name, pl_orbper, pl_rade, pl_bmassj, disc_year 
    FROM ps 
    WHERE hostname = '${host}'
  `
  const encodedQuery = encodeURIComponent(query)
  const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodedQuery}&format=json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch system ${host}: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (!data || data.length === 0) {
    throw new Error(`System '${host}' not found.`)
  }

  return data
}
